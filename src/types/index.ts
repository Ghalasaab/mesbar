// src/types/index.ts

export type Lang = 'en' | 'ar';
export type Domain = 'tech' | 'biz';

export type TrackKey =
  | 'software' | 'cyber' | 'data' | 'ai' | 'devops'
  | 'product'  | 'project' | 'hr' | 'ba' | 'ops';

export interface QuestionOption {
  en: string;
  ar: string;
  [key: string]: string | number;
}

export interface SJTQuestion {
  id: string;
  domain: Domain;
  q_en: string;
  q_ar: string;
  opts: QuestionOption[];
}

export interface CareerTestResult {
  primaryDomain: Domain;
  domainScore: { tech: number; biz: number };
  trackScores: Record<string, number>;
  topTrack: TrackKey;
  topTrackPct: number;
  topFour: Array<{ track: TrackKey; pct: number }>;
}

export interface CvEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
  gpa?: string;
}

export interface CvExperience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
  enhancedBullets?: string[];
}

export interface CvProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface CvCertification {
  id: string;
  name: string;
  issuer: string;
  year: number;
}

export interface CvFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  targetRole: string;
  targetTrack: TrackKey | '';
  education: CvEducation[];
  experience: CvExperience[];
  skills: string[];
  projects: CvProject[];
  certifications: CvCertification[];
}

export interface AtsBreakdown {
  keywordScore: number;
  skillScore: number;
  structureScore: number;
  lengthScore: number;
  total: number;
}

export interface AtsResult {
  score: number;
  breakdown: AtsBreakdown;
  missingKeywords: string[];
  suggestions: string[];
  enhancedSummary: string;
  enhancedExperience?: CvExperience[];
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'behavioral' | 'technical' | 'situational' | 'competency';
}

export interface AnswerEvaluation {
  questionId: string;
  clarity: number;
  depth: number;
  confidence: number;
  relevance: number;
  feedback: string;
}

export interface InterviewReport {
  overallScore: number;
  clarity: number;
  depth: number;
  confidence: number;
  relevance: number;
  evaluations: AnswerEvaluation[];
  suggestions: string[];
  suggestionsAr?: string[];
  strengths: string[];
  strengthsAr?: string[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
