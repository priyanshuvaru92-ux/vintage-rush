const { createClient } = require('./node_modules/@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/[\r\n]/g, '');
    env[key] = val;
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProfiles() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(5);
    if (error) {
      console.error('Error fetching profiles:', error.message);
    } else {
      console.log('Profiles in DB:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

checkProfiles();
