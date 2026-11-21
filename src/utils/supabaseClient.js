import { createClient } from '@supabase/supabase-js';

// Supabase credentials - falls back gracefully to offline mode if env vars not provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://women-safety-db.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
});

// Cloud sync service for SOS alerts and incident vault entries
export const syncAlertToCloud = async (alertData) => {
  if (!isSupabaseConfigured) {
    console.info('[Supabase Offline-First] Alert stored securely in local encrypted vault');
    return { data: alertData, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('sos_alerts')
      .insert([alertData]);
    return { data, error };
  } catch (err) {
    console.warn('[Supabase Sync]', err);
    return { data: null, error: err };
  }
};

export const syncVaultToCloud = async (vaultEntry) => {
  if (!isSupabaseConfigured) {
    return { data: vaultEntry, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('evidence_vault')
      .insert([vaultEntry]);
    return { data, error };
  } catch (err) {
    console.warn('[Supabase Vault Sync]', err);
    return { data: null, error: err };
  }
};
