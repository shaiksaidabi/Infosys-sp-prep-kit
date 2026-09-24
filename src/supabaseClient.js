import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hoewwyeduhvymkeigqhx.supabase.co";
const supabaseAnonKey = "sb_publishable_YomQb4bOks3aJlYFhOQxoQ_E7RUuS3J";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);