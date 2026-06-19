import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { initAnalytics, analytics } from "@/lib/analytics";
import { Loader2 } from "lucide-react";

// Lazy Loaded Pages
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ShopPage = React.lazy(() => import("@/pages/ShopPage"));
const ProductPage = React.lazy(() => import("@/pages/ProductPage"));
const LoginPage = React.lazy(() => import("@/pages/LoginPage"));
const SignupPage = React.lazy(() => import("@/pages/SignupPage"));
const AccountPage = React.lazy(() => import("@/pages/AccountPage"));
const CheckoutPage = React.lazy(() => import("@/pages/CheckoutPage"));
const OrderSuccessPage = React.lazy(() => import("@/pages/OrderSuccessPage"));
const OrdersPage = React.lazy(() => import("@/pages/OrdersPage"));
const OrderDetailsPage = React.lazy(() => import("@/pages/OrderDetailsPage"));
const NotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));
const AboutPage = React.lazy(() => import("@/pages/AboutPage"));
const ContactPage = React.lazy(() => import("@/pages/ContactPage"));

// Analytics Tracker Component
function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    analytics.trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

const PageLoader = () => (
  <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-[#1C1917] animate-spin" />
  </div>
);

import { isEnvValid } from "@/lib/supabase";

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      {!isEnvValid && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#EF4444",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "12px 20px",
          fontSize: "13px",
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          zIndex: 99999,
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          letterSpacing: "0.02em"
        }}>
          ⚠️ Supabase environment variables are missing or fallback to default. Please restart your Vite dev server (`npm run dev`) after verifying your .env.local file.
        </div>
      )}
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <AnalyticsTracker />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                  
                  <Route element={<ProtectedRoute />}>
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id" element={<OrderDetailsPage />} />
                  </Route>
                  
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
