import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// Page Imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";
import Hoodies from "./pages/Hoodies";
import Sweaters from "./pages/Sweaters";
import TShirts from "./pages/TShirts";
import NewArrivals from "./pages/NewArrivals";
import Sale from "./pages/Sale";
import Lookbook from "./pages/Lookbook";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import AccountSettings from "./pages/AccountSettings";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage"; // --- FIX: Imported the missing CheckoutPage ---

// Context Provider Imports
import { CartProvider } from "./hooks/useCart";
import { AuthProvider } from "./hooks/useAuth";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop /> 
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/hoodies" element={<Hoodies />} />
                <Route path="/sweaters" element={<Sweaters />} />
                <Route path="/t-shirts" element={<TShirts />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/lookbook" element={<Lookbook />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} /> {/* This route now works */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;