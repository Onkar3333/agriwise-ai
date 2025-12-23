import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { DashboardCard } from '@/components/DashboardCard';
import { 
  Sprout, 
  Search, 
  Beaker, 
  MapPin, 
  MessageCircle, 
  History 
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
      gradient: 'primary' as const,
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
      gradient: 'earth' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header showBack showLogout />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <main className="relative container px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')} 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
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
              delay={index * 0.1}
              gradient={item.gradient}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            { label: 'Crops Tracked', value: '12' },
            { label: 'Disease Scans', value: '28' },
            { label: 'Saved Reports', value: '15' },
            { label: 'Chat Messages', value: '142' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center"
            >
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
