import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function ProtectedRoute() {
  const { user: contextUser, loading: contextLoading } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyAuth() {
      if (contextUser) {
        setAuthenticated(true);
        setChecking(false);
        return;
      }

      // Double check fresh session from Supabase Client to avoid race conditions on redirect
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthenticated(!!session?.user);
      } catch (err) {
        console.error('Error verifying auth in ProtectedRoute:', err);
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    }

    if (!contextLoading) {
      verifyAuth();
    }
  }, [contextUser, contextLoading]);

  if (contextLoading || checking) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1C1917] animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
