import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Input } from '@/components/ui/input';
import { Search, Droplets, Sun, Calendar, Sprout, ChevronRight } from 'lucide-react';
import { cropsData, CropSeason } from '@/data/cropsData';

export const CropAdvisory: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
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
              onClick={() => navigate(`/crops/${crop.id}`)}
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
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <h3 className="font-bold text-foreground text-xl drop-shadow-lg">
                    {crop.name[language]}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
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

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">{t('crops.yield')}</div>
                    <div className="text-sm font-bold text-gradient">{crop.yield}</div>
                  </div>
                  <span className="text-xs text-primary font-medium group-hover:underline">View Details →</span>
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
