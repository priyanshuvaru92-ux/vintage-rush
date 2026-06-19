import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()?.replace(/[\r\n]/g, '');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321',
  supabaseAnonKey || 'public-anon-key',
  {
    auth: {
      detectSessionInUrl: true,   // CRITICAL: reads token from URL after Google OAuth redirect
      persistSession: true,        // keep session across page refreshes
      autoRefreshToken: true,      // silently refresh tokens before expiry
    },
  }
);
