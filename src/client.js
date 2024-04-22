import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eunapkqcqayoconjthhm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1bmFwa3FjcWF5b2Nvbmp0aGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NjkwOTYsImV4cCI6MjAyOTA0NTA5Nn0.6Men35BgRS4-0SHSKKz_SfQ35i7u1lSbThQVNt0hYgg";
export const supabase = createClient(supabaseUrl, supabaseKey);
