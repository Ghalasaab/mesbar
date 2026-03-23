// src/components/tools/CvBuilder.tsx
'use client';
import { useState } from 'react';
import { useLangStore, useCvStore } from '@/lib/store';
import { t } from '@/lib/translations';
import type { CvExperience, CvEducation, CvProject, TrackKey } from '@/types';

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

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function CvBuilder() {
  const { lang } = useLangStore();
  const { cvData, atsResult, isEnhancing, setCvField, setCvData, setAtsResult, setEnhancing } = useCvStore();
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'ats'>('form');
  const [skillInput, setSkillInput] = useState('');

  const isRtl = lang === 'ar';

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const addExperience = () => {
    const exp: CvExperience = {
      id: uid(), company: '', title: '', startDate: '', endDate: '',
      current: false, bullets: [''],
    };
    setCvField('experience', [...cvData.experience, exp]);
  };

  const updateExp = (id: string, field: string, value: unknown) => {
    setCvField('experience', cvData.experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExp = (id: string) => {
    setCvField('experience', cvData.experience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const edu: CvEducation = {
      id: uid(), institution: '', degree: '', field: '',
      startYear: new Date().getFullYear() - 4, endYear: new Date().getFullYear(), current: false,
    };
    setCvField('education', [...cvData.education, edu]);
  };

  const updateEdu = (id: string, field: string, value: unknown) => {
    setCvField('education', cvData.education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeEdu = (id: string) => {
    setCvField('education', cvData.education.filter(e => e.id !== id));
  };

  const addSkill = () => {
    const sk = skillInput.trim();
    if (!sk || cvData.skills.includes(sk)) return;
    setCvField('skills', [...cvData.skills, sk]);
    setSkillInput('');
  };

  const removeSkill = (s: string) => {
    setCvField('skills', cvData.skills.filter(sk => sk !== s));
  };

  const addProject = () => {
    const proj: CvProject = { id: uid(), name: '', description: '', technologies: [] };
    setCvField('projects', [...cvData.projects, proj]);
  };

  const updateProject = (id: string, field: string, value: unknown) => {
    setCvField('projects', cvData.projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeProject = (id: string) => {
    setCvField('projects', cvData.projects.filter(p => p.id !== id));
  };

  // ─── AI Generate ───────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!cvData.fullName || !cvData.targetRole) {
      alert(lang === 'ar' ? 'يرجى إدخال الاسم والدور المستهدف أولاً' : 'Please enter your name and target role first');
      return;
    }
    setEnhancing(true);
    setActiveTab('ats');
    try {
      const res = await fetch('/api/cv-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, action: 'full' }),
      });
      const data = await res.json();
      if (data.success) {
        setAtsResult({
          score: data.data.atsScore,
          breakdown: data.data.atsBreakdown,
          missingKeywords: data.data.missingKeywords,
          suggestions: data.data.atsSuggestions,
          enhancedSummary: data.data.enhancedSummary,
          enhancedExperience: data.data.enhancedExperience,
        });
        if (data.data.enhancedExperience) {
          setCvField('experience', data.data.enhancedExperience);
        }
        if (data.data.enhancedSummary && !cvData.summary) {
          setCvField('summary', data.data.enhancedSummary);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  // ─── PDF Export (simple window.print approach) ─────────────────────────────
  const handleExportPdf = () => {
    window.print();
  };

  // ─── Scoring color ──────────────────────────────────────────────────────────
  const scoreColor = (s?: number) =>
    !s ? 'var(--muted)' : s >= 80 ? '#34D399' : s >= 60 ? '#FCD34D' : '#FCA5A5';

  const scoreLabel = (s?: number) => {
    if (!s) return '';
    if (s >= 80) return lang === 'ar' ? 'ممتاز' : 'Excellent';
    if (s >= 65) return lang === 'ar' ? 'جيد' : 'Good';
    return lang === 'ar' ? 'يحتاج تحسين' : 'Needs Improvement';
  };

  // ─── STYLES ─────────────────────────────────────────────────────────────────
  const inputStyle = {
    width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '10px 14px', color: 'var(--text)',
    fontFamily: 'inherit', fontSize: 14, outline: 'none',
  };
  const labelStyle = {
    display: 'block', fontSize: 11, color: 'var(--muted)',
    marginBottom: 6, fontWeight: 600,
  };
  const sectionTitle = {
    fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
    color: 'var(--text)', marginBottom: 16, paddingBottom: 10,
    borderBottom: '1px solid var(--border)',
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
        <p className="eyebrow">Tool 2 — ATS CV Builder</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>
          {t(lang, 'cvTitle')}
        </h2>
        <p style={{ color: 'var(--dim)', fontSize: 14, maxWidth: 560 }}>{t(lang, 'cvSub')}</p>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {[
          { key: 'form', label: lang === 'ar' ? 'إدخال البيانات' : 'Enter Details' },
          { key: 'preview', label: lang === 'ar' ? 'معاينة السيرة' : 'CV Preview' },
          { key: 'ats', label: lang === 'ar' ? 'تقييم ATS' : 'ATS Score' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              padding: '10px 16px', color: activeTab === tab.key ? 'var(--neon)' : 'var(--dim)',
              borderBottom: `2px solid ${activeTab === tab.key ? 'var(--p)' : 'transparent'}`,
              transition: 'all .2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══ FORM TAB ══════════════════════════════════════════════════════════ */}
      {activeTab === 'form' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Personal Info */}
          <div className="card">
            <h3 style={sectionTitle}>👤 {t(lang, 'cvPersonal')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
              {[
                { field: 'fullName', label: t(lang, 'cvFullName'), ph: lang === 'ar' ? 'أحمد الراشدي' : 'Ahmed Al-Rashidi' },
                { field: 'email', label: t(lang, 'cvEmail'), ph: 'ahmed@example.com' },
                { field: 'phone', label: t(lang, 'cvPhone'), ph: '+966 5X XXX XXXX' },
                { field: 'location', label: t(lang, 'cvLocation'), ph: lang === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia' },
                { field: 'linkedin', label: t(lang, 'cvLinkedin'), ph: 'linkedin.com/in/ahmed' },
                { field: 'github', label: t(lang, 'cvGithub'), ph: 'github.com/ahmed' },
              ].map(({ field, label, ph }) => (
                <div key={field}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    style={inputStyle}
                    placeholder={ph}
                    value={(cvData as Record<string, string>)[field] || ''}
                    onChange={e => setCvField(field as keyof typeof cvData, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Target */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <label style={labelStyle}>{t(lang, 'cvTargetRole')}</label>
                <input
                  style={inputStyle}
                  placeholder={lang === 'ar' ? 'محلل أمن سيبراني' : 'Cybersecurity Analyst'}
                  value={cvData.targetRole}
                  onChange={e => setCvField('targetRole', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>{t(lang, 'cvTargetTrack')}</label>
                <select
                  style={inputStyle}
                  value={cvData.targetTrack}
                  onChange={e => setCvField('targetTrack', e.target.value)}
                >
                  <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select track...'}</option>
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

            {/* Summary */}
            <div style={{ marginTop: 16 }}>
              <label style={labelStyle}>{t(lang, 'cvSummary')}</label>
              <textarea
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                rows={3}
                placeholder={lang === 'ar' ? 'ملخص مهني موجز يبرز خبراتك ومهاراتك...' : 'Brief professional summary highlighting your expertise...'}
                value={cvData.summary}
                onChange={e => setCvField('summary', e.target.value)}
              />
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                {lang === 'ar' ? '💡 اتركه فارغاً وسيقوم الذكاء الاصطناعي بإنشائه' : '💡 Leave blank and AI will generate it for you'}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ ...sectionTitle, marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
                💼 {t(lang, 'cvExperience')}
              </h3>
              <button className="btn-secondary" style={{ padding: '7px 14px', fontSize: 12 }} onClick={addExperience}>
                + {t(lang, 'cvAddExp')}
              </button>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {cvData.experience.length === 0 && (
                <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
                  {lang === 'ar' ? 'أضف خبرتك العملية' : 'Add your work experience'}
                </p>
              )}
              {cvData.experience.map((exp, idx) => (
                <div key={exp.id} style={{ background: 'var(--surface)', borderRadius: 10, padding: 16, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: 'var(--pb)', fontWeight: 700 }}>
                      {lang === 'ar' ? `خبرة ${idx + 1}` : `Experience ${idx + 1}`}
                    </span>
                    <button className="btn-ghost" style={{ padding: '3px 8px', fontSize: 11, color: '#FCA5A5' }} onClick={() => removeExp(exp.id)}>
                      {t(lang, 'remove')}
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvCompany')}</label>
                      <input style={inputStyle} placeholder="Acme Corp" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvJobTitle')}</label>
                      <input style={inputStyle} placeholder="Security Analyst" value={exp.title} onChange={e => updateExp(exp.id, 'title', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvStartDate')}</label>
                      <input style={inputStyle} type="month" value={exp.startDate} onChange={e => updateExp(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvEndDate')}</label>
                      <input style={inputStyle} type="month" value={exp.endDate} disabled={exp.current} onChange={e => updateExp(exp.id, 'endDate', e.target.value)} />
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 12, color: 'var(--dim)', cursor: 'pointer' }}>
                        <input type="checkbox" checked={exp.current} onChange={e => updateExp(exp.id, 'current', e.target.checked)} />
                        {t(lang, 'cvCurrent')}
                      </label>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>{t(lang, 'cvBullets')}</label>
                    <textarea
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7, fontSize: 13 }}
                      rows={4}
                      placeholder={t(lang, 'cvBulletsPlaceholder')}
                      value={exp.bullets.join('\n')}
                      onChange={e => updateExp(exp.id, 'bullets', e.target.value.split('\n'))}
                    />
                    {exp.enhancedBullets && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 11, color: 'var(--pb)', fontWeight: 700, marginBottom: 8 }}>
                          ✦ {t(lang, 'cvEnhancedBullets')}
                        </div>
                        {exp.enhancedBullets.map((b, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, padding: '8px 10px', background: 'var(--card)', borderRadius: 6, border: '1px solid var(--border)' }}>
                            <span style={{ color: 'var(--pb)', flexShrink: 0 }}>▸</span>
                            <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.6 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ ...sectionTitle, marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
                🎓 {t(lang, 'cvEducation')}
              </h3>
              <button className="btn-secondary" style={{ padding: '7px 14px', fontSize: 12 }} onClick={addEducation}>
                + {t(lang, 'cvAddEdu')}
              </button>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cvData.education.map((edu, idx) => (
                <div key={edu.id} style={{ background: 'var(--surface)', borderRadius: 10, padding: 14, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: 'var(--pb)', fontWeight: 700 }}>
                      {lang === 'ar' ? `مؤهل ${idx + 1}` : `Education ${idx + 1}`}
                    </span>
                    <button className="btn-ghost" style={{ padding: '3px 8px', fontSize: 11, color: '#FCA5A5' }} onClick={() => removeEdu(edu.id)}>
                      {t(lang, 'remove')}
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvInstitution')}</label>
                      <input style={inputStyle} placeholder="King Saud University" value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvDegree')}</label>
                      <input style={inputStyle} placeholder="B.Sc." value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvField')}</label>
                      <input style={inputStyle} placeholder="Computer Science" value={edu.field} onChange={e => updateEdu(edu.id, 'field', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{lang === 'ar' ? 'سنة التخرج' : 'Graduation Year'}</label>
                      <input style={inputStyle} type="number" min="1990" max="2030" value={edu.endYear || ''} onChange={e => updateEdu(edu.id, 'endYear', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h3 style={sectionTitle}>⚡ {t(lang, 'cvSkills')}</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder={t(lang, 'cvSkillsPlaceholder')}
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button className="btn-secondary" style={{ padding: '10px 16px', fontSize: 13, flexShrink: 0 }} onClick={addSkill}>
                + {t(lang, 'add')}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {cvData.skills.map(sk => (
                <span
                  key={sk}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'var(--pd)', border: '1px solid var(--border-b)',
                    borderRadius: 100, padding: '4px 12px', fontSize: 12, color: 'var(--neon)',
                  }}
                >
                  {sk}
                  <button
                    onClick={() => removeSkill(sk)}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ ...sectionTitle, marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
                🚀 {t(lang, 'cvProjects')}
              </h3>
              <button className="btn-secondary" style={{ padding: '7px 14px', fontSize: 12 }} onClick={addProject}>
                + {t(lang, 'cvAddProject')}
              </button>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cvData.projects.map((proj) => (
                <div key={proj.id} style={{ background: 'var(--surface)', borderRadius: 10, padding: 14, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    <button className="btn-ghost" style={{ padding: '3px 8px', fontSize: 11, color: '#FCA5A5' }} onClick={() => removeProject(proj.id)}>
                      {t(lang, 'remove')}
                    </button>
                  </div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvProjectName')}</label>
                      <input style={inputStyle} placeholder="Threat Detection System" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvProjectDesc')}</label>
                      <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t(lang, 'cvTechnologies')}</label>
                      <input style={inputStyle} placeholder="Python, Splunk, AWS" value={proj.technologies.join(', ')} onChange={e => updateProject(proj.id, 'technologies', e.target.value.split(',').map(s => s.trim()))} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
            onClick={handleGenerate}
            disabled={isEnhancing}
          >
            {isEnhancing ? (
              <><div className="spinner" />{t(lang, 'cvEnhancing')}</>
            ) : t(lang, 'cvGenerate')}
          </button>
        </div>
      )}

      {/* ══ PREVIEW TAB ═══════════════════════════════════════════════════════ */}
      {activeTab === 'preview' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 10 }}>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }} onClick={handleExportPdf}>
              📄 {t(lang, 'cvExportPdf')}
            </button>
          </div>
          {/* Clean CV Preview */}
          <div
            id="cv-preview"
            style={{
              background: '#fff', color: '#111', borderRadius: 12,
              padding: '40px 48px', fontFamily: 'Georgia, serif',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Header */}
            <div style={{ borderBottom: '2px solid #2A0E5A', paddingBottom: 16, marginBottom: 20 }}>
              <h1 style={{ fontFamily: 'sans-serif', fontSize: 26, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>
                {cvData.fullName || 'Your Name'}
              </h1>
              <p style={{ fontSize: 14, color: '#5A2EFF', fontWeight: 600, marginBottom: 6 }}>
                {cvData.targetRole || 'Target Role'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: 12, color: '#555' }}>
                {cvData.email && <span>✉ {cvData.email}</span>}
                {cvData.phone && <span>📞 {cvData.phone}</span>}
                {cvData.location && <span>📍 {cvData.location}</span>}
                {cvData.linkedin && <span>🔗 {cvData.linkedin}</span>}
              </div>
            </div>

            {/* Summary */}
            {(cvData.summary || atsResult?.enhancedSummary) && (
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: '#2A0E5A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, borderBottom: '1px solid #e0d7f7', paddingBottom: 4 }}>
                  Professional Summary
                </h2>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#333' }}>
                  {cvData.summary || atsResult?.enhancedSummary}
                </p>
              </div>
            )}

            {/* Experience */}
            {cvData.experience.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: '#2A0E5A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, borderBottom: '1px solid #e0d7f7', paddingBottom: 4 }}>
                  Work Experience
                </h2>
                {cvData.experience.map(exp => (
                  <div key={exp.id} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ fontSize: 14, color: '#1a1a2e' }}>{exp.title}</strong>
                        <span style={{ fontSize: 13, color: '#555' }}> · {exp.company}</span>
                      </div>
                      <span style={{ fontSize: 11, color: '#888', flexShrink: 0 }}>
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                      {(exp.enhancedBullets || exp.bullets).filter(b => b.trim()).map((b, i) => (
                        <li key={i} style={{ fontSize: 12.5, color: '#444', lineHeight: 1.6, marginBottom: 3 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: '#2A0E5A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, borderBottom: '1px solid #e0d7f7', paddingBottom: 4 }}>
                  Education
                </h2>
                {cvData.education.map(edu => (
                  <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <strong style={{ fontSize: 13 }}>{edu.degree} in {edu.field}</strong>
                      <p style={{ fontSize: 12, color: '#666', margin: 0 }}>{edu.institution}</p>
                    </div>
                    <span style={{ fontSize: 11, color: '#888' }}>{edu.endYear}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {cvData.skills.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: '#2A0E5A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, borderBottom: '1px solid #e0d7f7', paddingBottom: 4 }}>
                  Skills
                </h2>
                <p style={{ fontSize: 12.5, color: '#444', lineHeight: 1.8 }}>
                  {cvData.skills.join(' · ')}
                </p>
              </div>
            )}

            {/* Projects */}
            {cvData.projects.filter(p => p.name).length > 0 && (
              <div>
                <h2 style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: '#2A0E5A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, borderBottom: '1px solid #e0d7f7', paddingBottom: 4 }}>
                  Projects
                </h2>
                {cvData.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id} style={{ marginBottom: 10 }}>
                    <strong style={{ fontSize: 13 }}>{proj.name}</strong>
                    {proj.technologies.length > 0 && (
                      <span style={{ fontSize: 11, color: '#5A2EFF', marginLeft: 8 }}>
                        {proj.technologies.join(', ')}
                      </span>
                    )}
                    {proj.description && <p style={{ fontSize: 12, color: '#555', margin: '3px 0 0', lineHeight: 1.6 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ ATS SCORE TAB ═════════════════════════════════════════════════════ */}
      {activeTab === 'ats' && (
        <div>
          {isEnhancing ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="spinner" style={{ width: 40, height: 40, margin: '0 auto 20px', borderWidth: 3 }} />
              <p style={{ color: 'var(--dim)' }}>{t(lang, 'cvEnhancing')}</p>
            </div>
          ) : !atsResult ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
              <p style={{ color: 'var(--dim)', marginBottom: 20 }}>
                {lang === 'ar' ? 'أكمل النموذج ثم اضغط على إنشاء وتقييم السيرة' : 'Complete the form then click Generate & Score CV'}
              </p>
              <button className="btn-primary" onClick={() => setActiveTab('form')}>
                {lang === 'ar' ? 'العودة للنموذج' : 'Back to Form'}
              </button>
            </div>
          ) : (
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              {/* Score Circle */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{
                  width: 120, height: 120, borderRadius: '50%', margin: '0 auto 16px',
                  border: `4px solid ${scoreColor(atsResult.score)}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--card)',
                  boxShadow: `0 0 30px ${scoreColor(atsResult.score)}40`,
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: scoreColor(atsResult.score) }}>
                    {atsResult.score}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>/100</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: scoreColor(atsResult.score) }}>
                  {scoreLabel(atsResult.score)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--dim)', marginTop: 4 }}>
                  {t(lang, 'cvATSScore')}
                </div>
              </div>

              {/* Breakdown */}
              {atsResult.breakdown && (
                <div className="card" style={{ marginBottom: 20 }}>
                  {[
                    { key: 'keywordScore', label: t(lang, 'cvKeywords'), max: 35 },
                    { key: 'skillScore', label: t(lang, 'cvSkillCov'), max: 30 },
                    { key: 'structureScore', label: t(lang, 'cvStructure'), max: 20 },
                    { key: 'lengthScore', label: t(lang, 'cvLength'), max: 15 },
                  ].map(({ key, label, max }) => {
                    const val = (atsResult.breakdown as Record<string, number>)[key] || 0;
                    const pct = Math.round((val / max) * 100);
                    return (
                      <div key={key} style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: 'var(--dim)' }}>{label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(pct) }}>{val}/{max}</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 3, width: `${pct}%`, background: scoreColor(pct), transition: 'width 1s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Missing Keywords */}
              {atsResult.missingKeywords && atsResult.missingKeywords.length > 0 && (
                <div className="card" style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FCA5A5', marginBottom: 10 }}>
                    ⚠ {t(lang, 'cvMissing')}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {atsResult.missingKeywords.map(kw => (
                      <span key={kw} style={{
                        background: 'rgba(252,165,165,.12)', border: '1px solid rgba(252,165,165,.3)',
                        borderRadius: 100, padding: '3px 10px', fontSize: 11, color: '#FCA5A5',
                      }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {atsResult.suggestions && atsResult.suggestions.length > 0 && (
                <div className="card">
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pb)', marginBottom: 10 }}>
                    💡 {t(lang, 'cvSuggestions')}
                  </div>
                  {atsResult.suggestions.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: 'var(--pb)', flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                      <span style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleGenerate}>
                  {lang === 'ar' ? '↺ إعادة التقييم' : '↺ Re-Score'}
                </button>
                <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveTab('preview')}>
                  {t(lang, 'preview')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
