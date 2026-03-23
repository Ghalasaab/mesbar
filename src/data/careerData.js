/* ═══════════════════════════════════════════════════════
   MESBAR — CAREER DATA
   All tracks, SJT questions, twin roadmaps, interview Qs
═══════════════════════════════════════════════════════ */

/* ─── CAREER TRACKS ─── */
export const TRACKS = {
  software:  { en: 'Software Engineering',   ar: 'هندسة البرمجيات',          domain: 'tech', icon: '💻' },
  frontend:  { en: 'Frontend Development',   ar: 'تطوير الواجهات الأمامية',  domain: 'tech', icon: '🎨' },
  backend:   { en: 'Backend Development',    ar: 'تطوير الخلفية',             domain: 'tech', icon: '⚙️' },
  cyber:     { en: 'Cybersecurity',          ar: 'الأمن السيبراني',          domain: 'tech', icon: '🛡️' },
  data:      { en: 'Data Analysis',          ar: 'تحليل البيانات',           domain: 'tech', icon: '📊' },
  ai:        { en: 'AI / Machine Learning',  ar: 'الذكاء الاصطناعي',        domain: 'tech', icon: '🤖' },
  devops:    { en: 'Cloud / DevOps',         ar: 'الحوسبة السحابية',         domain: 'tech', icon: '☁️' },
  uiux:      { en: 'UI/UX Design',           ar: 'تصميم واجهات المستخدم',    domain: 'tech', icon: '✏️' },
  product:   { en: 'Product Management',     ar: 'إدارة المنتج',             domain: 'biz',  icon: '🚀' },
  project:   { en: 'Project Management',     ar: 'إدارة المشاريع',           domain: 'biz',  icon: '📋' },
  hr:        { en: 'Human Resources',        ar: 'الموارد البشرية',          domain: 'biz',  icon: '👥' },
  ops:       { en: 'Operations Management',  ar: 'إدارة العمليات',           domain: 'biz',  icon: '⚡' },
  ba:        { en: 'Business Analysis',      ar: 'تحليل الأعمال',            domain: 'biz',  icon: '📈' },
  bizadmin:  { en: 'Business Administration',ar: 'إدارة الأعمال',            domain: 'biz',  icon: '🏢' },
};

