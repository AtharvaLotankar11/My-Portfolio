import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        captchaInput: ''
    });
    const [captcha, setCaptcha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
        generateCaptcha();
        // Redirect if already logged in
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const generateCaptcha = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(result);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (calculateAge(formData.dob) < 15) {
            setError('You must be at least 15 years old to connect.');
            return;
        }

        if (formData.captchaInput !== captcha) {
            setError('Incorrect Captcha. Please try again.');
            generateCaptcha();
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            
            // Update profile with display name
            await updateProfile(userCredential.user, {
                displayName: formData.name
            });

            // Send email verification
            await sendEmailVerification(userCredential.user);

            setSuccess('Registration successful! Please check your email for verification.');
            
            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            let errorMessage = 'Failed to register. Please try again.';
            
            // Provide user-friendly error messages
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please login instead.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address format.';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Use at least 6 characters.';
            } else if (err.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary relative overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center relative py-20 pt-28">
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-secondary/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md z-10"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                        Create Account
                    </h2>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-red-400 text-sm font-medium">{error}</p>
                                </div>
                            </motion.div>
                        )}
                        
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-green-400 text-sm font-medium">{success}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Date of Birth</label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Captcha</label>
                            <div className="flex gap-4 mb-2">
                                <div className="bg-white/10 px-4 py-2 rounded select-none font-mono text-xl tracking-widest text-accent line-through decoration-white/50">
                                    {captcha}
                                </div>
                                <button
                                    type="button"
                                    onClick={generateCaptcha}
                                    className="text-xs text-gray-400 hover:text-white"
                                >
                                    Refresh
                                </button>
                            </div>
                            <input
                                type="text"
                                value={formData.captchaInput}
                                onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
                                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="Enter Captcha"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-accent/20 transition-all mt-4 disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent hover:text-accent-glow font-medium transition-colors">
                            Login
                        </Link>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
