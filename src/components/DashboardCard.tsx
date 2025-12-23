import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
  gradient?: 'primary' | 'accent' | 'earth';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  delay = 0,
  gradient = 'primary',
}) => {
  const gradientClasses = {
    primary: 'from-primary/15 to-accent/10',
    accent: 'from-accent/15 to-primary/10',
    earth: 'from-secondary/30 to-primary/10',
  };

  return (
    <motion.button
      onClick={onClick}
      className="feature-card w-full text-left group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`icon-container w-16 h-16 mb-4 bg-gradient-to-br ${gradientClasses[gradient]} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <motion.div 
        className="mt-4 h-1 bg-gradient-to-r from-primary to-accent rounded-full origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