/* ─── SJT QUESTIONS (10 questions, mix of tech + biz) ─── */
export const SJT_QUESTIONS = [
  {
    domain: 'tech',
    q_en: 'The company website suddenly becomes very slow during peak hours, affecting thousands of users. What is your first instinct?',
    q_ar: 'أصبح موقع الشركة بطيئًا جدًا خلال ساعات الذروة ما يؤثر على آلاف المستخدمين. ما هو ردّ فعلك الأول؟',
    opts: [
      { en: 'Check server logs and CPU/memory metrics to pinpoint the bottleneck', ar: 'فحص سجلات الخادم ومقاييس المعالج والذاكرة لتحديد الاختناق', software: 3, devops: 2, backend: 2 },
      { en: 'Analyze traffic patterns for unusual spikes or potential attack vectors', ar: 'تحليل أنماط الحركة للبحث عن ارتفاعات غير طبيعية أو ناقلات هجوم محتملة', cyber: 3, data: 1 },
      { en: 'Profile the database queries and identify slow or N+1 problems', ar: 'تحليل استعلامات قاعدة البيانات وتحديد الاستعلامات البطيئة', data: 3, software: 1 },
      { en: 'Coordinate the team response, communicate status, and define resolution steps', ar: 'تنسيق استجابة الفريق وإبلاغ أصحاب المصلحة وتحديد خطوات الحل', product: 2, project: 3, ops: 1 },
    ],
  },
  {
    domain: 'tech',
    q_en: 'You discover a critical security vulnerability in the payment processing system. What do you do first?',
    q_ar: 'اكتشفت ثغرة أمنية حرجة في نظام معالجة المدفوعات. ما أول خطوة تتخذها؟',
    opts: [
      { en: 'Immediately write and deploy a patch to close the vulnerability', ar: 'كتابة ونشر رقعة فورية لإغلاق الثغرة', software: 2, backend: 3 },
      { en: 'Conduct a full security audit to understand the scope and potential breach', ar: 'إجراء تدقيق أمني شامل لفهم النطاق والاختراق المحتمل', cyber: 3 },
      { en: 'Gather forensic logs and data to understand how long the vulnerability existed', ar: 'جمع السجلات الجنائية والبيانات لفهم مدة وجود الثغرة', data: 3, cyber: 1 },
      { en: 'Escalate to management, define the incident response plan, and assign clear owners', ar: 'رفع الأمر للإدارة وتحديد خطة الاستجابة للحوادث وتعيين المسؤولين', project: 3, product: 1, ops: 1 },
    ],
  },
  {
    domain: 'biz',
    q_en: 'Your team missed a critical product launch deadline by 2 weeks. The CEO wants answers. What do you do?',
    q_ar: 'فريقك تأخر أسبوعين عن موعد إطلاق المنتج الحرج. الرئيس التنفيذي يريد إجابات. ماذا تفعل؟',
    opts: [
      { en: 'Prepare a detailed post-mortem with root causes, timeline, and a prevention plan', ar: 'إعداد تقرير شامل بالأسباب الجذرية والجدول الزمني وخطة الوقاية', project: 3, ops: 2 },
      { en: 'Analyze customer impact data and quantify the market timing loss', ar: 'تحليل بيانات تأثير التأخر على العملاء وتحديد خسارة توقيت السوق', product: 3, data: 1, ba: 1 },
      { en: 'Immediately reallocate resources and restructure team workflows to recover lost time', ar: 'إعادة تخصيص الموارد فورًا وإعادة هيكلة سير عمل الفريق', ops: 3, project: 1 },
      { en: 'Run a team retrospective to understand morale issues and identify human blockers', ar: 'إجراء مراجعة للفريق لفهم مشاكل المعنويات وتحديد العوائق البشرية', hr: 3, project: 1 },
    ],
  },
  {
    domain: 'biz',
    q_en: 'User retention dropped 30% last quarter with no clear explanation. Where do you start your investigation?',
    q_ar: 'انخفض معدل الاحتفاظ بالمستخدمين بنسبة 30% في الربع الأخير دون سبب واضح. من أين تبدأ تحقيقك؟',
    opts: [
      { en: 'Check for technical bugs or performance regressions released during that period', ar: 'التحقق من وجود أخطاء تقنية أو تراجعات أداء تم إطلاقها خلال تلك الفترة', software: 2, devops: 1 },
      { en: 'Deep dive into user behavior cohorts, churn patterns, and funnel drop-offs', ar: 'التعمق في مجموعات سلوك المستخدمين وأنماط التوقف ونقاط التسرب', data: 3, product: 1 },
      { en: 'Define hypotheses, design A/B experiments, and measure causal impact on retention', ar: 'تحديد فرضيات وتصميم تجارب A/B لقياس التأثير السببي على الاحتفاظ', product: 3, ba: 2 },
      { en: 'Map the full customer journey and identify operational process breakdowns', ar: 'رسم رحلة العميل الكاملة وتحديد انهيارات العملية التشغيلية', ops: 2, ba: 3 },
    ],
  },
  {
    domain: 'tech',
    q_en: 'You need to build a real-time fraud detection system for financial transactions. What is your approach?',
    q_ar: 'تحتاج إلى بناء نظام كشف احتيال في الوقت الفعلي للمعاملات المالية. ما نهجك؟',
    opts: [
      { en: 'Build a scalable event-driven microservice using Kafka and integrate rule-based checks', ar: 'بناء خدمة مصغرة قابلة للتوسع مدفوعة بالأحداث باستخدام Kafka مع فحوصات قائمة على القواعد', software: 2, backend: 3, devops: 1 },
      { en: 'Design behavioral anomaly detection using threat intelligence and network analysis', ar: 'تصميم كشف شذوذ سلوكي باستخدام ذكاء التهديدات وتحليل الشبكة', cyber: 3, data: 1 },
      { en: 'Train a gradient-boosted ML model on historical labeled transaction data', ar: 'تدريب نموذج تعلم آلي على بيانات المعاملات التاريخية المصنّفة', ai: 3, data: 2 },
      { en: 'Define requirements, evaluate vendors, and create an RFP for the best solution', ar: 'تحديد المتطلبات وتقييم الموردين وإنشاء طلب عروض للحل الأمثل', product: 2, ba: 3 },
    ],
  },
  {
    domain: 'biz',
    q_en: 'Two high-performing team members are in a serious conflict affecting team morale and velocity. What do you do?',
    q_ar: 'عضوان بارزان في الفريق في صراع جاد يؤثر على معنويات الفريق وإنتاجيته. ماذا تفعل؟',
    opts: [
      { en: 'Analyze the impact on team productivity metrics and delivery timelines', ar: 'تحليل تأثير الصراع على مقاييس إنتاجية الفريق والجداول الزمنية', data: 1, ba: 2 },
      { en: 'Mediate directly, identify root causes, and build a documented action plan', ar: 'التوسط مباشرة وتحديد الأسباب الجذرية وبناء خطة عمل موثقة', hr: 3, project: 1 },
      { en: 'Restructure team roles and responsibilities to reduce overlap and dependency', ar: 'إعادة هيكلة أدوار الفريق لتقليل التداخل والاعتماد المتبادل', ops: 3, hr: 1 },
      { en: 'Prioritize unblocking product delivery and temporarily isolate the conflicting parties', ar: 'إعطاء الأولوية لإلغاء حجب تسليم المنتج وعزل الأطراف المتنازعة مؤقتًا', product: 3, project: 1 },
    ],
  },
  {
    domain: 'tech',
    q_en: 'A critical database query in production is running for 8+ seconds and causing timeouts for users. What do you do?',
    q_ar: 'استعلام قاعدة بيانات حرج في بيئة الإنتاج يستغرق أكثر من 8 ثوانٍ ويسبب انتهاء مهلة المستخدمين. ماذا تفعل؟',
    opts: [
      { en: 'Analyze the execution plan, identify missing indexes, and optimize the query structure', ar: 'تحليل خطة التنفيذ وتحديد المؤشرات المفقودة وتحسين بنية الاستعلام', software: 3, backend: 2 },
      { en: 'Check if the slow query could be exploited as a denial-of-service vector', ar: 'التحقق إذا كان الاستعلام البطيء يمكن استغلاله كناقل رفض خدمة', cyber: 3, devops: 1 },
      { en: 'Profile query patterns across all endpoints, identify N+1 issues, normalize data models', ar: 'تحليل أنماط الاستعلام عبر جميع نقاط النهاية وتحديد مشاكل N+1 وتطبيع نماذج البيانات', data: 3, software: 1 },
      { en: 'Deploy fix to staging, run load tests, A/B test the improvement before production rollout', ar: 'نشر الإصلاح على بيئة الاختبار وإجراء اختبارات الحمل واختبار التحسين قبل نشره', devops: 3, product: 1 },
    ],
  },
  {
    domain: 'biz',
    q_en: 'A major competitor launches a nearly identical product at half your price. How do you respond?',
    q_ar: 'أطلق منافس رئيسي منتجًا مماثلًا تقريبًا بنصف سعرك. كيف تستجيب؟',
    opts: [
      { en: 'Build competitive intelligence dashboards to track their every product move', ar: 'بناء لوحات ذكاء تنافسي لتتبع كل تحرك لمنتجهم', data: 2, ba: 3 },
      { en: 'Rethink the product roadmap, double down on differentiated features, reposition the brand', ar: 'إعادة التفكير في خارطة المنتج والتركيز على الميزات المميزة وإعادة تموضع العلامة التجارية', product: 3, ba: 1 },
      { en: 'Restructure operations and supply chain to reduce COGS and compete on price', ar: 'إعادة هيكلة العمليات وسلسلة التوريد لخفض التكاليف والمنافسة على السعر', ops: 3, project: 1 },
      { en: 'Launch an emergency retention program to prevent talent from being poached by the competitor', ar: 'إطلاق برنامج احتفاظ طارئ لمنع استقطاب الموهبة من قبل المنافس', hr: 3, ops: 1 },
    ],
  },
  {
    domain: 'tech',
    q_en: 'You are asked to design a system that processes 10 million events per day from IoT devices. How do you start?',
    q_ar: 'طُلب منك تصميم نظام يعالج 10 ملايين حدث يوميًا من أجهزة إنترنت الأشياء. من أين تبدأ؟',
    opts: [
      { en: 'Design a distributed event-streaming pipeline using Kafka, Flink, and scalable microservices', ar: 'تصميم خط أنابيب بث أحداث موزع باستخدام Kafka و Flink وخدمات مصغرة قابلة للتوسع', software: 2, backend: 2, devops: 3 },
      { en: 'Focus on data ingestion, warehousing, and building an analytics pipeline for the events', ar: 'التركيز على استيعاب البيانات والتخزين وبناء خط تحليلات للأحداث', data: 3, ai: 1 },
      { en: 'Build anomaly detection on the event stream to identify suspicious device behavior patterns', ar: 'بناء كشف شذوذ على تدفق الأحداث لتحديد أنماط سلوك الأجهزة المشبوهة', cyber: 2, ai: 2 },
      { en: 'Define the system requirements, create technical specs, and manage vendor selection', ar: 'تحديد متطلبات النظام وإنشاء المواصفات التقنية وإدارة اختيار الموردين', project: 2, ba: 3, product: 1 },
    ],
  },
  {
    domain: 'biz',
    q_en: 'The company wants to launch in 3 new markets simultaneously within 6 months. You lead this initiative. What is your first move?',
    q_ar: 'تريد الشركة الإطلاق في 3 أسواق جديدة في وقت واحد خلال 6 أشهر. أنت تقود هذه المبادرة. ما أول خطوة؟',
    opts: [
      { en: 'Build a data model to evaluate market TAM, competitive density, and regulatory risk per market', ar: 'بناء نموذج بيانات لتقييم حجم السوق والكثافة التنافسية والمخاطر التنظيمية لكل سوق', data: 2, ba: 3 },
      { en: 'Define the market entry strategy, success metrics, and product localization roadmap', ar: 'تحديد استراتيجية دخول السوق ومقاييس النجاح وخارطة توطين المنتج', product: 3, ba: 1 },
      { en: 'Create a detailed project plan with workstreams, resource allocation, and risk register', ar: 'إنشاء خطة مشروع تفصيلية مع خطوط العمل وتخصيص الموارد وسجل المخاطر', project: 3, ops: 1 },
      { en: 'Assess the talent and org structure needed and begin recruiting for each market', ar: 'تقييم الكفاءات والهيكل التنظيمي اللازمين والبدء في التوظيف لكل سوق', hr: 3, ops: 1 },
    ],
  },
];

