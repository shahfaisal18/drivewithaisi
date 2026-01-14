
import React, { useState } from 'react';
import { UserRole } from '../types';
import { SUPPORTED_COUNTRIES, BRAND_COLORS } from '../constants';

interface AuthScreenProps {
  onLogin: (phone: string, role: UserRole, country: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'welcome' | 'phone' | 'role'>('welcome');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(SUPPORTED_COUNTRIES[0].code);
  const [role, setRole] = useState<UserRole>('passenger');

  const countryData = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry)!;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-600/20 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="relative z-10 p-8 pt-20 flex flex-col items-center flex-1">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 mb-8 transform rotate-12">
           <svg className="w-10 h-10 text-white -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        
        <h1 className="text-4xl font-black tracking-tight mb-2">Drive with Faisi</h1>
        <p className="text-slate-400 text-center max-w-xs">The world's premium decentralized ride-hailing platform.</p>

        <div className="w-full max-w-sm mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          {step === 'welcome' && (
            <div className="space-y-6 text-center">
              <h2 className="text-xl font-bold">Select Your Region</h2>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {SUPPORTED_COUNTRIES.map(c => (
                  <button 
                    key={c.code}
                    onClick={() => { setSelectedCountry(c.code); setStep('phone'); }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-slate-500">{c.currency}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'phone' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Phone Number</label>
                <div className="flex bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition-colors">
                  <div className="px-4 py-4 bg-white/5 text-slate-300 border-r border-white/10 font-bold">+{countryData.code === 'US' ? '1' : '44'}</div>
                  <input 
                    type="tel"
                    placeholder="555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-4 outline-none font-medium"
                  />
                </div>
              </div>
              <button 
                onClick={() => setStep('role')}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
              >
                Verify via OTP
              </button>
            </div>
          )}

          {step === 'role' && (
            <div className="space-y-4">
               <h3 className="text-center font-bold mb-4">Choose your journey</h3>
               <div className="grid grid-cols-1 gap-3">
                 {['passenger', 'driver', 'admin'].map((r) => (
                   <button 
                    key={r}
                    onClick={() => setRole(r as UserRole)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${role === r ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/5'}`}
                   >
                     <p className="font-bold capitalize">{r}</p>
                     <p className="text-xs text-slate-400">
                       {r === 'passenger' && 'Bid for rides worldwide'}
                       {r === 'driver' && 'Accept offers and earn'}
                       {r === 'admin' && 'System monitoring'}
                     </p>
                   </button>
                 ))}
               </div>
               <button 
                onClick={() => onLogin(phone, role, selectedCountry)}
                className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20"
              >
                Launch App
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 text-center text-xs text-slate-600 font-medium">
        Drive with Faisi © 2025. All rights reserved. <br/> Built for Global Connectivity.
      </div>
    </div>
  );
};

export default AuthScreen;
