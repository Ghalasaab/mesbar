// src/app/api/career-test/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { userId, result, answers } = await req.json();

    if (!userId || !result) {
      return NextResponse.json({ success: false, error: 'userId and result are required' }, { status: 400 });
    }


    const saved = await prisma.careerResult.create({
      data: {
        userId,
        primaryDomain: result.primaryDomain,
        domainScore: result.domainScore,
        trackScores: result.trackScores,
        topTrack: result.topTrack,
        topTrackPct: result.topTrackPct,
        answers: answers || [],
      },
    });

    return NextResponse.json({ success: true, data: { id: saved.id } });
  } catch (error) {
    console.error('Save career result error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save result' }, { status: 500 });
  }
}
