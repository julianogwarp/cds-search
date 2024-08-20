// /api/data/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    //discomment  this to work locally
    console.log('Attempting to retrieve data from KV store');
    await kv.set('testKey', 'testValue');

    const data = await kv.get('weeklyData');
    
    console.log('Retrieved data:', data);

    if (data) {
      console.log('Data found, returning it');
      return NextResponse.json(data);
    }

    console.log('No data found in KV store');
    return NextResponse.json({ message: 'No data available.' });
  } catch (error) {
    console.error('Error accessing KV store:', error);
    return NextResponse.json({ message: 'Error accessing KV store.' });
  }
}
