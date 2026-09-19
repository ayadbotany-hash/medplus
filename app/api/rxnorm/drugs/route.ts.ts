import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('term') || searchParams.get('name');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ candidates: [] });
  }

  try {
    const cleanQuery = encodeURIComponent(query.trim());

    // الاستعلام عن الأسماء العلمية، التجارك والاقتراحات في نفس الوقت
    const [approxRes, spellRes] = await Promise.all([
      fetch(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${cleanQuery}&maxEntries=30`),
      fetch(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?term=${cleanQuery}`)
    ]);

    const approxData = await approxRes.json();
    const spellData = await spellRes.json();

    const candidates = approxData.approximateGroup?.candidate || [];
    const approxNames = candidates.map((c: any) => c.candidate);
    const spellNames = spellData.suggestionGroup?.suggestionList?.suggestion || [];

    // دمج النتائج وإزالة المكرر
    const allDrugs = Array.from(new Set([...approxNames, ...spellNames])).filter(Boolean);

    return NextResponse.json({ candidates: allDrugs });
  } catch (error) {
    console.error("RxNorm API Error:", error);
    return NextResponse.json({ candidates: [] });
  }
}