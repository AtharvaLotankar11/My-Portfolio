import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Redirect if already logged in
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess('Login successful! Redirecting...');
            
            // Redirect after showing success message
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            let errorMessage = 'Failed to login. Please try again.';
            
            // Provide user-friendly error messages
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password. Please check your credentials.';
            } else if (err.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address.';
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            } else if (err.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setSuccess('Login successful! Redirecting...');
            
            // Redirect after showing success message
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            let errorMessage = 'Failed to login with Google.';
            
            if (err.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Login cancelled. Please try again.';
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
                        Welcome Back
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

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-bone/75 text-sm mb-2 font-light">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-bone/75 text-sm mb-2 font-light">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-primary/80 border border-white/15 rounded-xl px-4 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors min-h-[44px]"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link to="/otp" className="text-sm text-blush hover:text-bone transition-colors inline-flex items-center min-h-[44px]">
                                Forgot Password?
                            </Link>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="w-full min-h-[44px] flex items-center justify-center rounded-full bg-blush text-primary font-medium py-3 px-6 hover:bg-blush-deep transition-all duration-300 disabled:opacity-50 text-base cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </motion.button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-wider">
                                <span className="px-3 bg-secondary text-bone/50">Or continue with</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="mt-5 w-full min-h-[44px] bg-bone text-primary font-medium py-3 px-6 rounded-full shadow-md hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm sm:text-base cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            {loading ? 'Signing in...' : 'Sign in with Google'}
                        </motion.button>
                    </div>

                    <div className="mt-8 text-center text-bone/60 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blush hover:text-bone font-normal transition-colors inline-flex items-center min-h-[44px]">
                            Create An Account
                        </Link>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
