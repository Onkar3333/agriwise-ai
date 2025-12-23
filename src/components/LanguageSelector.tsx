import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳', name: 'Marathi' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳', name: 'Hindi' },
] as const;

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 glass rounded-full p-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              language === lang.code
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {lang.label}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-5 h-5 text-primary" />
        <span className="font-medium text-foreground">Language</span>
      </div>
      <div className="flex flex-col gap-2">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              language === lang.code
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            <span className="text-sm opacity-70">({lang.label})</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
