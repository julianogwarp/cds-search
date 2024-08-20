// /api/update/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const API_KEY = 'AIzaSyANjq9n5tMPR8BleLh3rgvYlHdZtGcwGTQ';
  const CX = '7165046d72cc1417f';
  const query = 'Chico da Silva';
  const dateRestrict = 'm1';
  const exactTerms = 'LeilõesBR';

  const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&dateRestrict=${dateRestrict}&exactTerms=${exactTerms}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();
  const { items } = responseData;

  if (!items) {
    console.error('No items found in the API response.');
    return NextResponse.json({ message: 'Failed to fetch data from API.' });
  }

  const fetchedAt = Date.now();

  try {
    await kv.set('weeklyData', {
      items,
      fetchedAt,
    });
    console.log('Data successfully stored:', { fetchedAt });
   
  } catch (error) {
    console.error('Error storing or verifying data:', error);
  }

  return NextResponse.json({ message: 'Data updated successfully.' });
}
