import { NextRequest, NextResponse } from 'next/server'

export const runtime = "edge"
export const dynamic = 'force-dynamic'; 
export async function GET(request: Request) {
  const API_KEY = 'AIzaSyANjq9n5tMPR8BleLh3rgvYlHdZtGcwGTQ';
  const CX = '7165046d72cc1417f';
  const query = 'Chico da Silva';
  const dateRestrict = 'w1';
  const exactTerms = 'LeilõesBR';

  const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&dateRestrict=${dateRestrict}&exactTerms=${exactTerms}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('cron job working every 5 minutes')
  const { items } = await res.json(); 
  return NextResponse.json({ items });
}
