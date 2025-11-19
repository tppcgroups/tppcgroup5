import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serviceRoleClient: SupabaseClient | null = null;

function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseServiceRoleClient(): SupabaseClient {
  if (!serviceRoleClient) {
    const url = assertEnv(
      "SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL
    );
    const key = assertEnv("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY);

    serviceRoleClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  return serviceRoleClient;
}
