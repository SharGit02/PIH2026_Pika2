import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, CheckCircle2, Clock, Info, ShieldCheck,
    ChevronRight, ArrowLeft, Trash2, Settings, MessageSquare
} from 'lucide-react';
import { useRental } from '../context/RentalContext.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import { EmptyState } from '../components/items/ItemStates.jsx';

const TYPE_CONFIG = {
    success: { icon: CheckCircle2, color: 'text-brand-green', bg: 'bg-brand-green/10' },
    info: { icon: Info, color: 'text-brand-teal', bg: 'bg-brand-teal/10' },
    warning: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

export default function Notifications() {
    const navigate = useNavigate();
    const { notifications, markNotificationRead } = useRental();

    return (
        <div className="pt-28 pb-32 animate-fade-in min-h-screen bg-white/40 dark:bg-transparent">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-up">
                        <div className="space-y-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal hover:text-brand-dark dark:text-brand-aqua dark:hover:text-brand-frost transition-all group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </button>
                            <h1 className="text-4xl sm:text-6xl font-black text-brand-dark dark:text-brand-frost tracking-tighter leading-none">
                                Activity Feed
                            </h1>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="ghost" size="sm" className="!rounded-2xl !text-[11px] font-black uppercase tracking-widest">
                                <ShieldCheck size={16} /> Mark all Read
                            </Button>
                            <Button variant="outline" size="sm" className="!rounded-2xl">
                                <Settings size={18} />
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    {notifications.length === 0 ? (
                        <EmptyState
                            icon={Bell}
                            title="All caught up!"
                            description="No new alerts right now. We'll let you know when there's an update on your rentals or messages."
                            action={
                                <Button variant="primary" onClick={() => navigate('/browse')}>
                                    Keep Exploring
                                </Button>
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((notif, i) => {
                                const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info;
                                const Icon = config.icon;

                                return (
                                    <Card
                                        key={notif.id}
                                        variant="glass"
                                        className={`!p-6 group relative overflow-hidden transition-all duration-500 hover:scale-[1.01] animate-fade-up ${!notif.read ? 'border-l-4 border-l-brand-green bg-brand-green/[0.02]' : 'opacity-80'}`}
                                        style={{ animationDelay: `${i * 100}ms` }}
                                        onClick={() => markNotificationRead(notif.id)}
                                    >
                                        <div className="flex items-start gap-6 relative z-10">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform ${config.bg} ${config.color}`}>
                                                <Icon size={24} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Badge variant={notif.type} className="!text-[9px] px-2 py-0.5 uppercase font-black tracking-widest">{notif.type}</Badge>
                                                    <span className="text-[10px] font-black text-brand-teal/30 uppercase tracking-widest">{notif.time}</span>
                                                </div>
                                                <p className="text-sm font-black text-brand-dark dark:text-brand-frost tracking-tight leading-relaxed uppercase">
                                                    {notif.message}
                                                </p>

                                                {!notif.read && (
                                                    <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-brand-green uppercase tracking-[0.15em]">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                                                        New Activity
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <button className="p-2 text-brand-teal/20 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                                <ChevronRight size={24} className="text-brand-teal/10 group-hover:text-brand-teal/30 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {/* Footer Hint */}
                    <div className="mt-16 p-8 rounded-[3rem] bg-brand-teal/5 border border-brand-teal/10 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">Missed a message?</h4>
                                <p className="text-[10px] font-bold text-brand-teal/60 uppercase tracking-widest">Check your neighborhood chat inbox</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate('/messages')} className="!rounded-2xl">
                            Open Chat <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
