import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinOff, ArrowLeft, Search } from 'lucide-react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-32 animate-fade-in relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="max-w-xl mx-auto text-center space-y-10">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 rounded-[3.5rem] bg-brand-teal/5 dark:bg-brand-teal/10 flex items-center justify-center mx-auto border border-brand-teal/10 shadow-2xl animate-bounce-slow">
                            <MapPinOff size={48} className="text-brand-teal" />
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-brand-dark font-black text-xl shadow-xl rotate-12">
                            404
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-7xl font-black text-brand-dark dark:text-brand-frost tracking-tighter leading-none">
                            Lost in the <span className="text-brand-green">Neighborhood?</span>
                        </h1>
                        <p className="text-sm font-bold text-brand-teal/60 dark:text-brand-aqua/40 uppercase tracking-[0.15em] leading-relaxed max-w-md mx-auto">
                            The page you're looking for has moved to a different block or doesn't exist anymore. Let's get you back home.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/')}
                            className="!rounded-3xl shadow-2xl shadow-brand-green/20 px-10 py-8"
                        >
                            <ArrowLeft size={20} /> Back Home
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate('/browse')}
                            className="!rounded-3xl px-10 py-8"
                        >
                            <Search size={20} /> Browse Gear
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
