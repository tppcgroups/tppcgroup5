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
        // Check for existing notify request for the same email and building_id
        const { data: existingData, error: fetchError } = await supabase
            .from('notify')
            .select('*')
            .eq('email', newNotify.email)
            .eq('building_id', newNotify.building_id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error("Supabase fetch error:", fetchError.message);
            return NextResponse.json({ error: fetchError.message}, {status: 500});
        }
        
        if (existingData) {
            console.log("Notify request already exists for this email and building_id.");
            return NextResponse.json({ warning: true, msg: 'Notify request already exists.' }, { status: 200 });
        }
        // Insert the new notify record into the 'notify' table
        const {data, error} = await supabase.from('notify').insert([newNotify]).select();
        if (error) {
            console.error("Supabase insert error:", error.message);
            return NextResponse.json({ error: true, msg: error.message}, {status: 500});
        }

        return NextResponse.json({success: true, msg: "Notify Email Saved"}, {status: 201});
    } catch (error) {
        console.error("Post handler internal error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export default UserNotify;