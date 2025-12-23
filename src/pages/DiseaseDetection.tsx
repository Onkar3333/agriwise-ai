import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2, AlertCircle, CheckCircle, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface DetectionResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
}

export const DiseaseDetection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock result
    setResult({
      disease: 'Leaf Blight',
      confidence: 94.5,
      symptoms: [
        'Brown or tan lesions on leaves',
        'Yellowing around affected areas',
        'Wilting of leaf tips',
        'Premature leaf drop',
      ],
      causes: [
        'Fungal infection (Alternaria species)',
        'High humidity conditions',
        'Poor air circulation',
        'Overhead irrigation',
      ],
      treatment: [
        'Apply copper-based fungicide (2g/L water)',
        'Remove and destroy infected leaves',
        'Spray neem oil solution (5ml/L)',
        'Apply Mancozeb 75% WP (2.5g/L)',
      ],
      prevention: [
        'Ensure proper plant spacing',
        'Avoid overhead watering',
        'Rotate crops annually',
        'Use disease-resistant varieties',
      ],
    });

    setIsAnalyzing(false);
  };

  const handleSaveReport = () => {
    toast.success('Report saved successfully!');
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
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
            {t('disease.title')}
          </h1>
          <p className="text-muted-foreground">{t('disease.subtitle')}</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {!selectedImage ? (
            <div className="glass-card p-8">
              <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="text-foreground font-medium mb-6">
                  Upload a clear image of the affected plant leaf
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5" />
                    {t('disease.upload')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="w-5 h-5" />
                    {t('disease.capture')}
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <motion.div
                className="glass-card p-4 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <button
                  onClick={handleClear}
                  className="absolute top-6 right-6 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />
                {!result && !isAnalyzing && (
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full mt-4"
                    onClick={handleAnalyze}
                  >
                    Analyze Image
                  </Button>
                )}
              </motion.div>

              {/* Analyzing State */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    className="glass-card p-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-lg font-medium text-foreground">
                      {t('disease.analyzing')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI is examining the image...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Disease Header */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                          <AlertCircle className="w-7 h-7 text-destructive" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-foreground">
                            {result.disease}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-primary rounded-full"
                                style={{ width: `${result.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {result.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Sections */}
                    {[
                      { key: 'symptoms', icon: AlertCircle, color: 'text-destructive', bgColor: 'bg-destructive/10' },
                      { key: 'causes', icon: AlertCircle, color: 'text-accent', bgColor: 'bg-accent/10' },
                      { key: 'treatment', icon: CheckCircle, color: 'text-primary', bgColor: 'bg-primary/10' },
                      { key: 'prevention', icon: CheckCircle, color: 'text-emerald-glow', bgColor: 'bg-primary/10' },
                    ].map((section) => (
                      <motion.div
                        key={section.key}
                        className="glass-card p-5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <section.icon className={`w-5 h-5 ${section.color}`} />
                          {t(`disease.${section.key}`)}
                        </h3>
                        <ul className="space-y-2">
                          {(result[section.key as keyof DetectionResult] as string[]).map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <div className={`w-2 h-2 rounded-full ${section.bgColor} mt-1.5`} />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}

                    {/* Save Button */}
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleSaveReport}
                    >
                      <Save className="w-5 h-5" />
                      {t('disease.saveReport')}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default DiseaseDetection;
