import { useState, useCallback } from 'react';
import { useLang } from '../../context/LangContext';
import { INTERVIEW_QUESTIONS, INTERVIEW_ROLES } from '../../data/careerData';
import styles from './MockInterview.module.css';

const MIN_WORDS = 20;

function scoreAnswer(answer) {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const techKws = ['implement','build','analyze','design','develop','optimize','deploy','architect','configure','monitor','secure','test','debug','migrate','integrate','automate','scale'];
  const bizKws  = ['manage','lead','coordinate','prioritize','strategy','stakeholder','deliver','plan','align','facilitate','communicate','resolve','negotiate','evaluate','present','report'];
  const allKws  = [...techKws, ...bizKws];
  const lower = answer.toLowerCase();
  const kwCount = allKws.filter(k => lower.includes(k)).length;
  const hasNumbers = /\d+/.test(answer);
  const hasStructure = answer.includes('first') || answer.includes('then') || answer.includes('finally') || answer.includes('أولًا') || answer.includes('ثم');

  const clarity    = Math.min(95, 42 + Math.min(words, 40) + (hasStructure ? 12 : 0) + (kwCount * 2));
  const depth      = Math.min(92, 36 + Math.min(words * 1.1, 38) + (kwCount * 3) + (hasNumbers ? 8 : 0));
  const confidence = Math.min(94, 48 + Math.min(words * .9, 30) + (kwCount * 2) + (hasStructure ? 10 : 0));
  const relevance  = Math.min(96, 40 + Math.min(words, 35) + (kwCount * 3) + (hasNumbers ? 6 : 0));

  return {
    clarity: Math.round(clarity),
    depth: Math.round(depth),
    confidence: Math.round(confidence),
    relevance: Math.round(relevance),
  };
}

const TIPS = {
  en: [
    'Use the STAR method (Situation, Task, Action, Result) to structure your answers clearly.',
    'Include specific numbers and percentages — "reduced downtime by 40%" is far stronger than "improved performance".',
    'Practice answering concisely within 90–120 seconds to maintain interviewer engagement.',
    'Mirror keywords from the job description in your answers to signal domain alignment.',
    'End each answer with a clear outcome or lesson learned — never trail off without a conclusion.',
  ],
  ar: [
    'استخدم طريقة STAR (الموقف، المهمة، الإجراء، النتيجة) لهيكلة إجاباتك بوضوح.',
    'أضف أرقامًا ونسبًا مئوية محددة — "قللت وقت التوقف بنسبة 40%" أقوى بكثير من "حسّنت الأداء".',
    'تدرب على الإجابة باختصار خلال 90-120 ثانية للحفاظ على تفاعل المقابل.',
    'استخدم الكلمات المفتاحية من وصف الوظيفة في إجاباتك للإشارة إلى التوافق مع المجال.',
    'اختم كل إجابة بنتيجة واضحة أو درس مستفاد — لا تتركها دون خاتمة.',
  ],
};

