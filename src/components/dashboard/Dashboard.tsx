// src/components/dashboard/Dashboard.tsx
'use client';
import { useLangStore, useCareerTestStore, useCvStore, useInterviewStore } from '@/lib/store';
import { t } from '@/lib/translations';
import { TRACK_META } from '@/lib/questions';
import type { TrackKey } from '@/types';

const TRACK_KEY_MAP: Record<string, string> = {
  software:'trackSoftware', cyber:'trackCyber', data:'trackData',
  ai:'trackAI', devops:'trackDevOps', product:'trackProduct',
  project:'trackProject', hr:'trackHR', ba:'trackBA', ops:'trackOps',
};

interface Props {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: Props) {
  const { lang } = useLangStore();
  const { result: testResult } = useCareerTestStore();
  const { atsResult } = useCvStore();
  const { report: intReport } = useInterviewStore();

  const careerMatch = testResult ? {
    track: testResult.topTrack,
    pct: testResult.topTrackPct,
    domain: testResult.primaryDomain,
  } : null;

  const cvScore = atsResult?.score ?? null;
  const intScore = intReport?.overallScore ?? null;

  const completed = [careerMatch, cvScore, intScore].filter(Boolean).length;

  const scoreColor = (s: number) =>
    s >= 75 ? '#34D399' : s >= 55 ? '#FCD34D' : '#FCA5A5';

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
        <p className="eyebrow">{t(lang, 'dashEye')}</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>
          {t(lang, 'dashTitle')}
        </h2>
        <p style={{ color: 'var(--dim)', fontSize: 14 }}>{t(lang, 'dashSub')}</p>
      </div>

