// /api/data/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Retrieve the stored data from KV
    const data = await kv.get('weeklyData');
    
    if (data) {
      return NextResponse.json(data);
    }

    return NextResponse.json({ message: 'No data available.' });
  } catch (error) {
    console.error('Error accessing KV store:', error);
    return NextResponse.json({ message: 'Error accessing KV store.' });
  }
}