/* ─── CAREER TWIN ROADMAPS ─── */
export const TWIN_ROADMAPS = {
  cyber: {
    track: 'cyber',
    name_en: 'Cybersecurity',
    name_ar: 'الأمن السيبراني',
    domain: 'tech',
    salary: '$65,000 – $160,000+',
    salary_ar: '240,000 – 600,000+ ريال',
    topTitles_en: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'CISO'],
    topTitles_ar: ['محلل أمن', 'مختبر اختراق', 'مهندس أمن', 'مدير أمن المعلومات'],
    coreSkills_en: ['Network Security', 'Linux', 'Python', 'SIEM Tools', 'Threat Intelligence', 'Cloud Security'],
    coreSkills_ar: ['أمن الشبكات', 'Linux', 'Python', 'أدوات SIEM', 'ذكاء التهديدات', 'أمن السحابة'],
    milestones: [
      {
        year: 1,
        title_en: 'Foundation', title_ar: 'المرحلة التأسيسية',
        role_en: null, role_ar: null,
        skills_en: ['Linux Fundamentals', 'Networking (TCP/IP)', 'CompTIA Security+', 'Python Scripting', 'Vulnerability Basics'],
        skills_ar: ['أساسيات Linux', 'الشبكات TCP/IP', 'CompTIA Security+', 'برمجة Python', 'أساسيات الثغرات'],
      },
      {
        year: 2,
        title_en: 'Entry Level', title_ar: 'المستوى المبتدئ',
        role_en: 'Junior Security Analyst', role_ar: 'محلل أمن مبتدئ',
        skills_en: ['SIEM Operations', 'Incident Response', 'Wireshark', 'OWASP Top 10', 'Compliance Basics'],
        skills_ar: ['عمليات SIEM', 'الاستجابة للحوادث', 'Wireshark', 'OWASP أفضل 10', 'أساسيات الامتثال'],
      },
      {
        year: 4,
        title_en: 'Mid Level', title_ar: 'المستوى المتوسط',
        role_en: 'Security Analyst / Pen Tester', role_ar: 'محلل أمن / مختبر اختراق',
        skills_en: ['Penetration Testing', 'Threat Hunting', 'Cloud Security (AWS/Azure)', 'Malware Analysis', 'CEH / OSCP'],
        skills_ar: ['اختبار الاختراق', 'صيد التهديدات', 'أمن السحابة', 'تحليل البرمجيات الخبيثة', 'CEH / OSCP'],
      },
      {
        year: 7,
        title_en: 'Senior Level', title_ar: 'المستوى المتقدم',
        role_en: 'Security Engineer / Architect', role_ar: 'مهندس / مهندس بنية الأمن',
        skills_en: ['Security Architecture', 'Zero Trust Design', 'Red Team Operations', 'CISSP', 'Risk Management'],
        skills_ar: ['هندسة الأمن', 'تصميم Zero Trust', 'عمليات الفريق الأحمر', 'CISSP', 'إدارة المخاطر'],
      },
      {
        year: 10,
        title_en: 'Leadership', title_ar: 'القيادة',
        role_en: 'CISO / Security Director', role_ar: 'مدير أمن المعلومات',
        skills_en: ['Executive Communication', 'Governance & Compliance', 'Team Building', 'Board Reporting', 'Security Strategy'],
        skills_ar: ['التواصل التنفيذي', 'الحوكمة والامتثال', 'بناء الفرق', 'تقارير مجلس الإدارة', 'استراتيجية الأمن'],
      },
    ],
  },

  software: {
    track: 'software',
    name_en: 'Software Engineering',
    name_ar: 'هندسة البرمجيات',
    domain: 'tech',
    salary: '$60,000 – $200,000+',
    salary_ar: '220,000 – 750,000+ ريال',
    topTitles_en: ['Software Developer', 'Senior Engineer', 'Staff Engineer', 'Engineering Manager'],
    topTitles_ar: ['مطور برمجيات', 'مهندس أول', 'مهندس رئيسي', 'مدير هندسة'],
    coreSkills_en: ['Python / JavaScript', 'System Design', 'Databases', 'Cloud', 'Git', 'Testing'],
    coreSkills_ar: ['Python / JavaScript', 'تصميم الأنظمة', 'قواعد البيانات', 'الحوسبة السحابية', 'Git', 'الاختبار'],
    milestones: [
      { year: 1, title_en: 'Foundation', title_ar: 'المرحلة التأسيسية', role_en: null, role_ar: null, skills_en: ['Python / JavaScript', 'Data Structures & Algorithms', 'Git & Version Control', 'REST APIs', 'SQL Basics'], skills_ar: ['Python / JavaScript', 'هياكل البيانات والخوارزميات', 'Git والتحكم بالإصدارات', 'REST APIs', 'أساسيات SQL'] },
      { year: 2, title_en: 'Entry Level', title_ar: 'المستوى المبتدئ', role_en: 'Junior Developer', role_ar: 'مطور مبتدئ', skills_en: ['React / Node.js', 'Docker Basics', 'Unit Testing', 'Agile / Scrum', 'PostgreSQL'], skills_ar: ['React / Node.js', 'أساسيات Docker', 'اختبار الوحدة', 'أجايل / سكرم', 'PostgreSQL'] },
      { year: 4, title_en: 'Mid Level', title_ar: 'المستوى المتوسط', role_en: 'Software Engineer', role_ar: 'مهندس برمجيات', skills_en: ['System Design', 'Microservices', 'CI/CD Pipelines', 'AWS / GCP Basics', 'Code Review'], skills_ar: ['تصميم الأنظمة', 'الخدمات المصغرة', 'خطوط CI/CD', 'AWS / GCP أساسيات', 'مراجعة الكود'] },
      { year: 7, title_en: 'Senior Level', title_ar: 'المستوى المتقدم', role_en: 'Senior / Staff Engineer', role_ar: 'مهندس أول / رئيسي', skills_en: ['Distributed Systems', 'Architecture Patterns', 'Performance Optimization', 'Technical Leadership', 'Mentorship'], skills_ar: ['الأنظمة الموزعة', 'أنماط البنية المعمارية', 'تحسين الأداء', 'القيادة التقنية', 'الإرشاد'] },
      { year: 10, title_en: 'Leadership', title_ar: 'القيادة', role_en: 'Principal Engineer / EM', role_ar: 'مهندس رئيسي / مدير هندسة', skills_en: ['Technical Vision', 'Platform Strategy', 'OKR Setting', 'Cross-team Alignment', 'Hiring & Culture'], skills_ar: ['الرؤية التقنية', 'استراتيجية المنصة', 'تحديد OKRs', 'التوافق بين الفرق', 'التوظيف والثقافة'] },
    ],
  },

  data: {
    track: 'data',
    name_en: 'Data Analysis',
    name_ar: 'تحليل البيانات',
    domain: 'tech',
    salary: '$55,000 – $140,000+',
    salary_ar: '200,000 – 520,000+ ريال',
    topTitles_en: ['Data Analyst', 'Senior Analyst', 'Data Scientist', 'Head of Analytics'],
    topTitles_ar: ['محلل بيانات', 'محلل أول', 'عالم بيانات', 'رئيس التحليلات'],
    coreSkills_en: ['SQL', 'Python', 'Power BI / Tableau', 'Statistics', 'Data Modeling'],
    coreSkills_ar: ['SQL', 'Python', 'Power BI / Tableau', 'الإحصاء', 'نمذجة البيانات'],
    milestones: [
      { year: 1, title_en: 'Foundation', title_ar: 'المرحلة التأسيسية', role_en: null, role_ar: null, skills_en: ['SQL (Intermediate)', 'Python (Pandas / NumPy)', 'Excel / Google Sheets', 'Basic Statistics', 'Data Cleaning'], skills_ar: ['SQL متوسط', 'Python (Pandas / NumPy)', 'Excel / Google Sheets', 'الإحصاء الأساسي', 'تنظيف البيانات'] },
      { year: 2, title_en: 'Entry Level', title_ar: 'المستوى المبتدئ', role_en: 'Junior Data Analyst', role_ar: 'محلل بيانات مبتدئ', skills_en: ['Tableau / Power BI', 'A/B Testing Basics', 'Business Intelligence', 'Data Storytelling', 'Dashboard Design'], skills_ar: ['Tableau / Power BI', 'أساسيات اختبار A/B', 'ذكاء الأعمال', 'سرد البيانات', 'تصميم لوحات البيانات'] },
      { year: 4, title_en: 'Mid Level', title_ar: 'المستوى المتوسط', role_en: 'Data Analyst', role_ar: 'محلل بيانات', skills_en: ['Advanced SQL (Window Functions)', 'Statistical Modeling', 'dbt / Data Pipelines', 'Stakeholder Reporting', 'Experiment Design'], skills_ar: ['SQL متقدم', 'النمذجة الإحصائية', 'خطوط البيانات', 'تقارير أصحاب المصلحة', 'تصميم التجارب'] },
      { year: 7, title_en: 'Senior Level', title_ar: 'المستوى المتقدم', role_en: 'Senior Analyst / Data Scientist', role_ar: 'محلل أول / عالم بيانات', skills_en: ['Machine Learning Basics', 'Causal Inference', 'Data Strategy', 'Platform Architecture', 'Team Leadership'], skills_ar: ['أساسيات تعلم الآلة', 'الاستدلال السببي', 'استراتيجية البيانات', 'بنية المنصة', 'قيادة الفريق'] },
      { year: 10, title_en: 'Leadership', title_ar: 'القيادة', role_en: 'Head of Analytics / VP Data', role_ar: 'رئيس التحليلات / نائب رئيس البيانات', skills_en: ['Data Governance', 'Executive Storytelling', 'Build vs Buy Decisions', 'Org Design', 'KPI Framework'], skills_ar: ['حوكمة البيانات', 'سرد للمستوى التنفيذي', 'قرارات البناء مقابل الشراء', 'تصميم المنظمة', 'إطار مؤشرات الأداء'] },
    ],
  },

  product: {
    track: 'product',
    name_en: 'Product Management',
    name_ar: 'إدارة المنتج',
    domain: 'biz',
    salary: '$70,000 – $200,000+',
    salary_ar: '260,000 – 750,000+ ريال',
    topTitles_en: ['Product Manager', 'Senior PM', 'Group PM', 'VP of Product', 'CPO'],
    topTitles_ar: ['مدير منتج', 'مدير منتج أول', 'مدير مجموعة منتجات', 'نائب رئيس المنتج', 'CPO'],
    coreSkills_en: ['User Research', 'Roadmapping', 'Agile/Scrum', 'OKRs', 'Data Analysis', 'Stakeholder Mgmt'],
    coreSkills_ar: ['بحث المستخدم', 'تخطيط خارطة الطريق', 'أجايل/سكرم', 'OKRs', 'تحليل البيانات', 'إدارة أصحاب المصلحة'],
    milestones: [
      { year: 1, title_en: 'Foundation', title_ar: 'المرحلة التأسيسية', role_en: null, role_ar: null, skills_en: ['Product Thinking', 'User Research Methods', 'Wireframing (Figma)', 'Agile / Scrum', 'Market Research'], skills_ar: ['التفكير بالمنتج', 'أساليب بحث المستخدم', 'Wireframing (Figma)', 'أجايل / سكرم', 'أبحاث السوق'] },
      { year: 2, title_en: 'Entry Level', title_ar: 'المستوى المبتدئ', role_en: 'Associate PM', role_ar: 'مدير منتج مساعد', skills_en: ['Product Specs (PRDs)', 'Sprint Planning', 'Metrics & KPIs', 'Roadmap Basics', 'User Interviews'], skills_ar: ['مواصفات المنتج', 'تخطيط الرياضيات', 'المقاييس ومؤشرات الأداء', 'أساسيات خارطة الطريق', 'مقابلات المستخدمين'] },
      { year: 4, title_en: 'Mid Level', title_ar: 'المستوى المتوسط', role_en: 'Product Manager', role_ar: 'مدير منتج', skills_en: ['Roadmap Strategy', 'A/B Testing & Experimentation', 'OKR Setting', 'Stakeholder Alignment', 'Pricing & Monetization'], skills_ar: ['استراتيجية خارطة الطريق', 'اختبار A/B والتجارب', 'تحديد OKRs', 'توافق أصحاب المصلحة', 'التسعير والتحقيق المالي'] },
      { year: 7, title_en: 'Senior Level', title_ar: 'المستوى المتقدم', role_en: 'Senior PM / Group PM', role_ar: 'مدير منتج أول / مجموعة منتجات', skills_en: ['Product Strategy', 'P&L Ownership', 'Cross-functional Leadership', 'Platform Thinking', 'Executive Stakeholders'], skills_ar: ['استراتيجية المنتج', 'ملكية P&L', 'القيادة متعددة الوظائف', 'التفكير بالمنصة', 'أصحاب المصلحة التنفيذيون'] },
      { year: 10, title_en: 'Leadership', title_ar: 'القيادة', role_en: 'VP of Product / CPO', role_ar: 'نائب رئيس المنتج / CPO', skills_en: ['Company Vision', 'Portfolio Management', 'Board Communication', 'Product Culture', 'Go-to-Market Strategy'], skills_ar: ['رؤية الشركة', 'إدارة المحفظة', 'التواصل مع مجلس الإدارة', 'ثقافة المنتج', 'استراتيجية الوصول للسوق'] },
    ],
  },

  project: {
    track: 'project',
    name_en: 'Project Management',
    name_ar: 'إدارة المشاريع',
    domain: 'biz',
    salary: '$55,000 – $150,000+',
    salary_ar: '200,000 – 560,000+ ريال',
    topTitles_en: ['Project Coordinator', 'Project Manager', 'Senior PM', 'Program Director'],
    topTitles_ar: ['منسق مشاريع', 'مدير مشاريع', 'مدير مشاريع أول', 'مدير برنامج'],
    coreSkills_en: ['PMP', 'Agile/Scrum', 'Risk Management', 'Budget Planning', 'Stakeholder Comm.'],
    coreSkills_ar: ['PMP', 'أجايل/سكرم', 'إدارة المخاطر', 'تخطيط الميزانية', 'التواصل مع أصحاب المصلحة'],
    milestones: [
      { year: 1, title_en: 'Foundation', title_ar: 'المرحلة التأسيسية', role_en: null, role_ar: null, skills_en: ['Project Management Basics', 'MS Project / Jira', 'Agile Fundamentals', 'Communication Plans', 'Meeting Facilitation'], skills_ar: ['أساسيات إدارة المشاريع', 'MS Project / Jira', 'أساسيات أجايل', 'خطط التواصل', 'تيسير الاجتماعات'] },
      { year: 2, title_en: 'Entry Level', title_ar: 'المستوى المبتدئ', role_en: 'Project Coordinator', role_ar: 'منسق مشاريع', skills_en: ['Scope & Schedule Mgmt', 'Risk Identification', 'Budget Tracking', 'Status Reporting', 'PMI / CAPM'], skills_ar: ['إدارة النطاق والجدول الزمني', 'تحديد المخاطر', 'تتبع الميزانية', 'تقارير الحالة', 'PMI / CAPM'] },
      { year: 4, title_en: 'Mid Level', title_ar: 'المستوى المتوسط', role_en: 'Project Manager', role_ar: 'مدير مشاريع', skills_en: ['PMP Certification', 'Change Management', 'Vendor Management', 'Multi-team Coordination', 'Earned Value Analysis'], skills_ar: ['شهادة PMP', 'إدارة التغيير', 'إدارة الموردين', 'تنسيق متعدد الفرق', 'تحليل القيمة المكتسبة'] },
      { year: 7, title_en: 'Senior Level', title_ar: 'المستوى المتقدم', role_en: 'Senior PM / Program Manager', role_ar: 'مدير مشاريع أول / مدير برنامج', skills_en: ['Program Management', 'Portfolio Oversight', 'Strategic Planning', 'Executive Presentations', 'PMO Leadership'], skills_ar: ['إدارة البرنامج', 'الإشراف على المحفظة', 'التخطيط الاستراتيجي', 'عروض تنفيذية', 'قيادة PMO'] },
      { year: 10, title_en: 'Leadership', title_ar: 'القيادة', role_en: 'Director of Programs', role_ar: 'مدير البرامج', skills_en: ['Org Transformation', 'Enterprise Portfolio Mgmt', 'P&L Accountability', 'Digital Transformation'], skills_ar: ['تحول المنظمة', 'إدارة محفظة المؤسسة', 'مسؤولية P&L', 'التحول الرقمي'] },
    ],
  },

  ba: {
    track: 'ba',
    name_en: 'Business Analysis',
    name_ar: 'تحليل الأعمال',
    domain: 'biz',
    salary: '$55,000 – $130,000+',
    salary_ar: '200,000 – 490,000+ ريال',
    topTitles_en: ['Business Analyst', 'Senior BA', 'Lead BA', 'Business Architecture'],
    topTitles_ar: ['محلل أعمال', 'محلل أعمال أول', 'محلل أعمال رئيسي', 'هندسة الأعمال'],
    coreSkills_en: ['Requirements Gathering', 'Process Modeling', 'SQL', 'Stakeholder Mgmt', 'CBAP'],
    coreSkills_ar: ['جمع المتطلبات', 'نمذجة العمليات', 'SQL', 'إدارة أصحاب المصلحة', 'CBAP'],
    milestones: [
      { year: 1, title_en: 'Foundation', title_ar: 'المرحلة التأسيسية', role_en: null, role_ar: null, skills_en: ['Requirements Elicitation', 'Use Case Writing', 'Process Mapping (BPMN)', 'Excel / SQL Basics', 'Stakeholder Interviews'], skills_ar: ['استنباط المتطلبات', 'كتابة حالات الاستخدام', 'رسم خرائط العمليات BPMN', 'أساسيات Excel / SQL', 'مقابلات أصحاب المصلحة'] },
      { year: 2, title_en: 'Entry Level', title_ar: 'المستوى المبتدئ', role_en: 'Junior Business Analyst', role_ar: 'محلل أعمال مبتدئ', skills_en: ['BRD / FRD Documentation', 'Gap Analysis', 'Jira / Confluence', 'Data Validation', 'UAT Coordination'], skills_ar: ['توثيق BRD / FRD', 'تحليل الفجوات', 'Jira / Confluence', 'التحقق من البيانات', 'تنسيق UAT'] },
      { year: 4, title_en: 'Mid Level', title_ar: 'المستوى المتوسط', role_en: 'Business Analyst', role_ar: 'محلل أعمال', skills_en: ['Business Process Re-engineering', 'Cost-Benefit Analysis', 'Advanced SQL', 'Solution Design', 'ECBA / CCBA'], skills_ar: ['إعادة هندسة العمليات', 'تحليل التكلفة والعائد', 'SQL متقدم', 'تصميم الحلول', 'ECBA / CCBA'] },
      { year: 7, title_en: 'Senior Level', title_ar: 'المستوى المتقدم', role_en: 'Senior / Lead BA', role_ar: 'محلل أعمال أول / رئيسي', skills_en: ['Enterprise Analysis', 'Strategic Alignment', 'Digital Transformation', 'Change Management', 'CBAP Certification'], skills_ar: ['التحليل على مستوى المؤسسة', 'التوافق الاستراتيجي', 'التحول الرقمي', 'إدارة التغيير', 'شهادة CBAP'] },
      { year: 10, title_en: 'Leadership', title_ar: 'القيادة', role_en: 'Business Architect / Director', role_ar: 'مهندس أعمال / مدير', skills_en: ['Enterprise Architecture', 'Operating Model Design', 'C-Suite Advisory', 'Portfolio Oversight'], skills_ar: ['هندسة المؤسسة', 'تصميم النموذج التشغيلي', 'استشارة C-Suite', 'الإشراف على المحفظة'] },
    ],
  },
};

