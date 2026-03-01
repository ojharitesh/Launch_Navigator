import { createBrowserClient } from '@supabase/ssr';

type SupabaseBrowserClient = ReturnType<typeof createBrowserClient>;

let browserClient: SupabaseBrowserClient | null = null;
let missingEnvClient: SupabaseBrowserClient | null = null;

function createMissingEnvClient(): SupabaseBrowserClient {
  const message =
    'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY';

  return new Proxy({} as SupabaseBrowserClient, {
    get() {
      throw new Error(message);
    },
  });
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window === 'undefined') {
      return {} as SupabaseBrowserClient;
    }

    if (!missingEnvClient) {
      console.error(
        'Missing Supabase environment variables. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your deployment environment.'
      );
      missingEnvClient = createMissingEnvClient();
    }

    return missingEnvClient;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
}
