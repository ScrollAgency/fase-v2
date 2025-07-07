/**
 * Send coordinates to Supabase for a given table name and row id.
 *
 * Usage:
 *   await coordToSupabase({ table, id, latitude, longitude });
 *
 * The Supabase URL and API key must be set in your environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export async function coordToSupabase({
  api_table_and_params,
  latitude,
  longitude
}: {
  api_table_and_params: string;
  latitude: number;
  longitude: number;
}) {
  console.log(api_table_and_params);
  
  if (!api_table_and_params) return; // Only update if the param is provided
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    console.warn('Supabase URL or API key not set. Skipping location update.');
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${api_table_and_params}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ latitude, longitude })
    });
    console.log("res", res);
    if (!res.ok) {
      throw new Error(`Supabase error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Failed to update location in Supabase:', err);
  }
} 