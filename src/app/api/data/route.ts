import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { formatDistanceToNow } from 'date-fns';

export const runtime = "edge";
export const dynamic = 'force-dynamic'; 

export async function GET(request: NextRequest) {
  const interval = request.nextUrl.searchParams.get('interval') || 'default';
  
  const API_KEY = 'AIzaSyANjq9n5tMPR8BleLh3rgvYlHdZtGcwGTQ';
  const CX = '7165046d72cc1417f';
  const query = 'Chico da Silva';
  const normalizedQuery = query.toLowerCase();
  const dateRestrict = 'm1';
  const exactTerms = 'LeilõesBR';

  const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&dateRestrict=${dateRestrict}&exactTerms=${exactTerms}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const { items } = await res.json();
  const fetchedAt = Date.now();

  // Store the fetched data and timestamp in Vercel KV
  await kv.set(interval, {
    fetchedAt,
    items,
  });

  const relativeTime = formatDistanceToNow(new Date(fetchedAt), { addSuffix: true });

  return NextResponse.json({ items, fetchedAt, relativeTime });
}
