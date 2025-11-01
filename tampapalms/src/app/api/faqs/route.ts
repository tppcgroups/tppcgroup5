import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/serverClient'

export async function GET() {
    const supabase = supabaseServer();
    const {data, error} = await supabase.from('faqs').select('*').limit(20);
    if (error) return NextResponse.json({ error: error.message}, {status: 500})
    return NextResponse.json(data);
}