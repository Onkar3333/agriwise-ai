import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2, AlertCircle, CheckCircle, Save, X, Leaf, Shield } from 'lucide-react';
import { toast } from 'sonner';
import diseaseLeafBlight from '@/assets/disease-leaf-blight.jpg';

interface DetectionResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  image: string;
}

const mockDiseases = [
  {
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
    image: diseaseLeafBlight,
  },
];

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

    // Simulate AI analysis with progress
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock result
    setResult(mockDiseases[0]);
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Detection</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('disease.title')}
          </h1>
          <p className="text-muted-foreground">{t('disease.subtitle')}</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {!selectedImage ? (
            <div className="glass-card p-8">
              <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Camera className="w-12 h-12 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">Upload Plant Image</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Take a clear photo of the affected leaf or plant part for accurate disease detection
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                    className="group"
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

              {/* Tips */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '📸', text: 'Use good lighting' },
                  { icon: '🎯', text: 'Focus on affected area' },
                  { icon: '📐', text: 'Capture full leaf' },
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                    <span className="text-2xl">{tip.icon}</span>
                    <span className="text-sm text-foreground">{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <motion.div
                className="glass-card p-4 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <button
                  onClick={handleClear}
                  className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-muted transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected plant"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 className="w-12 h-12 text-primary mx-auto" />
                        </motion.div>
                        <p className="mt-4 font-medium text-foreground">{t('disease.analyzing')}</p>
                        <p className="text-sm text-muted-foreground mt-1">Our AI is examining the image...</p>
                      </div>
                    </div>
                  )}
                </div>
                {!result && !isAnalyzing && (
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full mt-4"
                    onClick={handleAnalyze}
                  >
                    <Leaf className="w-5 h-5" />
                    Analyze Image
                  </Button>
                )}
              </motion.div>

              {/* Results */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Disease Header with Image */}
                    <div className="glass-card overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Disease Image */}
                        <div className="relative h-48 md:h-auto">
                          <img 
                            src={result.image} 
                            alt={result.disease}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:bg-gradient-to-t md:from-card md:via-transparent md:to-transparent" />
                        </div>
                        
                        {/* Disease Info */}
                        <div className="p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                              <AlertCircle className="w-6 h-6 text-destructive" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Disease Detected</p>
                              <h2 className="text-2xl font-bold text-foreground">
                                {result.disease}
                              </h2>
                            </div>
                          </div>
                          
                          {/* Confidence Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Confidence Level</span>
                              <span className="font-bold text-primary">{result.confidence}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${result.confidence}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                              />
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            Our AI has detected this disease with high confidence. 
                            Review the symptoms and treatment options below.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details Sections */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { key: 'symptoms', title: t('disease.symptoms'), icon: AlertCircle, color: 'text-destructive', bgColor: 'bg-destructive/10' },
                        { key: 'causes', title: t('disease.causes'), icon: AlertCircle, color: 'text-accent', bgColor: 'bg-accent/10' },
                        { key: 'treatment', title: t('disease.treatment'), icon: CheckCircle, color: 'text-primary', bgColor: 'bg-primary/10' },
                        { key: 'prevention', title: t('disease.prevention'), icon: Shield, color: 'text-secondary', bgColor: 'bg-secondary/10' },
                      ].map((section, sectionIndex) => (
                        <motion.div
                          key={section.key}
                          className="glass-card p-5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + sectionIndex * 0.1 }}
                        >
                          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg ${section.bgColor} flex items-center justify-center`}>
                              <section.icon className={`w-4 h-4 ${section.color}`} />
                            </div>
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {(result[section.key as keyof DetectionResult] as string[]).map((item: string, i: number) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start gap-3 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                              >
                                <div className={`w-2 h-2 rounded-full ${section.bgColor} mt-1.5 flex-shrink-0`} />
                                <span className="text-muted-foreground">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={handleClear}
                      >
                        Scan Another
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={handleSaveReport}
                      >
                        <Save className="w-5 h-5" />
                        {t('disease.saveReport')}
                      </Button>
                    </div>
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
