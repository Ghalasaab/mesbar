// src/components/tools/CareerTwin.tsx
'use client';
import { useState } from 'react';
import { useLangStore } from '@/lib/store';
import { t } from '@/lib/translations';
import { CAREER_TWIN_DATA } from '@/lib/career-twin-data';
import type { TrackKey } from '@/types';

const TECH_TRACKS: TrackKey[] = ['cyber', 'software', 'data', 'ai', 'devops'];
const BIZ_TRACKS: TrackKey[] = ['product', 'project', 'hr', 'ba', 'ops'];

export default function CareerTwin() {
  const { lang } = useLangStore();
  const [activeTrack, setActiveTrack] = useState<TrackKey>('cyber');
  const [activeDomain, setActiveDomain] = useState<'tech' | 'biz'>('tech');

  const data = CAREER_TWIN_DATA[activeTrack];
  const tracks = activeDomain === 'tech' ? TECH_TRACKS : BIZ_TRACKS;

  const formatSalary = (min: number, max: number) =>
    `$${(min / 1000).toFixed(0)}K → $${(max / 1000).toFixed(0)}K+`;

  const milestoneColors = ['var(--border-b)', 'rgba(99,102,241,.4)', 'rgba(99,102,241,.7)', 'var(--p)'];
  const milestoneGlow  = ['none', 'none', '0 0 12px rgba(99,102,241,.3)', '0 0 20px rgba(123,79,255,.4)'];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
        <p className="eyebrow">Tool 3 — Career Twin</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>
          {t(lang, 'twinTitle')}
        </h2>
        <p style={{ color: 'var(--dim)', fontSize: 14, maxWidth: 520 }}>{t(lang, 'twinSub')}</p>
      </div>

      {/* DOMAIN TOGGLE */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { key: 'tech', label: t(lang, 'domTech'), icon: '⬡' },
          { key: 'biz', label: t(lang, 'domBiz'), icon: '◈' },
        ].map(d => (
          <button
            key={d.key}
            onClick={() => {
              setActiveDomain(d.key as 'tech' | 'biz');
              setActiveTrack(d.key === 'tech' ? 'cyber' : 'product');
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px',
              borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              border: '1px solid', fontFamily: 'inherit', transition: 'all .2s',
              ...(activeDomain === d.key
                ? d.key === 'tech'
                  ? { background: 'rgba(99,102,241,.18)', borderColor: 'rgba(99,102,241,.5)', color: '#A5B4FC' }
                  : { background: 'rgba(16,185,129,.15)', borderColor: 'rgba(16,185,129,.4)', color: '#6EE7B7' }
                : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--dim)' }
              ),
            }}
          >
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      {/* TRACK TABS */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {tracks.map(tk => {
          const td = CAREER_TWIN_DATA[tk];
          const isActive = activeTrack === tk;
          const isTech = activeDomain === 'tech';
          return (
            <button
              key={tk}
              onClick={() => setActiveTrack(tk)}
              style={{
                padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: '1px solid', transition: 'all .2s', fontFamily: 'inherit',
                ...(isActive
                  ? isTech
                    ? { background: 'rgba(99,102,241,.2)', borderColor: 'rgba(99,102,241,.5)', color: '#A5B4FC' }
                    : { background: 'rgba(16,185,129,.15)', borderColor: 'rgba(16,185,129,.4)', color: '#6EE7B7' }
                  : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--dim)' }
                ),
              }}
            >
              {lang === 'ar' ? td.nameAr : td.nameEn}
            </button>
          );
        })}
      </div>

      {/* TRACK OVERVIEW */}
      {data && (
        <div className="animate-fade-in">
          {/* Top info bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
            marginBottom: 28, padding: '16px 20px',
            background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800 }}>
              {lang === 'ar' ? data.nameAr : data.nameEn}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginLeft: 'auto' }}>
              <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2, fontWeight: 600 }}>
                  {t(lang, 'twinSalary')}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--neon)' }}>
                  {formatSalary(data.salaryMin, data.salaryMax)}
                </div>
              </div>
            </div>
          </div>

          {/* Milestones — timeline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(data.milestones.length, 2)}, 1fr)`,
            gap: 16, marginBottom: 28,
          }}>
            {data.milestones.map((ms, i) => {
              const isTech = activeDomain === 'tech';
              const barColor = isTech
                ? `rgba(99,102,241,${0.3 + i * 0.2})`
                : `rgba(16,185,129,${0.3 + i * 0.2})`;
              return (
                <div
                  key={i}
                  className="animate-fade-in"
                  style={{
                    background: 'var(--card)', borderRadius: 14, padding: 20,
                    border: `1px solid ${milestoneColors[i] || 'var(--border)'}`,
                    boxShadow: milestoneGlow[i] || 'none',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Year label */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800,
                    color: isTech ? '#818CF8' : '#34D399',
                    letterSpacing: .5, textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: isTech ? '#818CF8' : '#34D399', display: 'inline-block',
                    }} />
                    {ms.yearLabel}
                  </div>

                  {/* Title */}
                  {ms.titleEn && (
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
                      color: 'var(--text)', marginBottom: 12,
                    }}>
                      {lang === 'ar' ? ms.titleAr : ms.titleEn}
                    </div>
                  )}

                  {/* Skills */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {(lang === 'ar' ? ms.skillsAr : ms.skillsEn).map((sk, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                          background: isTech ? '#818CF8' : '#34D399',
                        }} />
                        <span style={{ fontSize: 12, color: 'var(--dim)' }}>{sk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: 3, background: barColor,
                    width: `${25 + i * 25}%`, borderRadius: '0 2px 0 0',
                  }} />
                </div>
              );
            })}
          </div>

          {/* Core Skills + Job Titles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {/* Core Skills */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pb)', marginBottom: 12 }}>
                ⚡ {t(lang, 'twinSkills')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {(lang === 'ar' ? data.coreSkillsAr : data.coreSkills).map(sk => (
                  <span
                    key={sk}
                    style={{
                      display: 'inline-block',
                      background: activeDomain === 'tech' ? 'rgba(99,102,241,.12)' : 'rgba(16,185,129,.1)',
                      border: `1px solid ${activeDomain === 'tech' ? 'rgba(99,102,241,.35)' : 'rgba(16,185,129,.3)'}`,
                      borderRadius: 100, padding: '4px 10px', fontSize: 11,
                      color: activeDomain === 'tech' ? '#A5B4FC' : '#6EE7B7', fontWeight: 600,
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Titles */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pb)', marginBottom: 12 }}>
                🎯 {t(lang, 'twinTitles')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(lang === 'ar' ? data.topJobTitlesAr : data.topJobTitles).map((title, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--pd)', border: '1px solid var(--border-b)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: 'var(--pb)', fontWeight: 700,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--dim)' }}>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Salary Banner */}
          <div style={{
            background: 'linear-gradient(135deg,rgba(123,79,255,.15),rgba(99,102,241,.08))',
            border: '1px solid var(--border-b)', borderRadius: 14, padding: '20px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
          }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontWeight: 600 }}>
                {t(lang, 'twinSalary')} — {lang === 'ar' ? data.nameAr : data.nameEn}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--neon)' }}>
                {formatSalary(data.salaryMin, data.salaryMax)}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                {lang === 'ar' ? 'USD · بيانات صناعية حقيقية' : 'USD · Based on real industry data patterns'}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                {lang === 'ar' ? 'المجال' : 'Domain'}
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                ...(activeDomain === 'tech'
                  ? { background: 'rgba(99,102,241,.18)', border: '1px solid rgba(99,102,241,.5)', color: '#C7D2FE' }
                  : { background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.4)', color: '#A7F3D0' }
                ),
              }}>
                {activeDomain === 'tech' ? '⬡' : '◈'}
                {activeDomain === 'tech' ? t(lang, 'domainTech') : t(lang, 'domainBiz')}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .twin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
