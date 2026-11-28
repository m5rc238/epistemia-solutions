import { describe, expect, it } from 'vitest';
import { FAULT_LINE_ANNOTATIONS } from '../../data/faultLineAnnotations';
import { FAULT_LINES } from '../../data/faultLines';
import {
  getAggregateStudyStats,
  getFaultLineSummary,
  getSubgroupStats,
  PARTICIPANTS,
  STUDY_METADATA,
  TRIAL_OUTCOMES,
} from '../../data/userStudyData';

describe('Stage 1 formative user study dataset integrity', () => {
  it('reconciles study metadata with the empirical participant and trial records', () => {
    expect(STUDY_METADATA.isSimulated).toBe(false);
    expect(STUDY_METADATA.sampleSize).toBe(PARTICIPANTS.length);
    expect(STUDY_METADATA.pairedEvaluations).toBe(TRIAL_OUTCOMES.length);
    expect(STUDY_METADATA.totalConditionTrials).toBe(TRIAL_OUTCOMES.length * 2);
  });

  it('has unique participant IDs, valid SUS scores, and balanced counterbalancing', () => {
    expect(PARTICIPANTS).toHaveLength(12);
    const ids = new Set(PARTICIPANTS.map((p) => p.id));
    expect(ids.size).toBe(PARTICIPANTS.length);

    for (const p of PARTICIPANTS) {
      expect(p.yearsExp).toBeGreaterThan(0);
      expect(p.sessionDurationMin).toBeGreaterThan(0);
      expect(p.susBaseline).toBeGreaterThanOrEqual(0);
      expect(p.susBaseline).toBeLessThanOrEqual(100);
      expect(p.susBaseline % 2.5).toBe(0);
      expect(p.susSolution).toBeGreaterThanOrEqual(0);
      expect(p.susSolution).toBeLessThanOrEqual(100);
      expect(p.susSolution % 2.5).toBe(0);
      expect(p.keyQuote.trim().length).toBeGreaterThan(0);
    }

    const baselineFirst = PARTICIPANTS.filter(
      (p) => p.counterbalanceOrder === 'Baseline-First',
    );
    const solutionFirst = PARTICIPANTS.filter(
      (p) => p.counterbalanceOrder === 'Solution-First',
    );
    expect(baselineFirst).toHaveLength(6);
    expect(solutionFirst).toHaveLength(6);
  });

  it('records exactly one paired trial per participant × fault line with valid bounds', () => {
    expect(FAULT_LINES).toHaveLength(7);
    expect(TRIAL_OUTCOMES).toHaveLength(PARTICIPANTS.length * FAULT_LINES.length);

    const participantIds = new Set(PARTICIPANTS.map((p) => p.id));
    const faultLineIds = new Set(FAULT_LINES.map((fl) => fl.id));
    const seenPairs = new Set<string>();

    for (const trial of TRIAL_OUTCOMES) {
      expect(participantIds.has(trial.participantId)).toBe(true);
      expect(faultLineIds.has(trial.faultLineId)).toBe(true);

      const pairKey = `${trial.participantId}:${trial.faultLineId}`;
      expect(seenPairs.has(pairKey)).toBe(false);
      seenPairs.add(pairKey);

      expect(trial.baselineTimeSec).toBeGreaterThan(0);
      expect(trial.solutionTimeSec).toBeGreaterThan(0);
      expect(trial.baselineConfidence).toBeGreaterThanOrEqual(1);
      expect(trial.baselineConfidence).toBeLessThanOrEqual(5);
      expect(trial.solutionConfidence).toBeGreaterThanOrEqual(1);
      expect(trial.solutionConfidence).toBeLessThanOrEqual(5);
    }
  });

  it('keeps condition-specific failure modes aligned with actual pass/fail outcomes', () => {
    for (const trial of TRIAL_OUTCOMES) {
      if (trial.baselinePass) {
        expect(trial.baselineFailureMode).toBeUndefined();
      } else {
        expect(trial.baselineFailureMode?.trim().length).toBeGreaterThan(0);
      }

      if (trial.solutionPass) {
        expect(trial.solutionFailureMode).toBeUndefined();
      } else {
        expect(trial.solutionFailureMode?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('reconciles aggregate and per-fault-line summary calculations with raw trial rows', () => {
    const stats = getAggregateStudyStats();
    const summaries = FAULT_LINES.map((fl) => getFaultLineSummary(fl.id));

    const sumBasePass = summaries.reduce((acc, s) => acc + s.baselinePassCount, 0);
    const sumSolPass = summaries.reduce((acc, s) => acc + s.solutionPassCount, 0);
    const sumRegressions = summaries.reduce((acc, s) => acc + s.regressionsCount, 0);
    const sumBaseOvertrust = summaries.reduce((acc, s) => acc + s.baselineOvertrustCount, 0);
    const sumSolOvertrust = summaries.reduce((acc, s) => acc + s.solutionOvertrustCount, 0);

    expect(stats.baselinePasses).toBe(sumBasePass);
    expect(stats.solutionPasses).toBe(sumSolPass);
    expect(stats.totalRegressions).toBe(sumRegressions);
    expect(stats.baselineOvertrustCount).toBe(sumBaseOvertrust);
    expect(stats.solutionOvertrustCount).toBe(sumSolOvertrust);

    for (const s of summaries) {
      expect(s.totalUsers).toBe(PARTICIPANTS.length);
      expect(s.baselineOvertrustCount).toBeLessThanOrEqual(s.totalUsers - s.baselinePassCount);
      expect(s.solutionOvertrustCount).toBeLessThanOrEqual(s.totalUsers - s.solutionPassCount);
    }
  });

  it('partitions subgroup counts cleanly across counterbalance order and domain expertise', () => {
    const sub = getSubgroupStats();

    expect(sub.order.baselineFirst.nUsers + sub.order.solutionFirst.nUsers).toBe(
      PARTICIPANTS.length,
    );
    expect(sub.order.baselineFirst.nPaired + sub.order.solutionFirst.nPaired).toBe(
      TRIAL_OUTCOMES.length,
    );
    expect(sub.expertise.high.nUsers + sub.expertise.moderate.nUsers).toBe(PARTICIPANTS.length);
    expect(sub.expertise.high.nPaired + sub.expertise.moderate.nPaired).toBe(TRIAL_OUTCOMES.length);

    expect(
      sub.order.baselineFirst.highExpertiseCount + sub.order.solutionFirst.highExpertiseCount,
    ).toBe(sub.expertise.high.nUsers);
    expect(
      sub.order.baselineFirst.moderateExpertiseCount +
        sub.order.solutionFirst.moderateExpertiseCount,
    ).toBe(sub.expertise.moderate.nUsers);
  });

  it('provides UX rationale annotations and paper definitions for every fault line', () => {
    for (const fl of FAULT_LINES) {
      expect(fl.paperFaultName.length).toBeGreaterThan(5);
      expect(fl.paperDefinition.length).toBeGreaterThan(30);
      expect(FAULT_LINE_ANNOTATIONS[fl.id].length).toBeGreaterThanOrEqual(2);
    }
  });
});
