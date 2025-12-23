import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, Minus, IndianRupee } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts';

export interface PriceData {
  month: string;
  price: number;
  year: number;
}

interface CropPriceChartProps {
  priceHistory: PriceData[];
  unit: string;
  cropName: string;
}

export const CropPriceChart: React.FC<CropPriceChartProps> = ({
  priceHistory,
  unit,
  cropName,
}) => {
  const { language } = useLanguage();

  // Calculate price trends
  const currentPrice = priceHistory[priceHistory.length - 1]?.price || 0;
  const previousPrice = priceHistory[priceHistory.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? ((priceChange / previousPrice) * 100).toFixed(1) : '0';

  const minPrice = Math.min(...priceHistory.map(p => p.price));
  const maxPrice = Math.max(...priceHistory.map(p => p.price));
  const avgPrice = Math.round(priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length);

  const getTrendIcon = () => {
    if (priceChange > 0) return <TrendingUp className="w-4 h-4" />;
    if (priceChange < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (priceChange > 0) return 'text-primary';
    if (priceChange < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const labels = {
    en: {
      title: 'Market Price Trends',
      currentPrice: 'Current Price',
      priceChange: 'vs Last Month',
      highest: 'Highest',
      lowest: 'Lowest',
      average: 'Average',
      monthly: '12 Month History',
    },
    mr: {
      title: 'बाजार किंमत ट्रेंड',
      currentPrice: 'सध्याची किंमत',
      priceChange: 'गेल्या महिन्याच्या तुलनेत',
      highest: 'सर्वाधिक',
      lowest: 'सर्वात कमी',
      average: 'सरासरी',
      monthly: '१२ महिन्यांचा इतिहास',
    },
    hi: {
      title: 'बाजार मूल्य रुझान',
      currentPrice: 'वर्तमान मूल्य',
      priceChange: 'पिछले महीने की तुलना में',
      highest: 'उच्चतम',
      lowest: 'न्यूनतम',
      average: 'औसत',
      monthly: '12 महीने का इतिहास',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  const chartConfig = {
    price: {
      label: 'Price',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
        <IndianRupee className="w-5 h-5 text-primary" />
        {t.title}
      </h3>

      {/* Current Price Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-muted-foreground mb-1">{t.currentPrice}</div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gradient">₹{currentPrice.toLocaleString()}</span>
          </div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-muted-foreground mb-1">{t.priceChange}</div>
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="font-semibold">
              {priceChange > 0 ? '+' : ''}{priceChangePercent}%
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {priceChange > 0 ? '+' : ''}₹{priceChange.toLocaleString()}
          </div>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-muted-foreground mb-1">{t.highest}</div>
          <div className="text-lg font-semibold text-primary">₹{maxPrice.toLocaleString()}</div>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="text-xs text-muted-foreground mb-1">{t.lowest}</div>
          <div className="text-lg font-semibold text-accent">₹{minPrice.toLocaleString()}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-3">{t.monthly}</div>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={priceHistory}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Price']}
                  labelFormatter={(label) => label}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={{
                fill: 'hsl(var(--primary))',
                strokeWidth: 2,
                stroke: 'hsl(var(--background))',
                r: 4,
              }}
              activeDot={{
                fill: 'hsl(var(--primary))',
                strokeWidth: 3,
                stroke: 'hsl(var(--background))',
                r: 6,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      {/* Average Price */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">{t.average}</span>
        <span className="font-semibold text-foreground">₹{avgPrice.toLocaleString()} {unit}</span>
      </div>
    </motion.div>
  );
};

export default CropPriceChart;
