const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebase');

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Register user (create user in Firebase)
router.post('/register', async (req, res) => {
    const { email, password, displayName, phoneNumber } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: displayName || null,
            phoneNumber: phoneNumber || null,
            emailVerified: false
        });

        res.status(201).json({ 
            message: 'User registered successfully',
            uid: userRecord.uid,
            email: userRecord.email
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ 
            message: error.message || 'Failed to register user'
        });
    }
});

// Verify user token (for protected routes)
router.post('/verify-token', verifyToken, (req, res) => {
    res.status(200).json({ 
        message: 'Token is valid',
        user: {
            uid: req.user.uid,
            email: req.user.email,
            emailVerified: req.user.email_verified
        }
    });
});

// Get user by email
router.post('/get-user', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const userRecord = await auth.getUserByEmail(email);
        res.status(200).json({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            phoneNumber: userRecord.phoneNumber,
            emailVerified: userRecord.emailVerified
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(404).json({ message: 'User not found' });
    }
});

// Update user profile
router.put('/update-profile', verifyToken, async (req, res) => {
    const { displayName, phoneNumber, photoURL } = req.body;

    try {
        const updateData = {};
        if (displayName) updateData.displayName = displayName;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (photoURL) updateData.photoURL = photoURL;

        await auth.updateUser(req.user.uid, updateData);
        
        res.status(200).json({ 
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(400).json({ message: 'Failed to update profile' });
    }
});

// Delete user
router.delete('/delete-user', verifyToken, async (req, res) => {
    try {
        await auth.deleteUser(req.user.uid);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(400).json({ message: 'Failed to delete user' });
    }
});

// Generate custom token (for special auth flows)
router.post('/custom-token', async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({ message: 'UID is required' });
    }

    try {
        const customToken = await auth.createCustomToken(uid);
        res.status(200).json({ token: customToken });
    } catch (error) {
        console.error('Custom token error:', error);
        res.status(400).json({ message: 'Failed to create custom token' });
    }
});

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if user exists
        await auth.getUserByEmail(email);

        // Generate OTP
        const otp = generateOTP();
        
        // Store OTP with expiration (5 minutes)
        otpStore.set(email, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        // Send OTP via email
        const transporter = require('../config/nodemailer');
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>You requested to reset your password. Use the OTP below to proceed:</p>
                    <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="color: #666;">This OTP will expire in 5 minutes.</p>
                    <p style="color: #666;">If you didn't request this, please ignore this email.</p>
                </div>
            `
        });

        res.status(200).json({ 
            message: 'OTP sent to your email successfully'
        });
    } catch (error) {
        console.error('Send OTP error:', error);
        if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        res.status(400).json({ message: 'Failed to send OTP' });
    }
});

// Verify OTP and reset password
router.post('/reset-password-with-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    try {
        // Check if OTP exists
        const storedData = otpStore.get(email);
        
        if (!storedData) {
            return res.status(400).json({ message: 'OTP not found or expired' });
        }

        // Check if OTP is expired
        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Verify OTP
        if (storedData.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Get user and update password
        const userRecord = await auth.getUserByEmail(email);
        await auth.updateUser(userRecord.uid, {
            password: newPassword
        });

        // Clear OTP after successful reset
        otpStore.delete(email);

        res.status(200).json({ 
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(400).json({ message: 'Failed to reset password' });
    }
});

// Send email verification link
router.post('/send-verification-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const link = await auth.generateEmailVerificationLink(email);
        res.status(200).json({ 
            message: 'Verification link generated',
            link // In production, send this via email instead of returning it
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(400).json({ message: 'Failed to generate verification link' });
    }
});

module.exports = router;
