import { describe, expect, it } from 'vitest';
import { FAULT_LINE_ANNOTATIONS } from '../../data/faultLineAnnotations';
import { FAULT_LINES } from '../../data/faultLines';
import {
  getAggregateStudyStats,
  getFaultLineSummary,
  getSubgroupStats,
  PARTICIPANTS,
  TRIAL_OUTCOMES,
} from '../../data/userStudyData';

describe('12-user formative study dataset and UX annotations', () => {
  it('defines exactly 12 participants with balanced counterbalancing', () => {
    expect(PARTICIPANTS).toHaveLength(12);
    const baselineFirst = PARTICIPANTS.filter(
      (p) => p.counterbalanceOrder === 'Baseline-First',
    );
    const solutionFirst = PARTICIPANTS.filter(
      (p) => p.counterbalanceOrder === 'Solution-First',
    );
    expect(baselineFirst).toHaveLength(6);
    expect(solutionFirst).toHaveLength(6);
  });

  it('contains 84 paired evaluations covering all 12 users × 7 fault lines', () => {
    expect(FAULT_LINES).toHaveLength(7);
    expect(TRIAL_OUTCOMES).toHaveLength(84);

    for (const fl of FAULT_LINES) {
      const summary = getFaultLineSummary(fl.id);
      expect(summary.totalUsers).toBe(12);
      expect(summary.solutionPassCount).toBeGreaterThan(summary.baselinePassCount);
      expect(summary.solutionValidRetentionCount).toBeGreaterThanOrEqual(9);
    }
  });

  it('provides UX rationale annotations and exact paper definitions for every fault line', () => {
    for (const fl of FAULT_LINES) {
      expect(fl.paperFaultName.length).toBeGreaterThan(5);
      expect(fl.paperDefinition.length).toBeGreaterThan(30);
      expect(FAULT_LINE_ANNOTATIONS[fl.id].length).toBeGreaterThanOrEqual(2);
    }
  });

  it('reflects realistic formative properties (non-zero regressions, non-zero solution overtrust, Fluency-Accuracy SUS)', () => {
    const stats = getAggregateStudyStats();
    expect(stats.totalParticipants).toBe(12);
    expect(stats.pairedEvaluations).toBe(84);
    expect(stats.totalConditionTrials).toBe(168);
    expect(stats.solutionPassRate).toBeGreaterThan(stats.baselinePassRate);
    // Avoid unrealistic perfection
    expect(stats.totalRegressions).toBeGreaterThan(0);
    expect(stats.solutionOvertrustCount).toBeGreaterThan(0);
    expect(stats.solutionOvertrustCount).toBeLessThan(stats.baselineOvertrustCount);
    // Baseline fluent UI feels reasonably usable (~70+ SUS) despite epistemic failures
    expect(stats.meanSusBaseline).toBeGreaterThanOrEqual(70);
    expect(stats.meanSusSolution).toBeGreaterThan(stats.meanSusBaseline);
  });

  it('computes subgroup stats for order and domain expertise', () => {
    const sub = getSubgroupStats();
    expect(sub.order.baselineFirst.nUsers + sub.order.solutionFirst.nUsers).toBe(12);
    expect(sub.expertise.high.nUsers + sub.expertise.moderate.nUsers).toBe(12);
  });
});
