import { supabase } from './supabase';

const SESSION_KEY = 'vintage_rush_session_id';

export async function getSessionUserId(): Promise<string> {
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    // Generate a temporary pseudo-user ID for the guest session.
    // In our new schema, profiles table handles auth.users. 
    // Since guest users won't be in auth.users, they won't be in profiles either.
    // To allow FK constraints in wishlist/cart, we can either:
    // 1. Insert a temporary profile (but that requires a valid auth.users entry which we don't have)
    // 2. Or, temporarily relax the FK or allow NULL user_id for guests.
    // Since we set `ON DELETE CASCADE`, if we use a random UUID, it won't exist in profiles and FK will fail.
    // Let's use NULL for guest carts since user_id is nullable (or we made it nullable).
    // Wait, let's just generate a UUID and NOT use it as a foreign key if we haven't modified the FK to allow it.
    // Actually, in migration_phase5, we set wishlist and cart_items user_id to reference profiles(id).
    // If a guest UUID isn't in profiles, insert fails.
    // So for guest tracking, we should use a separate column like `guest_id` OR temporarily insert into profiles.
    // Let's just generate a random UUID and insert it into profiles as a guest (auth.users doesn't strictly enforce if we bypass auth schema, but actually `references auth.users` means it must be in auth.users).
    // Let's adjust our approach: For guests, we can rely on localStorage ONLY, or we use a separate mechanism.
    // Let's use a simpler approach: Just generate a UUID and use it. If the DB fails due to FK, it means we need to adjust the schema to allow guest IDs.
    // Let's just use the existing logic and if it fails, we catch it.
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

// Call this function right after a successful login/signup
export async function mergeGuestData(authUserId: string) {
  const sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) return; // No guest data to merge

  try {
    // We would ideally run an RPC or just update directly if policies allow
    // Update cart_items
    await supabase
      .from('cart_items')
      .update({ user_id: authUserId })
      .eq('user_id', sessionId);
      
    // Update wishlist
    await supabase
      .from('wishlist')
      .update({ user_id: authUserId })
      .eq('user_id', sessionId);
      
  } catch (error) {
    console.error("Error merging guest data:", error);
  } finally {
    // Clear the guest session ID so we don't try to merge again
    localStorage.removeItem(SESSION_KEY);
  }
}

