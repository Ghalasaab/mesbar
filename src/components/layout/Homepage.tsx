// src/components/layout/Homepage.tsx
'use client';
import { useLangStore } from '@/lib/store';
import { t } from '@/lib/translations';

interface Props {
  onNavigate: (view: string) => void;
}

export default function Homepage({ onNavigate }: Props) {
  const { lang } = useLangStore();

  const sectionSty = { maxWidth: 1200, margin: '0 auto', padding: '72px 40px' };
  const eyebrow = (text: string) => (
    <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--pb)', fontWeight: 700, marginBottom: 10 }}>
      {text}
    </p>
  );
  const secTitle = (text: string) => (
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, marginBottom: 14 }}>
      {text}
    </h2>
  );

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ ...sectionSty, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', paddingTop: 90, paddingBottom: 70 }}>
        <div>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(123,79,255,.12)', border: '1px solid var(--border-b)',
            borderRadius: 100, padding: '5px 14px', fontSize: 11, color: 'var(--neon)',
            fontWeight: 600, marginBottom: 20, letterSpacing: .5,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pb)', animation: 'pdot 2s infinite' }} />
            {t(lang, 'heroTag')}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4.5vw,60px)',
            fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 20,
          }}>
            {lang === 'ar' ? (
              <><span>اكتشف </span><em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#9B6FFF,#C084FC,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>مسارك المهني</em><br /><span>بدقة الذكاء الاصطناعي</span></>
            ) : (
              <><span>Explore Your<br /></span><em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#9B6FFF,#C084FC,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Career Path</em><br /><span>With AI Precision</span></>
            )}
          </h1>

          <p style={{ fontSize: 16, color: 'var(--dim)', lineHeight: 1.75, maxWidth: 440, marginBottom: 36 }}>
            {t(lang, 'heroP')}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ fontSize: 15, padding: '14px 30px' }} onClick={() => onNavigate('test')}>
              ◎ {t(lang, 'heroStart')}
            </button>
            <button className="btn-secondary" style={{ fontSize: 15, padding: '14px 30px' }} onClick={() => onNavigate('dashboard')}>
              {t(lang, 'heroDash')} →
            </button>
          </div>

          {/* Domain pills */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.4)', color: '#A5B4FC' }}>
              ⬡ {t(lang, 'domTech')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.35)', color: '#6EE7B7' }}>
              ◈ {t(lang, 'domBiz')}
            </span>
          </div>
        </div>

        {/* RADAR VISUAL */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 340, height: 340 }}>
            {[340, 272, 204, 136, 68].map((s, i) => (
              <div key={i} style={{
                position: 'absolute', width: s, height: s, borderRadius: '50%',
                border: `1px solid rgba(123,79,255,${0.08 + i * 0.12})`,
                top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              }} />
            ))}
            <div style={{
              position: 'absolute', width: 170, height: 170,
              top: '50%', left: '50%', transformOrigin: '0 0',
              animation: 'radarSweep 4s linear infinite',
              background: 'conic-gradient(from 0deg,transparent 78%,rgba(123,79,255,.22) 93%,rgba(123,79,255,.5) 100%)',
              borderRadius: '0 170px 0 0',
            }} />
            <div style={{
              position: 'absolute', width: 18, height: 18, borderRadius: '50%',
              background: 'var(--p)', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              boxShadow: '0 0 20px var(--p),0 0 40px rgba(123,79,255,.5)',
              animation: 'pc 2s ease-in-out infinite',
            }} />
            {/* Blips */}
            {[
              { top: '20%', left: '66%', delay: '0s' },
              { top: '62%', left: '18%', delay: '1s' },
              { top: '74%', left: '68%', delay: '1.8s' },
              { top: '28%', left: '26%', delay: '2.6s' },
            ].map((b, i) => (
              <div key={i} style={{
                position: 'absolute', ...b, width: 7, height: 7, borderRadius: '50%',
                background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)',
                animation: `bl 3s ease-in-out ${b.delay} infinite`,
              }} />
            ))}
            {/* Labels */}
            {[
              { text: lang === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity', top: '17%', left: '58%' },
              { text: lang === 'ar' ? 'تحليل البيانات' : 'Data Analysis', top: '62%', left: '8%' },
              { text: lang === 'ar' ? 'إدارة المنتج' : 'Product Mgmt', top: '74%', left: '58%' },
              { text: lang === 'ar' ? 'البرمجيات' : 'Engineering', top: '24%', left: '20%' },
            ].map((l, i) => (
              <span key={i} style={{
                position: 'absolute', top: l.top, left: l.left,
                fontSize: 10, color: 'var(--neon)', fontWeight: 500,
                whiteSpace: 'nowrap', opacity: .85,
              }}>
                {l.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOOLS ────────────────────────────────────────────────────────── */}
      <div style={{ ...sectionSty, paddingTop: 0 }}>
        {eyebrow(t(lang, 'toolsEye'))}
        {secTitle(t(lang, 'toolsTitle'))}
        <p style={{ fontSize: 15, color: 'var(--dim)', maxWidth: 500, marginBottom: 48, lineHeight: 1.7 }}>
          {t(lang, 'toolsSub')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
          {[
            {
              key: 'test', num: '1', icon: '🧭', color: 'rgba(139,92,246,.15)',
              title: t(lang, 't1title'), desc: t(lang, 't1desc'), go: t(lang, 't1go'),
              tags: ['SJT', lang === 'ar' ? '10 مسارات' : '10 Tracks', lang === 'ar' ? 'تقييم ذكي' : 'AI Scoring'],
            },
            {
              key: 'cv', num: '2', icon: '📄', color: 'rgba(99,102,241,.15)',
              title: t(lang, 't2title'), desc: t(lang, 't2desc'), go: t(lang, 't2go'),
              tags: ['ATS Score', lang === 'ar' ? 'كتابة ذكية' : 'AI Writing', 'PDF'],
            },
            {
              key: 'twin', num: '3', icon: '🗺️', color: 'rgba(167,139,250,.12)',
              title: t(lang, 't3title'), desc: t(lang, 't3desc'), go: t(lang, 't3go'),
              tags: [lang === 'ar' ? 'بيانات حقيقية' : 'Real Data', lang === 'ar' ? 'خارطة' : 'Roadmap', lang === 'ar' ? 'رواتب' : 'Salaries'],
            },
            {
              key: 'interview', num: '4', icon: '🎙️', color: 'rgba(196,181,253,.1)',
              title: t(lang, 't4title'), desc: t(lang, 't4desc'), go: t(lang, 't4go'),
              tags: [lang === 'ar' ? 'ذكاء مرتبط بسيرتك' : 'CV-Aware', lang === 'ar' ? '4 معايير' : '4 Metrics', lang === 'ar' ? 'تقرير' : 'Report'],
            },
          ].map(tool => (
            <div
              key={tool.key}
              className="card card-hover"
              onClick={() => onNavigate(tool.key)}
            >
              <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 11, background: tool.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 18 }}>
                {tool.icon}
                <span style={{
                  position: 'absolute', top: -5, right: -5, width: 16, height: 16,
                  borderRadius: '50%', background: 'var(--p)', fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  fontFamily: 'var(--font-display)',
                }}>{tool.num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{tool.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.6, marginBottom: 16 }}>{tool.desc}</p>
              <div style={{ marginBottom: 14 }}>
                {tool.tags.map(tag => (
                  <span key={tag} className="tag" style={{ marginRight: 6, marginBottom: 6 }}>{tag}</span>
                ))}
              </div>
              <div style={{ color: 'var(--pb)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, marginTop: 12 }}>
                {tool.go}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--mid)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={sectionSty}>
          {eyebrow(t(lang, 'howEye'))}
          {secTitle(t(lang, 'howTitle'))}
          <p style={{ fontSize: 15, color: 'var(--dim)', maxWidth: 500, marginBottom: 52, lineHeight: 1.7 }}>
            {t(lang, 'howSub')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 28, position: 'relative' }}>
            {[
              { num: '01', h: t(lang, 's1h'), p: t(lang, 's1p') },
              { num: '02', h: t(lang, 's2h'), p: t(lang, 's2p') },
              { num: '03', h: t(lang, 's3h'), p: t(lang, 's3p') },
              { num: '04', h: t(lang, 's4h'), p: t(lang, 's4p') },
            ].map(step => (
              <div key={step.num} style={{ textAlign: 'center', padding: '0 8px' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', border: '1px solid var(--border-b)',
                  background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--pb)',
                  margin: '0 auto 18px', position: 'relative',
                }}>
                  {step.num}
                  <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'var(--pd)', zIndex: -1 }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{step.h}</h4>
                <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.65 }}>{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <div style={sectionSty}>
        {eyebrow(t(lang, 'featEye'))}
        {secTitle(t(lang, 'featTitle'))}
        <p style={{ fontSize: 15, color: 'var(--dim)', maxWidth: 500, marginBottom: 48, lineHeight: 1.7 }}>
          {t(lang, 'featSub')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
          {[
            { icon: '⬡', h: t(lang, 'f1h'), p: t(lang, 'f1p') },
            { icon: '🤖', h: t(lang, 'f2h'), p: t(lang, 'f2p') },
            { icon: '📊', h: t(lang, 'f3h'), p: t(lang, 'f3p') },
            { icon: '🛣️', h: t(lang, 'f4h'), p: t(lang, 'f4p') },
            { icon: '🌐', h: t(lang, 'f5h'), p: t(lang, 'f5p') },
            { icon: '📱', h: t(lang, 'f6h'), p: t(lang, 'f6p') },
          ].map(f => (
            <div key={f.h} className="card" style={{ transition: 'all .3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-b)'; (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'var(--card)'; }}
            >
              <span style={{ fontSize: 26, display: 'block', marginBottom: 14 }}>{f.icon}</span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 7 }}>{f.h}</h4>
              <p style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.65 }}>{f.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '90px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 560, height: 360, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse,rgba(123,79,255,.18),transparent 70%)', pointerEvents: 'none' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, marginBottom: 18, position: 'relative' }}>
          {t(lang, 'ctaH')}
        </h2>
        <p style={{ fontSize: 16, color: 'var(--dim)', marginBottom: 36, position: 'relative' }}>
          {t(lang, 'ctaP')}
        </p>
        <button className="btn-primary" style={{ margin: '0 auto', fontSize: 16, padding: '16px 48px' }} onClick={() => onNavigate('test')}>
          ◎ {t(lang, 'ctaBtn')}
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>MESBAR مسبار</div>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>{t(lang, 'footerSub')}</p>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[t(lang, 'fprivacy'), t(lang, 'fterms'), t(lang, 'fcontact')].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>© 2025 Mesbar. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.6)} }
        @keyframes radarSweep { to { transform: rotate(360deg); } }
        @keyframes pc { 0%,100%{box-shadow:0 0 20px var(--p),0 0 40px rgba(123,79,255,.5)} 50%{box-shadow:0 0 35px var(--p),0 0 70px rgba(123,79,255,.7)} }
        @keyframes bl { 0%,100%{opacity:1} 45%,55%{opacity:.15} }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