export default function MockInterview() {
  const { lang, t } = useLang();
  const [step, setStep] = useState('setup'); // 'setup' | 'interview' | 'result'
  const [role, setRole] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [draft, setDraft] = useState('');

  const questions = INTERVIEW_QUESTIONS[role] || INTERVIEW_QUESTIONS.cyber;
  const qs = lang === 'ar' ? questions.ar : questions.en;
  const total = qs.length;

  const startInterview = () => {
    if (!role) { alert(lang === 'ar' ? 'يرجى اختيار الدور أولًا' : 'Please select a role first'); return; }
    setStep('interview');
    setCurrentQ(0);
    setAnswers({});
    setScores({});
    setDraft('');
  };

  const submitAnswer = useCallback(async () => {
    if (!draft.trim()) return;
    const words = draft.trim().split(/\s+/).length;
    if (words < MIN_WORDS) {
      alert(t('interview.shortAnswer'));
      return;
    }
    setAnalyzing(true);
    let sc;
    try {
      const res = await fetch('/api/score-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: qs[currentQ], answer: draft, role, lang }),
      });
      if (res.ok) sc = await res.json();
      else throw new Error();
    } catch {
      sc = scoreAnswer(draft);
    }
    setAnswers(prev => ({ ...prev, [currentQ]: draft }));
    setScores(prev => ({ ...prev, [currentQ]: sc }));
    setAnalyzing(false);

    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setDraft('');
    } else {
      setStep('result');
    }
  }, [draft, currentQ, total, qs, role, lang, t]);

  /* ── AVG SCORES ── */
  const avg = (key) => {
    const vals = Object.values(scores).map(s => s[key]).filter(Boolean);
    if (!vals.length) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const metrics = [
    { key: 'clarity',    en: t('interview.clarity'),       icon: '💬' },
    { key: 'depth',      en: t('interview.technicalDepth'), icon: '🔬' },
    { key: 'confidence', en: t('interview.confidence'),    icon: '💪' },
    { key: 'relevance',  en: t('interview.relevance'),     icon: '🎯' },
  ];

  const overall = Math.round(metrics.reduce((s, m) => s + avg(m.key), 0) / metrics.length);

  const scoreColor = (v) => v >= 75 ? '#6EE7B7' : v >= 55 ? '#FCD34D' : '#FCA5A5';
  const overallLabel = overall >= 75 ? t('interview.strong') : overall >= 55 ? t('interview.good') : t('interview.keepPracticing');

  /* ═══════════ SETUP ═══════════ */
  if (step === 'setup') {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t('interview.eyebrow')}</span>
          <h1 className={styles.title}>{t('interview.title')}</h1>
          <p className={styles.sub}>{t('interview.sub')}</p>
        </div>

        <div className={styles.setupCard}>
          <h2 className={styles.setupTitle}>{t('interview.setup')}</h2>

          <div className={styles.roleGrid}>
            <div className={styles.roleGroup}>
              <div className={styles.roleGroupLabel}>⬡ {t('domains.tech')}</div>
              {INTERVIEW_ROLES.filter(r => r.domain === 'tech').map(r => (
                <button
                  key={r.key}
                  className={`${styles.roleCard} ${role === r.key ? styles.roleCardActiveTech : ''}`}
                  onClick={() => setRole(r.key)}
                >
                  <span className={styles.roleIcon}>{r.key === 'cyber' ? '🛡️' : r.key === 'software' ? '💻' : '📊'}</span>
                  <span>{lang === 'ar' ? r.ar : r.en}</span>
                  {role === r.key && <span className={styles.roleCheck}>✓</span>}
                </button>
              ))}
            </div>
            <div className={styles.roleGroup}>
              <div className={styles.roleGroupLabel}>◈ {t('domains.biz')}</div>
              {INTERVIEW_ROLES.filter(r => r.domain === 'biz').map(r => (
                <button
                  key={r.key}
                  className={`${styles.roleCard} ${role === r.key ? styles.roleCardActiveBiz : ''}`}
                  onClick={() => setRole(r.key)}
                >
                  <span className={styles.roleIcon}>{r.key === 'product' ? '🚀' : r.key === 'project' ? '📋' : '📈'}</span>
                  <span>{lang === 'ar' ? r.ar : r.en}</span>
                  {role === r.key && <span className={styles.roleCheck}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.metricsPreview}>
            <div className={styles.metricsPreviewLabel}>{lang === 'ar' ? 'محاور التقييم' : 'Evaluation Metrics'}</div>
            <div className={styles.metricsPreviewRow}>
              {metrics.map(m => (
                <div key={m.key} className={styles.metricPreviewItem}>
                  <span className={styles.metricIcon}>{m.icon}</span>
                  <span>{m.en}</span>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.startBtn} onClick={startInterview} disabled={!role}>
            {t('interview.startInterview')} →
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════ INTERVIEW ═══════════ */
  if (step === 'interview') {
    const prog = Math.round((currentQ / total) * 100);
    return (
      <div className={styles.wrap}>
        <div className={styles.intHeader}>
          <div className={styles.intHeaderTop}>
            <div className={styles.intRole}>
              {INTERVIEW_ROLES.find(r => r.key === role)?.[lang === 'ar' ? 'ar' : 'en'] || role}
            </div>
            <div className={styles.intProgress}>
              {t('interview.question')} {currentQ + 1} / {total}
            </div>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${prog}%` }} />
          </div>
        </div>

        <div className={styles.qSection}>
          <div className={styles.qCard}>
            <div className={styles.qNum}>Q{currentQ + 1}</div>
            <p className={styles.qText}>{qs[currentQ]}</p>
          </div>

          <div className={styles.answerSection}>
            <label className={styles.answerLabel}>{t('interview.typeAnswer')}</label>
            <textarea
              className={styles.answerBox}
              rows={7}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder={t('interview.typeAnswer')}
              disabled={analyzing}
            />
            <div className={styles.wordCount}>
              {draft.trim().split(/\s+/).filter(Boolean).length} {lang === 'ar' ? 'كلمة' : 'words'}
              {draft.trim().split(/\s+/).filter(Boolean).length < MIN_WORDS && (
                <span className={styles.wordMin}> (min {MIN_WORDS})</span>
              )}
            </div>
          </div>

          <button
            className={styles.submitBtn}
            onClick={submitAnswer}
            disabled={analyzing || !draft.trim()}
          >
            {analyzing ? (
              <><span className={styles.spinner} />{t('interview.analyzing')}</>
            ) : currentQ < total - 1 ? t('interview.next') + ' →' : t('interview.finish')}
          </button>

          {/* Dot progress */}
          <div className={styles.dotRow}>
            {qs.map((_, i) => (
              <div key={i} className={`${styles.dot} ${i === currentQ ? styles.dotActive : ''} ${scores[i] ? styles.dotDone : ''}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════ RESULT ═══════════ */
  if (step === 'result') {
    const tips = lang === 'ar' ? TIPS.ar : TIPS.en;
    return (
      <div className={styles.wrap}>
        <div className={styles.reportCard} style={{ animation: 'fadeIn .4s ease' }}>
          {/* Overall score */}
          <div className={styles.overallSection}>
            <div className={styles.overallLabel}>{t('interview.report')}</div>
            <div className={styles.overallScore} style={{ color: scoreColor(overall) }}>
              {overall}<span className={styles.overallOf}>/100</span>
            </div>
            <div className={styles.overallLabel2} style={{ color: scoreColor(overall) }}>{overallLabel}</div>
          </div>

          {/* 4 Metrics */}
          <div className={styles.metricsGrid}>
            {metrics.map(m => {
              const v = avg(m.key);
              return (
                <div key={m.key} className={styles.metricCard}>
                  <div className={styles.metricTop}>
                    <span className={styles.metricIconBig}>{m.icon}</span>
                    <span className={styles.metricName}>{m.en}</span>
                    <span className={styles.metricScore} style={{ color: scoreColor(v) }}>{v}%</span>
                  </div>
                  <div className={styles.metricBar}>
                    <div className={styles.metricBarFill} style={{ width: `${v}%`, background: scoreColor(v) }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className={styles.tipsSection}>
            <div className={styles.tipsTitle}>{t('interview.tips')}</div>
            {tips.map((tip, i) => (
              <div key={i} className={styles.tipItem}>
                <span className={styles.tipNum}>{i + 1}</span>
                <span className={styles.tipText}>{tip}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.reportActions}>
            <button className={styles.retryBtn} onClick={() => { setStep('setup'); setRole(''); }}>
              ↺ {t('interview.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
