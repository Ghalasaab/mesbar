# MESBAR (مسبار) — AI Career Intelligence Platform

> An AI-powered career intelligence platform for **Technology** and **Business & Management** professionals.

---

## Project Structure

```
mesbar/
├── prisma/
│   ├── schema.prisma          # Full PostgreSQL schema
│   └── seed.ts                # DB seed (career tracks, skills)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── page.tsx            # Main app shell (SPA routing)
│   │   ├── globals.css         # Design system, tokens, animations
│   │   └── api/
│   │       ├── career-test/route.ts    # SJT scoring API
│   │       ├── cv-builder/route.ts     # AI CV enhancement + ATS API
│   │       ├── career-twin/route.ts    # Roadmap data API
│   │       └── mock-interview/route.ts # Interview generation + eval API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Sticky nav with EN/AR switcher
│   │   │   └── Homepage.tsx    # Hero, tools, features, CTA
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx   # Career metrics overview
│   │   └── tools/
│   │       ├── CareerTest.tsx        # SJT questionnaire
│   │       ├── CareerTestResult.tsx  # Results with track breakdown
│   │       ├── CvBuilder.tsx         # 3-tab CV form + ATS score
│   │       ├── CareerTwin.tsx        # Roadmap visualizer
│   │       └── MockInterview.tsx     # Full interview flow + report
│   ├── lib/
│   │   ├── translations.ts     # Complete EN + AR strings
│   │   ├── questions.ts        # 12 SJT questions + track metadata
│   │   ├── career-twin-data.ts # All 10 career track roadmaps
│   │   ├── ai-service.ts       # OpenAI integration (5 AI features)
│   │   └── store.ts            # Zustand state (lang, test, cv, interview)
│   └── types/
│       └── index.ts            # Full TypeScript type definitions
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Setup & Installation

### 1. Clone and install
```bash
git clone https://github.com/yourorg/mesbar.git
cd mesbar
npm install
```

### 2. Environment variables
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mesbar_db"
NEXTAUTH_SECRET="your-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-proj-your-key-here"
OPENAI_MODEL="gpt-4o"
```

### 3. Database setup
```bash
# Create PostgreSQL database
createdb mesbar_db

# Push schema
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed initial data
npm run db:seed
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

### 🌐 Bilingual (EN / AR)
- Full English ↔ Arabic switching
- RTL layout for Arabic mode
- Translated: navigation, questions, results, reports, all UI labels

### 🎯 Two Domains Only
- **Technology:** Software Engineering, Cybersecurity, Data Analysis, AI/ML, DevOps
- **Business & Management:** Product, Project, HR, Business Analysis, Operations

### Tool 1 — Career Path Test (SJT)
- 12 scenario-based questions (6 tech, 6 business)
- Weighted scoring across 10 career tracks
- Domain detection (Tech vs Business)
- Visual results with track breakdown

### Tool 2 — ATS CV Builder
- Multi-section form (personal, experience, education, skills, projects)
- AI enhances every bullet point via GPT-4
- ATS Score (0–100) with 4-dimension breakdown
- Missing keywords + suggestions
- Live CV preview + PDF export

### Tool 3 — Career Twin
- All 10 tracks with year-by-year milestones
- Year 1 → Year 8+ progression
- Core skills, job titles, salary ranges
- Domain toggle (Tech / Business)

### Tool 4 — AI Mock Interview
- Setup: choose role + track
- 6 AI-generated questions (tailored to CV + track)
- Per-question AI evaluation (clarity, depth, confidence, relevance)
- Final report with strengths, suggestions, per-question breakdown

---

## AI Prompts

### CV Bullet Enhancer
Transform vague bullets → specific, metric-driven, ATS-optimized achievement statements.

### ATS Scorer
Score a CV on keyword density, skill coverage, structure, and length — return JSON with suggestions.

### Interview Question Generator
Generate 6 questions (2 behavioral, 2 technical, 1 situational, 1 competency) tailored to role + skills.

### Answer Evaluator
Score each interview answer on 4 dimensions (0–100): clarity, depth, confidence, relevance.

### Interview Report Generator
Generate strengths + improvement suggestions from aggregated evaluation scores.

---

## Database Tables

| Table | Purpose |
|---|---|
| `users` | Auth, preferences, language setting |
| `sessions` | JWT session management |
| `career_results` | SJT scores, top track, domain split |
| `cv_data` | Full CV + ATS scores + AI-enhanced content |
| `interviews` | Questions, answers, evaluations, report |
| `skills` | Master skill catalog (tech + biz + soft) |
| `user_skills` | User's skill profile with levels |
| `career_tracks` | 10 track reference records |
| `milestones` | Year-by-year roadmap data per track |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/career-test` | Get all SJT questions |
| POST | `/api/career-test` | Submit answers, get scored result |
| POST | `/api/cv-builder` | Enhance bullets, generate summary, score ATS |
| GET | `/api/career-twin?track=cyber` | Get roadmap for a track |
| GET | `/api/career-twin` | Get all tracks summary |
| POST | `/api/mock-interview` | Generate questions / evaluate answer / generate report |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS + CSS custom properties |
| State | Zustand (persisted) |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| AI | OpenAI GPT-4o |
| Fonts | Syne (display), DM Sans (body), Noto Kufi Arabic |
| Auth | NextAuth.js (JWT) |
| Deployment | Vercel + Railway / Supabase |

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Set env vars in Vercel dashboard
```

### Docker
```bash
docker build -t mesbar .
docker run -p 3000:3000 --env-file .env mesbar
```

---

## License
MIT © 2025 Mesbar