      {/* OVERALL PROGRESS */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(123,79,255,.15),rgba(99,102,241,.06))',
        border: '1px solid var(--border-b)', borderRadius: 16, padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
          background: 'var(--card)', border: '2px solid var(--p)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--pb)', lineHeight: 1 }}>
            {completed}
          </span>
          <span style={{ fontSize: 9, color: 'var(--muted)' }}>/3</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            {lang === 'ar'
              ? `${completed} من 3 أدوات مكتملة`
              : `${completed} of 3 tools completed`}
          </div>
          <div style={{ fontSize: 13, color: 'var(--dim)' }}>
            {completed === 0
              ? (lang === 'ar' ? 'ابدأ باختبار المسار المهني' : 'Start with the Career Path Test')
              : completed === 3
              ? (lang === 'ar' ? 'ملف مهني مكتمل! ✦' : 'Full career profile complete! ✦')
              : (lang === 'ar' ? 'استمر في بناء ملفك' : 'Keep building your profile')
            }
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <div style={{ height: 6, width: 120, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${(completed / 3) * 100}%`,
              background: 'linear-gradient(90deg,var(--p),var(--neon))', borderRadius: 3,
              transition: 'width 1s ease',
            }} />
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 28 }}>

        {/* Career Match */}
        <div
          className="card card-hover"
          onClick={() => onNavigate(careerMatch ? 'result' : 'test')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>
            {t(lang, 'm1l')}
          </div>
          {careerMatch ? (
            <>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--pb)', marginBottom: 6 }}>
                {t(lang, (TRACK_KEY_MAP[careerMatch.track] || 'trackCyber') as any)}
              </div>
              <div className="metric-bar-bg" style={{ marginBottom: 6 }}>
                <div className="metric-bar-fill" style={{ width: `${careerMatch.pct}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{careerMatch.pct}% match</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                  ...(careerMatch.domain === 'tech'
                    ? { background: 'rgba(99,102,241,.15)', color: '#A5B4FC' }
                    : { background: 'rgba(16,185,129,.12)', color: '#6EE7B7' }
                  ),
                }}>
                  {careerMatch.domain === 'tech' ? t(lang, 'matchTech') : t(lang, 'matchBiz')}
                </span>
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>
              {lang === 'ar' ? 'لم يُكتمل بعد — ابدأ الاختبار' : 'Not completed — Start test'}
            </div>
          )}
        </div>

        {/* CV Score */}
        <div
          className="card card-hover"
          onClick={() => onNavigate('cv')}
        >
          <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>
            {t(lang, 'm2l')}
          </div>
          {cvScore !== null ? (
            <>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: scoreColor(cvScore), marginBottom: 6 }}>
                {cvScore}<span style={{ fontSize: 14, color: 'var(--muted)' }}>/100</span>
              </div>
              <div className="metric-bar-bg" style={{ marginBottom: 6 }}>
                <div className="metric-bar-fill" style={{ width: `${cvScore}%`, background: scoreColor(cvScore) }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{t(lang, 'm2s')}</div>
            </>
          ) : (
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>
              {lang === 'ar' ? 'لم يُكتمل بعد — ابنِ سيرتك' : 'Not completed — Build your CV'}
            </div>
          )}
        </div>

        {/* Interview Score */}
        <div
          className="card card-hover"
          onClick={() => onNavigate('interview')}
        >
          <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>
            {t(lang, 'm3l')}
          </div>
          {intScore !== null ? (
            <>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: scoreColor(intScore), marginBottom: 6 }}>
                {intScore}<span style={{ fontSize: 14, color: 'var(--muted)' }}>/100</span>
              </div>
              <div className="metric-bar-bg" style={{ marginBottom: 6 }}>
                <div className="metric-bar-fill" style={{ width: `${intScore}%`, background: scoreColor(intScore) }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                {intScore >= 75 ? (lang === 'ar' ? 'أداء ممتاز' : 'Excellent') : t(lang, 'm3s')}
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>
              {lang === 'ar' ? 'لم يُكتمل بعد — تدرب الآن' : 'Not completed — Practice now'}
            </div>
          )}
        </div>
      </div>

      {/* TOOL QUICK ACCESS */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
        {lang === 'ar' ? '🚀 الوصول السريع للأدوات' : '🚀 Quick Tool Access'}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
        {[
          {
            key: 'test', icon: '🧭', color: 'rgba(139,92,246,.15)',
            title: t(lang, 't1title'),
            status: testResult
              ? (lang === 'ar' ? `مكتمل · ${testResult.topTrackPct}% تطابق` : `Completed · ${testResult.topTrackPct}% match`)
              : (lang === 'ar' ? 'لم يُكتمل' : 'Not started'),
            done: !!testResult,
          },
          {
            key: 'cv', icon: '📄', color: 'rgba(99,102,241,.15)',
            title: t(lang, 't2title'),
            status: cvScore !== null
              ? (lang === 'ar' ? `تقييم ATS: ${cvScore}` : `ATS Score: ${cvScore}`)
              : (lang === 'ar' ? 'لم يُكتمل' : 'Not started'),
            done: cvScore !== null,
          },
          {
            key: 'twin', icon: '🗺️', color: 'rgba(167,139,250,.12)',
            title: t(lang, 't3title'),
            status: lang === 'ar' ? 'استعراض خارطة المسار' : 'View roadmap',
            done: false,
          },
          {
            key: 'interview', icon: '🎙️', color: 'rgba(196,181,253,.1)',
            title: t(lang, 't4title'),
            status: intScore !== null
              ? (lang === 'ar' ? `الدرجة: ${intScore}/100` : `Score: ${intScore}/100`)
              : (lang === 'ar' ? 'لم يُكتمل' : 'Not started'),
            done: intScore !== null,
          },
        ].map(tool => (
          <button
            key={tool.key}
            onClick={() => onNavigate(tool.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--card)', border: `1px solid ${tool.done ? 'var(--border-b)' : 'var(--border)'}`,
              borderRadius: 12, padding: '14px 16px', cursor: 'pointer',
              transition: 'all .2s', textAlign: lang === 'ar' ? 'right' : 'left',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--p)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = tool.done ? 'var(--border-b)' : 'var(--border)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 9, flexShrink: 0,
              background: tool.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17,
            }}>
              {tool.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>
                {tool.title}
              </div>
              <div style={{ fontSize: 11, color: tool.done ? 'var(--neon)' : 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {tool.done && <span style={{ color: '#34D399' }}>✓</span>}
                {tool.status}
              </div>
            </div>
            <span style={{ color: 'var(--pb)', fontSize: 18, flexShrink: 0 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
