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
        <div className="min-h-screen bg-primary text-bone relative overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center relative py-20 pt-28 px-4">
                <div className="absolute top-[-15%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-15%] left-[-10%] w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-secondary/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md z-10"
                >
                    <h2 className="display-type text-3xl sm:text-4xl text-center mb-8 text-bone tracking-wide">
                        Create Account
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
                        
                        {success && (
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
                                    <p className="text-emerald-300 text-sm font-medium">{success}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-bone/75 text-sm mb-1 font-light">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-2.5 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-bone/75 text-sm mb-1 font-light">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-2.5 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-bone/75 text-sm mb-1 font-light">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-2.5 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-bone/75 text-sm mb-1 font-light">Date of Birth</label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-2.5 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-bone/75 text-sm mb-1 font-light">Captcha</label>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl select-none font-mono text-xl tracking-widest text-blush line-through decoration-white/40 min-h-[44px] flex items-center">
                                    {captcha}
                                </div>
                                <button
                                    type="button"
                                    onClick={generateCaptcha}
                                    className="text-xs text-bone/60 hover:text-blush transition-colors min-h-[44px] inline-flex items-center"
                                >
                                    Refresh
                                </button>
                            </div>
                            <input
                                type="text"
                                value={formData.captchaInput}
                                onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-2.5 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                placeholder="Enter Captcha"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="w-full min-h-[44px] flex items-center justify-center rounded-full bg-blush text-primary font-medium py-3 px-6 hover:bg-blush-deep transition-all duration-300 disabled:opacity-50 text-base cursor-pointer disabled:cursor-not-allowed mt-5"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-bone/60 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blush hover:text-bone font-normal transition-colors inline-flex items-center min-h-[44px]">
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
