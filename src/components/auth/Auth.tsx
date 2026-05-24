import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  Chrome, 
  ShieldCheck, 
  ChevronLeft,
  Eye,
  EyeOff,
  Facebook,
  X
} from 'lucide-react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthProps {
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onSuccess: () => void;
  onBack: () => void;
}

export const Auth = ({ mode, onSwitchMode, onSuccess, onBack }: AuthProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const syncUserProfile = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Elite Member',
        role: 'user',
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await syncUserProfile(result.user);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await syncUserProfile(result.user);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      alert('Password reset link sent to ' + forgotEmail);
      setShowForgotModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName });
        
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: displayName,
          role: 'user',
          createdAt: new Date().toISOString()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-md w-full">
        <motion.button 
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Hyper
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-emerald-400 font-black italic text-xl">
                H
              </div>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                {mode === 'login' ? 'System Login' : 'Create Intelligence'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-black text-red-600 uppercase tracking-widest text-center">
                  System Alert: {error}
                </div>
              )}
              <AnimatePresence mode="wait">
                {mode === 'signup' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Identity</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="ALEX HYPER"
                        className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:bg-white focus:border-emerald-600 transition-all uppercase placeholder:text-gray-300"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Access</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ACCESS@HYPER.COM"
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:bg-white focus:border-emerald-600 transition-all uppercase placeholder:text-gray-300 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between px-1">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Secret Protocol</label>
                  {mode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => setShowForgotModal(true)}
                      className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold outline-none focus:bg-white focus:border-emerald-600 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-900"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase italic tracking-widest hover:bg-emerald-600 transition shadow-2xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {mode === 'login' ? 'Execute Login' : 'Initialize Account'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative mb-8 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative bg-white px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">External Credentials</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={handleGoogleAuth}
                  className="flex items-center justify-center gap-3 py-4 bg-slate-50 border border-gray-100 rounded-2xl hover:bg-slate-100 transition"
                >
                  <Chrome className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
                </button>
                <button 
                  type="button"
                  onClick={handleFacebookAuth}
                  className="flex items-center justify-center gap-3 py-4 bg-slate-50 border border-gray-100 rounded-2xl hover:bg-slate-100 transition"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Facebook</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showForgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl relative"
                  >
                    <button 
                      onClick={() => setShowForgotModal(false)}
                      className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Reset Protocol</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Enter your identity email to receive a recovery link.</p>
                    
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Access</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="email" 
                            required
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="ACCESS@HYPER.COM"
                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:border-emerald-600 transition-all uppercase placeholder:text-gray-300"
                          />
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase italic tracking-widest shadow-xl shadow-slate-200"
                      >
                        {isLoading ? 'Processing...' : 'Send Recovery Link'}
                      </button>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <div className="mt-10 pt-10 border-t border-gray-50 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                {mode === 'login' ? "Don't have an authentication point yet?" : "Already verified in our system?"}
              </p>
              <button 
                onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-sm font-black italic uppercase tracking-tighter text-emerald-600 hover:text-slate-900 transition-colors"
              >
                {mode === 'login' ? 'Initialize New Account' : 'Return to Login Terminal'}
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-emerald-600/50">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">End-to-End Encryption Protocol Active</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
