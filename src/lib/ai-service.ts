import OpenAI from 'openai';

const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  return new OpenAI({ apiKey });
}

async function chat(sys: string, user: string, maxTokens = 1000): Promise<string> {
  const openai = getOpenAIClient();

  const res = await openai.chat.completions.create({
    model: MODEL,
    max_tokens: maxTokens,
    temperature: 0.4,
    messages: [
      { role: 'system', content: sys },
      { role: 'user', content: user },
    ],
  });

  return res.choices[0].message.content?.trim() ?? '';
}

export async function enhanceCvBullets(
  bullets: string[],
  targetRole: string,
  track: string
): Promise<string[]> {
  const sys = `You are an expert resume writer for ${track} roles. Transform each weak bullet into a powerful ATS-optimized achievement statement starting with a strong action verb. Add specific metrics where plausible. Return ONLY the enhanced bullets, one per line, no extras.`;

  const user = `Target Role: ${targetRole}\nOriginal bullets:\n${bullets
    .map((b, i) => `${i + 1}. ${b}`)
    .join('\n')}`;

  const result = await chat(sys, user, 800);

  return result
    .split('\n')
    .filter((l) => l.trim())
    .slice(0, bullets.length);
}

export async function generateCvSummary(cvData: any): Promise<string> {
  const sys = `Write a compelling 2-3 sentence professional summary with relevant keywords for ATS. Return ONLY the summary.`;

  const user = `Name: ${cvData.fullName}, Role: ${cvData.targetRole}, Track: ${cvData.targetTrack}, Skills: ${cvData.skills?.join(', ')}`;

  return await chat(sys, user, 200);
}

export async function scoreATS(cvData: any): Promise<any> {
  const sys = `You are an ATS analyzer. Return ONLY valid JSON: {"score":<0-100>,"breakdown":{"keywordScore":<0-35>,"skillScore":<0-30>,"structureScore":<0-20>,"lengthScore":<0-15>},"missingKeywords":["k1","k2"],"suggestions":["s1","s2","s3"],"enhancedSummary":"..."}`;

  const user = `Role: ${cvData.targetRole}, Track: ${cvData.targetTrack}, Skills: ${cvData.skills?.join(', ')}, Experience: ${cvData.experience?.length} positions, Has summary: ${!!cvData.summary}`;

  const raw = await chat(sys, user, 500);

  try {
    return JSON.parse(raw.replace(/```json|```/g, ''));
  } catch {
    return {
      score: 68,
      breakdown: {
        keywordScore: 22,
        skillScore: 18,
        structureScore: 14,
        lengthScore: 14,
      },
      missingKeywords: ['certifications', 'metrics'],
      suggestions: [
        'Add quantifiable metrics',
        'Include relevant certifications',
        'Expand skills section',
      ],
      enhancedSummary: `Experienced ${cvData.targetRole} with expertise in ${cvData.skills?.slice(0, 3).join(', ')}.`,
      enhancedExperience: cvData.experience,
    };
  }
}

export async function generateInterviewQuestions(
  role: string,
  track: string,
  skills: string[],
  expSummary: string
): Promise<any[]> {
  const sys = `Generate exactly 6 interview questions for a ${track} candidate. Mix: 2 behavioral, 2 technical, 1 situational, 1 competency. Return ONLY valid JSON array: [{"id":"q1","text":"...","category":"behavioral"},...]`;

  const user = `Role: ${role}, Track: ${track}, Skills: ${skills.slice(0, 6).join(', ')}, Experience: ${expSummary}`;

  const raw = await chat(sys, user, 700);

  try {
    return JSON.parse(raw.replace(/```json|```/g, ''));
  } catch {
    return [
      {
        id: 'q1',
        text: `Tell me about yourself and your journey into ${role}.`,
        category: 'behavioral',
      },
      {
        id: 'q2',
        text: 'Describe a challenging project. What was your approach and outcome?',
        category: 'behavioral',
      },
      {
        id: 'q3',
        text: `How do you stay current with ${track} trends?`,
        category: 'competency',
      },
      {
        id: 'q4',
        text: 'Walk me through a complex technical problem you solved.',
        category: 'technical',
      },
      {
        id: 'q5',
        text: 'Describe a situation with tight deadlines. How did you manage?',
        category: 'situational',
      },
      {
        id: 'q6',
        text: 'Where do you see yourself in 3-5 years?',
        category: 'competency',
      },
    ];
  }
}

export async function evaluateInterviewAnswer(
  question: string,
  answer: string,
  role: string,
  track: string
): Promise<any> {
  const sys = `Evaluate this interview answer. Return ONLY valid JSON: {"clarity":<0-100>,"depth":<0-100>,"confidence":<0-100>,"relevance":<0-100>,"feedback":"2 sentence specific feedback"}`;

  const user = `Role: ${role} (${track})\nQuestion: ${question}\nAnswer: ${answer}`;

  const raw = await chat(sys, user, 300);

  try {
    return JSON.parse(raw.replace(/```json|```/g, ''));
  } catch {
    const w = answer.split(' ').filter(Boolean).length;
    const b = Math.min(50 + Math.min(w, 50), 88);

    return {
      clarity: b,
      depth: b - 8,
      confidence: b - 5,
      relevance: b - 3,
      feedback:
        'Your answer shows awareness. Add specific metrics and examples to strengthen depth.',
    };
  }
}

export async function generateInterviewReport(
  evaluations: any[],
  role: string,
  track: string
): Promise<any> {
  const avg = (k: string) =>
    Math.round(evaluations.reduce((s, e) => s + (e[k] || 0), 0) / evaluations.length);

  const sys = `Generate interview coaching feedback. Return ONLY valid JSON: {"strengths":["s1","s2"],"suggestions":["i1","i2","i3"]}`;

  const user = `Role: ${role}, Scores: Clarity ${avg('clarity')}, Depth ${avg('depth')}, Confidence ${avg('confidence')}, Relevance ${avg('relevance')}`;

  const raw = await chat(sys, user, 300);

  try {
    return {
      ...JSON.parse(raw.replace(/```json|```/g, '')),
      overallScore: Math.round(
        (avg('clarity') + avg('depth') + avg('confidence') + avg('relevance')) / 4
      ),
      clarity: avg('clarity'),
      depth: avg('depth'),
      confidence: avg('confidence'),
      relevance: avg('relevance'),
      evaluations,
    };
  } catch {
    async function chat(sys: string, user: string, maxTokens = 1000): Promise<string> {
      const openai = getOpenAIClient();
    
      try {
        const res = await openai.chat.completions.create({
          model: MODEL,
          max_tokens: maxTokens,
          temperature: 0.4,
          messages: [
            { role: 'system', content: sys },
            { role: 'user', content: user },
          ],
        });
    
        return res.choices[0].message.content?.trim() ?? '';
      } catch (error: any) {
        console.error('OpenAI chat error:', {
          message: error?.message,
          status: error?.status,
          code: error?.code,
          type: error?.type,
          response: error?.response,
        });
        throw error;
      }
    }
  }
}