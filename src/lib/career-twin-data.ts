// src/lib/career-twin-data.ts

export interface Milestone {
  yearLabel: string;
  titleEn?: string;
  titleAr?: string;
  skillsEn: string[];
  skillsAr: string[];
}

export interface CareerTrackData {
  slug: string;
  nameEn: string;
  nameAr: string;
  domain: 'tech' | 'biz';
  salaryMin: number;
  salaryMax: number;
  currency: string;
  milestones: Milestone[];
  topJobTitles: string[];
  topJobTitlesAr: string[];
  coreSkills: string[];
  coreSkillsAr: string[];
}

export const CAREER_TWIN_DATA: Record<string, CareerTrackData> = {
  cyber: {
    slug: 'cyber', nameEn: 'Cybersecurity', nameAr: 'الأمن السيبراني', domain: 'tech',
    salaryMin: 65000, salaryMax: 160000, currency: 'USD',
    topJobTitles: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'SOC Analyst', 'CISO'],
    topJobTitlesAr: ['محلل أمن', 'مختبر اختراق', 'مهندس أمن', 'محلل SOC', 'CISO'],
    coreSkills: ['Linux', 'Networking', 'Python', 'SIEM', 'Threat Intelligence', 'Cloud Security'],
    coreSkillsAr: ['Linux', 'الشبكات', 'Python', 'SIEM', 'ذكاء التهديدات', 'أمن السحابة'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Linux Fundamentals', 'Networking (TCP/IP)', 'Security Basics', 'CompTIA Security+', 'Python Scripting'], skillsAr: ['أساسيات Linux', 'الشبكات', 'أساسيات الأمن', 'CompTIA Security+', 'Python'] },
      { yearLabel: 'Year 2–3', titleEn: 'Security Analyst', titleAr: 'محلل أمن', skillsEn: ['SOC Operations', 'SIEM (Splunk/QRadar)', 'Threat Hunting', 'Incident Response', 'Log Analysis'], skillsAr: ['عمليات SOC', 'أدوات SIEM', 'صيد التهديدات', 'الاستجابة للحوادث', 'تحليل السجلات'] },
      { yearLabel: 'Year 4–5', titleEn: 'Security Engineer', titleAr: 'مهندس أمن', skillsEn: ['Cloud Security (AWS/Azure)', 'Penetration Testing', 'Security Architecture', 'Zero Trust', 'OSCP/CEH'], skillsAr: ['أمن السحابة', 'اختبار الاختراق', 'هندسة الأمن', 'Zero Trust', 'OSCP/CEH'] },
      { yearLabel: 'Year 7+', titleEn: 'CISO / Security Lead', titleAr: 'CISO / قائد أمن', skillsEn: ['Risk Management', 'ISO 27001 / NIST', 'Security Strategy', 'Executive Communication'], skillsAr: ['إدارة المخاطر', 'ISO 27001', 'استراتيجية الأمن', 'التواصل التنفيذي'] },
    ],
  },
  software: {
    slug: 'software', nameEn: 'Software Engineering', nameAr: 'هندسة البرمجيات', domain: 'tech',
    salaryMin: 60000, salaryMax: 180000, currency: 'USD',
    topJobTitles: ['Junior Developer', 'Software Developer', 'Senior Engineer', 'Staff Engineer', 'Engineering Manager'],
    topJobTitlesAr: ['مطور مبتدئ', 'مطور برمجيات', 'مهندس أول', 'مهندس رئيسي', 'مدير هندسة'],
    coreSkills: ['Python / JS', 'System Design', 'Git', 'SQL', 'REST APIs', 'Testing'],
    coreSkillsAr: ['Python / JS', 'تصميم الأنظمة', 'Git', 'SQL', 'REST APIs', 'الاختبار'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Python or JavaScript', 'Data Structures & Algorithms', 'Git & Version Control', 'REST APIs', 'SQL Basics'], skillsAr: ['Python أو JavaScript', 'هياكل البيانات', 'Git', 'REST APIs', 'أساسيات SQL'] },
      { yearLabel: 'Year 2–3', titleEn: 'Software Developer', titleAr: 'مطور برمجيات', skillsEn: ['React / Node.js', 'Databases (SQL + NoSQL)', 'Testing', 'System Design Basics', 'CI/CD'], skillsAr: ['React / Node.js', 'قواعد البيانات', 'الاختبارات', 'تصميم الأنظمة', 'CI/CD'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior Engineer', titleAr: 'مهندس أول', skillsEn: ['Microservices / DDD', 'Cloud (AWS/GCP)', 'Performance Optimization', 'Code Review & Mentoring'], skillsAr: ['الخدمات الصغيرة', 'الحوسبة السحابية', 'تحسين الأداء', 'مراجعة الكود'] },
      { yearLabel: 'Year 8+', titleEn: 'Staff / Principal Engineer', titleAr: 'مهندس رئيسي', skillsEn: ['Platform Strategy', 'Technical Vision', 'Cross-team Leadership', 'Engineering Culture'], skillsAr: ['استراتيجية المنصة', 'الرؤية التقنية', 'القيادة', 'ثقافة الهندسة'] },
    ],
  },
  data: {
    slug: 'data', nameEn: 'Data Analysis', nameAr: 'تحليل البيانات', domain: 'tech',
    salaryMin: 55000, salaryMax: 130000, currency: 'USD',
    topJobTitles: ['Data Analyst', 'BI Analyst', 'Senior Data Analyst', 'Data Scientist', 'Head of Analytics'],
    topJobTitlesAr: ['محلل بيانات', 'محلل BI', 'محلل أول', 'عالم بيانات', 'رئيس التحليلات'],
    coreSkills: ['SQL', 'Python (Pandas)', 'Tableau / Power BI', 'Statistics', 'Excel'],
    coreSkillsAr: ['SQL', 'Python (Pandas)', 'Tableau / Power BI', 'الإحصاء', 'Excel'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['SQL (intermediate)', 'Python (Pandas, NumPy)', 'Data Visualization', 'Excel / Google Sheets', 'Statistics Basics'], skillsAr: ['SQL (متوسط)', 'Python', 'تصوير البيانات', 'Excel', 'الإحصاء'] },
      { yearLabel: 'Year 2–3', titleEn: 'Data Analyst', titleAr: 'محلل بيانات', skillsEn: ['Tableau or Power BI', 'Business Intelligence', 'A/B Testing', 'Statistical Analysis', 'Stakeholder Reporting'], skillsAr: ['Tableau أو Power BI', 'ذكاء الأعمال', 'اختبار A/B', 'التحليل الإحصائي', 'إعداد التقارير'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior Analyst / Data Scientist', titleAr: 'محلل أول / عالم بيانات', skillsEn: ['Machine Learning', 'Big Data (Spark)', 'Data Strategy', 'Causal Inference'], skillsAr: ['تعلم الآلة', 'البيانات الضخمة', 'استراتيجية البيانات', 'الاستدلال السببي'] },
      { yearLabel: 'Year 7+', titleEn: 'Head of Analytics / CDO', titleAr: 'رئيس التحليلات / CDO', skillsEn: ['Data Platform Ownership', 'Data Governance', 'Team Building', 'Executive Storytelling'], skillsAr: ['ملكية منصة البيانات', 'حوكمة البيانات', 'بناء الفريق', 'السرد التنفيذي'] },
    ],
  },
  ai: {
    slug: 'ai', nameEn: 'AI / Machine Learning', nameAr: 'الذكاء الاصطناعي / تعلم الآلة', domain: 'tech',
    salaryMin: 80000, salaryMax: 220000, currency: 'USD',
    topJobTitles: ['ML Engineer', 'AI Researcher', 'MLOps Engineer', 'Applied Scientist', 'AI Lead'],
    topJobTitlesAr: ['مهندس تعلم آلة', 'باحث ذكاء اصطناعي', 'مهندس MLOps', 'عالم تطبيقي', 'قائد AI'],
    coreSkills: ['Python', 'PyTorch / TensorFlow', 'Linear Algebra', 'Statistics', 'MLOps'],
    coreSkillsAr: ['Python', 'PyTorch / TensorFlow', 'الجبر الخطي', 'الإحصاء', 'MLOps'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Python (advanced)', 'Linear Algebra & Calculus', 'Statistics', 'Supervised Learning', 'Scikit-learn'], skillsAr: ['Python (متقدم)', 'الجبر الخطي', 'الإحصاء', 'التعلم الخاضع للإشراف', 'Scikit-learn'] },
      { yearLabel: 'Year 2–3', titleEn: 'ML Engineer', titleAr: 'مهندس تعلم آلة', skillsEn: ['Deep Learning (PyTorch)', 'NLP / Computer Vision', 'Feature Engineering', 'SageMaker / Vertex AI'], skillsAr: ['التعلم العميق', 'معالجة اللغة / رؤية الحاسوب', 'هندسة الخصائص', 'منصات ML السحابية'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior ML / Applied Scientist', titleAr: 'باحث تطبيقي أول', skillsEn: ['LLMs & Transformers', 'MLOps & Model Serving', 'Experiment Tracking (MLflow)', 'Production AI Systems'], skillsAr: ['LLMs والمحوّلات', 'MLOps', 'تتبع التجارب', 'أنظمة AI الإنتاجية'] },
      { yearLabel: 'Year 7+', titleEn: 'AI Lead / Principal Scientist', titleAr: 'قائد AI / عالم رئيسي', skillsEn: ['Research Direction', 'AI Strategy', 'AI Ethics & Safety', 'Team Leadership'], skillsAr: ['توجيه البحث', 'استراتيجية AI', 'أخلاقيات AI', 'قيادة الفريق'] },
    ],
  },
  devops: {
    slug: 'devops', nameEn: 'Cloud / DevOps', nameAr: 'الحوسبة السحابية / DevOps', domain: 'tech',
    salaryMin: 70000, salaryMax: 160000, currency: 'USD',
    topJobTitles: ['DevOps Engineer', 'Cloud Engineer', 'SRE', 'Platform Engineer', 'Cloud Architect'],
    topJobTitlesAr: ['مهندس DevOps', 'مهندس سحابة', 'SRE', 'مهندس منصة', 'مهندس معمارية سحابية'],
    coreSkills: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
    coreSkillsAr: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'المراقبة'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Linux (advanced)', 'Docker & Containers', 'Git & GitHub Actions', 'Bash Scripting', 'Cloud Fundamentals'], skillsAr: ['Linux (متقدم)', 'Docker والحاويات', 'Git وGitHub Actions', 'Bash', 'أساسيات السحابة'] },
      { yearLabel: 'Year 2–3', titleEn: 'DevOps Engineer', titleAr: 'مهندس DevOps', skillsEn: ['Kubernetes & Helm', 'Terraform / IaC', 'CI/CD Pipelines', 'Prometheus / Grafana', 'Networking (VPCs)'], skillsAr: ['Kubernetes وHelm', 'Terraform / IaC', 'مسارات CI/CD', 'Prometheus / Grafana', 'الشبكات'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior DevOps / SRE', titleAr: 'DevOps أول / SRE', skillsEn: ['Multi-cloud Architecture', 'Cost Optimization (FinOps)', 'DevSecOps', 'SLO / SLA Design', 'AWS/GCP Certifications'], skillsAr: ['معمارية متعددة السحاب', 'FinOps', 'DevSecOps', 'تصميم SLOs', 'شهادات AWS/GCP'] },
      { yearLabel: 'Year 7+', titleEn: 'Cloud Architect / Platform Lead', titleAr: 'مهندس معمارية سحابية', skillsEn: ['Enterprise Architecture', 'Platform Strategy', 'Cloud Migration Leadership'], skillsAr: ['المعمارية المؤسسية', 'استراتيجية المنصة', 'قيادة الهجرة السحابية'] },
    ],
  },
  product: {
    slug: 'product', nameEn: 'Product Management', nameAr: 'إدارة المنتج', domain: 'biz',
    salaryMin: 70000, salaryMax: 180000, currency: 'USD',
    topJobTitles: ['Associate PM', 'Product Manager', 'Senior PM', 'Group PM', 'VP of Product / CPO'],
    topJobTitlesAr: ['مساعد مدير منتج', 'مدير منتج', 'مدير منتج أول', 'مدير مجموعة', 'نائب رئيس / CPO'],
    coreSkills: ['Product Strategy', 'User Research', 'Agile/Scrum', 'Data Analysis', 'A/B Testing'],
    coreSkillsAr: ['استراتيجية المنتج', 'بحث المستخدم', 'Agile/Scrum', 'تحليل البيانات', 'اختبار A/B'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Product Thinking', 'User Research Methods', 'Agile / Scrum', 'Wireframing (Figma)', 'SQL for PMs'], skillsAr: ['التفكير بالمنتج', 'بحث المستخدم', 'Agile/Scrum', 'Figma', 'SQL للمديرين'] },
      { yearLabel: 'Year 2–3', titleEn: 'Product Manager', titleAr: 'مدير منتج', skillsEn: ['Roadmap Planning', 'A/B Testing', 'Stakeholder Management', 'OKR Frameworks', 'Product Analytics'], skillsAr: ['تخطيط خارطة الطريق', 'اختبار A/B', 'إدارة أصحاب المصلحة', 'OKRs', 'تحليلات المنتج'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior PM / Group PM', titleAr: 'مدير منتج أول', skillsEn: ['Product Strategy', 'P&L Ownership', 'Cross-functional Leadership', 'Pricing Strategy'], skillsAr: ['استراتيجية المنتج', 'ملكية P&L', 'قيادة متعددة الوظائف', 'استراتيجية التسعير'] },
      { yearLabel: 'Year 8+', titleEn: 'VP Product / CPO', titleAr: 'نائب رئيس / CPO', skillsEn: ['Portfolio Management', 'Company Vision', 'Board Communication', 'Org Design'], skillsAr: ['إدارة المحفظة', 'رؤية الشركة', 'التواصل مع المجلس', 'التصميم التنظيمي'] },
    ],
  },
  project: {
    slug: 'project', nameEn: 'Project Management', nameAr: 'إدارة المشاريع', domain: 'biz',
    salaryMin: 55000, salaryMax: 130000, currency: 'USD',
    topJobTitles: ['Project Coordinator', 'Project Manager', 'Senior PM', 'Program Manager', 'Director of PMO'],
    topJobTitlesAr: ['منسق مشاريع', 'مدير مشروع', 'مدير مشروع أول', 'مدير برنامج', 'مدير PMO'],
    coreSkills: ['Project Planning', 'Risk Management', 'Agile & Waterfall', 'Budget Management', 'PMP'],
    coreSkillsAr: ['تخطيط المشاريع', 'إدارة المخاطر', 'Agile والشلال', 'إدارة الميزانية', 'PMP'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['PM Fundamentals', 'Agile/Scrum', 'MS Project / Jira', 'Stakeholder Communication', 'Risk Identification'], skillsAr: ['أساسيات PM', 'Agile/Scrum', 'MS Project / Jira', 'التواصل', 'تحديد المخاطر'] },
      { yearLabel: 'Year 2–3', titleEn: 'Project Manager', titleAr: 'مدير مشروع', skillsEn: ['Full Project Lifecycle', 'Risk & Issue Management', 'Budget Tracking', 'Change Management', 'PMP Certification'], skillsAr: ['دورة المشروع الكاملة', 'إدارة المخاطر', 'تتبع الميزانية', 'إدارة التغيير', 'شهادة PMP'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior PM / Program Manager', titleAr: 'مدير أول / مدير برنامج', skillsEn: ['Program Management', 'Cross-functional Leadership', 'Strategic Planning', 'Executive Reporting'], skillsAr: ['إدارة البرامج', 'القيادة متعددة الوظائف', 'التخطيط الاستراتيجي', 'التقارير التنفيذية'] },
      { yearLabel: 'Year 8+', titleEn: 'Director of PMO / VP Ops', titleAr: 'مدير PMO / نائب رئيس العمليات', skillsEn: ['PMO Setup & Governance', 'Enterprise Program Strategy', 'Business Transformation'], skillsAr: ['إنشاء PMO', 'استراتيجية المؤسسة', 'تحويل الأعمال'] },
    ],
  },
  hr: {
    slug: 'hr', nameEn: 'Human Resources', nameAr: 'الموارد البشرية', domain: 'biz',
    salaryMin: 45000, salaryMax: 120000, currency: 'USD',
    topJobTitles: ['HR Coordinator', 'HR Specialist', 'HR Manager', 'HR Business Partner', 'CHRO'],
    topJobTitlesAr: ['منسق HR', 'أخصائي HR', 'مدير HR', 'شريك أعمال HR', 'CHRO'],
    coreSkills: ['Recruitment', 'Employee Relations', 'Compensation & Benefits', 'Performance Management', 'HRIS'],
    coreSkillsAr: ['التوظيف', 'علاقات الموظفين', 'التعويضات', 'إدارة الأداء', 'HRIS'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['HR Fundamentals', 'Recruitment Basics', 'Labor Law', 'HRIS (Workday/SAP)', 'Onboarding'], skillsAr: ['أساسيات HR', 'أساسيات التوظيف', 'قانون العمل', 'HRIS', 'الإلحاق'] },
      { yearLabel: 'Year 2–3', titleEn: 'HR Specialist', titleAr: 'أخصائي HR', skillsEn: ['Full-cycle Recruiting', 'Performance Management', 'Employee Engagement', 'Compensation Benchmarking'], skillsAr: ['التوظيف الكامل', 'إدارة الأداء', 'تفاعل الموظفين', 'قياس التعويضات'] },
      { yearLabel: 'Year 4–5', titleEn: 'HR Manager / HRBP', titleAr: 'مدير HR / HRBP', skillsEn: ['HR Strategy', 'Organizational Design', 'Talent Management', 'L&D', 'HR Analytics'], skillsAr: ['استراتيجية HR', 'التصميم التنظيمي', 'إدارة المواهب', 'التعلم والتطوير', 'تحليلات HR'] },
      { yearLabel: 'Year 8+', titleEn: 'VP HR / CHRO', titleAr: 'نائب رئيس HR / CHRO', skillsEn: ['People Strategy', 'Succession Planning', 'Culture Transformation', 'Board-level Reporting'], skillsAr: ['استراتيجية الأفراد', 'التعاقب', 'تحويل الثقافة', 'تقارير المجلس'] },
    ],
  },
  ba: {
    slug: 'ba', nameEn: 'Business Analysis', nameAr: 'تحليل الأعمال', domain: 'biz',
    salaryMin: 55000, salaryMax: 130000, currency: 'USD',
    topJobTitles: ['Junior BA', 'Business Analyst', 'Senior BA', 'Lead BA', 'Business Architect'],
    topJobTitlesAr: ['محلل أعمال مبتدئ', 'محلل أعمال', 'محلل أعمال أول', 'قائد المحللين', 'مهندس معمارية أعمال'],
    coreSkills: ['Requirements Gathering', 'Process Modeling (BPMN)', 'SQL', 'Data Analysis', 'CBAP'],
    coreSkillsAr: ['جمع المتطلبات', 'نمذجة العمليات (BPMN)', 'SQL', 'تحليل البيانات', 'CBAP'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Requirements Elicitation', 'Business Process Mapping', 'SQL Basics', 'Use Case Writing', 'Lucidchart / Visio'], skillsAr: ['استخلاص المتطلبات', 'رسم خرائط العمليات', 'SQL', 'كتابة حالات الاستخدام', 'Lucidchart'] },
      { yearLabel: 'Year 2–3', titleEn: 'Business Analyst', titleAr: 'محلل أعمال', skillsEn: ['BPMN Process Modeling', 'Gap Analysis', 'Power BI / Excel', 'UAT Coordination', 'Business Case Writing'], skillsAr: ['نمذجة BPMN', 'تحليل الفجوات', 'Power BI / Excel', 'تنسيق UAT', 'كتابة حالة الأعمال'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior BA / Lead BA', titleAr: 'محلل أعمال أول', skillsEn: ['CBAP Certification', 'Enterprise Analysis', 'Change Impact Assessment', 'Solution Design'], skillsAr: ['شهادة CBAP', 'التحليل المؤسسي', 'تقييم أثر التغيير', 'تصميم الحلول'] },
      { yearLabel: 'Year 7+', titleEn: 'Business Architect / Strategy Lead', titleAr: 'مهندس معمارية الأعمال', skillsEn: ['Enterprise Architecture', 'Digital Transformation Strategy', 'C-Suite Advisory'], skillsAr: ['المعمارية المؤسسية', 'استراتيجية التحول الرقمي', 'الاستشارة التنفيذية'] },
    ],
  },
  ops: {
    slug: 'ops', nameEn: 'Operations Management', nameAr: 'إدارة العمليات', domain: 'biz',
    salaryMin: 50000, salaryMax: 140000, currency: 'USD',
    topJobTitles: ['Operations Analyst', 'Operations Manager', 'Senior Ops Manager', 'Director of Operations', 'COO'],
    topJobTitlesAr: ['محلل عمليات', 'مدير عمليات', 'مدير عمليات أول', 'مدير تنفيذي العمليات', 'COO'],
    coreSkills: ['Process Optimization', 'Supply Chain', 'Lean / Six Sigma', 'ERP Systems', 'Cost Management'],
    coreSkillsAr: ['تحسين العمليات', 'سلسلة التوريد', 'Lean / Six Sigma', 'أنظمة ERP', 'إدارة التكلفة'],
    milestones: [
      { yearLabel: 'Year 1', skillsEn: ['Operations Fundamentals', 'Process Mapping', 'Excel (Advanced)', 'Lean / Six Sigma Basics', 'ERP Intro (SAP/Oracle)'], skillsAr: ['أساسيات العمليات', 'رسم خرائط العمليات', 'Excel (متقدم)', 'Lean / Six Sigma', 'مقدمة ERP'] },
      { yearLabel: 'Year 2–3', titleEn: 'Operations Manager', titleAr: 'مدير عمليات', skillsEn: ['Supply Chain Management', 'KPI Design & Monitoring', 'Process Improvement (Kaizen)', 'Vendor Management'], skillsAr: ['إدارة سلسلة التوريد', 'تصميم KPI', 'تحسين العمليات (Kaizen)', 'إدارة الموردين'] },
      { yearLabel: 'Year 4–5', titleEn: 'Senior Operations Manager', titleAr: 'مدير عمليات أول', skillsEn: ['Operational Strategy', 'Cross-functional Alignment', 'P&L Responsibility', 'Digital Operations Tools'], skillsAr: ['الاستراتيجية التشغيلية', 'المواءمة متعددة الوظائف', 'مسؤولية P&L', 'أدوات العمليات الرقمية'] },
      { yearLabel: 'Year 8+', titleEn: 'VP Operations / COO', titleAr: 'نائب رئيس العمليات / COO', skillsEn: ['Business Transformation', 'Global Operations', 'Board Reporting', 'M&A Integration'], skillsAr: ['تحويل الأعمال', 'العمليات العالمية', 'تقارير المجلس', 'تكامل الاستحواذ'] },
    ],
  },
};