/* ─── TWIN QUICK LIST for tabs ─── */
export const TWIN_TABS = [
  { key: 'cyber',    domain: 'tech' },
  { key: 'software', domain: 'tech' },
  { key: 'data',     domain: 'tech' },
  { key: 'product',  domain: 'biz'  },
  { key: 'project',  domain: 'biz'  },
  { key: 'ba',       domain: 'biz'  },
];

/* ─── INTERVIEW QUESTIONS BY ROLE ─── */
export const INTERVIEW_QUESTIONS = {
  cyber: {
    en: [
      'Walk me through how you would respond to a ransomware attack on our corporate network.',
      'Explain the difference between symmetric and asymmetric encryption and when you would use each.',
      'How do you stay current with the latest cybersecurity threats and vulnerabilities?',
      'Describe a security incident you handled. What was your process and what did you learn?',
      'How would you design a Zero Trust architecture for a cloud-first organization?',
    ],
    ar: [
      'أخبرني كيف ستستجيب لهجوم فدية على شبكة الشركة.',
      'اشرح الفرق بين التشفير المتماثل وغير المتماثل ومتى تستخدم كلًا منهما.',
      'كيف تواكب أحدث التهديدات والثغرات الأمنية السيبرانية؟',
      'صف حادثة أمنية تعاملت معها. ما كانت عمليتك وماذا تعلمت؟',
      'كيف ستصمم بنية Zero Trust لمنظمة تعتمد على السحابة أولًا؟',
    ],
  },
  software: {
    en: [
      'Explain the CAP theorem and how it impacts distributed system design decisions.',
      'Walk me through how you would design a URL shortening service like bit.ly.',
      'How do you ensure code quality in a fast-moving development team?',
      'Describe a technically challenging problem you solved and the approach you took.',
      'How do you decide between building a solution in-house versus using a third-party library?',
    ],
    ar: [
      'اشرح نظرية CAP وكيف تؤثر على قرارات تصميم الأنظمة الموزعة.',
      'أخبرني كيف ستصمم خدمة اختصار الروابط مثل bit.ly.',
      'كيف تضمن جودة الكود في فريق تطوير يتحرك بسرعة؟',
      'صف مشكلة تقنية صعبة حللتها والنهج الذي اتبعته.',
      'كيف تقرر بين بناء حل داخليًا أو استخدام مكتبة طرف ثالث؟',
    ],
  },
  data: {
    en: [
      'Walk me through how you would investigate a sudden 40% drop in user engagement metrics.',
      'Explain the difference between correlation and causation with a practical example.',
      'How do you ensure data quality in a reporting pipeline used by executives?',
      'Describe a data analysis project where your findings changed a business decision.',
      'How would you design an A/B test to evaluate a new recommendation algorithm?',
    ],
    ar: [
      'أخبرني كيف ستتحقق من انخفاض مفاجئ بنسبة 40% في مقاييس تفاعل المستخدمين.',
      'اشرح الفرق بين الارتباط والسببية مع مثال عملي.',
      'كيف تضمن جودة البيانات في خط التقارير الذي يستخدمه المديرون التنفيذيون؟',
      'صف مشروع تحليل بيانات غيّرت فيه نتائجك قرارًا تجاريًا.',
      'كيف ستصمم اختبار A/B لتقييم خوارزمية توصية جديدة؟',
    ],
  },
  product: {
    en: [
      'How do you prioritize features when engineering capacity is limited and stakeholders all disagree?',
      'Walk me through how you would define success metrics for a brand-new feature.',
      'Tell me about a product decision you made that turned out to be wrong. How did you handle it?',
      'How do you balance short-term user needs with long-term strategic product goals?',
      'Describe your approach to working with engineering teams that frequently push back on your specs.',
    ],
    ar: [
      'كيف تحدد أولويات الميزات عندما تكون طاقة الهندسة محدودة وأصحاب المصلحة يختلفون؟',
      'أخبرني كيف ستحدد مقاييس نجاح ميزة جديدة تمامًا.',
      'أخبرني عن قرار منتج اتخذته اتضح أنه خاطئ. كيف تعاملت معه؟',
      'كيف توازن بين الاحتياجات قصيرة المدى للمستخدمين والأهداف الاستراتيجية طويلة المدى للمنتج؟',
      'صف نهجك في العمل مع فرق الهندسة التي كثيرًا ما ترفض مواصفاتك.',
    ],
  },
  project: {
    en: [
      'How do you handle scope creep when stakeholders keep adding requirements mid-project?',
      'Describe your approach to risk identification and mitigation planning at the start of a project.',
      'Tell me about a project that was significantly behind schedule. How did you recover it?',
      'How do you manage communication between technical teams and non-technical stakeholders?',
      'What is your process for running an effective project retrospective after a difficult delivery?',
    ],
    ar: [
      'كيف تتعامل مع زحف النطاق عندما يضيف أصحاب المصلحة متطلبات في منتصف المشروع؟',
      'صف نهجك في تحديد المخاطر وتخطيط التخفيف في بداية المشروع.',
      'أخبرني عن مشروع كان متأخرًا بشكل كبير. كيف أعدت تعافيه؟',
      'كيف تدير التواصل بين الفرق التقنية وأصحاب المصلحة غير التقنيين؟',
      'ما هي عمليتك لإجراء مراجعة فعّالة بعد تسليم صعب؟',
    ],
  },
  ba: {
    en: [
      'Walk me through your process for eliciting requirements from stakeholders who are not sure what they want.',
      'How do you document and communicate complex business processes to both technical and non-technical audiences?',
      'Describe a situation where stakeholder requirements conflicted. How did you resolve it?',
      'How do you validate that the solution delivered actually meets the original business need?',
      'What techniques do you use to identify and fill gaps in existing business processes?',
    ],
    ar: [
      'أخبرني عن عمليتك لاستنباط المتطلبات من أصحاب المصلحة الذين لا يعرفون ما يريدون.',
      'كيف توثّق وتوصّل العمليات التجارية المعقدة لكل من الجماهير التقنية وغير التقنية؟',
      'صف موقفًا تعارضت فيه متطلبات أصحاب المصلحة. كيف حللته؟',
      'كيف تتحقق من أن الحل المُسلَّم يلبي فعلًا الاحتياج التجاري الأصلي؟',
      'ما التقنيات التي تستخدمها لتحديد وسد الفجوات في العمليات التجارية الموجودة؟',
    ],
  },
};

