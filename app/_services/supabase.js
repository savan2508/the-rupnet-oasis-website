import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ynbvyiuyikjugwdebvcd.supabase.co";

const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY);

export default supabase;
