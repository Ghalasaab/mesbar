// src/components/tools/CareerTestResult.tsx
'use client';
import { useLangStore, useCareerTestStore } from '@/lib/store';
import { t } from '@/lib/translations';
import { TRACK_META } from '@/lib/questions';
import type { TrackKey } from '@/types';

interface Props {
  onDashboard: () => void;
  onRetake: () => void;
}

const TRACK_KEY_MAP: Record<string, string> = {
  software: 'trackSoftware', cyber: 'trackCyber', data: 'trackData',
  ai: 'trackAI', devops: 'trackDevOps', product: 'trackProduct',
  project: 'trackProject', hr: 'trackHR', ba: 'trackBA', ops: 'trackOps',
};

export default function CareerTestResult({ onDashboard, onRetake }: Props) {
  const { lang } = useLangStore();
  const { result, reset } = useCareerTestStore();

  if (!result) return null;

  const { primaryDomain, domainScore, topTrack, topTrackPct, topFour } = result;
  const isTech = primaryDomain === 'tech';
  const topTrackName = t(lang, TRACK_KEY_MAP[topTrack] as any) || topTrack;

  const handleRetake = () => { reset(); onRetake(); };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="eyebrow">{lang === 'ar' ? 'نتيجة مسبار' : 'Mesbar Result'}</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>
          {t(lang, 'resTitle')}
        </h2>
        <p style={{ color: 'var(--dim)', fontSize: 14 }}>{t(lang, 'resSub')}</p>
      </div>

      {/* Domain Badge */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 22px', borderRadius: 100, fontSize: 13, fontWeight: 700,
          ...(isTech
            ? { background: 'rgba(99,102,241,.18)', border: '1px solid rgba(99,102,241,.5)', color: '#C7D2FE' }
            : { background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.4)', color: '#A7F3D0' }
          ),
        }}>
          {isTech ? '⬡' : '◈'} {t(lang, 'resDomain')}: <strong>{t(lang, isTech ? 'domainTech' : 'domainBiz')}</strong>
          &nbsp;·&nbsp;{isTech ? domainScore.tech : domainScore.biz}%
        </span>
      </div>

      {/* Top Match Card */}
      <div
        style={{
          background: 'linear-gradient(135deg,rgba(123,79,255,.2),rgba(196,181,253,.06))',
          border: '1px solid var(--p)', borderRadius: 20, padding: '28px 32px',
          textAlign: 'center', marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--pb)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
          {t(lang, 'resMatch')}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,5vw,36px)', fontWeight: 800, marginBottom: 8 }}>
          {topTrackName}
        </div>
        <div style={{ fontSize: 14, color: 'var(--neon)', fontWeight: 600 }}>
          {topTrackPct}% {t(lang, 'resMatchScore')}
        </div>
      </div>

      {/* Domain Score Split */}
      <div
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24,
        }}
      >
        {[
          { label: t(lang, 'domainTech'), pct: domainScore.tech, isTechDom: true },
          { label: t(lang, 'domainBiz'), pct: domainScore.biz, isTechDom: false },
        ].map(item => (
          <div key={item.label} className="card" style={{ padding: 18, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>
              {item.isTechDom ? '⬡' : '◈'} {item.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
              color: item.isTechDom ? '#818CF8' : '#34D399',
            }}>
              {item.pct}%
            </div>
            <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginTop: 10, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2, width: `${item.pct}%`,
                background: item.isTechDom ? 'linear-gradient(90deg,#6366F1,#A5B4FC)' : 'linear-gradient(90deg,#10B981,#6EE7B7)',
                transition: 'width 1s ease .3s',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Track Breakdown */}
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
        {t(lang, 'resBreak')}
      </h4>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 28 }}
        className="stagger"
      >
        {topFour.map(({ track, pct }: any) => {
          const meta = TRACK_META[track];
          const isTechTrack = meta.domain === 'tech';
          const name = t(lang, TRACK_KEY_MAP[track] as any) || track;
          return (
            <div key={track} className="card animate-fade-in" style={{ padding: 16 }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6, fontWeight: 600 }}>
                {isTechTrack ? '⬡ ' + t(lang, 'matchTech') : '◈ ' + t(lang, 'matchBiz')}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                {name}
              </div>
              <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}>
                <div style={{
                  height: '100%', borderRadius: 3, width: `${pct}%`,
                  background: isTechTrack ? 'linear-gradient(90deg,#6366F1,#A5B4FC)' : 'linear-gradient(90deg,#10B981,#6EE7B7)',
                  transition: 'width 1s ease .4s',
                }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{pct}%</div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-secondary" style={{ fontSize: 13, padding: '11px 22px' }} onClick={handleRetake}>
          {t(lang, 'resRestart')}
        </button>
        <button className="btn-primary" style={{ fontSize: 13, padding: '11px 22px' }} onClick={onDashboard}>
          {t(lang, 'resDash')}
        </button>
      </div>
    </div>
  );
}
