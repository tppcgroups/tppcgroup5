import { NextResponse } from "next/server";
import { buildImageMap } from "@/lib/imageMapper";

// Define the get handler for api route
export async function GET() {
    const imageMap = buildImageMap();
    return NextResponse.json(imageMap);
}