import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { cropsData } from '@/data/cropsData';
import { Droplets, Sun, Calendar, Sprout, FlaskConical, Bug, Waves, Lightbulb, ArrowLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CropDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const crop = cropsData.find(c => c.id === id);
  
  if (!crop) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Header showBack />
        <main className="relative z-10 container px-4 py-12 text-center">
          <h1 className="text-2xl text-foreground">Crop not found</h1>
          <button onClick={() => navigate('/crops')} className="mt-4 text-primary">
            Go back to crops
          </button>
        </main>
      </div>
    );
  }

  const waterNeedsColor = {
    Low: 'text-primary',
    Medium: 'text-accent',
    High: 'text-secondary',
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header showBack />

      <main className="relative z-10 container px-4 py-6 pb-20">
        {/* Hero Section */}
        <motion.div
          className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={crop.image} alt={crop.name.en} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur mb-3 ${
              crop.season === 'kharif' ? 'bg-primary/20 text-primary border border-primary/30' :
              crop.season === 'rabi' ? 'bg-accent/20 text-accent border border-accent/30' :
              'bg-secondary/20 text-secondary border border-secondary/30'
            }`}>
              {crop.season.charAt(0).toUpperCase() + crop.season.slice(1)} Season
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{crop.name[language]}</h1>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { icon: Calendar, label: 'Sowing', value: crop.sowingPeriod, color: 'text-primary' },
            { icon: Sun, label: 'Harvest', value: crop.harvestPeriod, color: 'text-accent' },
            { icon: Sprout, label: 'Soil', value: crop.soilType, color: 'text-primary' },
            { icon: Droplets, label: 'Water', value: crop.waterNeeds, color: waterNeedsColor[crop.waterNeeds] },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-sm font-semibold text-foreground truncate">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          className="glass-card p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-muted-foreground leading-relaxed">{crop.description[language]}</p>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">Expected Yield</div>
            <div className="text-lg font-bold text-gradient">{crop.yield}</div>
          </div>
        </motion.div>

        {/* Detailed Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="fertilizers" className="w-full">
            <TabsList className="w-full glass mb-4 p-1">
              <TabsTrigger value="fertilizers" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <FlaskConical className="w-4 h-4 mr-2" />
                Fertilizers
              </TabsTrigger>
              <TabsTrigger value="pests" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bug className="w-4 h-4 mr-2" />
                Pests
              </TabsTrigger>
              <TabsTrigger value="irrigation" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Waves className="w-4 h-4 mr-2" />
                Irrigation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fertilizers" className="space-y-4">
              {crop.fertilizers.map((fert, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{fert.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm">
                        <div><span className="text-muted-foreground">Timing:</span> <span className="text-foreground">{fert.timing}</span></div>
                        <div><span className="text-muted-foreground">Quantity:</span> <span className="text-primary font-medium">{fert.quantity}</span></div>
                        <div><span className="text-muted-foreground">Method:</span> <span className="text-foreground">{fert.method}</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="pests" className="space-y-4">
              {crop.pests.map((pest, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <Bug className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{pest.name}</h4>
                      <div className="space-y-2 mt-2 text-sm">
                        <div><span className="text-muted-foreground">Symptoms:</span> <span className="text-foreground">{pest.symptoms}</span></div>
                        <div><span className="text-muted-foreground">Control:</span> <span className="text-accent">{pest.control}</span></div>
                        <div><span className="text-muted-foreground">Prevention:</span> <span className="text-primary">{pest.prevention}</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="irrigation" className="space-y-4">
              {crop.irrigation.map((stage, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Waves className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm">
                        <div><span className="text-muted-foreground">Frequency:</span> <span className="text-foreground">{stage.frequency}</span></div>
                        <div><span className="text-muted-foreground">Method:</span> <span className="text-secondary">{stage.method}</span></div>
                        <div><span className="text-muted-foreground">Tips:</span> <span className="text-foreground">{stage.tips}</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Pro Tips */}
        <motion.div
          className="glass-card p-5 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
            <Lightbulb className="w-5 h-5 text-accent" />
            Pro Tips
          </h3>
          <ul className="space-y-3">
            {crop.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  );
};

export default CropDetail;
