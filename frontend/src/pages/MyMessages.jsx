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

        fetchMessages();
    }, [currentUser, navigate]);

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
        <div className="min-h-screen bg-primary relative overflow-hidden flex flex-col">
            <Navbar />
            
            <div className="flex-grow relative pt-28 pb-20">
                <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                                Your Messages
                            </h1>
                            <button
                                onClick={() => navigate('/')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-400 text-sm font-medium">{error}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-secondary/50 backdrop-blur-md p-12 rounded-2xl border border-white/10 text-center"
                            >
                                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">No messages yet</h3>
                                <p className="text-gray-500 mb-6">You haven't sent any messages yet.</p>
                                <button
                                    onClick={() => navigate('/#message-me')}
                                    className="bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
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
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-secondary/50 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-accent to-purple-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400">Sent by</p>
                                                    <p className="text-white font-medium">{msg.userName || 'You'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(msg.timestamp)}
                                                </p>
                                                <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                                                    msg.read 
                                                        ? 'bg-green-500/20 text-green-400' 
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {msg.read ? 'Read' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-primary/30 rounded-lg p-4 border border-white/5">
                                            <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
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
