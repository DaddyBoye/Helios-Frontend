
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thuprjvthecwigbmugnb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodXByanZ0aGVjd2lnYm11Z25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MzMwNzksImV4cCI6MjA0MjAwOTA3OX0.Y4ky_p_owiM1qXmr0qi74BCbUQ-cC8mdeNzeXxrC610'

export const supabase = createClient(supabaseUrl, supabaseKey)