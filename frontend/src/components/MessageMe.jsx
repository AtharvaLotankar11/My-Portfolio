import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MessageMe = () => {
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) {
            setError('Please enter a message');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const db = getFirestore();
            await addDoc(collection(db, 'messages'), {
                message: message.trim(),
                userId: currentUser.uid,
                userEmail: currentUser.email,
                userName: currentUser.displayName || 'Anonymous',
                timestamp: serverTimestamp(),
                read: false
            });

            setSuccess('Message sent successfully!');
            setMessage('');
            
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return null;
    }

    return (
        <section id="message-me" className="relative bg-secondary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="text-center mb-10">
                        <h2 className="display-type text-4xl sm:text-5xl md:text-6xl text-bone mb-3">
                            Send Me a Message
                        </h2>
                        <p className="text-bone/70 text-sm sm:text-base font-light">
                            Have a question or want to work together? Drop me a message!
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-primary p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl"
                    >
                        <AnimatePresence mode="wait">
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm"
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

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm"
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
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-bone/75 text-sm mb-2 font-light">
                                    Your Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="6"
                                    className="w-full bg-secondary/80 border border-white/15 rounded-xl px-4 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-blush focus:ring-1 focus:ring-blush transition-colors resize-none"
                                    placeholder="Type your message here..."
                                    disabled={loading}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full min-h-[44px] flex items-center justify-center rounded-full bg-blush text-primary font-medium py-3 px-6 hover:bg-blush-deep transition-all duration-300 disabled:opacity-50 text-sm sm:text-base cursor-pointer disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/10">
                            <div className="text-center sm:text-left text-sm text-bone/60">
                                Logged in as: <span className="text-blush font-normal">{currentUser.email}</span>
                            </div>
                            <Link 
                                to="/my-messages"
                                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-blush hover:text-bone transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                View Your Messages
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default MessageMe;
