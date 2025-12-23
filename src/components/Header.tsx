import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { ArrowLeft, LogOut, Leaf, Menu } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  showBack?: boolean;
  showLogout?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, showLogout = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10"
      style={{
        background: 'linear-gradient(180deg, hsla(220, 25%, 10%, 0.95) 0%, hsla(220, 25%, 8%, 0.85) 100%)',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-16 sm:h-18 px-4">
        <div className="flex items-center gap-3">
          {showBack && location.pathname !== '/dashboard' && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gradient font-display">KrishiAI</span>
              <div className="text-[10px] text-muted-foreground -mt-1">Smart Farming</div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector variant="compact" />
          {showLogout && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-full bg-white/5 hover:bg-destructive/20 hover:text-destructive border border-white/10 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};
