'use client';
// src/components/tools/CareerTest.tsx

import { useLangStore, useCareerTestStore } from '@/lib/store';
import { t } from '@/lib/translations';
import { SJT_QUESTIONS, TRACK_META } from '@/lib/questions';

interface Props {
  onResult: () => void;
}

export default function CareerTest({ onResult }: Props) {
  const { lang } = useLangStore();
  const {
    currentQuestion, answers, isSubmitting,
    setAnswer, nextQuestion, prevQuestion, setResult, setSubmitting,
  } = useCareerTestStore();

  const total = SJT_QUESTIONS.length;
  const q = SJT_QUESTIONS[currentQuestion];
  const pct = Math.round((currentQuestion / total) * 100);
  const selectedOpt = answers[q.id];
  const isLast = currentQuestion === total - 1;

  const handleNext = async () => {
    if (selectedOpt === undefined) {
      alert(t(lang, 'testSelectFirst'));
      return;
    }
    if (isLast) {
      await handleSubmit();
    } else {
      nextQuestion();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(([questionId, optionIndex]) => ({
        questionId,
        optionIndex,
      }));
      const res = await fetch('/api/career-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        onResult();
      }
    } catch (err) {
      console.error('Career test submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="eyebrow">Tool 1 — Career Path Test</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,34px)',
          fontWeight: 800, letterSpacing: -1, marginBottom: 10,
        }}>
          {t(lang, 'testTitle')}
        </h2>
        <p style={{ color: 'var(--dim)', fontSize: 14, maxWidth: 480, margin: '0 auto' }}>
          {t(lang, 'testSub')}
        </p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {t(lang, 'testQuestion')} {currentQuestion + 1} {t(lang, 'testOf')} {total}
          </span>
          <span style={{ fontSize: 12, color: 'var(--pb)', fontWeight: 600 }}>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="card animate-fade-in" key={q.id} style={{ marginBottom: 16 }}>
        {/* Domain badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, marginBottom: 16,
          ...(q.domain === 'tech'
            ? { background: 'rgba(99,102,241,.15)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,.35)' }
            : { background: 'rgba(16,185,129,.12)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,.3)' }
          ),
        }}>
          {q.domain === 'tech'
            ? `⬡ ${t(lang, 'testTechScenario')}`
            : `◈ ${t(lang, 'testBizScenario')}`}
        </span>

        <div style={{
          fontSize: 11, color: 'var(--pb)', fontWeight: 700,
          letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase',
        }}>
          Q{currentQuestion + 1}/{total}
        </div>

        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
          lineHeight: 1.55, marginBottom: 24, color: 'var(--text)',
        }}>
          {lang === 'ar' ? q.q_ar : q.q_en}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts.map((opt, i) => {
            const isSelected = selectedOpt === i;
            return (
              <button
                key={i}
                onClick={() => setAnswer(q.id, i)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '13px 16px', borderRadius: 10, cursor: 'pointer',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  background: isSelected ? 'rgba(123,79,255,.18)' : 'var(--surface)',
                  border: `1px solid ${isSelected ? 'var(--p)' : 'var(--border)'}`,
                  transition: 'all .2s', fontFamily: 'inherit', width: '100%',
                }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)',
                  background: isSelected ? 'var(--p)' : 'transparent',
                  border: `1px solid ${isSelected ? 'var(--p)' : 'var(--border-b)'}`,
                  color: isSelected ? '#fff' : 'var(--pb)',
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{
                  fontSize: 13, color: isSelected ? 'var(--text)' : 'var(--dim)',
                  lineHeight: 1.6, paddingTop: 3, flex: 1,
                }}>
                  {lang === 'ar' ? (opt as any).ar : opt.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 10,
      }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          {Object.keys(answers).length}/{total}&nbsp;
          {lang === 'ar' ? 'أجاب' : 'answered'}
        </span>
        <div style={{ display: 'flex', gap: 10 }}>
          {currentQuestion > 0 && (
            <button
              className="btn-secondary"
              style={{ padding: '10px 18px', fontSize: 13 }}
              onClick={prevQuestion}
            >
              {t(lang, 'testPrev')}
            </button>
          )}
          <button
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: 13 }}
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><div className="spinner" style={{ width: 16, height: 16 }} />{t(lang, 'loading')}</>
            ) : isLast ? t(lang, 'testFinish') : t(lang, 'testNext')}
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', marginTop: 16 }}>
        {lang === 'ar'
          ? 'اضغط على خيار للاختيار ثم انتقل للسؤال التالي'
          : 'Select an option then click Next — no right or wrong answers'}
      </p>
    </div>
  );
}
