import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Package, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Market {
  id: string;
  name: string;
  address: string;
  distance: string;
  timing: string;
  produce: string[];
  lat: number;
  lng: number;
}

const marketsData: Market[] = [
  {
    id: '1',
    name: 'Pune APMC Market',
    address: 'Gultekdi, Market Yard, Pune',
    distance: '3.2 km',
    timing: '5:00 AM - 10:00 PM',
    produce: ['Onion', 'Tomato', 'Potato', 'Cabbage', 'Cauliflower'],
    lat: 18.5074,
    lng: 73.8077,
  },
  {
    id: '2',
    name: 'Pimpri-Chinchwad Agricultural Market',
    address: 'Nigdi, PCMC Area',
    distance: '5.8 km',
    timing: '6:00 AM - 8:00 PM',
    produce: ['Grapes', 'Pomegranate', 'Banana', 'Mango'],
    lat: 18.6298,
    lng: 73.7997,
  },
  {
    id: '3',
    name: 'Khed Shivapur Subzi Mandi',
    address: 'Khed Shivapur, Near Bypass Road',
    distance: '8.1 km',
    timing: '4:00 AM - 12:00 PM',
    produce: ['Leafy Vegetables', 'Brinjal', 'Chili', 'Ginger'],
    lat: 18.4429,
    lng: 73.7689,
  },
  {
    id: '4',
    name: 'Hadapsar Wholesale Market',
    address: 'Hadapsar, Magarpatta Road',
    distance: '10.4 km',
    timing: '6:00 AM - 9:00 PM',
    produce: ['Pulses', 'Grains', 'Rice', 'Wheat', 'Vegetables'],
    lat: 18.5089,
    lng: 73.9260,
  },
];

export const NearbyMarkets: React.FC = () => {
  const { t } = useLanguage();
  const [isLocating, setIsLocating] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const requestLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationGranted(true);
          setIsLocating(false);
          toast.success('Location accessed successfully!');
        },
        (error) => {
          setIsLocating(false);
          toast.error('Unable to access location. Please enable location permissions.');
        }
      );
    } else {
      setIsLocating(false);
      toast.error('Geolocation is not supported by your browser.');
    }
  };

  const openNavigation = (market: Market) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    requestLocation();
  }, []);

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
            {t('markets.title')}
          </h1>
          <p className="text-muted-foreground">{t('markets.subtitle')}</p>
        </motion.div>

        {/* Location Status */}
        {!locationGranted && (
          <motion.div
            className="glass-card p-6 mb-6 text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              {isLocating ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <MapPin className="w-8 h-8 text-primary" />
              )}
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {isLocating ? 'Detecting Location...' : 'Enable Location'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We need your location to find nearby APMC markets
            </p>
            {!isLocating && (
              <Button variant="hero" onClick={requestLocation}>
                <MapPin className="w-5 h-5" />
                Allow Location Access
              </Button>
            )}
          </motion.div>
        )}

        {/* Map Placeholder */}
        <motion.div
          className="glass-card overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-48 sm:h-64 bg-muted/50 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
            <div className="text-center z-10">
              <MapPin className="w-12 h-12 mx-auto text-primary mb-2 animate-bounce" />
              <p className="text-sm text-muted-foreground">
                Interactive Map View
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (Connect Google Maps API for live map)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Markets List */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {marketsData.map((market, index) => (
            <motion.div
              key={market.id}
              className={`glass-card p-5 card-hover cursor-pointer ${
                selectedMarket?.id === market.id ? 'ring-2 ring-primary' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedMarket(market)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{market.name}</h3>
                      <p className="text-sm text-muted-foreground">{market.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="w-4 h-4 text-accent" />
                      <span className="text-foreground font-medium">{market.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{market.timing}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Package className="w-3.5 h-3.5" />
                      {t('markets.produce')}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {market.produce.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    openNavigation(market);
                  }}
                >
                  <Navigation className="w-4 h-4" />
                  {t('markets.route')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NearbyMarkets;
