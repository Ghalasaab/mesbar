// src/hooks/useCareerActions.ts
'use client';
import { useCareerTestStore, useCvStore, useInterviewStore, useLangStore } from '@/lib/store';
import { TRACK_META } from '@/lib/questions';
import type { TrackKey } from '@/types';

/**
 * Aggregates state across all four tools to produce
 * a unified "career readiness" profile for the dashboard.
 */
export function useCareerProfile() {
  const { lang } = useLangStore();
  const { result: testResult } = useCareerTestStore();
  const { atsResult } = useCvStore();
  const { report: intReport } = useInterviewStore();

  const topTrack = testResult?.topTrack as TrackKey | undefined;
  const trackMeta = topTrack ? TRACK_META[topTrack] : null;

  const overallReadiness = (() => {
    const scores: number[] = [];
    if (testResult) scores.push(testResult.topTrackPct);
    if (atsResult?.score) scores.push(atsResult.score);
    if (intReport?.overallScore) scores.push(intReport.overallScore);
    return scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
  })();

  const completedTools = [testResult, atsResult, intReport].filter(Boolean).length;

  const topTrackName = trackMeta
    ? lang === 'ar' ? trackMeta.ar : trackMeta.en
    : null;

  return {
    topTrack,
    topTrackName,
    topTrackPct: testResult?.topTrackPct ?? 0,
    primaryDomain: testResult?.primaryDomain ?? null,
    cvScore: atsResult?.score ?? null,
    interviewScore: intReport?.overallScore ?? null,
    overallReadiness,
    completedTools,
    hasAnyResult: completedTools > 0,
  };
}

/**
 * Utility to format salary range display
 */
export function formatSalary(min: number, max: number, currency = 'USD'): string {
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}K`;
  return `${fmt(min)} → ${fmt(max)}+`;
}

/**
 * Score color utility shared across tools
 */
export function scoreToColor(score: number): string {
  if (score >= 75) return '#34D399';
  if (score >= 55) return '#FCD34D';
  return '#FCA5A5';
}

/**
 * Score label utility
 */
export function scoreToLabel(score: number, lang: 'en' | 'ar' = 'en'): string {
  if (lang === 'ar') {
    if (score >= 80) return 'ممتاز';
    if (score >= 65) return 'جيد';
    if (score >= 50) return 'مقبول';
    return 'يحتاج تحسين';
  }
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
}
