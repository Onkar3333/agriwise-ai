import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Mail, Lock, User, Phone, Sprout, Shield } from 'lucide-react';
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
    // Simulate auth - in real app, connect to backend
    toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex justify-end">
        <LanguageSelector variant="compact" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              {t('auth.welcome')}
            </h1>
            <p className="text-muted-foreground">
              {t('auth.subtitle')}
            </p>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            className="glass-card p-6 sm:p-8"
            layout
          >
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 bg-muted/50 rounded-xl mb-6">
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mode === m
                      ? 'bg-primary text-primary-foreground shadow-md'
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
                initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {mode === 'signup' && (
                  <>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder={t('auth.name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder={t('auth.phone')}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-12"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12"
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('auth.role')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {([
                        { value: 'farmer', icon: Sprout, label: t('auth.farmer') },
                        { value: 'admin', icon: Shield, label: t('auth.admin') },
                      ] as const).map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setRole(r.value)}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                            role === r.value
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border text-muted-foreground hover:border-primary/30'
                          }`}
                        >
                          <r.icon className="w-5 h-5" />
                          <span className="font-medium">{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
                  {mode === 'login' ? t('auth.loginBtn') : t('auth.signupBtn')}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-primary font-semibold hover:underline"
                  >
                    {mode === 'login' ? t('auth.signup') : t('auth.login')}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Auth;
