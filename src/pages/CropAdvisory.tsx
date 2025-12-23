import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Input } from '@/components/ui/input';
import { Search, Droplets, Sun, Calendar, Sprout } from 'lucide-react';

// Import crop images
import riceImg from '@/assets/crops/rice.jpg';
import soybeanImg from '@/assets/crops/soybean.jpg';
import cottonImg from '@/assets/crops/cotton.jpg';
import wheatImg from '@/assets/crops/wheat.jpg';
import chickpeaImg from '@/assets/crops/chickpea.jpg';
import onionImg from '@/assets/crops/onion.jpg';
import groundnutImg from '@/assets/crops/groundnut.jpg';
import watermelonImg from '@/assets/crops/watermelon.jpg';
import sugarcaneImg from '@/assets/crops/sugarcane.jpg';
import tomatoImg from '@/assets/crops/tomato.jpg';
import grapesImg from '@/assets/crops/grapes.jpg';
import pomegranateImg from '@/assets/crops/pomegranate.jpg';

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
  image: string;
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
    image: riceImg,
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
    image: soybeanImg,
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
    image: cottonImg,
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
    image: wheatImg,
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
    image: chickpeaImg,
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
    image: onionImg,
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
    image: groundnutImg,
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
    image: watermelonImg,
  },
  {
    id: '9',
    name: { en: 'Sugarcane', mr: 'ऊस', hi: 'गन्ना' },
    season: 'kharif',
    sowingPeriod: 'February - March',
    harvestPeriod: 'December - March',
    soilType: 'Deep Loam, Clay Loam',
    waterNeeds: 'High',
    yield: '800-1000 quintals/hectare',
    image: sugarcaneImg,
  },
  {
    id: '10',
    name: { en: 'Tomato', mr: 'टोमॅटो', hi: 'टमाटर' },
    season: 'rabi',
    sowingPeriod: 'September - October',
    harvestPeriod: 'January - March',
    soilType: 'Sandy Loam, Red',
    waterNeeds: 'Medium',
    yield: '250-350 quintals/hectare',
    image: tomatoImg,
  },
  {
    id: '11',
    name: { en: 'Grapes', mr: 'द्राक्षे', hi: 'अंगूर' },
    season: 'summer',
    sowingPeriod: 'January - February',
    harvestPeriod: 'March - May',
    soilType: 'Well-drained Sandy Loam',
    waterNeeds: 'Medium',
    yield: '200-300 quintals/hectare',
    image: grapesImg,
  },
  {
    id: '12',
    name: { en: 'Pomegranate', mr: 'डाळिंब', hi: 'अनार' },
    season: 'summer',
    sowingPeriod: 'June - July',
    harvestPeriod: 'January - February',
    soilType: 'Sandy Loam, Black',
    waterNeeds: 'Low',
    yield: '100-150 quintals/hectare',
    image: pomegranateImg,
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
    Low: 'text-primary',
    Medium: 'text-accent',
    High: 'text-secondary',
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header showBack />

      <main className="relative z-10 container px-4 py-6">
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
                  ? 'bg-primary text-primary-foreground shadow-md glow-primary'
                  : 'glass text-foreground hover:bg-muted'
              }`}
            >
              {t(season.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              className="glass-card overflow-hidden card-hover cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Crop Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={crop.image} 
                  alt={crop.name.en}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur ${
                  crop.season === 'kharif' ? 'bg-primary/20 text-primary border border-primary/30' :
                  crop.season === 'rabi' ? 'bg-accent/20 text-accent border border-accent/30' :
                  'bg-secondary/20 text-secondary border border-secondary/30'
                }`}>
                  {t(`crops.${crop.season}`)}
                </span>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-bold text-foreground text-xl drop-shadow-lg">
                    {crop.name[language]}
                  </h3>
                </div>
              </div>

              {/* Crop Details */}
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-muted-foreground text-xs block">{t('crops.sowingPeriod')}</span>
                      <span className="text-foreground font-medium">{crop.sowingPeriod}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-accent" />
                    <div>
                      <span className="text-muted-foreground text-xs block">{t('crops.harvestPeriod')}</span>
                      <span className="text-foreground font-medium">{crop.harvestPeriod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Sprout className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{t('crops.soilType')}:</span>
                  <span className="text-foreground font-medium">{crop.soilType}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Droplets className={`w-4 h-4 ${waterNeedsColor[crop.waterNeeds]}`} />
                  <span className="text-muted-foreground">{t('crops.waterNeeds')}:</span>
                  <span className={`font-semibold ${waterNeedsColor[crop.waterNeeds]}`}>
                    {crop.waterNeeds}
                  </span>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground">{t('crops.yield')}</div>
                  <div className="text-sm font-bold text-gradient">{crop.yield}</div>
                </div>
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
