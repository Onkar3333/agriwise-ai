import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Beaker, Bug, Leaf, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react';

type Category = 'fertilizer' | 'pesticide' | 'insecticide';

interface Recommendation {
  id: string;
  name: string;
  category: Category;
  dosage: string;
  mixing: string;
  usage: string;
  ecoAlternative?: {
    name: string;
    description: string;
  };
  warning?: string;
}

const recommendationsData: Recommendation[] = [
  {
    id: '1',
    name: 'Urea (46% N)',
    category: 'fertilizer',
    dosage: '100-150 kg/hectare',
    mixing: 'Apply directly to soil or mix with water (2-3%)',
    usage: 'Top dressing during vegetative growth stage',
    ecoAlternative: {
      name: 'Neem Cake',
      description: 'Natural nitrogen source, also acts as pest repellent',
    },
  },
  {
    id: '2',
    name: 'DAP (18-46-0)',
    category: 'fertilizer',
    dosage: '100-125 kg/hectare',
    mixing: 'Apply as basal dose during sowing',
    usage: 'Provides phosphorus and nitrogen for root development',
    ecoAlternative: {
      name: 'Bone Meal',
      description: 'Organic phosphorus source, slow-release',
    },
  },
  {
    id: '3',
    name: 'NPK 10-26-26',
    category: 'fertilizer',
    dosage: '150-200 kg/hectare',
    mixing: 'Mix with soil before transplanting',
    usage: 'Balanced nutrition for flowering and fruiting',
  },
  {
    id: '4',
    name: 'Mancozeb 75% WP',
    category: 'pesticide',
    dosage: '2.5 grams per liter of water',
    mixing: 'Dissolve powder in water, spray on leaves',
    usage: 'Controls fungal diseases like blight and rust',
    warning: 'Wear protective gear while spraying',
    ecoAlternative: {
      name: 'Trichoderma viride',
      description: 'Bio-fungicide, safe for environment',
    },
  },
  {
    id: '5',
    name: 'Carbendazim 50% WP',
    category: 'pesticide',
    dosage: '1 gram per liter of water',
    mixing: 'Mix with water and spray uniformly',
    usage: 'Systemic fungicide for wilt and rot',
    warning: 'Do not mix with alkaline pesticides',
    ecoAlternative: {
      name: 'Pseudomonas fluorescens',
      description: 'Bio-control agent for soil-borne diseases',
    },
  },
  {
    id: '6',
    name: 'Imidacloprid 17.8% SL',
    category: 'insecticide',
    dosage: '0.5 ml per liter of water',
    mixing: 'Dilute with water and spray on plants',
    usage: 'Controls aphids, whiteflies, and thrips',
    warning: 'Toxic to bees, apply in evening',
    ecoAlternative: {
      name: 'Neem Oil (Azadirachtin)',
      description: '5ml per liter, natural insect repellent',
    },
  },
  {
    id: '7',
    name: 'Chlorpyrifos 20% EC',
    category: 'insecticide',
    dosage: '2.5 ml per liter of water',
    mixing: 'Mix with water, spray on soil and plants',
    usage: 'Controls soil pests and borers',
    warning: 'Keep away from water bodies',
    ecoAlternative: {
      name: 'Beauveria bassiana',
      description: 'Bio-insecticide for soil pests',
    },
  },
];

export const Recommendations: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('fertilizer');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: { value: Category; icon: typeof Beaker; labelKey: string }[] = [
    { value: 'fertilizer', icon: Beaker, labelKey: 'recommendations.fertilizer' },
    { value: 'pesticide', icon: Bug, labelKey: 'recommendations.pesticide' },
    { value: 'insecticide', icon: Leaf, labelKey: 'recommendations.insecticide' },
  ];

  const filteredRecommendations = recommendationsData.filter(
    (rec) => rec.category === selectedCategory
  );

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
            {t('recommendations.title')}
          </h1>
          <p className="text-muted-foreground">{t('recommendations.subtitle')}</p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'glass text-foreground hover:bg-muted'
              }`}
            >
              <category.icon className="w-5 h-5" />
              {t(category.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Recommendations List */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {filteredRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    rec.category === 'fertilizer' ? 'bg-primary/10' :
                    rec.category === 'pesticide' ? 'bg-accent/10' :
                    'bg-earth-warm/10'
                  }`}>
                    {rec.category === 'fertilizer' ? (
                      <Beaker className="w-6 h-6 text-primary" />
                    ) : rec.category === 'pesticide' ? (
                      <Bug className="w-6 h-6 text-accent" />
                    ) : (
                      <Leaf className="w-6 h-6 text-earth-warm" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{rec.name}</h3>
                    <p className="text-sm text-muted-foreground">{rec.usage}</p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedId === rec.id ? 'rotate-90' : ''
                }`} />
              </button>

              {expandedId === rec.id && (
                <motion.div
                  className="px-5 pb-5 space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <div className="text-xs text-muted-foreground mb-1">
                        {t('recommendations.dosage')}
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {rec.dosage}
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <div className="text-xs text-muted-foreground mb-1">
                        {t('recommendations.mixing')}
                      </div>
                      <div className="text-sm text-foreground">
                        {rec.mixing}
                      </div>
                    </div>
                  </div>

                  {rec.warning && (
                    <div className="flex items-start gap-3 bg-destructive/10 rounded-xl p-4">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{rec.warning}</p>
                    </div>
                  )}

                  {rec.ecoAlternative && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary">
                          {t('recommendations.ecoFriendly')}
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground">
                        {rec.ecoAlternative.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {rec.ecoAlternative.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