/* ─── ROLES FOR INTERVIEW SETUP ─── */
export const INTERVIEW_ROLES = [
  { key: 'cyber',    en: 'Cybersecurity Analyst',    ar: 'محلل أمن سيبراني',    domain: 'tech' },
  { key: 'software', en: 'Software Engineer',         ar: 'مهندس برمجيات',        domain: 'tech' },
  { key: 'data',     en: 'Data Analyst',              ar: 'محلل بيانات',           domain: 'tech' },
  { key: 'product',  en: 'Product Manager',           ar: 'مدير منتج',             domain: 'biz'  },
  { key: 'project',  en: 'Project Manager',           ar: 'مدير مشاريع',           domain: 'biz'  },
  { key: 'ba',       en: 'Business Analyst',          ar: 'محلل أعمال',            domain: 'biz'  },
];

/* ─── CV ENHANCEMENT TEMPLATES ─── */
export const CV_ENHANCEMENTS = [
  { match: ['work', 'website', 'site'], result: 'Developed and maintained responsive web applications using HTML5, CSS3, and JavaScript, resulting in a 35% improvement in page load performance.' },
  { match: ['fix', 'network', 'issue'], result: 'Diagnosed and resolved critical network infrastructure failures, reducing system downtime by 60% and improving overall network reliability for 500+ users.' },
  { match: ['security', 'help', 'team'], result: 'Collaborated with the cybersecurity team to implement intrusion detection protocols and incident response procedures, strengthening the organization\'s threat posture.' },
  { match: ['build', 'app', 'application'], result: 'Architected and deployed a cross-platform mobile application serving 10,000+ active users, achieving a 4.7-star rating on app stores.' },
  { match: ['report', 'write', 'analysis'], result: 'Produced comprehensive analytical reports for C-suite stakeholders, translating complex data insights into actionable strategic recommendations.' },
  { match: ['manage', 'project', 'lead'], result: 'Led cross-functional project teams of 8+ members, delivering a $500K initiative on time and 12% under budget using Agile methodology.' },
  { match: ['customer', 'support', 'service'], result: 'Provided tier-2 technical support for enterprise clients, achieving a 96% customer satisfaction score and reducing average resolution time by 40%.' },
  { match: ['database', 'sql', 'query'], result: 'Designed and optimized PostgreSQL database schemas, improving query performance by 3x and reducing infrastructure costs by $24K annually.' },
  { match: ['design', 'ui', 'ux'], result: 'Designed intuitive user interfaces using Figma and conducted user testing sessions, increasing user task completion rate by 28%.' },
  { match: ['data', 'analyz', 'insight'], result: 'Analyzed large datasets using Python and SQL to surface actionable business insights, directly influencing product decisions that drove 18% revenue growth.' },
];
