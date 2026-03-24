// src/components/tools/MockInterview.tsx
'use client';
import { useState } from 'react';
import { useLangStore, useInterviewStore, useCvStore } from '@/lib/store';
import { t } from '@/lib/translations';
import type { TrackKey, InterviewQuestion, AnswerEvaluation } from '@/types';

const TRACK_OPTIONS: { value: TrackKey; labelEn: string; labelAr: string }[] = [
  { value: 'software', labelEn: 'Software Engineering', labelAr: 'هندسة البرمجيات' },
  { value: 'cyber',    labelEn: 'Cybersecurity',        labelAr: 'الأمن السيبراني' },
  { value: 'data',     labelEn: 'Data Analysis',        labelAr: 'تحليل البيانات' },
  { value: 'ai',       labelEn: 'AI / Machine Learning', labelAr: 'الذكاء الاصطناعي' },
  { value: 'devops',   labelEn: 'Cloud / DevOps',       labelAr: 'الحوسبة السحابية' },
  { value: 'product',  labelEn: 'Product Management',   labelAr: 'إدارة المنتج' },
  { value: 'project',  labelEn: 'Project Management',   labelAr: 'إدارة المشاريع' },
  { value: 'hr',       labelEn: 'Human Resources',      labelAr: 'الموارد البشرية' },
  { value: 'ba',       labelEn: 'Business Analysis',    labelAr: 'تحليل الأعمال' },
  { value: 'ops',      labelEn: 'Operations Management',labelAr: 'إدارة العمليات' },
];

const CAT_ICONS: Record<string, string> = {
  behavioral: '🧠', technical: '⚙️', situational: '🎯', competency: '🌟',
};

const scoreColor = (s: number) =>
  s >= 75 ? '#34D399' : s >= 55 ? '#FCD34D' : '#FCA5A5';

