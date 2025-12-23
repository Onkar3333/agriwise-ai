import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Mail, Lock, User, Phone, Sprout, Shield, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

type AuthMode = 'login' | 'signup';
type Role = 'farmer' | 'admin';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<Role>('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="auth" />

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient font-display">KrishiAI</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <LanguageSelector variant="compact" />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Hero Logo */}
          <motion.div
            className="text-center mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow relative"
              animate={{ 
                boxShadow: [
                  "0 0 40px hsla(155, 80%, 50%, 0.4)",
                  "0 0 60px hsla(155, 80%, 50%, 0.6)",
                  "0 0 40px hsla(155, 80%, 50%, 0.4)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Leaf className="w-12 h-12 text-primary-foreground" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-accent" />
              </motion.div>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-3 font-display glow-text">
              {t('auth.welcome')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('auth.subtitle')}
            </p>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            className="glass-card p-6 sm:p-8"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1.5 bg-muted/50 rounded-xl mb-8 backdrop-blur-sm">
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                    mode === m
                      ? 'bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(`auth.${m}`)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: mode === 'login' ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 30 : -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {mode === 'signup' && (
                  <>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="text"
                        placeholder={t('auth.name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12 h-14 bg-muted/50 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="tel"
                        placeholder={t('auth.phone')}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-12 h-14 bg-muted/50 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-muted/50 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 bg-muted/50 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      {t('auth.role')}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {([
                        { value: 'farmer', icon: Sprout, label: t('auth.farmer') },
                        { value: 'admin', icon: Shield, label: t('auth.admin') },
                      ] as const).map((r) => (
                        <motion.button
                          key={r.value}
                          type="button"
                          onClick={() => setRole(r.value)}
                          className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                            role === r.value
                              ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                              : 'border-white/10 text-muted-foreground hover:border-white/20 hover:bg-white/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <r.icon className="w-5 h-5" />
                          <span className="font-semibold">{r.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full mt-8 h-14 text-base font-bold"
                >
                  {mode === 'login' ? t('auth.loginBtn') : t('auth.signupBtn')}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-primary font-bold hover:underline hover:text-accent transition-colors"
                  >
                    {mode === 'login' ? t('auth.signup') : t('auth.login')}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            className="mt-8 flex justify-center gap-6 text-muted-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-xs">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Sprout className="w-4 h-4" />
              <span>For Farmers</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Auth;
