import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, LogOut, Leaf } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  showBack?: boolean;
  showLogout?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, showLogout = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <motion.header
      className="sticky top-0 z-50 glass border-b border-border/50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          {showBack && location.pathname !== '/dashboard' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-gradient hidden sm:block">KrishiAI</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector variant="compact" />
          {showLogout && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};
