// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { CAREER_TWIN_DATA } from '../src/lib/career-twin-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Mesbar database...');

  // ── Seed Career Tracks + Milestones ───────────────────────────────────────
  for (const [slug, data] of Object.entries(CAREER_TWIN_DATA)) {
    const track = await prisma.careerTrack.upsert({
      where: { slug },
      update: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        domain: data.domain,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        currency: data.currency,
      },
      create: {
        slug,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        domain: data.domain,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        currency: data.currency,
      },
    });

    // Delete existing milestones, re-create
    await prisma.milestone.deleteMany({ where: { trackId: track.id } });

    for (let i = 0; i < data.milestones.length; i++) {
      const ms = data.milestones[i];
      await prisma.milestone.create({
        data: {
          trackId: track.id,
          yearLabel: ms.yearLabel,
          sortOrder: i,
          titleEn: ms.titleEn ?? null,
          titleAr: ms.titleAr ?? null,
          skillsEn: ms.skillsEn,
          skillsAr: ms.skillsAr,
        },
      });
    }

    console.log(`  ✓ ${data.nameEn} (${data.milestones.length} milestones)`);
  }

  // ── Seed Core Skills ──────────────────────────────────────────────────────
  const SKILLS = [
    // Tech
    { name: 'Python', nameAr: 'Python', category: 'tech', track: 'software' },
    { name: 'JavaScript', nameAr: 'JavaScript', category: 'tech', track: 'software' },
    { name: 'TypeScript', nameAr: 'TypeScript', category: 'tech', track: 'software' },
    { name: 'React', nameAr: 'React', category: 'tech', track: 'software' },
    { name: 'Node.js', nameAr: 'Node.js', category: 'tech', track: 'software' },
    { name: 'SQL', nameAr: 'SQL', category: 'tech', track: 'data' },
    { name: 'Linux', nameAr: 'Linux', category: 'tech', track: 'cyber' },
    { name: 'Docker', nameAr: 'Docker', category: 'tech', track: 'devops' },
    { name: 'Kubernetes', nameAr: 'Kubernetes', category: 'tech', track: 'devops' },
    { name: 'AWS', nameAr: 'AWS', category: 'tech', track: 'devops' },
    { name: 'Machine Learning', nameAr: 'تعلم الآلة', category: 'tech', track: 'ai' },
    { name: 'PyTorch', nameAr: 'PyTorch', category: 'tech', track: 'ai' },
    { name: 'Cybersecurity', nameAr: 'الأمن السيبراني', category: 'tech', track: 'cyber' },
    { name: 'Penetration Testing', nameAr: 'اختبار الاختراق', category: 'tech', track: 'cyber' },
    { name: 'Data Analysis', nameAr: 'تحليل البيانات', category: 'tech', track: 'data' },
    { name: 'Tableau', nameAr: 'Tableau', category: 'tech', track: 'data' },
    // Business
    { name: 'Product Management', nameAr: 'إدارة المنتج', category: 'biz', track: 'product' },
    { name: 'Agile / Scrum', nameAr: 'Agile / Scrum', category: 'biz', track: 'product' },
    { name: 'Project Management', nameAr: 'إدارة المشاريع', category: 'biz', track: 'project' },
    { name: 'PMP', nameAr: 'PMP', category: 'biz', track: 'project' },
    { name: 'Business Analysis', nameAr: 'تحليل الأعمال', category: 'biz', track: 'ba' },
    { name: 'BPMN', nameAr: 'BPMN', category: 'biz', track: 'ba' },
    { name: 'Operations Management', nameAr: 'إدارة العمليات', category: 'biz', track: 'ops' },
    { name: 'Six Sigma', nameAr: 'Six Sigma', category: 'biz', track: 'ops' },
    { name: 'Human Resources', nameAr: 'الموارد البشرية', category: 'biz', track: 'hr' },
    { name: 'Recruitment', nameAr: 'التوظيف', category: 'biz', track: 'hr' },
    // Soft skills
    { name: 'Communication', nameAr: 'التواصل', category: 'soft', track: null },
    { name: 'Leadership', nameAr: 'القيادة', category: 'soft', track: null },
    { name: 'Problem Solving', nameAr: 'حل المشكلات', category: 'soft', track: null },
    { name: 'Critical Thinking', nameAr: 'التفكير النقدي', category: 'soft', track: null },
  ];

  for (const skill of SKILLS) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  console.log(`  ✓ ${SKILLS.length} skills seeded`);
  console.log('\n✅ Mesbar database seeded successfully!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
