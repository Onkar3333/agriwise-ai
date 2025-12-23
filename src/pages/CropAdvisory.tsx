import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Search, Droplets, Sun, Calendar, Sprout } from 'lucide-react';

type CropSeason = 'all' | 'kharif' | 'rabi' | 'summer';

interface Crop {
  id: string;
  name: { en: string; mr: string; hi: string };
  season: 'kharif' | 'rabi' | 'summer';
  sowingPeriod: string;
  harvestPeriod: string;
  soilType: string;
  waterNeeds: 'Low' | 'Medium' | 'High';
  yield: string;
  icon: string;
}

const cropsData: Crop[] = [
  {
    id: '1',
    name: { en: 'Rice (Paddy)', mr: 'भात (धान)', hi: 'चावल (धान)' },
    season: 'kharif',
    sowingPeriod: 'June - July',
    harvestPeriod: 'October - November',
    soilType: 'Clay Loam, Alluvial',
    waterNeeds: 'High',
    yield: '35-45 quintals/hectare',
    icon: '🌾',
  },
  {
    id: '2',
    name: { en: 'Soybean', mr: 'सोयाबीन', hi: 'सोयाबीन' },
    season: 'kharif',
    sowingPeriod: 'June - July',
    harvestPeriod: 'September - October',
    soilType: 'Black, Sandy Loam',
    waterNeeds: 'Medium',
    yield: '20-25 quintals/hectare',
    icon: '🫘',
  },
  {
    id: '3',
    name: { en: 'Cotton', mr: 'कापूस', hi: 'कपास' },
    season: 'kharif',
    sowingPeriod: 'May - June',
    harvestPeriod: 'October - December',
    soilType: 'Black Cotton Soil',
    waterNeeds: 'Medium',
    yield: '15-20 quintals/hectare',
    icon: '🌿',
  },
  {
    id: '4',
    name: { en: 'Wheat', mr: 'गहू', hi: 'गेहूं' },
    season: 'rabi',
    sowingPeriod: 'October - November',
    harvestPeriod: 'March - April',
    soilType: 'Loamy, Clay Loam',
    waterNeeds: 'Medium',
    yield: '40-50 quintals/hectare',
    icon: '🌾',
  },
  {
    id: '5',
    name: { en: 'Gram (Chickpea)', mr: 'हरभरा', hi: 'चना' },
    season: 'rabi',
    sowingPeriod: 'October - November',
    harvestPeriod: 'February - March',
    soilType: 'Sandy Loam, Clay',
    waterNeeds: 'Low',
    yield: '15-20 quintals/hectare',
    icon: '🫛',
  },
  {
    id: '6',
    name: { en: 'Onion', mr: 'कांदा', hi: 'प्याज' },
    season: 'rabi',
    sowingPeriod: 'November - December',
    harvestPeriod: 'April - May',
    soilType: 'Sandy Loam',
    waterNeeds: 'Medium',
    yield: '250-300 quintals/hectare',
    icon: '🧅',
  },
  {
    id: '7',
    name: { en: 'Groundnut', mr: 'भुईमूग', hi: 'मूंगफली' },
    season: 'summer',
    sowingPeriod: 'January - February',
    harvestPeriod: 'April - May',
    soilType: 'Sandy Loam, Red',
    waterNeeds: 'Medium',
    yield: '20-25 quintals/hectare',
    icon: '🥜',
  },
  {
    id: '8',
    name: { en: 'Watermelon', mr: 'कलिंगड', hi: 'तरबूज' },
    season: 'summer',
    sowingPeriod: 'January - February',
    harvestPeriod: 'April - May',
    soilType: 'Sandy, Well-drained',
    waterNeeds: 'High',
    yield: '300-400 quintals/hectare',
    icon: '🍉',
  },
];

export const CropAdvisory: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<CropSeason>('all');

  const seasons: { value: CropSeason; labelKey: string }[] = [
    { value: 'all', labelKey: 'crops.all' },
    { value: 'kharif', labelKey: 'crops.kharif' },
    { value: 'rabi', labelKey: 'crops.rabi' },
    { value: 'summer', labelKey: 'crops.summer' },
  ];

  const filteredCrops = cropsData.filter((crop) => {
    const matchesSeason = selectedSeason === 'all' || crop.season === selectedSeason;
    const matchesSearch = crop.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.name.en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  const waterNeedsColor = {
    Low: 'text-emerald-glow',
    Medium: 'text-accent',
    High: 'text-primary',
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header showBack />

      <main className="container px-4 py-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('crops.title')}
          </h1>
          <p className="text-muted-foreground">{t('crops.subtitle')}</p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('crops.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </motion.div>

        {/* Season Filter */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {seasons.map((season) => (
            <button
              key={season.value}
              onClick={() => setSelectedSeason(season.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedSeason === season.value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'glass text-foreground hover:bg-muted'
              }`}
            >
              {t(season.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              className="glass-card p-5 card-hover cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{crop.icon}</div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    {crop.name[language]}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    crop.season === 'kharif' ? 'bg-primary/10 text-primary' :
                    crop.season === 'rabi' ? 'bg-accent/10 text-accent' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {t(`crops.${crop.season}`)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <span className="text-muted-foreground">{t('crops.sowingPeriod')}:</span>
                    <span className="ml-2 text-foreground font-medium">{crop.sowingPeriod}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-accent" />
                  <div>
                    <span className="text-muted-foreground">{t('crops.harvestPeriod')}:</span>
                    <span className="ml-2 text-foreground font-medium">{crop.harvestPeriod}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sprout className="w-4 h-4 text-earth-warm" />
                  <div>
                    <span className="text-muted-foreground">{t('crops.soilType')}:</span>
                    <span className="ml-2 text-foreground font-medium">{crop.soilType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className={`w-4 h-4 ${waterNeedsColor[crop.waterNeeds]}`} />
                  <div>
                    <span className="text-muted-foreground">{t('crops.waterNeeds')}:</span>
                    <span className={`ml-2 font-medium ${waterNeedsColor[crop.waterNeeds]}`}>
                      {crop.waterNeeds}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">{t('crops.yield')}</div>
                <div className="text-sm font-semibold text-gradient">{crop.yield}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sprout className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No crops found matching your search.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CropAdvisory;
