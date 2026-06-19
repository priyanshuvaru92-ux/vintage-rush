import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { mergeGuestData } from '@/lib/session';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for OAuth errors in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const code = searchParams.get('code') || hashParams.get('code');
    const errorParam = searchParams.get('error') || hashParams.get('error');
    const errorDesc = searchParams.get('error_description') || hashParams.get('error_description');

    if (errorParam) {
      console.error('OAuth Error:', errorDesc);
      alert(`SUPABASE REDIRECT ERROR:\n${errorParam}\n\nDescription: ${errorDesc?.replace(/\+/g, ' ')}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (code) {
      // Check if code verifier exists
      let hasVerifier = false;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.includes('code-verifier')) {
          hasVerifier = true;
          break;
        }
      }
      if (!hasVerifier) {
        alert(`CRITICAL PKCE ERROR:\nWe received the login code from Google, but the browser's local storage is missing the secret verifier!\n\nThis happens if you started the login on one Vercel URL (like a preview URL) but Supabase redirected you to a DIFFERENT URL (like the main production URL).\n\nYou MUST test the login on the exact same domain that is set in your Supabase Site URL.`);
      }
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        alert('SUPABASE GET_SESSION ERROR: ' + error.message);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        // Only alert if we just lost a session
        console.log('Signed out event fired.');
      }
      if (event === 'SIGNED_IN') {
        alert('SUCCESS! The login token was successfully verified. You are now logged in as: ' + session?.user?.email);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          await mergeGuestData(session.user.id);
        } catch (err) {
          console.error('Merge data error:', err);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // We MUST return to the EXACT same origin to prevent PKCE code-verifier loss.
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
