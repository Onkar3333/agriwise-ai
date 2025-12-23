import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { DashboardCard } from '@/components/DashboardCard';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { 
  Sprout, 
  Search, 
  Beaker, 
  MapPin, 
  MessageCircle, 
  History,
  TrendingUp,
  Leaf,
  Zap
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const dashboardItems = [
    {
      icon: Sprout,
      titleKey: 'dashboard.cropAdvisory',
      descKey: 'dashboard.cropAdvisoryDesc',
      path: '/crops',
      gradient: 'primary' as const,
    },
    {
      icon: Search,
      titleKey: 'dashboard.diseaseDetection',
      descKey: 'dashboard.diseaseDetectionDesc',
      path: '/disease-detection',
      gradient: 'accent' as const,
    },
    {
      icon: Beaker,
      titleKey: 'dashboard.smartRecommendations',
      descKey: 'dashboard.smartRecommendationsDesc',
      path: '/recommendations',
      gradient: 'earth' as const,
    },
    {
      icon: MapPin,
      titleKey: 'dashboard.nearbyMarkets',
      descKey: 'dashboard.nearbyMarketsDesc',
      path: '/markets',
      gradient: 'purple' as const,
    },
    {
      icon: MessageCircle,
      titleKey: 'dashboard.farmerChat',
      descKey: 'dashboard.farmerChatDesc',
      path: '/chat',
      gradient: 'accent' as const,
    },
    {
      icon: History,
      titleKey: 'dashboard.history',
      descKey: 'dashboard.historyDesc',
      path: '/history',
      gradient: 'primary' as const,
    },
  ];

  const stats = [
    { label: 'Crops Tracked', value: '12', icon: Sprout, color: 'text-primary' },
    { label: 'Disease Scans', value: '28', icon: Search, color: 'text-accent' },
    { label: 'Saved Reports', value: '15', icon: History, color: 'text-neon-orange' },
    { label: 'Chat Messages', value: '142', icon: MessageCircle, color: 'text-secondary' },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="dashboard" />
      <Header showBack showLogout />

      <main className="relative z-10 container px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            AI-Powered Agriculture Platform
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-display">
            {t('dashboard.welcome')} <span className="inline-block animate-float">👋</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 sm:p-5 text-center group hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color} opacity-70`} />
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {dashboardItems.map((item, index) => (
            <DashboardCard
              key={item.path}
              icon={item.icon}
              title={t(item.titleKey)}
              description={t(item.descKey)}
              onClick={() => navigate(item.path)}
              delay={0.5 + index * 0.1}
              gradient={item.gradient}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Leaf className="w-4 h-4 text-primary" />
            <span>Empowering Maharashtra's farmers with AI technology</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
