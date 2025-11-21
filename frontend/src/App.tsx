import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Sonner (correct import for notifications)
import { Toaster as Sonner } from "sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// HashRouter works for Vite + static deploy (BrowserRouter breaks)
import { HashRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import ReportNeed from "./pages/ReportNeed";
import OfferHelp from "./pages/OfferHelp";
import Dashboard from "./pages/Dashboard";
import NeedDetails from "./pages/NeedDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Shadcn UI toaster */}
        <Toaster />

        {/* Sonner notifications */}
        <Sonner />

        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/report-need" element={<ReportNeed />} />
            <Route path="/offer-help" element={<OfferHelp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/need/:id" element={<NeedDetails />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