export default function MockInterview() {
  const { lang } = useLangStore();
  const { cvData } = useCvStore();
  const {
    targetRole, targetTrack, questions, answers, evaluations, report,
    currentQuestion, phase, isLoading,
    setSetup, setQuestions, setAnswer, addEvaluation, setReport,
    nextQuestion, prevQuestion, setPhase, setLoading, reset,
  } = useInterviewStore();

  const [roleInput, setRoleInput] = useState(cvData.targetRole || '');
  const [trackInput, setTrackInput] = useState<TrackKey | ''>(cvData.targetTrack as TrackKey || '');
  const [answerText, setAnswerText] = useState('');

  const isRtl = lang === 'ar';

  // ─── Phase 1: Setup ─────────────────────────────────────────────────────────
  const handleStart = async () => {
    if (!roleInput || !trackInput) {
      alert(lang === 'ar' ? 'يرجى تحديد الدور والمسار' : 'Please select a role and track');
      return;
    }
    setSetup(roleInput, trackInput as TrackKey);
    setLoading(true);

    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          targetRole: roleInput,
          targetTrack: trackInput,
          skills: cvData.skills || [],
          experienceSummary: cvData.experience
            .map((e: any) => `${e.title} at ${e.company}`)
            .join(', '),
        }),
      });
      const data = await res.json();
      if (data.success && data.data.questions) {
        setQuestions(data.data.questions);
        setPhase('interview');
        setAnswerText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Phase 2: Submit Answer ──────────────────────────────────────────────────
  const handleSubmitAnswer = async () => {
    const q = questions[currentQuestion];
    if (!answerText.trim()) {
      alert(t(lang, 'intWriteFirst'));
      return;
    }

    setAnswer(q.id, answerText);
    setLoading(true);

    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          question: q.text,
          answer: answerText,
          targetRole,
          targetTrack,
          questionId: q.id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        addEvaluation(data.data.evaluation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    if (currentQuestion < questions.length - 1) {
      nextQuestion();
      setAnswerText(answers[questions[currentQuestion + 1]?.id] || '');
    } else {
      await handleFinish();
    }
  };

  // ─── Phase 3: Generate Report ─────────────────────────────────────────────
  const handleFinish = async () => {
    setPhase('evaluating');
    setLoading(true);
    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'report',
          evaluations,
          targetRole,
          targetTrack,
          lang,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReport(data.data.report);
        setPhase('report');
      }
    } catch (err) {
      console.error(err);
      setPhase('report');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevQ = () => {
    prevQuestion();
    setAnswerText(answers[questions[currentQuestion - 1]?.id] || '');
  };

  // ─── RENDER: SETUP ────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <p className="eyebrow">Tool 4 — AI Mock Interview</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>
            {t(lang, 'intTitle')}
          </h2>
          <p style={{ color: 'var(--dim)', fontSize: 14 }}>{t(lang, 'intSub')}</p>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            ⚙️ {t(lang, 'intSetup')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 6, fontWeight: 600 }}>
                {t(lang, 'intRole')}
              </label>
              <input
                placeholder={lang === 'ar' ? 'مهندس برمجيات أول' : 'Senior Software Engineer'}
                value={roleInput}
                onChange={e => setRoleInput(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 6, fontWeight: 600 }}>
                {t(lang, 'intTrack')}
              </label>
              <select
                value={trackInput}
                onChange={e => setTrackInput(e.target.value as TrackKey)}
                style={{ width: '100%' }}
              >
                <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select specialization...'}</option>
                <optgroup label={lang === 'ar' ? 'التقنية' : 'Technology'}>
                  {TRACK_OPTIONS.filter(o => ['software','cyber','data','ai','devops'].includes(o.value)).map(o => (
                    <option key={o.value} value={o.value}>{lang === 'ar' ? o.labelAr : o.labelEn}</option>
                  ))}
                </optgroup>
                <optgroup label={lang === 'ar' ? 'الأعمال' : 'Business'}>
                  {TRACK_OPTIONS.filter(o => ['product','project','hr','ba','ops'].includes(o.value)).map(o => (
                    <option key={o.value} value={o.value}>{lang === 'ar' ? o.labelAr : o.labelEn}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* CV data preview */}
          {cvData.fullName && (
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--pb)', fontWeight: 700, marginBottom: 6 }}>
                ✦ {lang === 'ar' ? 'سيستخدم الذكاء الاصطناعي سيرتك الذاتية' : 'AI will use your CV profile'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--dim)' }}>
                {cvData.fullName} · {cvData.experience.length} {lang === 'ar' ? 'خبرات' : 'positions'} · {cvData.skills.slice(0, 4).join(', ')}
              </div>
            </div>
          )}
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
          onClick={handleStart}
          disabled={isLoading}
        >
          {isLoading ? (
            <><div className="spinner" />{lang === 'ar' ? 'جاري إنشاء الأسئلة...' : 'Generating questions...'}</>
          ) : `🎙️ ${t(lang, 'intStart')}`}
        </button>
      </div>
    );
  }

  // ─── RENDER: EVALUATING ───────────────────────────────────────────────────
  if (phase === 'evaluating') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', maxWidth: 480, margin: '0 auto' }}>
        <div className="spinner" style={{ width: 48, height: 48, margin: '0 auto 24px', borderWidth: 3 }} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
          {lang === 'ar' ? 'جاري تحليل إجاباتك...' : 'Analyzing your answers...'}
        </h3>
        <p style={{ color: 'var(--dim)', fontSize: 14 }}>
          {lang === 'ar' ? 'يقيّم الذكاء الاصطناعي أداءك في 4 محاور' : 'AI is scoring your performance across 4 dimensions'}
        </p>
      </div>
    );
  }

  // ─── RENDER: INTERVIEW ─────────────────────────────────────────────────────
  if (phase === 'interview') {
    const q = questions[currentQuestion];
    if (!q) return null;
    const total = questions.length;
    const pct = Math.round((currentQuestion / total) * 100);
    const currentEval = evaluations.find(e => e.questionId === q.id);
    const isLast = currentQuestion === total - 1;

    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              {lang === 'ar' ? `سؤال ${currentQuestion + 1} من ${total}` : `Question ${currentQuestion + 1} of ${total}`}
            </span>
            <span style={{ fontSize: 12, color: 'var(--pb)', fontWeight: 600 }}>{pct}%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        </div>

        {/* Question */}
        <div className="card animate-fade-in" style={{ marginBottom: 16 }}>
          {/* Category badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--pd)', border: '1px solid var(--border-b)',
              borderRadius: 100, padding: '4px 12px', fontSize: 11, color: 'var(--neon)', fontWeight: 600,
            }}>
              {CAT_ICONS[q.category] || '❓'} {q.category}
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
              Q{currentQuestion + 1}/{total}
            </span>
          </div>

          {/* Question text */}
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, lineHeight: 1.55, marginBottom: 24, color: 'var(--text)' }}>
            {q.text}
          </p>

          {/* Answer */}
          <label style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontWeight: 600 }}>
            {t(lang, 'intAnswer')}
          </label>
          <textarea
            rows={6}
            placeholder={t(lang, 'intAnswerPlaceholder')}
            value={answerText || answers[q.id] || ''}
            onChange={e => setAnswerText(e.target.value)}
            style={{
              width: '100%', resize: 'vertical', lineHeight: 1.7, fontSize: 14,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '12px 14px', color: 'var(--text)',
              fontFamily: 'inherit', outline: 'none',
            }}
          />

          {/* Word count hint */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
              {(answerText || answers[q.id] || '').split(' ').filter(Boolean).length} {lang === 'ar' ? 'كلمة' : 'words'}
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
              {lang === 'ar' ? '💡 كن محددًا واستخدم الأرقام والأمثلة' : '💡 Be specific — use numbers and real examples'}
            </span>
          </div>

          {/* Previous eval feedback */}
          {currentEval && (
            <div style={{ marginTop: 16, padding: 12, background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--pb)', fontWeight: 700, marginBottom: 8 }}>
                ✦ {lang === 'ar' ? 'تقييم هذا السؤال' : 'Previous evaluation'}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                {[
                  { k: 'clarity', l: t(lang, 'intClarity') },
                  { k: 'depth', l: t(lang, 'intDepth') },
                  { k: 'confidence', l: t(lang, 'intConfidence') },
                  { k: 'relevance', l: t(lang, 'intRelevance') },
                ].map(({ k, l }) => {
                  const val = (currentEval as Record<string, number>)[k];
                  return (
                    <div key={k} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: scoreColor(val), fontFamily: 'var(--font-display)' }}>{val}%</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>{l}</div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.6 }}>{currentEval.feedback}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {evaluations.length}/{total} {lang === 'ar' ? 'مقيّم' : 'evaluated'}
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            {currentQuestion > 0 && (
              <button className="btn-secondary" style={{ padding: '10px 18px', fontSize: 13 }} onClick={handlePrevQ}>
                {t(lang, 'intPrev')}
              </button>
            )}
            <button
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: 13 }}
              onClick={handleSubmitAnswer}
              disabled={isLoading}
            >
              {isLoading
                ? <><div className="spinner" style={{ width: 16, height: 16 }} />{t(lang, 'loading')}</>
                : isLast ? t(lang, 'intFinish') : t(lang, 'intNext')
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER: REPORT ───────────────────────────────────────────────────────
  if (phase === 'report' && report) {
    const metrics = [
      { key: 'clarity', label: t(lang, 'intClarity') },
      { key: 'depth', label: t(lang, 'intDepth') },
      { key: 'confidence', label: t(lang, 'intConfidence') },
      { key: 'relevance', label: t(lang, 'intRelevance') },
    ];

    return (
      <div style={{ maxWidth: 680, margin: '0 auto' }} className="animate-fade-in">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p className="eyebrow">Interview Complete</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,34px)', fontWeight: 800, letterSpacing: -1, marginBottom: 8 }}>
            {t(lang, 'intReport')}
          </h2>
        </div>

        {/* Overall Score */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%', margin: '0 auto 16px',
            border: `4px solid ${scoreColor(report.overallScore || 0)}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'var(--card)',
            boxShadow: `0 0 40px ${scoreColor(report.overallScore || 0)}30`,
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: scoreColor(report.overallScore || 0), lineHeight: 1 }}>
              {report.overallScore}
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>/100</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: scoreColor(report.overallScore || 0) }}>
            {(report.overallScore || 0) >= 75
              ? (lang === 'ar' ? 'أداء قوي 🌟' : 'Strong Performance 🌟')
              : (report.overallScore || 0) >= 55
              ? (lang === 'ar' ? 'تقدم جيد 📈' : 'Good Progress 📈')
              : (lang === 'ar' ? 'استمر في التدرب 💪' : 'Keep Practicing 💪')
            }
          </div>
        </div>

        {/* Metrics */}
        <div className="card" style={{ marginBottom: 20 }}>
          {metrics.map(m => {
            const val = (report as Record<string, number>)[m.key] || 0;
            return (
              <div key={m.key} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{m.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: scoreColor(val), fontFamily: 'var(--font-display)' }}>{val}%</span>
                </div>
                <div style={{ height: 7, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 4, width: `${val}%`,
                    background: scoreColor(val), transition: 'width 1.2s ease .2s',
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strengths */}
        {report.strengths && report.strengths.length > 0 && (
          <div className="card" style={{ marginBottom: 16, borderColor: 'rgba(52,211,153,.25)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#34D399', marginBottom: 12 }}>
              ✅ {t(lang, 'intStrengths')}
            </div>
            {(lang === 'ar' ? report.strengthsAr : report.strengths)?.map((s:any, i:number) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#34D399', flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* Improvement Suggestions */}
        {report.suggestions && report.suggestions.length > 0 && (
          <div className="card" style={{ marginBottom: 24, borderColor: 'rgba(252,211,77,.25)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FCD34D', marginBottom: 12 }}>
              💡 {t(lang, 'intImprove')}
            </div>
            {(lang === 'ar' ? report.suggestionsAr : report.suggestions)?.map((s:any, i:number) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--pb)', flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* Per-question breakdown */}
        {report.evaluations && report.evaluations.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
              {lang === 'ar' ? 'تفصيل الأسئلة' : 'Per-Question Breakdown'}
            </h4>
            {report.evaluations.map((ev:any, i:number) => {
              const q = questions.find(q => q.id === ev.questionId);
              const avg = Math.round((ev.clarity + ev.depth + ev.confidence + ev.relevance) / 4);
              return (
                <div key={i} style={{
                  background: 'var(--surface)', borderRadius: 10, padding: 14,
                  border: '1px solid var(--border)', marginBottom: 10,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--dim)', flex: 1, lineHeight: 1.4 }}>
                      {q?.text.substring(0, 80)}...
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: scoreColor(avg), flexShrink: 0, marginLeft: 12 }}>
                      {avg}%
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{ev.feedback}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center', padding: '11px 22px', fontSize: 13 }}
            onClick={() => { reset(); setAnswerText(''); }}
          >
            {t(lang, 'intRetry')}
          </button>
          <button
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '11px 22px', fontSize: 13 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {lang === 'ar' ? '⬆ العودة للأعلى' : '⬆ Back to Top'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
