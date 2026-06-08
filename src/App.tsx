import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TradeKyPage from "./pages/projects/TradeKy.tsx";
import SannidhPage from "./pages/projects/Sannidh.tsx";
import KytePage from "./pages/projects/Kyte.tsx";
import TopBar from "./components/portfolio/TopBar";
import Footer from "./components/portfolio/Footer";
import PageTransition from "./components/portfolio/PageTransition";

const queryClient = new QueryClient();

const RoutedShell = () => {
  const location = useLocation();
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/projects/tradeky" element={<TradeKyPage />} />
          <Route path="/projects/sannidh" element={<SannidhPage />} />
          <Route path="/projects/regulon" element={<SannidhPage />} />
          <Route path="/projects/kyte" element={<KytePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoutedShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
