import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttmngexwhbqiqyjceqgb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bW5nZXh3aGJxaXF5amNlcWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDgxNDksImV4cCI6MjA1OTEyNDE0OX0.uabio60yk0XWqvZrVi_WwYZxzOcfJEQmO8ZQCFukWLE';

export const supabase = createClient(supabaseUrl, supabaseKey);
