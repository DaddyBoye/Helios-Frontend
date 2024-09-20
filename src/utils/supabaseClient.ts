import { createClient } from '@supabase/supabase-js';

// Add type assertions to make sure the environment variables are strings
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or key in environment variables');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
