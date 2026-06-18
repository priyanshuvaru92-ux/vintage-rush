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

// Analytics Tracker Component
function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    analytics.trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

const PageLoader = () => (
  <div className="min-h-screen bg-[#111111] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-secondary animate-spin" />
  </div>
);

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
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
