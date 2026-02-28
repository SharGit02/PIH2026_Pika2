import React, { useState } from 'react';
import { MessageSquare, Send, Search, ArrowLeft, Clock, MoreVertical, ShieldCheck, Hammer } from 'lucide-react';
import { useRental } from '../context/RentalContext.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';

export default function Messages() {
    const { messages } = useRental();
    const [activeChat, setActiveChat] = useState(messages[0] || null);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        // Mock sending message
        const msg = {
            id: Date.now(),
            text: newMessage,
            sentByMe: true,
            time: 'Just now'
        };

        setActiveChat(prev => ({
            ...prev,
            messages: [...prev.messages, msg]
        }));
        setNewMessage('');
    };

    return (
        <div className="pt-20 min-h-screen bg-white/40 dark:bg-transparent flex flex-col">
            <Container className="flex-1 flex gap-0 lg:gap-8 pb-10">
                {/* Chat Sidebar */}
                <aside className={`w-full lg:w-[380px] flex-col ${activeChat && 'hidden lg:flex'} flex`}>
                    <div className="py-8 space-y-8">
                        <div>
                            <h1 className="text-3xl font-black text-brand-dark dark:text-brand-frost tracking-tighter uppercase mb-2">Inbox</h1>
                            <p className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest">Connect with your community</p>
                        </div>

                        <div className="relative">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal/40" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-12 pr-4 py-4 rounded-3xl glass-card bg-white/50 dark:bg-brand-dark/20 border-none outline-none text-xs font-bold text-brand-dark dark:text-brand-frost placeholder:text-brand-teal/20"
                            />
                        </div>

                        <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2 scrollbar-hide">
                            {messages.map(chat => (
                                <button
                                    key={chat.id}
                                    onClick={() => setActiveChat(chat)}
                                    className={`w-full p-5 rounded-[2rem] flex gap-4 transition-all text-left group ${activeChat?.id === chat.id
                                        ? 'bg-brand-dark text-white dark:bg-brand-green dark:text-brand-dark shadow-2xl scale-[1.02]'
                                        : 'glass-card hover:bg-brand-teal/5'}`}
                                >
                                    <div className="relative shrink-0">
                                        <img src={chat.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover bg-white" />
                                        {chat.unreadCount > 0 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white dark:border-brand-dark flex items-center justify-center text-[8px] font-black text-white">
                                                {chat.unreadCount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-xs font-black uppercase tracking-tight truncate">{chat.withUser}</h4>
                                            <span className={`text-[8px] font-black uppercase ${activeChat?.id === chat.id ? 'opacity-60' : 'text-brand-teal/40'}`}>
                                                {chat.time}
                                            </span>
                                        </div>
                                        <p className={`text-[10px] font-bold line-clamp-1 truncate ${activeChat?.id === chat.id ? 'opacity-80' : 'text-brand-teal/60'}`}>
                                            {chat.lastMessage}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className={`flex-1 flex flex-col min-h-0 py-8 ${!activeChat && 'hidden lg:flex'}`}>
                    {activeChat ? (
                        <div className="flex-1 flex flex-col glass-card shadow-2xl border-brand-teal/5 bg-white/60 dark:bg-brand-dark/20 rounded-[3rem] overflow-hidden">
                            {/* Chat Header */}
                            <div className="px-8 py-6 border-b border-brand-teal/5 flex items-center justify-between bg-white/40 dark:bg-transparent backdrop-blur-md">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setActiveChat(null)} className="lg:hidden p-2 text-brand-teal">
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div className="w-10 h-10 rounded-2xl overflow-hidden glass-card">
                                        <img src={activeChat.avatar} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tight leading-none">{activeChat.withUser}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                                            <span className="text-[9px] font-bold text-brand-teal/60 uppercase">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="approved" className="!hidden xs:flex !text-[9px] px-2 py-1 uppercase font-black tracking-widest">Verified User</Badge>
                                    <button className="p-2 text-brand-teal hover:bg-brand-teal/5 rounded-xl"><MoreVertical size={20} /></button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-gradient-to-b from-brand-teal/[0.02] to-transparent">
                                {activeChat.messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sentByMe ? 'justify-end' : 'justify-start'} animate-fade-up`}>
                                        <div className={`max-w-[80%] sm:max-w-[60%] space-y-1 ${msg.sentByMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-5 px-6 rounded-[2rem] text-xs font-bold leading-relaxed shadow-sm ${msg.sentByMe
                                                    ? 'bg-brand-dark text-brand-frost dark:bg-brand-green dark:text-brand-dark rounded-tr-none'
                                                    : 'glass-card text-brand-dark dark:text-brand-frost rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <div className="text-[8px] font-black text-brand-teal/30 px-4 uppercase tracking-[0.1em]">{msg.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <div className="p-6 px-8 border-t border-brand-teal/5 bg-white/40 dark:bg-transparent backdrop-blur-md">
                                <form onSubmit={handleSend} className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-8 py-5 rounded-[2.5rem] glass-card bg-white/50 dark:bg-brand-dark/40 border-none outline-none text-xs font-black text-brand-dark dark:text-brand-frost placeholder:text-brand-teal/20 focus:ring-2 focus:ring-brand-green/30"
                                    />
                                    <Button type="submit" variant="primary" className="!rounded-[2.5rem] px-8 shadow-xl shadow-brand-green/20" disabled={!newMessage.trim()}>
                                        <Send size={18} />
                                    </Button>
                                </form>
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <ShieldCheck size={12} className="text-brand-green" />
                                    <span className="text-[9px] font-black text-brand-teal/30 uppercase tracking-[0.1em]">Encrypted Neighborhood Chat</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center glass-card bg-brand-teal/[0.02] border-brand-teal/5 rounded-[3rem] p-12 text-center">
                            <div className="w-24 h-24 rounded-[3rem] bg-brand-teal/5 flex items-center justify-center mb-8 border border-brand-teal/10 shadow-inner">
                                <MessageSquare size={40} className="text-brand-teal/40" />
                            </div>
                            <h3 className="text-2xl font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter mb-4">Your Inbox</h3>
                            <p className="text-xs font-bold text-brand-teal/60 max-w-sm uppercase tracking-tight leading-relaxed">
                                Select a conversation to start chatting with lenders or borrowers about upcoming rentals.
                            </p>
                        </div>
                    )}
                </main>
            </Container>
        </div>
    );
}
