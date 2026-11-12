import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyMessages = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchMessages = async () => {
            try {
                const db = getFirestore();
                const messagesRef = collection(db, 'messages');
                
                // Try with orderBy first (requires index)
                try {
                    const q = query(
                        messagesRef,
                        where('userId', '==', currentUser.uid),
                        orderBy('timestamp', 'desc')
                    );
                    
                    const querySnapshot = await getDocs(q);
                    const fetchedMessages = [];
                    
                    querySnapshot.forEach((doc) => {
                        fetchedMessages.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    
                    setMessages(fetchedMessages);
                } catch (indexErr) {
                    // If index error, fall back to query without orderBy and sort client-side
                    console.warn('Index not found, using client-side sorting:', indexErr);
                    
                    const q = query(
                        messagesRef,
                        where('userId', '==', currentUser.uid)
                    );
                    
                    const querySnapshot = await getDocs(q);
                    const fetchedMessages = [];
                    
                    querySnapshot.forEach((doc) => {
                        fetchedMessages.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    
                    // Sort client-side by timestamp
                    fetchedMessages.sort((a, b) => {
                        if (!a.timestamp) return 1;
                        if (!b.timestamp) return -1;
                        return b.timestamp.toMillis() - a.timestamp.toMillis();
                    });
                    
                    setMessages(fetchedMessages);
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Failed to load messages. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [currentUser, navigate]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Just now';
        
        const date = timestamp.toDate();
        const now = new Date();
        const diffInMs = now - date;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div className="min-h-screen bg-primary text-bone relative overflow-hidden flex flex-col">
            <Navbar />
            
            <div className="flex-grow relative pt-28 pb-20">
                <div className="absolute top-[-15%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-15%] right-[-10%] w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="display-type text-3xl sm:text-4xl text-bone tracking-wide">
                                Your Messages
                            </h1>
                            <button
                                onClick={() => navigate('/')}
                                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-white/10 text-bone/60 hover:text-blush hover:border-blush transition-colors"
                                aria-label="Back to home"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-rose-300 text-sm font-medium">{error}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blush"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-secondary/80 backdrop-blur-md p-10 sm:p-14 rounded-2xl border border-white/10 text-center"
                            >
                                <svg className="w-16 h-16 text-bone/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <h3 className="text-xl font-medium text-bone/80 mb-2">No messages yet</h3>
                                <p className="text-bone/50 mb-6 font-light">You haven't sent any messages yet.</p>
                                <button
                                    onClick={() => navigate('/#message-me')}
                                    className="min-h-[44px] inline-flex items-center justify-center rounded-full bg-blush text-primary font-medium px-6 py-2.5 hover:bg-blush-deep transition-all"
                                >
                                    Send Your First Message
                                </button>
                            </motion.div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-secondary/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blush/40 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blush text-primary rounded-full flex items-center justify-center shrink-0 font-medium">
                                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-bone/50">Sent by</p>
                                                    <p className="text-bone font-medium">{msg.userName || 'You'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-bone/50">
                                                    {formatDate(msg.timestamp)}
                                                </p>
                                                <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs rounded-full ${
                                                    msg.read 
                                                        ? 'bg-emerald-500/20 text-emerald-300' 
                                                        : 'bg-amber-500/20 text-amber-300'
                                                }`}>
                                                    {msg.read ? 'Read' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-primary/60 rounded-xl p-4 border border-white/5">
                                            <p className="text-bone/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default MyMessages;
