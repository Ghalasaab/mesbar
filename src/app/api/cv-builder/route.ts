import { NextRequest, NextResponse } from 'next/server';
import { enhanceCvBullets, generateCvSummary, scoreATS } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { cvData, action='full' } = await req.json();
    if (!cvData) return NextResponse.json({success:false,error:'CV data required'},{status:400});
    const results: any = {};
    if (action==='enhance'||action==='full') {
      results.enhancedExperience = await Promise.all((cvData.experience||[]).map(async(exp:any)=>{
        if(!exp.bullets?.length) return exp;
        const enhanced = await enhanceCvBullets(exp.bullets, cvData.targetRole||exp.title, cvData.targetTrack||'software');
        return {...exp, enhancedBullets:enhanced};
      }));
      if(!cvData.summary||cvData.summary.length<30) results.enhancedSummary = await generateCvSummary(cvData);
    }
    if (action==='score'||action==='full') {
      const ats = await scoreATS({...cvData, experience:results.enhancedExperience||cvData.experience});
      results.atsScore=ats.score; results.atsBreakdown=ats.breakdown;
      results.missingKeywords=ats.missingKeywords; results.atsSuggestions=ats.suggestions;
      if(!cvData.summary) results.enhancedSummary=ats.enhancedSummary;
    }
    return NextResponse.json({success:true,data:results});
  } catch(e:any) { return NextResponse.json({success:false,error:e.message||'Failed'},{status:500}); }
}
