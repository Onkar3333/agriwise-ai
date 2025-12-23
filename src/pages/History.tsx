import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Search, FileText, AlertCircle, Sprout, Calendar, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ReportType = 'all' | 'disease' | 'crop' | 'recommendation';

interface Report {
  id: string;
  type: 'disease' | 'crop' | 'recommendation';
  title: string;
  date: Date;
  summary: string;
}

const reportsData: Report[] = [
  {
    id: '1',
    type: 'disease',
    title: 'Leaf Blight Detection - Soybean',
    date: new Date(Date.now() - 86400000),
    summary: '94.5% confidence, Treatment recommended: Mancozeb 75% WP',
  },
  {
    id: '2',
    type: 'crop',
    title: 'Wheat Sowing Advisory',
    date: new Date(Date.now() - 172800000),
    summary: 'Optimal sowing period: October-November, Soil prep complete',
  },
  {
    id: '3',
    type: 'disease',
    title: 'Powdery Mildew - Cotton',
    date: new Date(Date.now() - 259200000),
    summary: '87.2% confidence, Applied Carbendazim treatment',
  },
  {
    id: '4',
    type: 'recommendation',
    title: 'Fertilizer Schedule - Rice',
    date: new Date(Date.now() - 345600000),
    summary: 'DAP basal + Urea top dressing recommended',
  },
  {
    id: '5',
    type: 'crop',
    title: 'Onion Harvest Planning',
    date: new Date(Date.now() - 432000000),
    summary: 'Expected yield: 280 quintals/hectare, Market price ₹1800/quintal',
  },
  {
    id: '6',
    type: 'disease',
    title: 'Yellow Mosaic Virus - Soybean',
    date: new Date(Date.now() - 518400000),
    summary: '91.8% confidence, Whitefly control recommended',
  },
];

export const History: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ReportType>('all');

  const types: { value: ReportType; icon: typeof FileText; label: string }[] = [
    { value: 'all', icon: FileText, label: 'All Reports' },
    { value: 'disease', icon: AlertCircle, label: 'Disease Scans' },
    { value: 'crop', icon: Sprout, label: 'Crop Advisory' },
    { value: 'recommendation', icon: FileText, label: 'Recommendations' },
  ];

  const filteredReports = reportsData.filter((report) => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'disease':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'crop':
        return <Sprout className="w-5 h-5 text-primary" />;
      case 'recommendation':
        return <FileText className="w-5 h-5 text-accent" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case 'disease':
        return 'bg-destructive/10';
      case 'crop':
        return 'bg-primary/10';
      case 'recommendation':
        return 'bg-accent/10';
      default:
        return 'bg-muted';
    }
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
            {t('dashboard.history')}
          </h1>
          <p className="text-muted-foreground">{t('dashboard.historyDesc')}</p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="relative mb-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </motion.div>

        {/* Type Filter */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedType === type.value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'glass text-foreground hover:bg-muted'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </motion.div>

        {/* Reports List */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              className="glass-card p-4 card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeBgColor(report.type)}`}>
                  {getTypeIcon(report.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-foreground">{report.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-destructive flex-shrink-0 -mt-1 -mr-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {report.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(report.date)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FileText className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No reports found matching your search.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default History;
