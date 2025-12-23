import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Thermometer,
  MapPin,
  RefreshCw,
  CloudFog
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  location: string;
  feelsLike: number;
  precipitation: number;
}

const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes
  if (code === 0) return Sun; // Clear sky
  if (code >= 1 && code <= 3) return Cloud; // Partly cloudy
  if (code >= 45 && code <= 48) return CloudFog; // Fog
  if (code >= 51 && code <= 67) return CloudRain; // Drizzle/Rain
  if (code >= 71 && code <= 77) return CloudSnow; // Snow
  if (code >= 80 && code <= 82) return CloudRain; // Rain showers
  if (code >= 95 && code <= 99) return CloudLightning; // Thunderstorm
  return Sun;
};

const getWeatherDescription = (code: number, lang: string): string => {
  const descriptions: Record<number, Record<string, string>> = {
    0: { en: 'Clear Sky', mr: 'स्वच्छ आकाश', hi: 'साफ आसमान' },
    1: { en: 'Mainly Clear', mr: 'मुख्यतः स्वच्छ', hi: 'मुख्य रूप से साफ' },
    2: { en: 'Partly Cloudy', mr: 'अंशतः ढगाळ', hi: 'आंशिक बादल' },
    3: { en: 'Overcast', mr: 'पूर्ण ढगाळ', hi: 'घने बादल' },
    45: { en: 'Foggy', mr: 'धुके', hi: 'कोहरा' },
    51: { en: 'Light Drizzle', mr: 'हलकी रिमझिम', hi: 'हल्की बूंदाबांदी' },
    61: { en: 'Light Rain', mr: 'हलका पाऊस', hi: 'हल्की बारिश' },
    63: { en: 'Moderate Rain', mr: 'मध्यम पाऊस', hi: 'मध्यम बारिश' },
    65: { en: 'Heavy Rain', mr: 'जोरदार पाऊस', hi: 'भारी बारिश' },
    80: { en: 'Rain Showers', mr: 'पावसाच्या सरी', hi: 'बारिश की बौछारें' },
    95: { en: 'Thunderstorm', mr: 'वादळी वारा', hi: 'गरज के साथ तूफान' },
  };
  
  const closest = Object.keys(descriptions)
    .map(Number)
    .reduce((prev, curr) => Math.abs(curr - code) < Math.abs(prev - code) ? curr : prev);
  
  return descriptions[closest]?.[lang] || descriptions[closest]?.en || 'Unknown';
};

export const WeatherWidget: React.FC = () => {
  const { language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch weather from Open-Meteo (free, no API key needed)
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );
      
      if (!weatherResponse.ok) throw new Error('Weather fetch failed');
      
      const weatherData = await weatherResponse.json();
      
      // Reverse geocode for location name
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      
      let locationName = 'Your Location';
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        locationName = geoData.address?.city || 
                      geoData.address?.town || 
                      geoData.address?.village || 
                      geoData.address?.district ||
                      'Maharashtra';
      }
      
      setWeather({
        temperature: Math.round(weatherData.current.temperature_2m),
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        weatherCode: weatherData.current.weather_code,
        location: locationName,
        feelsLike: Math.round(weatherData.current.apparent_temperature),
        precipitation: weatherData.current.precipitation,
      });
    } catch (err) {
      console.error('Weather error:', err);
      setError('Unable to fetch weather');
      // Set fallback data for demo
      setWeather({
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        weatherCode: 2,
        location: 'Pune, Maharashtra',
        feelsLike: 30,
        precipitation: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          // Default to Pune, Maharashtra if location denied
          fetchWeather(18.5204, 73.8567);
        },
        { timeout: 10000 }
      );
    } else {
      // Default location
      fetchWeather(18.5204, 73.8567);
    }
  }, []);

  const handleRefresh = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeather(18.5204, 73.8567);
        }
      );
    }
  };

  const WeatherIcon = weather ? getWeatherIcon(weather.weatherCode) : Sun;

  return (
    <motion.div
      className="relative glass-card p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(175, 90%, 50%, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(155, 80%, 50%, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-accent/20">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {weather?.location || 'Loading...'}
            </span>
          </div>
          <motion.button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {loading && !weather ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-32"
            >
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </motion.div>
          ) : weather ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Main weather display */}
              <div className="flex items-center gap-6 mb-6">
                {/* Weather Icon with animation */}
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/20">
                    <WeatherIcon className="w-12 h-12 text-accent" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl -z-10" />
                </motion.div>

                {/* Temperature */}
                <div>
                  <motion.div
                    className="text-5xl font-bold text-foreground font-display"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {weather.temperature}
                    <span className="text-2xl text-muted-foreground ml-1">°C</span>
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {getWeatherDescription(weather.weatherCode, language)}
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-0.5">
                    Feels like {weather.feelsLike}°C
                  </div>
                </div>
              </div>

              {/* Weather details grid */}
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-center"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Droplets className="w-4 h-4 text-accent mx-auto mb-1" />
                  <div className="text-lg font-semibold text-foreground">{weather.humidity}%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </motion.div>

                <motion.div
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-center"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Wind className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-lg font-semibold text-foreground">{weather.windSpeed}</div>
                  <div className="text-xs text-muted-foreground">km/h</div>
                </motion.div>

                <motion.div
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-center"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <CloudRain className="w-4 h-4 text-secondary mx-auto mb-1" />
                  <div className="text-lg font-semibold text-foreground">{weather.precipitation}</div>
                  <div className="text-xs text-muted-foreground">mm</div>
                </motion.div>
              </div>

              {/* Farming tip based on weather */}
              <motion.div
                className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-2">
                  <Thermometer className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {weather.weatherCode >= 51 && weather.weatherCode <= 82
                      ? language === 'mr' 
                        ? 'पावसामुळे आज सिंचन टाळा. फवारणीसाठी पाऊस थांबेपर्यंत प्रतीक्षा करा.'
                        : language === 'hi'
                        ? 'बारिश के कारण आज सिंचाई से बचें। छिड़काव के लिए बारिश रुकने तक प्रतीक्षा करें।'
                        : 'Skip irrigation today due to rain. Wait for rain to stop before spraying pesticides.'
                      : weather.temperature > 35
                      ? language === 'mr'
                        ? 'उच्च तापमान - सकाळी लवकर किंवा संध्याकाळी उशिरा सिंचन करा.'
                        : language === 'hi'
                        ? 'उच्च तापमान - सुबह जल्दी या शाम को देर से सिंचाई करें।'
                        : 'High temperature - irrigate early morning or late evening for best results.'
                      : language === 'mr'
                      ? 'आज शेतीच्या कामासाठी चांगला दिवस आहे!'
                      : language === 'hi'
                      ? 'आज खेती के काम के लिए अच्छा दिन है!'
                      : 'Good day for farming activities!'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
