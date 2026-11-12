import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OtpPassword = () => {
    const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP and new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send OTP');
            }

            setMessage('OTP sent to your email! Check your inbox.');
            setStep(2);
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/reset-password-with-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    otp, 
                    newPassword 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            setMessage('Password reset successfully! Redirecting to login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary text-bone relative overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center relative pt-24 pb-16 px-4">
                <div className="absolute top-[-15%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-15%] right-[-10%] w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-secondary/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md z-10"
                >
                    <h2 className="display-type text-3xl sm:text-4xl text-center mb-8 text-bone tracking-wide">
                        Reset Password
                    </h2>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-5 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-rose-300 text-sm font-medium">{error}</p>
                                </div>
                            </motion.div>
                        )}
                        
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-emerald-300 text-sm font-medium">{message}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} className="space-y-5">
                            <div>
                                <label className="block text-bone/75 text-sm mb-2 font-light">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                    placeholder="Enter your email"
                                    disabled={loading}
                                    required
                                />
                                <p className="text-xs text-bone/50 mt-2 font-light">
                                    We'll send you an OTP to reset your password.
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full min-h-[44px] flex items-center justify-center rounded-full bg-blush text-primary font-medium py-3 px-6 hover:bg-blush-deep transition-all duration-300 disabled:opacity-50 text-base cursor-pointer disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </motion.button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div>
                                <label className="block text-bone/75 text-sm mb-2 font-light">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="w-full bg-primary/40 border border-white/10 rounded-xl px-4 py-3 text-bone/50 cursor-not-allowed min-h-[44px]"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-bone/75 text-sm mb-2 font-light">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-3 text-blush focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors text-center text-2xl tracking-[0.4em] font-mono min-h-[44px]"
                                    placeholder="000000"
                                    maxLength="6"
                                    disabled={loading}
                                    required
                                />
                                <p className="text-xs text-bone/50 mt-2 font-light">
                                    Check your email for the 6-digit OTP code.
                                </p>
                            </div>
                            <div>
                                <label className="block text-bone/75 text-sm mb-2 font-light">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                    placeholder="Enter new password"
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-bone/75 text-sm mb-2 font-light">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                    placeholder="Confirm new password"
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full min-h-[44px] flex items-center justify-center rounded-full bg-blush text-primary font-medium py-3 px-6 hover:bg-blush-deep transition-all duration-300 disabled:opacity-50 text-base cursor-pointer disabled:cursor-not-allowed"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </motion.button>
                            <button
                                type="button"
                                onClick={() => {
                                    setStep(1);
                                    setOtp('');
                                    setNewPassword('');
                                    setConfirmPassword('');
                                    setError('');
                                    setMessage('');
                                }}
                                className="w-full min-h-[44px] inline-flex items-center justify-center text-sm text-bone/60 hover:text-blush transition-colors cursor-pointer"
                                disabled={loading}
                            >
                                Resend OTP
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <Link to="/login" className="text-sm text-blush hover:text-bone transition-colors inline-flex items-center min-h-[44px]">
                            Back to Login
                        </Link>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default OtpPassword;
