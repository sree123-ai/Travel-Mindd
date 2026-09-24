import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Sparkles, 
  Globe2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { TripContext } from '../types/travel';
import { translations } from '../i18n/translations';

interface AuthModalProps {
  mode: 'login' | 'signup';
  tripContext: TripContext;
  onSuccess: (data: { name: string; email: string; mobile: string }) => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  tripContext,
  onSuccess,
  onSwitchMode
}) => {
  const [name, setName] = useState(tripContext.user_name || 'Travel Explorer');
  const [email, setEmail] = useState(tripContext.user_email || 'explorer@travelmind.ai');
  const [mobile, setMobile] = useState(tripContext.user_mobile || '+91 98765 43210');
  const [password, setPassword] = useState('Secret123!');
  const [confirmPassword, setConfirmPassword] = useState('Secret123!');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!email || !password) {
      setError("Please fill out all credentials.");
      return;
    }
    setError(null);
    onSuccess({ name, email, mobile });
  };

  return (
    <div className="w-full max-w-md mx-auto journal-panel p-6 sm:p-8 shadow-2xl border-[3.5px] border-[#7A421F]">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F28A20] to-[#E06D10] text-white flex items-center justify-center mx-auto mb-2.5 border-2 border-[#4A2412] shadow-md">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-[#4A2412] tracking-wide font-display">
          {mode === 'login' ? 'WELCOME TO TRAVELMIND AI' : 'CREATE YOUR TRAVEL ACCOUNT'}
        </h2>
        <p className="text-xs font-bold text-[#7A421F] mt-1">
          {mode === 'login' 
            ? 'Sign in to access personalized live travel intelligence'
            : 'Join to save custom questionnaires, itineraries and packing lists'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-black uppercase text-[#4A2412] mb-1">
              Your Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#7A421F]/70 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white border-2 border-[#7A421F] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
                placeholder="Travel Explorer"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-black uppercase text-[#4A2412] mb-1">
            Email or Mobile
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#7A421F]/70 absolute left-3 top-3" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border-2 border-[#7A421F] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
              placeholder="explorer@travelmind.ai"
            />
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-black uppercase text-[#4A2412] mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#7A421F]/70 absolute left-3 top-3" />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-white border-2 border-[#7A421F] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-black uppercase text-[#4A2412] mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#7A421F]/70 absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border-2 border-[#7A421F] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-black uppercase text-[#4A2412] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7A421F]/70 absolute left-3 top-3" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white border-2 border-[#7A421F] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-2.5 rounded-xl bg-red-100 border border-red-700 text-red-900 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-sm uppercase tracking-wider shadow-md hover:bg-[#de7b17] transition-all btn-3d mt-2"
        >
          {mode === 'login' ? 'LOGIN TO TRAVELMIND' : 'CREATE ACCOUNT & EXPLORE'}
        </button>
      </form>

      {/* Switcher & Forgot Password */}
      <div className="mt-5 pt-4 border-t border-[#7A421F]/30 flex flex-col items-center gap-2 text-xs font-bold text-[#7A421F]">
        {mode === 'login' ? (
          <>
            <button
              type="button"
              onClick={() => onSwitchMode('signup')}
              className="text-[#4A2412] hover:underline"
            >
              Don't have an account? <strong>Register / Create Account</strong>
            </button>
            <button
              type="button"
              onClick={() => alert("Password recovery instructions will be sent to your registered email.")}
              className="text-amber-800/80 hover:underline"
            >
              Forgot Password?
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => onSwitchMode('login')}
            className="text-[#4A2412] hover:underline"
          >
            Already have an account? <strong>Login here</strong>
          </button>
        )}
      </div>
    </div>
  );
};
