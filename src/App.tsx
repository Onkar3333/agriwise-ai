import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CropAdvisory from "./pages/CropAdvisory";
import CropDetail from "./pages/CropDetail";
import DiseaseDetection from "./pages/DiseaseDetection";
import Recommendations from "./pages/Recommendations";
import NearbyMarkets from "./pages/NearbyMarkets";
import FarmerChat from "./pages/FarmerChat";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crops" element={<CropAdvisory />} />
            <Route path="/crops/:id" element={<CropDetail />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/markets" element={<NearbyMarkets />} />
            <Route path="/chat" element={<FarmerChat />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
