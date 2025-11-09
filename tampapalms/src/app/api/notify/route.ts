import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/serverClient'

// Define the interface for user notify data
interface UserNotify {
    user_id: string;
    email: string;
    building_id: string;
}


export async function GET() {
    const supabase = supabaseServer();
    const {data, error} = await supabase.from('notify').select('*');
    if (error) return NextResponse.json({ error: error.message}, {status: 500})
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try{    
        const newNotify: UserNotify = await request.json();
        const supabase = supabaseServer();
        // Insert the new notify record into the 'notify' table
        const {data, error} = await supabase.from('notify').insert([newNotify]).select();
        if (error) {
            console.error("Supabase insert error:", error.message);
            return NextResponse.json({ error: error.message}, {status: 500});
        }

        return NextResponse.json(data, {status: 201});
    } catch (error) {
        console.error("Post handler internal error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export default UserNotify;