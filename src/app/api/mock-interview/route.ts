import { NextRequest, NextResponse } from 'next/server';
import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateInterviewReport,
} from '@/lib/ai-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === 'generate') {
      const qs = await generateInterviewQuestions(
        body.targetRole,
        body.targetTrack,
        body.skills || [],
        body.experienceSummary || ''
      );

      return NextResponse.json({
        success: true,
        data: { questions: qs },
      });
    }

    if (body.action === 'evaluate') {
      const ev = await evaluateInterviewAnswer(
        body.question,
        body.answer,
        body.targetRole,
        body.targetTrack
      );

      return NextResponse.json({
        success: true,
        data: { evaluation: { ...ev, questionId: body.questionId } },
      });
    }

    if (body.action === 'report') {
      const rpt = await generateInterviewReport(
        body.evaluations || [],
        body.targetRole || '',
        body.targetTrack || ''
      );

      return NextResponse.json({
        success: true,
        data: { report: rpt },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message || 'Failed' },
      { status: 500 }
    );
  }
}