// src/app/api/cv-builder/save/route.ts
// src/app/api/cv-builder/save/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { userId, cvData, atsScore, atsBreakdown } = await req.json();

    if (!userId || !cvData) {
      return NextResponse.json(
        { success: false, error: 'userId and cvData are required' },
        { status: 400 }
      );
    }

    const { default: prisma } = await import('@/lib/prisma');

    const saved = await prisma.cvData.create({
      data: {
        userId,
        fullName: cvData.fullName,
        email: cvData.email,
        targetRole: cvData.targetRole,
        targetTrack: cvData.targetTrack,
        education: cvData.education || [],
        experience: cvData.experience || [],
        skills: cvData.skills || [],
        projects: cvData.projects || [],
        certifications: cvData.certifications || [],
        atsScore: atsScore ?? null,
        atsBreakdown: atsBreakdown ?? null,
        enhancedExperience: cvData.enhancedExperience ?? null,
        enhancedSummary: cvData.enhancedSummary ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: saved.id },
    });
  } catch (error) {
    console.error('Save CV error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save CV' },
      { status: 500 }
    );
  }
}
