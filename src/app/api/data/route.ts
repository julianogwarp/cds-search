import { NextRequest, NextResponse } from 'next/server'
import { formatDistanceToNow } from 'date-fns';
export const runtime = "edge"
export const dynamic = 'force-dynamic'; 
export async function GET(request: Request) {
  const API_KEY = 'AIzaSyANjq9n5tMPR8BleLh3rgvYlHdZtGcwGTQ';
  const CX = '7165046d72cc1417f';
  const query = 'Chico da Silva';
  const normalizedQuery = query.toLowerCase();
  const dateRestrict = 'w1';
  const exactTerms = 'LeilõesBR';

  const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&dateRestrict=${dateRestrict}&exactTerms=${exactTerms}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
 const { items } = await res.json();
 const fetchedAt = new Date();
   const normalizeText = (text: string) => text.toLowerCase().replace(/[^\w\s]/gi, '');
   const filteredItems = items.filter((item: { title: any; pagemap: { metatags: { [x: string]: any; }[]; }; }) => {
    const normalizedTitle = normalizeText(item.title || '');
    const normalizedDescription = normalizeText(item.pagemap?.metatags?.[0]?.['og:title'] || '');

    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedDescription.includes(normalizedQuery)
    );
  });
  // Calculate the relative time (e.g., "2 days ago")
  const relativeTime = formatDistanceToNow(fetchedAt, { addSuffix: true });

  return NextResponse.json({ items: filteredItems, fetchedAt, relativeTime });
}
