import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
  gradient?: 'primary' | 'accent' | 'earth' | 'purple';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  delay = 0,
  gradient = 'primary',
}) => {
  const gradientStyles = {
    primary: {
      icon: 'from-primary/20 to-accent/10',
      glow: 'group-hover:shadow-glow',
      border: 'group-hover:border-primary/30',
      text: 'group-hover:text-primary',
      iconColor: 'text-primary',
    },
    accent: {
      icon: 'from-accent/20 to-primary/10',
      glow: 'group-hover:shadow-glow-accent',
      border: 'group-hover:border-accent/30',
      text: 'group-hover:text-accent',
      iconColor: 'text-accent',
    },
    earth: {
      icon: 'from-neon-orange/20 to-earth-warm/10',
      glow: 'group-hover:shadow-[0_0_40px_hsla(30,100%,55%,0.3)]',
      border: 'group-hover:border-neon-orange/30',
      text: 'group-hover:text-neon-orange',
      iconColor: 'text-neon-orange',
    },
    purple: {
      icon: 'from-secondary/20 to-neon-purple/10',
      glow: 'group-hover:shadow-glow-purple',
      border: 'group-hover:border-secondary/30',
      text: 'group-hover:text-secondary',
      iconColor: 'text-secondary',
    },
  };

  const style = gradientStyles[gradient];

  return (
    <motion.button
      onClick={onClick}
      className={`group relative glass-card w-full p-6 text-left overflow-hidden transition-all duration-500 ${style.glow} ${style.border}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <motion.div 
        className={`relative w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br ${style.icon} flex items-center justify-center border border-white/10`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className={`w-8 h-8 ${style.iconColor}`} />
      </motion.div>
      
      {/* Content */}
      <h3 className={`text-lg font-bold text-foreground mb-2 transition-colors duration-300 ${style.text}`}>
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      
      {/* Arrow indicator */}
      <div className={`flex items-center gap-2 text-sm font-semibold text-muted-foreground ${style.text} transition-colors duration-300`}>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          whileHover={{ x: 5 }}
          className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${
          gradient === 'primary' ? 'from-primary to-accent' :
          gradient === 'accent' ? 'from-accent to-primary' :
          gradient === 'earth' ? 'from-neon-orange to-earth-warm' :
          'from-secondary to-neon-purple'
        }`}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
};
