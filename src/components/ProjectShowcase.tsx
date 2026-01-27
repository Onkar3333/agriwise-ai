import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

interface ProjectShowcaseProps {
  onCodeClick?: () => void;
  onLiveClick?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ 
  onCodeClick, 
  onLiveClick 
}) => {
  const techStack = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Recharts'
  ];

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground font-display tracking-wide">
              🌾 KRISHIAI
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
          AI-powered smart farming platform with crop advisory, disease detection, 
          market prices, weather insights, and multi-language support for Indian farmers.
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech, index) => (
            <motion.span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2 rounded-xl border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
            onClick={onCodeClick}
          >
            <Github className="w-4 h-4" />
            Code
          </Button>
          <Button
            className="flex-1 gap-2 rounded-xl bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
            onClick={onLiveClick}
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;
