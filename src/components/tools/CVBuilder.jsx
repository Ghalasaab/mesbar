import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { CV_ENHANCEMENTS } from '../../data/careerData';
import styles from './CVBuilder.module.css';

/* ── LOCAL FALLBACK ENHANCER (no API needed for demo) ── */
function localEnhanceBullet(line) {
  const lower = line.toLowerCase();
  for (const rule of CV_ENHANCEMENTS) {
    const matched = rule.match.some(word => lower.includes(word));
    if (matched) return rule.result;
  }
  // Generic enhancement
  const clean = line.trim();
  const cap = clean.charAt(0).toUpperCase() + clean.slice(1);
  return cap.replace(/\.$/, '') + ', contributing to measurable improvements in team productivity and organizational efficiency.';
}

function localATSScore({ name, role, skills, experience, projects }) {
  let score = 40;
  if (name?.length > 2) score += 8;
  if (role?.length > 3) score += 10;
  const skillCount = skills?.split(',').filter(s => s.trim()).length || 0;
  score += Math.min(skillCount * 3, 18);
  const expLines = experience?.split('\n').filter(l => l.trim()).length || 0;
  score += Math.min(expLines * 4, 16);
  if (projects?.trim().length > 10) score += 8;
  return Math.min(score, 96);
}

