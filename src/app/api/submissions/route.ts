import { NextResponse } from 'next/server';

export async function GET() {
  const FORMSPREE_SECRET_KEY = process.env.FORMSPREE_SECRET_KEY;
  const FORM_ID = 'mjgaonyz';

  if (!FORMSPREE_SECRET_KEY) {
    // Return empty list instead of 500 to allow silent fallback in UI
    return NextResponse.json({ submissions: [] });
  }

  try {
    const response = await fetch(`https://formspree.io/api/0/forms/${FORM_ID}/submissions`, {
      headers: {
        'Authorization': `Bearer ${FORMSPREE_SECRET_KEY}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json({ submissions: [] });
    }

    const data = await response.json();
    
    const submissions = data.submissions.map((sub: any) => ({
      id: sub.id,
      name: sub.name || sub.email.split('@')[0],
      neighborhood: sub.neighborhood || sub.city || 'Mumbai',
      interest: sub.interest || 'Soccer',
      joinedAt: sub.created_at,
    })).slice(0, 10);

    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json({ submissions: [] });
  }
}
