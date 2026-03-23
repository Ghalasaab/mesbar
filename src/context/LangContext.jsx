import { createContext, useContext, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   FULL TRANSLATION DICTIONARY
───────────────────────────────────────────── */
export const translations = {
  en: {
    /* NAV */
    nav: {
      home: 'Home',
      careerTest: 'Career Test',
      cvBuilder: 'CV Builder',
      careerTwin: 'Career Twin',
      interview: 'Mock Interview',
      dashboard: 'Dashboard',
      launch: 'Launch Platform',
    },

    /* HERO */
    hero: {
      badge: 'AI Career Intelligence · Tech & Business',
      h1a: 'Explore Your',
      h1em: 'Career Path',
      h1b: 'With AI Precision',
      sub: 'Mesbar is your intelligent career probe — built exclusively for Technology and Business professionals. Discover your domain, build your profile, and map your future.',
      startTest: 'Start Career Test',
      viewDash: 'View Dashboard',
      domainTech: 'Technology Careers',
      domainBiz: 'Business & Management',
      stat1: '10 Career Tracks',
      stat2: 'ATS Optimized',
      stat3: 'AI-Powered',
    },

    /* TOOLS SECTION */
    tools: {
      eyebrow: 'Platform Tools',
      title: 'Four AI Tools, One Career Mission',
      sub: 'Each tool works independently. Start wherever you are — no forced sequence.',
      t1: { title: 'Career Path Test', desc: 'Situational Judgment Test mapping your thinking style to the right tech or business specialization across 10 career tracks.', go: 'Start Test' },
      t2: { title: 'ATS CV Builder', desc: 'AI enhances your bullet points and scores your CV against real ATS systems. Export a job-ready PDF instantly.', go: 'Build CV' },
      t3: { title: 'Career Twin', desc: 'Visualize your year-by-year roadmap based on real industry data. Skills, milestones, and salary benchmarks.', go: 'Explore Path' },
      t4: { title: 'AI Mock Interview', desc: 'Practice interviews powered by your actual CV. Get scored on clarity, technical depth, confidence, and relevance.', go: 'Practice Now' },
    },

    /* HOW IT WORKS */
    how: {
      eyebrow: 'How It Works',
      title: 'Four Steps to Career Clarity',
      sub: 'From self-discovery to interview-ready in one intelligent platform.',
      s1: { title: 'Take the SJT', desc: 'Answer scenario-based questions revealing your natural work style across tech and business tracks.' },
      s2: { title: 'Build Your CV', desc: 'AI rewrites your experience into powerful, ATS-optimized bullet points with a live score.' },
      s3: { title: 'Explore Your Twin', desc: 'See your matched career roadmap with milestones, salaries and required skills.' },
      s4: { title: 'Practice Interviews', desc: 'Face AI-generated questions tailored to your CV. Improve with each session.' },
    },

    /* FEATURES */
    features: {
      eyebrow: 'Platform Features',
      title: 'Built for Tech & Business Professionals',
      sub: 'Every feature laser-focused on the two domains where Mesbar excels.',
      f1: { title: 'Tech + Business Only', desc: 'Exclusively covering Technology and Business & Management careers — no noise, no distraction.' },
      f2: { title: 'GPT-4 Powered', desc: 'Every analysis, question, and suggestion powered by state-of-the-art language models.' },
      f3: { title: 'Real-Time ATS Score', desc: 'Instant keyword analysis and structure scoring against real ATS systems used by top employers.' },
      f4: { title: 'Data-Driven Roadmaps', desc: 'Career Twin paths built from real industry data with realistic timelines and salary benchmarks.' },
      f5: { title: 'Bilingual EN / AR', desc: 'Full English and Arabic support with proper RTL layout. Designed for MENA professionals.' },
      f6: { title: 'Fully Responsive', desc: 'Seamlessly adaptive from mobile to desktop. Your career intelligence follows you everywhere.' },
    },

    /* CTA */
    cta: {
      title: 'Ready to Launch Your Career Probe?',
      sub: 'Join tech and business professionals using Mesbar to discover, build, and land their dream careers.',
      btn: 'Begin Your Journey',
    },

    /* FOOTER */
    footer: {
      tagline: 'AI Career Intelligence · Technology & Business',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      copyright: '© 2025 Mesbar. All rights reserved.',
    },

    /* DASHBOARD */
    dashboard: {
      eyebrow: 'Career Intelligence',
      title: 'Your Command Center',
      sub: 'Track your career readiness across all four dimensions from one powerful hub.',
      greeting: 'Good morning',
      scoreReady: 'Career Score: 74% ready',
      overview: 'Overview',
      careerMatch: 'Career Match',
      cvStrength: 'CV Strength',
      interviewReady: 'Interview Ready',
      atsGood: 'ATS Score: Good',
      needsPractice: 'Needs practice',
      techDomain: 'Technology',
      completed: 'Completed',
      suggestions: 'suggestions',
      roadmap: 'Roadmap',
      readiness: 'Readiness',
      startSession: 'Start session',
      year: 'Year',
    },

    /* CAREER TEST */
    test: {
      eyebrow: 'Tool 1',
      title: 'Career Path Test',
      sub: 'Answer each scenario honestly. There are no right or wrong answers — only your natural instincts.',
      questionOf: 'Question',
      of: 'of',
      tech: 'Technology',
      business: 'Business',
      next: 'Next Question',
      prev: 'Previous',
      finish: 'See My Results',
      selectFirst: 'Please select an answer first',
      progress: 'Progress',
    },

    /* RESULTS */
    results: {
      title: 'Your Career Intelligence Report',
      sub: 'Based on your responses, here is your Mesbar career analysis.',
      primaryDomain: 'Primary Domain',
      bestMatch: 'Best Specialization Match',
      matchScore: 'match score',
      breakdownTitle: 'Track Breakdown',
      retake: 'Retake Test',
      goDashboard: 'Go to Dashboard',
      buildCV: 'Build Your CV Now',
      techDomain: 'Technology',
      bizDomain: 'Business & Management',
    },

    /* CV BUILDER */
    cv: {
      eyebrow: 'Tool 2',
      title: 'ATS CV Builder',
      sub: 'Enter your details — AI will enhance your bullet points and score your CV against real ATS criteria.',
      whatIsATS: 'What is ATS?',
      atsExplain: 'Applicant Tracking Systems (ATS) are software used by 99% of Fortune 500 companies to automatically filter CVs before a human ever reads them. An ATS-optimized CV uses the right keywords, structure, and formatting to pass this first screen.',
      fullName: 'Full Name',
      targetRole: 'Target Role / Job Title',
      domain: 'Domain',
      selectDomain: 'Select your domain',
      education: 'Education',
      educationPlaceholder: 'BSc Computer Science, King Abdullah University, 2022',
      skills: 'Key Skills (comma separated)',
      skillsPlaceholder: 'Python, SQL, Network Security, Risk Analysis...',
      experience: 'Work Experience (one bullet per line)',
      expPlaceholder: 'worked on a website\nfixed network issues\nhelped the security team',
      projects: 'Notable Projects (optional)',
      projectsPlaceholder: 'Built a personal finance tracker app\nCreated a data dashboard for sales team',
      enhanceBtn: '✦ Enhance with AI & Calculate Score',
      enhancing: 'AI is enhancing your CV...',
      atsScore: 'ATS Score',
      aiEnhanced: '✦ AI-Enhanced Bullet Points',
      keywordsFound: 'Keywords Found',
      skillCoverage: 'Skill Coverage',
      structure: 'Structure Score',
      exportPDF: 'Export as PDF',
      tryAgain: 'Edit & Retry',
      excellent: 'Excellent',
      good: 'Good',
      needsWork: 'Needs Improvement',
      suggestions: 'Suggestions to Improve',
    },

    /* CAREER TWIN */
    twin: {
      eyebrow: 'Tool 3',
      title: 'Career Twin Roadmap',
      sub: 'Select a specialization to explore your data-driven career path with year-by-year milestones, skills, and salary benchmarks.',
      salaryRange: 'Salary Range',
      selectTrack: 'Select a career track',
      milestones: 'Career Milestones',
      commonSkills: 'Common Skills',
      jobTitles: 'Job Titles',
      yearLabel: 'Year',
      note: 'Based on real industry career data patterns — not AI prediction.',
      techTracks: 'Technology Tracks',
      bizTracks: 'Business Tracks',
    },

    /* MOCK INTERVIEW */
    interview: {
      eyebrow: 'Tool 4',
      title: 'AI Mock Interview',
      sub: 'Practice with AI-generated questions tailored to your target role. Get scored on 4 key performance dimensions.',
      setup: 'Interview Setup',
      targetRole: 'Your Target Role',
      selectRole: 'Select a role...',
      startInterview: 'Start Interview Session',
      question: 'Question',
      typeAnswer: 'Type your answer here...',
      submitAnswer: 'Submit Answer',
      next: 'Next Question',
      finish: 'Finish & Get Report',
      analyzing: 'AI is analyzing your answer...',
      report: 'Interview Performance Report',
      overallScore: 'Overall Score',
      strong: 'Strong Performance',
      good: 'Good Progress',
      keepPracticing: 'Keep Practicing',
      clarity: 'Clarity',
      technicalDepth: 'Technical Depth',
      confidence: 'Confidence',
      relevance: 'Relevance',
      tips: '✦ Improvement Tips',
      retry: 'Retry Interview',
      shortAnswer: 'Answer too short — please provide at least 20 words',
    },

    /* DOMAINS */
    domains: {
      tech: 'Technology',
      biz: 'Business & Management',
    },

    /* COMMON */
    common: {
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      required: 'This field is required',
      back: 'Back',
      close: 'Close',
      save: 'Save',
    },
  },

  /* ─────────────────────────────────────────────
     ARABIC TRANSLATIONS
  ───────────────────────────────────────────── */
  ar: {
    nav: {
      home: 'الرئيسية',
      careerTest: 'اختبار المسار',
      cvBuilder: 'بناء السيرة',
      careerTwin: 'التوأم المهني',
      interview: 'مقابلة وهمية',
      dashboard: 'لوحة التحكم',
      launch: 'ابدأ المنصة',
    },
    hero: {
      badge: 'ذكاء مهني · التقنية والأعمال',
      h1a: 'اكتشف',
      h1em: 'مسارك المهني',
      h1b: 'بدقة الذكاء الاصطناعي',
      sub: 'مسبار هو نظامك الذكي لاستكشاف المسارات المهنية — مصمم حصريًا لمحترفي التقنية والأعمال. اكتشف مجالك وابنِ ملفك الشخصي وخطط لمستقبلك.',
      startTest: 'ابدأ اختبار المسار',
      viewDash: 'عرض لوحة التحكم',
      domainTech: 'المسارات التقنية',
      domainBiz: 'إدارة الأعمال',
      stat1: '10 مسارات مهنية',
      stat2: 'محسّن لأنظمة ATS',
      stat3: 'مدعوم بالذكاء الاصطناعي',
    },
    tools: {
      eyebrow: 'أدوات المنصة',
      title: 'أربع أدوات ذكية، مهمة مهنية واحدة',
      sub: 'كل أداة تعمل بشكل مستقل. ابدأ من أي مكان — لا تسلسل إجباري.',
      t1: { title: 'اختبار المسار المهني', desc: 'اختبار الحكم الظرفي يربط أسلوب تفكيرك بالتخصص المناسب في 10 مسارات مهنية.', go: 'ابدأ الاختبار' },
      t2: { title: 'بناء السيرة الذاتية ATS', desc: 'يحسّن الذكاء الاصطناعي نقاطك ويقيّم سيرتك مقابل أنظمة ATS الحقيقية. صدّر ملف PDF فوريًا.', go: 'ابنِ سيرتك' },
      t3: { title: 'التوأم المهني', desc: 'شاهد خارطة مسارك المهني بناءً على بيانات الصناعة الحقيقية. معالم سنوية ورواتب ومهارات.', go: 'استكشف المسار' },
      t4: { title: 'مقابلة وهمية بالذكاء', desc: 'تدرب على المقابلات المبنية على سيرتك الذاتية. احصل على تقييم في 4 محاور رئيسية.', go: 'تدرب الآن' },
    },
    how: {
      eyebrow: 'كيف يعمل',
      title: 'أربع خطوات نحو الوضوح المهني',
      sub: 'من الاكتشاف الذاتي إلى جاهزية المقابلة في منصة واحدة ذكية.',
      s1: { title: 'أجرِ الاختبار', desc: 'أجب على أسئلة ظرفية تكشف أسلوبك الطبيعي في العمل عبر مسارات التقنية والأعمال.' },
      s2: { title: 'ابنِ سيرتك', desc: 'يُعيد الذكاء الاصطناعي كتابة خبرتك في نقاط قوية ومحسّنة لأنظمة ATS مع تقييم فوري.' },
      s3: { title: 'اكتشف توأمك', desc: 'شاهد خارطة مسارك مع المعالم والرواتب والمهارات المطلوبة سنة بسنة.' },
      s4: { title: 'تدرب على المقابلات', desc: 'واجه أسئلة مُولَّدة بالذكاء الاصطناعي خاصة بسيرتك الذاتية. تحسّن مع كل جلسة.' },
    },
    features: {
      eyebrow: 'مميزات المنصة',
      title: 'مصمم لمحترفي التقنية والأعمال',
      sub: 'كل ميزة مصممة بدقة للمجالين اللذين يتفوق فيهما مسبار.',
      f1: { title: 'تركيز على التقنية والأعمال', desc: 'يغطي حصريًا مجالَي التقنية وإدارة الأعمال — بدون ضوضاء أو تشتيت.' },
      f2: { title: 'مدعوم بـ GPT-4', desc: 'كل تحليل وسؤال واقتراح مدعوم بأحدث نماذج الذكاء الاصطناعي.' },
      f3: { title: 'تقييم ATS فوري', desc: 'تحليل فوري للكلمات المفتاحية والبنية مقابل أنظمة ATS الحقيقية.' },
      f4: { title: 'خرائط مسار مبنية على بيانات', desc: 'مسارات التوأم المهني مبنية من بيانات الصناعة الحقيقية مع جداول زمنية واقعية.' },
      f5: { title: 'ثنائي اللغة: عربي / إنجليزي', desc: 'دعم كامل بالعربية مع تخطيط RTL صحيح. مصمم لمحترفي منطقة الشرق الأوسط.' },
      f6: { title: 'متجاوب بالكامل', desc: 'يتكيف بسلاسة من الجوال إلى سطح المكتب. ذكاؤك المهني معك دائمًا.' },
    },
    cta: {
      title: 'مستعد لإطلاق مسبارك المهني؟',
      sub: 'انضم إلى محترفي التقنية والأعمال الذين يستخدمون مسبار لاكتشاف مسارهم المهني.',
      btn: 'ابدأ رحلتك',
    },
    footer: {
      tagline: 'ذكاء مهني · التقنية وإدارة الأعمال',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      contact: 'تواصل معنا',
      copyright: '© 2025 مسبار. جميع الحقوق محفوظة.',
    },
    dashboard: {
      eyebrow: 'الذكاء المهني',
      title: 'مركز قيادتك',
      sub: 'تتبع جاهزيتك المهنية عبر الأبعاد الأربعة من مركز تحكم واحد.',
      greeting: 'صباح الخير',
      scoreReady: 'درجة المسار: 74% جاهز',
      overview: 'نظرة عامة',
      careerMatch: 'التطابق المهني',
      cvStrength: 'قوة السيرة الذاتية',
      interviewReady: 'جاهزية المقابلة',
      atsGood: 'تقييم ATS: جيد',
      needsPractice: 'تحتاج تدريبًا',
      techDomain: 'التقنية',
      completed: 'مكتمل',
      suggestions: 'اقتراحات',
      roadmap: 'الخارطة',
      readiness: 'جاهزية',
      startSession: 'ابدأ الجلسة',
      year: 'السنة',
    },
    test: {
      eyebrow: 'الأداة الأولى',
      title: 'اختبار المسار المهني',
      sub: 'أجب على كل سيناريو بصدق. لا توجد إجابات صحيحة أو خاطئة — فقط غرائزك الطبيعية.',
      questionOf: 'سؤال',
      of: 'من',
      tech: 'التقنية',
      business: 'الأعمال',
      next: 'السؤال التالي',
      prev: 'السابق',
      finish: 'شاهد نتائجي',
      selectFirst: 'يرجى اختيار إجابة أولاً',
      progress: 'التقدم',
    },
    results: {
      title: 'تقرير ذكاءك المهني',
      sub: 'بناءً على إجاباتك، إليك تقرير مسبار للذكاء المهني.',
      primaryDomain: 'المجال الأساسي',
      bestMatch: 'أفضل تخصص مطابق',
      matchScore: 'نسبة التطابق',
      breakdownTitle: 'التفصيل حسب المسار',
      retake: 'إعادة الاختبار',
      goDashboard: 'الذهاب للوحة التحكم',
      buildCV: 'ابنِ سيرتك الآن',
      techDomain: 'التقنية',
      bizDomain: 'إدارة الأعمال',
    },
    cv: {
      eyebrow: 'الأداة الثانية',
      title: 'بناء السيرة الذاتية ATS',
      sub: 'أدخل بياناتك — سيُحسّن الذكاء الاصطناعي نقاطك ويقيّم سيرتك مقابل معايير ATS الحقيقية.',
      whatIsATS: 'ما هو نظام ATS؟',
      atsExplain: 'أنظمة تتبع المتقدمين (ATS) هي برامج تستخدمها 99% من شركات Fortune 500 لفلترة السير الذاتية تلقائيًا قبل قراءتها بشريًا. السيرة المحسّنة لـ ATS تستخدم الكلمات المفتاحية الصحيحة والبنية المناسبة.',
      fullName: 'الاسم الكامل',
      targetRole: 'الدور المستهدف',
      domain: 'المجال',
      selectDomain: 'اختر مجالك',
      education: 'التعليم',
      educationPlaceholder: 'بكالوريوس علوم الحاسب، جامعة الملك عبدالله، 2022',
      skills: 'المهارات الرئيسية (مفصولة بفواصل)',
      skillsPlaceholder: 'Python، SQL، الأمن السيبراني، تحليل البيانات...',
      experience: 'الخبرة العملية (نقطة واحدة في كل سطر)',
      expPlaceholder: 'عملت على تطوير موقع إلكتروني\nأصلحت مشاكل الشبكة\nساعدت فريق الأمن',
      projects: 'المشاريع البارزة (اختياري)',
      projectsPlaceholder: 'بنيت تطبيق لتتبع الميزانية الشخصية\nأنشأت لوحة بيانات لفريق المبيعات',
      enhanceBtn: '✦ تحسين بالذكاء الاصطناعي وحساب التقييم',
      enhancing: 'الذكاء الاصطناعي يُحسّن سيرتك...',
      atsScore: 'تقييم ATS',
      aiEnhanced: '✦ النقاط المحسّنة بالذكاء الاصطناعي',
      keywordsFound: 'الكلمات المفتاحية',
      skillCoverage: 'تغطية المهارات',
      structure: 'درجة البنية',
      exportPDF: 'تصدير PDF',
      tryAgain: 'تعديل وإعادة المحاولة',
      excellent: 'ممتاز',
      good: 'جيد',
      needsWork: 'يحتاج تحسين',
      suggestions: 'اقتراحات للتحسين',
    },
    twin: {
      eyebrow: 'الأداة الثالثة',
      title: 'خارطة التوأم المهني',
      sub: 'اختر تخصصًا لاستكشاف مسارك المهني المبني على البيانات مع معالم سنوية ورواتب ومهارات.',
      salaryRange: 'نطاق الراتب',
      selectTrack: 'اختر مسارًا مهنيًا',
      milestones: 'المعالم المهنية',
      commonSkills: 'المهارات الشائعة',
      jobTitles: 'المسميات الوظيفية',
      yearLabel: 'السنة',
      note: 'مبني على أنماط بيانات المسارات المهنية الحقيقية — وليس تنبؤات الذكاء الاصطناعي.',
      techTracks: 'مسارات التقنية',
      bizTracks: 'مسارات الأعمال',
    },
    interview: {
      eyebrow: 'الأداة الرابعة',
      title: 'مقابلة وهمية بالذكاء الاصطناعي',
      sub: 'تدرب على أسئلة مُولَّدة بالذكاء الاصطناعي خاصة بدورك المستهدف. احصل على تقييم في 4 محاور رئيسية.',
      setup: 'إعداد المقابلة',
      targetRole: 'دورك المستهدف',
      selectRole: 'اختر دورًا...',
      startInterview: 'بدء جلسة المقابلة',
      question: 'سؤال',
      typeAnswer: 'اكتب إجابتك هنا...',
      submitAnswer: 'تقديم الإجابة',
      next: 'السؤال التالي',
      finish: 'إنهاء والحصول على التقرير',
      analyzing: 'الذكاء الاصطناعي يحلل إجابتك...',
      report: 'تقرير أداء المقابلة',
      overallScore: 'الدرجة الإجمالية',
      strong: 'أداء قوي',
      good: 'تقدم جيد',
      keepPracticing: 'استمر في التدريب',
      clarity: 'الوضوح',
      technicalDepth: 'العمق التقني',
      confidence: 'الثقة',
      relevance: 'الملاءمة',
      tips: '✦ اقتراحات للتحسين',
      retry: 'إعادة المقابلة',
      shortAnswer: 'الإجابة قصيرة جدًا — يرجى كتابة 20 كلمة على الأقل',
    },
    domains: {
      tech: 'التقنية',
      biz: 'إدارة الأعمال',
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ ما. يرجى المحاولة مجددًا.',
      required: 'هذا الحقل مطلوب',
      back: 'رجوع',
      close: 'إغلاق',
      save: 'حفظ',
    },
  },
};

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en');

  const setLang = useCallback((l) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('rtl', l === 'ar');
      document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', l);
    }
  }, []);

  const t = useCallback((path) => {
    const keys = path.split('.');
    let val = translations[lang];
    for (const k of keys) {
      if (val === undefined) return path;
      val = val[k];
    }
    return val ?? path;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
