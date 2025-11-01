import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const supabaseServer = () => {
    // For cookie based authorization
    const cookieStore = cookies();

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            },
        }
    )
}