import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://sabftcnloyuiitcfpeza.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYmZ0Y25sb3l1aWl0Y2ZwZXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5MTgyMDgsImV4cCI6MjAzODQ5NDIwOH0.xm26CqKtMhp497kydlHlnurnuVQuznTTGbYsB9Q1fvA"
);

export default supabase;
