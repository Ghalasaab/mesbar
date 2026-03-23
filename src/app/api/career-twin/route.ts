import { NextRequest, NextResponse } from 'next/server';
import { CAREER_TWIN_DATA } from '@/lib/career-twin-data';

export async function GET(req: NextRequest) {
  const track = new URL(req.url).searchParams.get('track');
  if (track) {
    const data = (CAREER_TWIN_DATA as any)[track];
    return data ? NextResponse.json({success:true,data}) : NextResponse.json({success:false,error:'Track not found'},{status:404});
  }
  return NextResponse.json({success:true, data:Object.values(CAREER_TWIN_DATA).map(({slug,nameEn,nameAr,domain,salaryMin,salaryMax}:any)=>({slug,nameEn,nameAr,domain,salaryMin,salaryMax}))});
}
