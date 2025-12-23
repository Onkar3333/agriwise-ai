import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { 
  Leaf, Sprout, Search, MapPin, ArrowRight, Sparkles, 
  Brain, Shield, TrendingUp, Users, MessageCircle, Star,
  ChevronRight, Play, Check
} from 'lucide-react';
import heroField from '@/assets/hero-field.jpg';
import featureAi from '@/assets/feature-ai.jpg';
import featureMarket from '@/assets/feature-market.jpg';
import featureCrops from '@/assets/feature-crops.jpg';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    { 
      icon: Sprout, 
      label: 'Crop Advisory', 
      description: 'Get personalized recommendations for your crops',
      image: featureCrops,
      delay: 0.2 
    },
    { 
      icon: Search, 
      label: 'Disease Detection', 
      description: 'AI-powered instant plant disease diagnosis',
      image: featureAi,
      delay: 0.3 
    },
    { 
      icon: MapPin, 
      label: 'Market Finder', 
      description: 'Find best prices at nearby APMC markets',
      image: featureMarket,
      delay: 0.4 
    },
  ];

  const benefits = [
    { icon: Brain, title: 'AI-Powered Intelligence', desc: 'Advanced machine learning models trained on thousands of crop images' },
    { icon: Shield, title: '95% Accuracy', desc: 'Industry-leading detection accuracy for common crop diseases' },
    { icon: TrendingUp, title: 'Increase Yield', desc: 'Early detection helps prevent crop loss and maximize harvest' },
    { icon: Users, title: 'Expert Support', desc: 'Connect with agricultural experts for personalized advice' },
  ];

  const testimonials = [
    { name: 'Rajesh Patil', location: 'Nashik, Maharashtra', text: 'KrishiAI helped me detect early blight in my tomatoes and saved my entire crop!', rating: 5 },
    { name: 'Sunita Deshmukh', location: 'Pune, Maharashtra', text: 'The market finder feature helped me get 20% better prices for my onions.', rating: 5 },
    { name: 'Manoj Kumar', location: 'Kolhapur, Maharashtra', text: 'Simple to use even for someone like me who is not tech-savvy. Excellent app!', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 lg:px-8 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">KrishiAI</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <LanguageSelector variant="compact" />
          <Button variant="outline" size="sm" onClick={() => navigate('/auth')} className="hidden sm:flex">
            Login
          </Button>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container px-4 pt-8 lg:pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">AI-Powered Farming Platform</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Revolutionize Your{' '}
              <span className="text-gradient">Farming</span>{' '}
              with AI
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your intelligent farming companion. Detect plant diseases instantly, 
              get expert crop advice, and find the best market prices nearby.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/auth')}
                className="group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate('/dashboard')}
                className="group"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { value: '50+', label: 'Crop Types' },
                { value: '95%', label: 'Accuracy' },
                { value: '10K+', label: 'Farmers' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="relative rounded-3xl overflow-hidden glass-card p-2">
              <img 
                src={heroField} 
                alt="Farming field with crops" 
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-2xl" />
              
              {/* Floating Cards */}
              <motion.div
                className="absolute bottom-6 left-6 glass-card p-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Disease Detected</p>
                  <p className="text-xs text-muted-foreground">Leaf Blight • 94% confidence</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-6 right-6 glass-card p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-foreground">AI Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to <span className="text-gradient">Grow Better</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-driven tools designed specifically for Indian farmers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              className="group glass-card overflow-hidden cursor-pointer card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate('/dashboard')}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.label}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 container px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4">
              Why KrishiAI?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Trusted by <span className="text-gradient">10,000+</span> Farmers
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of farmers across Maharashtra who are already using AI 
              to protect their crops and maximize their yields.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex gap-4 p-4 glass-card"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature List */}
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Platform Features</h3>
            <div className="space-y-4">
              {[
                'AI-powered crop disease detection',
                'Real-time market prices from 100+ APMCs',
                'Personalized crop recommendations',
                'Weather-based farming alerts',
                'Multi-language support (English, Marathi, Hindi)',
                'Expert agricultural advisory',
                'Farmer community chat',
                'Offline mode support',
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 container px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What <span className="text-gradient">Farmers Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{testimonial.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container px-4 py-20">
        <motion.div
          className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
          <div className="relative z-10">
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join thousands of farmers already using KrishiAI to detect diseases early, 
              find best prices, and grow smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => navigate('/auth')} className="group">
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate('/auth')}>
                <MessageCircle className="w-5 h-5" />
                Talk to Expert
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-gradient">KrishiAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 KrishiAI. Made with ❤️ for Indian Farmers
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
