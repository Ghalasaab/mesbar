import { useState, useCallback } from 'react';
import { useLang } from '../../context/LangContext';
import { SJT_QUESTIONS, TRACKS } from '../../data/careerData';
import styles from './CareerTest.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function CareerTest({ onComplete }) {
  const { lang, t } = useLang();
  const [step, setStep] = useState('intro'); // 'intro' | 'test' | 'result'
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const total = SJT_QUESTIONS.length;
  const progress = Math.round((currentQ / total) * 100);

  /* ── SELECT OPTION ── */
  const selectOption = useCallback((optIndex) => {
    setAnswers(prev => ({ ...prev, [currentQ]: optIndex }));
  }, [currentQ]);

  /* ── NAVIGATE ── */
  const goNext = () => {
    if (answers[currentQ] === undefined) {
      alert(t('test.selectFirst'));
      return;
    }
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const goPrev = () => {
    if (currentQ > 0) setCurrentQ(prev => prev - 1);
  };

  /* ── CALCULATE RESULTS ── */
  const calculateResults = () => {
    const scores = {};
    Object.keys(TRACKS).forEach(k => { scores[k] = 0; });

    SJT_QUESTIONS.forEach((q, qi) => {
      const ansIdx = answers[qi];
      if (ansIdx === undefined) return;
      const opt = q.opts[ansIdx];
      Object.entries(opt).forEach(([k, v]) => {
        if (k === 'en' || k === 'ar') return;
        if (scores[k] !== undefined) scores[k] += v;
      });
    });

    // Sort tracks by score
    const sorted = Object.entries(scores)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1]);

    const totalScore = sorted.reduce((s, [, v]) => s + v, 0) || 1;

    // Domain totals
    let techTotal = 0, bizTotal = 0;
    sorted.forEach(([k, v]) => {
      if (TRACKS[k]?.domain === 'tech') techTotal += v;
      else bizTotal += v;
    });
    const domainTotal = techTotal + bizTotal || 1;
    const techPct = Math.round((techTotal / domainTotal) * 100);
    const bizPct = 100 - techPct;

    const topDomain = techPct >= bizPct ? 'tech' : 'biz';
    const top = sorted[0] || ['software', 1];
    const topPct = Math.round((top[1] / totalScore) * 100);

    const breakdown = sorted.slice(0, 6).map(([k, v]) => ({
      key: k,
      track: TRACKS[k],
      pct: Math.round((v / totalScore) * 100),
      score: v,
    }));

    const res = {
      topTrackKey: top[0],
      topTrack: TRACKS[top[0]],
      topPct,
      topDomain,
      techPct,
      bizPct,
      breakdown,
      scores,
    };
    setResults(res);
    setStep('result');
  };

  /* ── RESET ── */
  const reset = () => {
    setStep('intro');
    setCurrentQ(0);
    setAnswers({});
    setResults(null);
  };

  /* ═══════════════ INTRO SCREEN ═══════════════ */
  if (step === 'intro') {
    return (
      <div className={styles.wrap}>
        <div className={styles.introCard}>
          <div className={styles.introBadge}>
            <span className={styles.badgeDot}></span>
            {t('test.eyebrow')}
          </div>
          <h1 className={styles.introTitle}>{t('test.title')}</h1>
          <p className={styles.introSub}>{t('test.sub')}</p>

          <div className={styles.domainRow}>
            <div className={styles.domainCard + ' ' + styles.domainTech}>
              <span className={styles.domainIcon}>⬡</span>
              <span className={styles.domainLabel}>{t('domains.tech')}</span>
              <div className={styles.domainTracks}>
                {['Software Engineering','Cybersecurity','Data Analysis','AI / ML','DevOps','UI/UX'].map(s => (
                  <span key={s} className={styles.trackPill}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.domainCard + ' ' + styles.domainBiz}>
              <span className={styles.domainIcon}>◈</span>
              <span className={styles.domainLabel}>{t('domains.biz')}</span>
              <div className={styles.domainTracks}>
                {['Product Management','Project Management','Business Analysis','HR','Operations'].map(s => (
                  <span key={s} className={styles.trackPillBiz}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <span className={styles.infoNum}>{total}</span>
              <span className={styles.infoLabel}>{lang === 'ar' ? 'سؤالًا' : 'Questions'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoNum}>~8</span>
              <span className={styles.infoLabel}>{lang === 'ar' ? 'دقائق' : 'Minutes'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoNum}>10</span>
              <span className={styles.infoLabel}>{lang === 'ar' ? 'مسارات' : 'Tracks'}</span>
            </div>
          </div>

          <button className={styles.startBtn} onClick={() => setStep('test')}>
            ◎ {lang === 'ar' ? 'ابدأ الاختبار الآن' : 'Start Test Now'}
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════ TEST SCREEN ═══════════════ */
  if (step === 'test') {
    const q = SJT_QUESTIONS[currentQ];
    const qText = lang === 'ar' ? q.q_ar : q.q_en;
    const selected = answers[currentQ];
    const isDomainTech = q.domain === 'tech';
    const isLast = currentQ === total - 1;

    return (
      <div className={styles.wrap}>
        {/* Progress header */}
        <div className={styles.progressHeader}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>
              {t('test.questionOf')} {currentQ + 1} {t('test.of')} {total}
            </span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${((currentQ + (selected !== undefined ? 1 : 0)) / total) * 100}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className={styles.qCard}>
          <div className={`${styles.domainBadge} ${isDomainTech ? styles.domainBadgeTech : styles.domainBadgeBiz}`}>
            {isDomainTech ? '⬡' : '◈'} {isDomainTech ? t('test.tech') : t('test.business')}
          </div>
          <p className={styles.qNum}>
            {t('test.questionOf').toUpperCase()} {currentQ + 1}
          </p>
          <h2 className={styles.qText}>{qText}</h2>

          {/* Options */}
          <div className={styles.optList}>
            {q.opts.map((opt, i) => {
              const optText = lang === 'ar' ? opt.ar : opt.en;
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  className={`${styles.opt} ${isSelected ? styles.optSelected : ''}`}
                  onClick={() => selectOption(i)}
                >
                  <span className={`${styles.optLetter} ${isSelected ? styles.optLetterSelected : ''}`}>
                    {LETTERS[i]}
                  </span>
                  <span className={styles.optText}>{optText}</span>
                  {isSelected && <span className={styles.optCheck}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.testNav}>
          <button
            className={styles.prevBtn}
            onClick={goPrev}
            disabled={currentQ === 0}
          >
            ← {t('test.prev')}
          </button>

          <div className={styles.dotNav}>
            {SJT_QUESTIONS.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentQ ? styles.dotActive : ''} ${answers[i] !== undefined ? styles.dotDone : ''}`}
                onClick={() => setCurrentQ(i)}
              />
            ))}
          </div>

          <button
            className={`${styles.nextBtn} ${isLast ? styles.finishBtn : ''}`}
            onClick={goNext}
          >
            {isLast ? t('test.finish') : t('test.next')} →
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════ RESULTS SCREEN ═══════════════ */
  if (step === 'result' && results) {
    const { topTrack, topPct, topDomain, techPct, bizPct, breakdown } = results;
    const trackName = lang === 'ar' ? topTrack?.ar : topTrack?.en;
    const isTech = topDomain === 'tech';

    return (
      <div className={styles.wrap}>
        <div className={styles.resultWrap}>
          <div className={styles.resultHeader}>
            <h1 className={styles.resultTitle}>{t('results.title')}</h1>
            <p className={styles.resultSub}>{t('results.sub')}</p>
          </div>

          {/* Domain Badge */}
          <div className={`${styles.domainBig} ${isTech ? styles.domainBigTech : styles.domainBigBiz}`}>
            <span style={{ fontSize: 22 }}>{isTech ? '⬡' : '◈'}</span>
            <div>
              <div className={styles.domainBigLabel}>{t('results.primaryDomain')}</div>
              <div className={styles.domainBigName}>
                {isTech ? t('results.techDomain') : t('results.bizDomain')}
              </div>
            </div>
            <div className={styles.domainSplit}>
              <span className={styles.domainSplitTech}>Tech {techPct}%</span>
              <div className={styles.domainSplitBar}>
                <div className={styles.domainSplitFill} style={{ width: `${techPct}%` }} />
              </div>
              <span className={styles.domainSplitBiz}>Biz {bizPct}%</span>
            </div>
          </div>

          {/* Top Match */}
          <div className={styles.topMatch}>
            <div className={styles.topMatchLabel}>{t('results.bestMatch')}</div>
            <div className={styles.topMatchName}>{trackName}</div>
            <div className={styles.topMatchPct}>{topPct}% {t('results.matchScore')}</div>
            <div className={styles.topMatchBar}>
              <div className={`${styles.topMatchFill} ${isTech ? styles.topMatchFillTech : styles.topMatchFillBiz}`} style={{ width: `${topPct}%` }} />
            </div>
          </div>

          {/* Breakdown */}
          <h3 className={styles.breakdownTitle}>{t('results.breakdownTitle')}</h3>
          <div className={styles.breakdown}>
            {breakdown.map(({ key, track, pct }) => {
              if (!track) return null;
              const name = lang === 'ar' ? track.ar : track.en;
              const tDomain = track.domain === 'tech';
              return (
                <div key={key} className={styles.bkItem}>
                  <div className={styles.bkTop}>
                    <span className={styles.bkName}>{name}</span>
                    <span className={`${styles.bkPct} ${tDomain ? styles.bkPctTech : styles.bkPctBiz}`}>{pct}%</span>
                  </div>
                  <div className={styles.bkTrack}>
                    <div className={`${styles.bkFill} ${tDomain ? styles.bkFillTech : styles.bkFillBiz}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`${styles.bkDomain} ${tDomain ? styles.bkDomainTech : styles.bkDomainBiz}`}>
                    {tDomain ? '⬡ ' + t('domains.tech') : '◈ ' + t('domains.biz')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className={styles.resultActions}>
            <button className={styles.retakeBtn} onClick={reset}>
              ↺ {t('results.retake')}
            </button>
            <button className={styles.cvBtn} onClick={() => onComplete?.('cv', results)}>
              {t('results.buildCV')} →
            </button>
            <button className={styles.dashBtn} onClick={() => onComplete?.('dashboard', results)}>
              {t('results.goDashboard')} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
