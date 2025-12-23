import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Auth
    'auth.welcome': 'Welcome to KrishiAI',
    'auth.subtitle': 'Your intelligent farming companion',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.farmer': 'Farmer',
    'auth.admin': 'Admin',
    'auth.role': 'Select Role',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.loginBtn': 'Login to Dashboard',
    'auth.signupBtn': 'Create Account',

    // Dashboard
    'dashboard.title': 'KrishiAI Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.subtitle': 'What would you like to do today?',
    'dashboard.cropAdvisory': 'Crop Advisory',
    'dashboard.cropAdvisoryDesc': 'Get expert crop recommendations',
    'dashboard.diseaseDetection': 'Disease Detection',
    'dashboard.diseaseDetectionDesc': 'AI-powered plant diagnosis',
    'dashboard.smartRecommendations': 'Smart Recommendations',
    'dashboard.smartRecommendationsDesc': 'Fertilizer & pesticide advice',
    'dashboard.nearbyMarkets': 'Nearby Markets',
    'dashboard.nearbyMarketsDesc': 'Find APMC markets near you',
    'dashboard.farmerChat': 'Farmer Chat',
    'dashboard.farmerChatDesc': 'Connect with other farmers',
    'dashboard.history': 'History & Reports',
    'dashboard.historyDesc': 'View your saved data',

    // Crop Advisory
    'crops.title': 'Crop Advisory',
    'crops.subtitle': 'Maharashtra Crop Database',
    'crops.search': 'Search crops...',
    'crops.all': 'All Crops',
    'crops.kharif': 'Kharif',
    'crops.rabi': 'Rabi',
    'crops.summer': 'Summer',
    'crops.sowingPeriod': 'Sowing Period',
    'crops.harvestPeriod': 'Harvest Period',
    'crops.soilType': 'Soil Type',
    'crops.waterNeeds': 'Water Needs',
    'crops.yield': 'Expected Yield',

    // Disease Detection
    'disease.title': 'Disease Detection',
    'disease.subtitle': 'Upload or capture leaf image',
    'disease.upload': 'Upload Image',
    'disease.capture': 'Capture Photo',
    'disease.analyzing': 'Analyzing...',
    'disease.results': 'Detection Results',
    'disease.name': 'Disease Name',
    'disease.symptoms': 'Symptoms',
    'disease.causes': 'Causes',
    'disease.treatment': 'Treatment',
    'disease.prevention': 'Prevention',
    'disease.saveReport': 'Save Report',

    // Recommendations
    'recommendations.title': 'Smart Recommendations',
    'recommendations.subtitle': 'AI-powered farming advice',
    'recommendations.fertilizer': 'Fertilizers',
    'recommendations.pesticide': 'Pesticides',
    'recommendations.insecticide': 'Insecticides',
    'recommendations.dosage': 'Dosage',
    'recommendations.mixing': 'Mixing Instructions',
    'recommendations.ecoFriendly': 'Eco-Friendly Alternative',

    // Markets
    'markets.title': 'Nearby Markets',
    'markets.subtitle': 'Find APMC markets near you',
    'markets.distance': 'Distance',
    'markets.route': 'Get Route',
    'markets.produce': 'Available Produce',
    'markets.timing': 'Market Timing',

    // Common
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.success': 'Success!',
    'common.logout': 'Logout',
    'common.settings': 'Settings',
    'common.language': 'Language',
  },
  mr: {
    // Auth
    'auth.welcome': 'कृषी AI मध्ये आपले स्वागत',
    'auth.subtitle': 'तुमचा बुद्धिमान शेती सहकारी',
    'auth.login': 'लॉगिन',
    'auth.signup': 'नोंदणी',
    'auth.email': 'ईमेल पत्ता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड पुष्टी करा',
    'auth.name': 'पूर्ण नाव',
    'auth.phone': 'फोन नंबर',
    'auth.farmer': 'शेतकरी',
    'auth.admin': 'प्रशासक',
    'auth.role': 'भूमिका निवडा',
    'auth.noAccount': 'खाते नाही?',
    'auth.hasAccount': 'आधीच खाते आहे?',
    'auth.loginBtn': 'डॅशबोर्डवर लॉगिन करा',
    'auth.signupBtn': 'खाते तयार करा',

    // Dashboard
    'dashboard.title': 'कृषी AI डॅशबोर्ड',
    'dashboard.welcome': 'पुन्हा स्वागत',
    'dashboard.subtitle': 'आज तुम्हाला काय करायचे आहे?',
    'dashboard.cropAdvisory': 'पीक सल्ला',
    'dashboard.cropAdvisoryDesc': 'तज्ञ पीक शिफारसी मिळवा',
    'dashboard.diseaseDetection': 'रोग शोध',
    'dashboard.diseaseDetectionDesc': 'AI-आधारित वनस्पती निदान',
    'dashboard.smartRecommendations': 'स्मार्ट शिफारसी',
    'dashboard.smartRecommendationsDesc': 'खत आणि कीटकनाशक सल्ला',
    'dashboard.nearbyMarkets': 'जवळचे बाजार',
    'dashboard.nearbyMarketsDesc': 'जवळचे APMC बाजार शोधा',
    'dashboard.farmerChat': 'शेतकरी चॅट',
    'dashboard.farmerChatDesc': 'इतर शेतकऱ्यांशी जोडा',
    'dashboard.history': 'इतिहास आणि अहवाल',
    'dashboard.historyDesc': 'तुमचा जतन केलेला डेटा पहा',

    // Crop Advisory
    'crops.title': 'पीक सल्ला',
    'crops.subtitle': 'महाराष्ट्र पीक डेटाबेस',
    'crops.search': 'पीक शोधा...',
    'crops.all': 'सर्व पिके',
    'crops.kharif': 'खरीप',
    'crops.rabi': 'रब्बी',
    'crops.summer': 'उन्हाळी',
    'crops.sowingPeriod': 'पेरणी काळ',
    'crops.harvestPeriod': 'कापणी काळ',
    'crops.soilType': 'माती प्रकार',
    'crops.waterNeeds': 'पाण्याची गरज',
    'crops.yield': 'अपेक्षित उत्पादन',

    // Disease Detection
    'disease.title': 'रोग शोध',
    'disease.subtitle': 'पानाचे फोटो अपलोड करा',
    'disease.upload': 'फोटो अपलोड करा',
    'disease.capture': 'फोटो काढा',
    'disease.analyzing': 'विश्लेषण करत आहे...',
    'disease.results': 'शोध निकाल',
    'disease.name': 'रोगाचे नाव',
    'disease.symptoms': 'लक्षणे',
    'disease.causes': 'कारणे',
    'disease.treatment': 'उपचार',
    'disease.prevention': 'प्रतिबंध',
    'disease.saveReport': 'अहवाल जतन करा',

    // Recommendations
    'recommendations.title': 'स्मार्ट शिफारसी',
    'recommendations.subtitle': 'AI-आधारित शेती सल्ला',
    'recommendations.fertilizer': 'खते',
    'recommendations.pesticide': 'कीटकनाशके',
    'recommendations.insecticide': 'कीटकनाशक',
    'recommendations.dosage': 'डोस',
    'recommendations.mixing': 'मिसळण्याच्या सूचना',
    'recommendations.ecoFriendly': 'पर्यावरण-स्नेही पर्याय',

    // Markets
    'markets.title': 'जवळचे बाजार',
    'markets.subtitle': 'जवळचे APMC बाजार शोधा',
    'markets.distance': 'अंतर',
    'markets.route': 'मार्ग मिळवा',
    'markets.produce': 'उपलब्ध उत्पादने',
    'markets.timing': 'बाजार वेळ',

    // Common
    'common.back': 'मागे',
    'common.save': 'जतन करा',
    'common.cancel': 'रद्द करा',
    'common.loading': 'लोड होत आहे...',
    'common.error': 'काहीतरी चूक झाली',
    'common.success': 'यशस्वी!',
    'common.logout': 'बाहेर पडा',
    'common.settings': 'सेटिंग्ज',
    'common.language': 'भाषा',
  },
  hi: {
    // Auth
    'auth.welcome': 'कृषि AI में आपका स्वागत है',
    'auth.subtitle': 'आपका बुद्धिमान खेती साथी',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड पुष्टि करें',
    'auth.name': 'पूरा नाम',
    'auth.phone': 'फोन नंबर',
    'auth.farmer': 'किसान',
    'auth.admin': 'व्यवस्थापक',
    'auth.role': 'भूमिका चुनें',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.hasAccount': 'पहले से खाता है?',
    'auth.loginBtn': 'डैशबोर्ड में लॉगिन करें',
    'auth.signupBtn': 'खाता बनाएं',

    // Dashboard
    'dashboard.title': 'कृषि AI डैशबोर्ड',
    'dashboard.welcome': 'वापस स्वागत है',
    'dashboard.subtitle': 'आज आप क्या करना चाहेंगे?',
    'dashboard.cropAdvisory': 'फसल सलाह',
    'dashboard.cropAdvisoryDesc': 'विशेषज्ञ फसल सिफारिशें पाएं',
    'dashboard.diseaseDetection': 'रोग पहचान',
    'dashboard.diseaseDetectionDesc': 'AI-संचालित पौधा निदान',
    'dashboard.smartRecommendations': 'स्मार्ट सिफारिशें',
    'dashboard.smartRecommendationsDesc': 'उर्वरक और कीटनाशक सलाह',
    'dashboard.nearbyMarkets': 'नजदीकी बाजार',
    'dashboard.nearbyMarketsDesc': 'अपने पास APMC बाजार खोजें',
    'dashboard.farmerChat': 'किसान चैट',
    'dashboard.farmerChatDesc': 'अन्य किसानों से जुड़ें',
    'dashboard.history': 'इतिहास और रिपोर्ट',
    'dashboard.historyDesc': 'अपना सहेजा डेटा देखें',

    // Crop Advisory
    'crops.title': 'फसल सलाह',
    'crops.subtitle': 'महाराष्ट्र फसल डेटाबेस',
    'crops.search': 'फसल खोजें...',
    'crops.all': 'सभी फसलें',
    'crops.kharif': 'खरीफ',
    'crops.rabi': 'रबी',
    'crops.summer': 'गर्मी',
    'crops.sowingPeriod': 'बुवाई काल',
    'crops.harvestPeriod': 'कटाई काल',
    'crops.soilType': 'मिट्टी प्रकार',
    'crops.waterNeeds': 'पानी की जरूरत',
    'crops.yield': 'अपेक्षित उपज',

    // Disease Detection
    'disease.title': 'रोग पहचान',
    'disease.subtitle': 'पत्ती की तस्वीर अपलोड करें',
    'disease.upload': 'तस्वीर अपलोड करें',
    'disease.capture': 'फोटो लें',
    'disease.analyzing': 'विश्लेषण हो रहा है...',
    'disease.results': 'पहचान परिणाम',
    'disease.name': 'रोग का नाम',
    'disease.symptoms': 'लक्षण',
    'disease.causes': 'कारण',
    'disease.treatment': 'उपचार',
    'disease.prevention': 'रोकथाम',
    'disease.saveReport': 'रिपोर्ट सहेजें',

    // Recommendations
    'recommendations.title': 'स्मार्ट सिफारिशें',
    'recommendations.subtitle': 'AI-संचालित खेती सलाह',
    'recommendations.fertilizer': 'उर्वरक',
    'recommendations.pesticide': 'कीटनाशक',
    'recommendations.insecticide': 'कीटनाशक',
    'recommendations.dosage': 'खुराक',
    'recommendations.mixing': 'मिलाने के निर्देश',
    'recommendations.ecoFriendly': 'पर्यावरण-अनुकूल विकल्प',

    // Markets
    'markets.title': 'नजदीकी बाजार',
    'markets.subtitle': 'अपने पास APMC बाजार खोजें',
    'markets.distance': 'दूरी',
    'markets.route': 'रास्ता पाएं',
    'markets.produce': 'उपलब्ध उत्पाद',
    'markets.timing': 'बाजार समय',

    // Common
    'common.back': 'वापस',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हुआ',
    'common.success': 'सफल!',
    'common.logout': 'लॉग आउट',
    'common.settings': 'सेटिंग्स',
    'common.language': 'भाषा',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
