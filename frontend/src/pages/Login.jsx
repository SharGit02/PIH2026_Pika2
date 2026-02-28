import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Shield, ArrowRight, MapPin } from 'lucide-react';
import { requestOtp, verifyOtp } from '../api/services.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

const STEPS = { MOBILE: 'MOBILE', OTP: 'OTP' };

export default function Login() {
    const [step, setStep] = useState(STEPS.MOBILE);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(mobile)) {
            setError('Enter a valid 10-digit mobile number');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await requestOtp(mobile);
            setStep(STEPS.OTP);
        } catch {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length < 4) {
            setError('Enter the OTP sent to your number');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await verifyOtp(mobile, otp);
            navigate('/dashboard');
        } catch {
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero-bg min-h-screen flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-10 animate-fade-up">
                    <div className="inline-flex items-center gap-2.5 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-dark dark:bg-brand-green flex items-center justify-center shadow-lg">
                            <MapPin size={24} className="text-brand-frost dark:text-brand-dark" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-brand-dark dark:text-brand-frost">
                            Renti<span className="text-brand-teal dark:text-brand-green">GO</span>
                        </span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-brand-dark dark:text-brand-frost mb-2">Welcome back</h1>
                    <p className="text-brand-teal dark:text-brand-aqua/80 text-sm font-bold tracking-wide uppercase">
                        {step === STEPS.MOBILE
                            ? 'Connect with your neighbours'
                            : `Enter the OTP sent to +91 ${mobile}`}
                    </p>
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                    {step === STEPS.MOBILE ? (
                        <form onSubmit={handleSendOtp} className="space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-[#000501] dark:text-[#ade1e5]">Mobile Number</label>
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#99d19c]/50 dark:border-[#79c7c5]/25 bg-white/70 dark:bg-[#000501]/60 focus-within:ring-2 focus-within:ring-[#79c7c5]/50 transition-all">
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#73ab84] dark:text-[#79c7c5] border-r border-[#99d19c]/30 dark:border-[#79c7c5]/15 pr-3 shrink-0">
                                        <Smartphone size={16} />
                                        +91
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="98765 43210"
                                        value={mobile}
                                        onChange={e => setMobile(e.target.value.replace(/\D/, '').slice(0, 10))}
                                        className="flex-1 bg-transparent text-sm font-semibold text-[#000501] dark:text-[#ade1e5] placeholder:text-[#73ab84]/50 dark:placeholder:text-[#79c7c5]/40 outline-none"
                                        maxLength={10}
                                        inputMode="numeric"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-xs text-red-500 font-semibold">{error}</p>
                            )}

                            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                                Send OTP <ArrowRight size={16} />
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-[#000501] dark:text-[#ade1e5]">Enter OTP</label>
                                <input
                                    type="text"
                                    placeholder="• • • • • •"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value.replace(/\D/, '').slice(0, 6))}
                                    className="w-full px-4 py-4 rounded-xl text-center text-2xl font-black tracking-[0.6em] border border-[#99d19c]/50 dark:border-[#79c7c5]/25 bg-white/70 dark:bg-[#000501]/60 text-[#000501] dark:text-[#ade1e5] outline-none focus:ring-2 focus:ring-[#79c7c5]/50 transition-all"
                                    maxLength={6}
                                    inputMode="numeric"
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-500 font-semibold text-center">{error}</p>
                            )}

                            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                                Verify & Login <Shield size={16} />
                            </Button>

                            <button
                                type="button"
                                onClick={() => { setStep(STEPS.MOBILE); setOtp(''); setError(''); }}
                                className="w-full text-center text-sm font-semibold text-[#73ab84] dark:text-[#79c7c5] hover:text-[#000501] dark:hover:text-[#ade1e5] transition-colors py-2"
                            >
                                ← Change number
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-[#73ab84] dark:text-[#79c7c5] mt-6 leading-relaxed">
                    By continuing, you agree to our{' '}
                    <a href="#" className="underline hover:text-[#000501] dark:hover:text-[#ade1e5] transition-colors">Terms</a>
                    {' & '}
                    <a href="#" className="underline hover:text-[#000501] dark:hover:text-[#ade1e5] transition-colors">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
