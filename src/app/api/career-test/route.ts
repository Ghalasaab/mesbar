import { NextRequest, NextResponse } from 'next/server';
import { SJT_QUESTIONS, TRACK_META } from '@/lib/questions';

export async function GET() {
  return NextResponse.json({ success:true, data:{ questions:SJT_QUESTIONS } });
}

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    const scores: Record<string,number> = { software:0,cyber:0,data:0,ai:0,devops:0,product:0,project:0,hr:0,ba:0,ops:0 };
    answers.forEach(({questionId,optionIndex}:any) => {
      const q = SJT_QUESTIONS.find((q:any)=>q.id===questionId);
      if (!q) return;
      const opt = q.opts[optionIndex];
      if (!opt) return;
      Object.entries(opt).forEach(([k,v])=>{ if(k!=='en'&&k!=='ar'&&typeof v==='number') scores[k]=(scores[k]||0)+v; });
    });
    const total = Object.values(scores).reduce((s,v)=>s+v,0)||1;
    const pcts = Object.fromEntries(Object.entries(scores).map(([k,v])=>[k,Math.round(v/total*100)]));
    let techT=0,bizT=0;
    Object.entries(scores).forEach(([k,v])=>{ if((TRACK_META as any)[k]?.domain==='tech') techT+=v; else bizT+=v; });
    const dT=techT+bizT||1;
    const techPct=Math.round(techT/dT*100);
    const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]).filter(([,v])=>v>0);
    const topTrack=sorted[0]?.[0]??'software';
    return NextResponse.json({ success:true, data:{ primaryDomain:techPct>=100-techPct?'tech':'biz', domainScore:{tech:techPct,biz:100-techPct}, trackScores:pcts, topTrack, topTrackPct:pcts[topTrack]??0, topFour:sorted.slice(0,4).map(([t])=>({track:t,pct:pcts[t]??0})) } });
  } catch(e) { return NextResponse.json({success:false,error:'Failed'},{status:500}); }
}
