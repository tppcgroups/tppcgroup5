import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/serverClient'
import { logDbAction } from '@/lib/logDbAction';

function getUserIdFromRequest(request: Request): string {
    return 'anonymous_user';
}

export async function GET(request: Request) {
    const supabase = supabaseServer();
    const userId = getUserIdFromRequest(request);

    const queryPromise = (async () => {
        const { data, error } = await supabase.from("faqs").select("*");

        return { data, error }
    })();

    // calling the log wrapper
    const { data, error } = await logDbAction(
        supabase,
        queryPromise,
        'GET',
        userId,
        {
            table: 'faqs',
            operation: 'select_all',
        }
    );
    
    if (error) return NextResponse.json({ error: error.message}, {status: 500})
    return NextResponse.json(data);
}