export default function CVBuilder() {
  const { lang, t } = useLang();

  const [form, setForm] = useState({
    name: '', role: '', domain: '', education: '', skills: '', experience: '', projects: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showATS, setShowATS] = useState(false);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  /* ── ENHANCE ── */
  const handleEnhance = async () => {
    if (!form.name || !form.experience) {
      alert(lang === 'ar' ? 'يرجى إدخال الاسم والخبرة على الأقل' : 'Please enter at least your name and experience');
      return;
    }
    setLoading(true);
    try {
      let enhanced;
      try {
        // Try API first
        const res = await fetch('/api/enhance-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, lang }),
        });
        if (res.ok) {
          const data = await res.json();
          enhanced = data;
        } else throw new Error('API unavailable');
      } catch {
        // Fallback to local
        const lines = form.experience.split('\n').filter(l => l.trim());
        const bullets = lines.map(localEnhanceBullet);
        const score = localATSScore(form);
        const skillCount = form.skills.split(',').filter(s => s.trim()).length;
        enhanced = {
          bullets,
          atsScore: score,
          keywordsFound: Math.floor(skillCount * 0.7) + 2,
          skillCoverage: Math.min(skillCount * 12, 92),
          structureScore: score > 70 ? 88 : 72,
          suggestions: lang === 'ar'
            ? ['أضف أرقامًا ونسبًا مئوية لتقوية تأثير نقاطك', 'تأكد من استخدام الكلمات المفتاحية الموجودة في وصف الوظيفة', 'أضف المشاريع ذات الصلة لتحسين تغطية المهارات']
            : ['Add specific numbers and percentages to strengthen impact', 'Include keywords directly from the job description', 'Add relevant projects to improve skill coverage score'],
        };
      }
      setResult(enhanced);
    } finally {
      setLoading(false);
    }
  };

  /* ── EXPORT PDF ── */
  const exportPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const isAr = lang === 'ar';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(form.name || 'Candidate', 20, 28);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(100, 70, 200);
    doc.text(form.role || 'Professional', 20, 38);
    doc.setTextColor(0, 0, 0);

    let y = 52;

    if (form.education) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(isAr ? 'التعليم' : 'EDUCATION', 20, y);
      doc.setDrawColor(100, 70, 200);
      doc.line(20, y + 2, 190, y + 2);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(form.education, 20, y);
      y += 14;
    }

    if (form.skills) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(isAr ? 'المهارات' : 'SKILLS', 20, y);
      doc.line(20, y + 2, 190, y + 2);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const skillLines = doc.splitTextToSize(form.skills, 170);
      doc.text(skillLines, 20, y);
      y += skillLines.length * 6 + 8;
    }

    if (result?.bullets?.length) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(isAr ? 'الخبرة العملية' : 'EXPERIENCE', 20, y);
      doc.line(20, y + 2, 190, y + 2);
      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      result.bullets.forEach(b => {
        const lines = doc.splitTextToSize('• ' + b, 168);
        if (y + lines.length * 5 > 270) { doc.addPage(); y = 20; }
        doc.text(lines, 22, y);
        y += lines.length * 5.5 + 4;
      });
    }

    if (form.projects) {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(isAr ? 'المشاريع' : 'PROJECTS', 20, y);
      doc.line(20, y + 2, 190, y + 2);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const pLines = doc.splitTextToSize(form.projects, 170);
      doc.text(pLines, 20, y);
    }

    // ATS Score watermark
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(8);
    doc.text(`ATS Score: ${result?.atsScore || '--'}/100 · Generated by Mesbar مسبار`, 20, 287);
    doc.save(`${form.name || 'CV'}_Mesbar.pdf`);
  };

  const scoreLabel = (s) => {
    if (s >= 80) return t('cv.excellent');
    if (s >= 65) return t('cv.good');
    return t('cv.needsWork');
  };

  const scoreColor = (s) => {
    if (s >= 80) return '#6EE7B7';
    if (s >= 65) return '#FCD34D';
    return '#FCA5A5';
  };

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t('cv.eyebrow')}</span>
        <h1 className={styles.title}>{t('cv.title')}</h1>
        <p className={styles.sub}>{t('cv.sub')}</p>

        {/* ATS Info Banner */}
        <button className={styles.atsToggle} onClick={() => setShowATS(prev => !prev)}>
          ℹ {t('cv.whatIsATS')} {showATS ? '▲' : '▼'}
        </button>
        {showATS && (
          <div className={styles.atsInfo}>
            <p>{t('cv.atsExplain')}</p>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {/* Form */}
        <div className={styles.formPanel}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('cv.fullName')}</label>
              <input
                className={styles.input}
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder={lang === 'ar' ? 'أحمد الرشيدي' : 'Ahmed Al-Rashidi'}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('cv.targetRole')}</label>
              <input
                className={styles.input}
                type="text"
                value={form.role}
                onChange={e => update('role', e.target.value)}
                placeholder={lang === 'ar' ? 'محلل أمن سيبراني' : 'Cybersecurity Analyst'}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('cv.domain')}</label>
              <select className={styles.select} value={form.domain} onChange={e => update('domain', e.target.value)}>
                <option value="">{t('cv.selectDomain')}</option>
                <optgroup label={lang === 'ar' ? 'التقنية' : 'Technology'}>
                  <option value="cyber">{lang === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity'}</option>
                  <option value="software">{lang === 'ar' ? 'هندسة البرمجيات' : 'Software Engineering'}</option>
                  <option value="data">{lang === 'ar' ? 'تحليل البيانات' : 'Data Analysis'}</option>
                  <option value="ai">{lang === 'ar' ? 'الذكاء الاصطناعي' : 'AI / Machine Learning'}</option>
                  <option value="devops">{lang === 'ar' ? 'DevOps / السحابة' : 'DevOps / Cloud'}</option>
                </optgroup>
                <optgroup label={lang === 'ar' ? 'إدارة الأعمال' : 'Business & Management'}>
                  <option value="product">{lang === 'ar' ? 'إدارة المنتج' : 'Product Management'}</option>
                  <option value="project">{lang === 'ar' ? 'إدارة المشاريع' : 'Project Management'}</option>
                  <option value="hr">{lang === 'ar' ? 'الموارد البشرية' : 'Human Resources'}</option>
                  <option value="ba">{lang === 'ar' ? 'تحليل الأعمال' : 'Business Analysis'}</option>
                  <option value="ops">{lang === 'ar' ? 'إدارة العمليات' : 'Operations Management'}</option>
                </optgroup>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('cv.education')}</label>
              <input
                className={styles.input}
                type="text"
                value={form.education}
                onChange={e => update('education', e.target.value)}
                placeholder={t('cv.educationPlaceholder')}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('cv.skills')}</label>
            <input
              className={styles.input}
              type="text"
              value={form.skills}
              onChange={e => update('skills', e.target.value)}
              placeholder={t('cv.skillsPlaceholder')}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('cv.experience')}</label>
            <textarea
              className={styles.textarea}
              rows={5}
              value={form.experience}
              onChange={e => update('experience', e.target.value)}
              placeholder={t('cv.expPlaceholder')}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('cv.projects')}</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={form.projects}
              onChange={e => update('projects', e.target.value)}
              placeholder={t('cv.projectsPlaceholder')}
            />
          </div>

          <button className={styles.enhanceBtn} onClick={handleEnhance} disabled={loading}>
            {loading ? (
              <><span className={styles.spinner} />{t('cv.enhancing')}</>
            ) : t('cv.enhanceBtn')}
          </button>
        </div>

        {/* Output Panel */}
        <div className={styles.outputPanel}>
          {!result && !loading && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📄</div>
              <p>{lang === 'ar' ? 'ستظهر نتائج السيرة المحسّنة هنا' : 'Enhanced CV results will appear here'}</p>
            </div>
          )}

          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.loadSpinner} />
              <p>{t('cv.enhancing')}</p>
            </div>
          )}

          {result && !loading && (
            <div className={styles.resultPanel} style={{ animation: 'fadeIn 0.4s ease' }}>
              {/* ATS Score */}
              <div className={styles.scoreCard}>
                <div className={styles.scoreTop}>
                  <div>
                    <div className={styles.scoreTitle}>{t('cv.atsScore')}</div>
                    <div className={styles.scoreLabel} style={{ color: scoreColor(result.atsScore) }}>
                      {scoreLabel(result.atsScore)}
                    </div>
                  </div>
                  <div className={styles.scoreBig} style={{ color: scoreColor(result.atsScore) }}>
                    {result.atsScore}<span className={styles.scoreOf}>/100</span>
                  </div>
                </div>
                <div className={styles.scoreBar}>
                  <div className={styles.scoreBarFill} style={{ width: `${result.atsScore}%`, background: scoreColor(result.atsScore) }} />
                </div>

                {/* Sub metrics */}
                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>{t('cv.keywordsFound')}</span>
                    <span className={styles.metricVal}>{result.keywordsFound}</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>{t('cv.skillCoverage')}</span>
                    <span className={styles.metricVal}>{result.skillCoverage}%</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>{t('cv.structure')}</span>
                    <span className={styles.metricVal}>{result.structureScore}%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced bullets */}
              {result.bullets?.length > 0 && (
                <div className={styles.bulletsSection}>
                  <div className={styles.bulletsTitle}>{t('cv.aiEnhanced')}</div>
                  {result.bullets.map((b, i) => (
                    <div key={i} className={styles.bulletItem}>
                      <span className={styles.bulletArrow}>▸</span>
                      <span className={styles.bulletText}>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className={styles.suggestSection}>
                  <div className={styles.suggestTitle}>✦ {t('cv.suggestions')}</div>
                  {result.suggestions.map((s, i) => (
                    <div key={i} className={styles.suggestItem}>
                      <span className={styles.suggestDot}>•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className={styles.outputActions}>
                <button className={styles.pdfBtn} onClick={exportPDF}>
                  ⬇ {t('cv.exportPDF')}
                </button>
                <button className={styles.retryBtn} onClick={() => setResult(null)}>
                  {t('cv.tryAgain')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
