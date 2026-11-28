import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Compass, XCircle } from 'lucide-react';
import { FAULT_LINES } from '../../data/faultLines';
import {
  getAggregateStudyStats,
  getFaultLineSummary,
  getSubgroupStats,
  PARTICIPANTS,
  TRIAL_OUTCOMES,
} from '../../data/userStudyData';
import { FaultLineId } from '../../types/epistemia';

interface StudyResultsViewProps {
  onOpenLab: (id: FaultLineId) => void;
}

export const StudyResultsView: React.FC<StudyResultsViewProps> = ({ onOpenLab }) => {
  const [selectedFaultLine, setSelectedFaultLine] = useState<FaultLineId | 'all'>('all');
  const stats = getAggregateStudyStats();
  const subgroups = getSubgroupStats();

  const summaries = FAULT_LINES.map((fl) => ({
    spec: fl,
    summary: getFaultLineSummary(fl.id),
  }));

  const visibleFaultLines =
    selectedFaultLine === 'all'
      ? FAULT_LINES
      : FAULT_LINES.filter((f) => f.id === selectedFaultLine);

  return (
    <div className="mx-auto max-w-[1320px] space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#0F6B6B]">
            Formative Study Results · n = 12 Practitioners
          </p>
          <h1 className="font-serif-display text-3xl font-medium text-[#1C1B18]">
            Baseline vs. Epistemic UX Performance
          </h1>
        </div>
        <span className="rounded-full border border-[#0F6B6B]/30 bg-[#E8F4F4]/70 px-3 py-1 font-mono-tech text-xs text-[#0F6B6B]">
          Stage 1 Empirical Dataset · {stats.pairedEvaluations} Paired ({stats.totalConditionTrials}{' '}
          Condition Trials)
        </span>
      </div>

      {/* SVG Grouped Bar Chart: Pass Rate by Fault Line */}
      <section className="rounded-xl border border-[#E6E1D6] bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[#1C1B18]">
              Perturbation Error-Detection Rate by Fault Line (n = 12 per condition)
            </h2>
            <p className="text-xs text-[#57534E]">
              Percentage of participants who correctly spotted the injected fault or selected the
              calibrated epistemic action.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#C2410C]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#EA580C]" />
              Baseline Fluent UI ({stats.baselinePassRate}% overall)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#0F6B6B]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#0F6B6B]" />
              Epistemic UX Solution ({stats.solutionPassRate}% overall)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 760 250"
            className="h-auto w-full min-w-[600px]"
            role="img"
            aria-label="Grouped bar chart comparing Baseline vs Epistemic UX pass rates across 7 fault lines"
          >
            {/* Horizontal gridlines */}
            {[0, 25, 50, 75, 100].map((pct) => {
              const y = 200 - (pct / 100) * 165;
              return (
                <g key={pct}>
                  <line x1={48} y1={y} x2={740} y2={y} stroke="#E6E1D6" strokeDasharray="3 3" />
                  <text
                    x={40}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-[#8A8478] font-mono-tech text-[10px]"
                  >
                    {pct}%
                  </text>
                </g>
              );
            })}

            {summaries.map(({ spec, summary }, idx) => {
              const groupX = 72 + idx * 96;
              const basePct = (summary.baselinePassCount / summary.totalUsers) * 100;
              const solPct = (summary.solutionPassCount / summary.totalUsers) * 100;
              const baseH = (basePct / 100) * 165;
              const solH = (solPct / 100) * 165;

              return (
                <g key={spec.id}>
                  {/* Baseline Bar */}
                  <rect
                    x={groupX}
                    y={200 - baseH}
                    width={28}
                    height={baseH}
                    rx={4}
                    fill="#EA580C"
                    opacity={0.85}
                  />
                  <text
                    x={groupX + 14}
                    y={200 - baseH - 6}
                    textAnchor="middle"
                    className="fill-[#C2410C] font-mono-tech text-[10px] font-semibold"
                  >
                    {summary.baselinePassCount}/12
                  </text>

                  {/* Solution Bar */}
                  <rect
                    x={groupX + 34}
                    y={200 - solH}
                    width={28}
                    height={solH}
                    rx={4}
                    fill="#0F6B6B"
                  />
                  <text
                    x={groupX + 48}
                    y={200 - solH - 6}
                    textAnchor="middle"
                    className="fill-[#0F6B6B] font-mono-tech text-[10px] font-semibold"
                  >
                    {summary.solutionPassCount}/12
                  </text>

                  {/* X-Axis Label */}
                  <text
                    x={groupX + 31}
                    y={220}
                    textAnchor="middle"
                    className="fill-[#1C1B18] text-[11px] font-medium"
                  >
                    {spec.title}
                  </text>
                  <text
                    x={groupX + 31}
                    y={235}
                    textAnchor="middle"
                    className="fill-[#8A8478] font-mono-tech text-[9px]"
                  >
                    +{Math.round(solPct - basePct)} pp
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Per-Fault-Line Comparative Table */}
      <section className="rounded-xl border border-[#E6E1D6] bg-white p-5 sm:p-6">
        <h2 className="mb-3 text-sm font-semibold text-[#1C1B18]">
          Per-Fault-Line Quantitative Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E1D6] bg-[#FAF8F4] font-mono-tech text-[10px] uppercase tracking-wider text-[#8A8478]">
                <th className="px-3 py-2.5">Fault Line</th>
                <th className="px-3 py-2.5">Baseline Pass</th>
                <th className="px-3 py-2.5">UX Solution Pass</th>
                <th className="px-3 py-2.5">Valid Retention (Base → Sol)</th>
                <th className="px-3 py-2.5">Overtrust (Base → Sol)</th>
                <th className="px-3 py-2.5">Median Time (Base → Sol)</th>
                <th className="px-3 py-2.5">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1D6]">
              {summaries.map(({ spec, summary }) => (
                <tr key={spec.id} className="hover:bg-[#FAF8F4]/70">
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-[#1C1B18]">
                      {spec.number}. {spec.title}
                    </div>
                    <div className="text-[11px] text-[#57534E]">{spec.uxPatternName}</div>
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech text-[#C2410C]">
                    {summary.baselinePassCount}/12 (
                    {Math.round((summary.baselinePassCount / 12) * 100)}%)
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech font-semibold text-[#0F6B6B]">
                    {summary.solutionPassCount}/12 (
                    {Math.round((summary.solutionPassCount / 12) * 100)}%)
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech text-[#57534E]">
                    {summary.baselineValidRetentionCount}/12 → {summary.solutionValidRetentionCount}
                    /12
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech">
                    <span className="text-[#C2410C]">{summary.baselineOvertrustCount}/12</span>
                    <span className="mx-1 text-[#8A8478]">→</span>
                    <span className="text-[#0F6B6B]">{summary.solutionOvertrustCount}/12</span>
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech text-[#57534E]">
                    {summary.baselineMedianTimeSec}s → {summary.solutionMedianTimeSec}s
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenLab(spec.id)}
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] font-medium text-[#0F6B6B] hover:underline"
                    >
                      Open Lab <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Participant × Fault Line 12×7 Outcome Matrix */}
      <section className="rounded-xl border border-[#E6E1D6] bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[#1C1B18]">
              Participant-Level Outcome Matrix (P01–P12 × 7 Fault Lines)
            </h2>
            <p className="text-xs text-[#57534E]">
              Each cell shows Baseline (B) vs. Epistemic UX Solution (S) outcome for that
              participant.
            </p>
          </div>
          <select
            value={selectedFaultLine}
            onChange={(e) => setSelectedFaultLine(e.target.value as FaultLineId | 'all')}
            className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1.5 font-mono-tech text-xs text-[#1C1B18]"
          >
            <option value="all">All 7 Fault Lines</option>
            {FAULT_LINES.map((fl) => (
              <option key={fl.id} value={fl.id}>
                {fl.number}. {fl.title}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E1D6] bg-[#FAF8F4] font-mono-tech text-[10px] uppercase tracking-wider text-[#8A8478]">
                <th className="px-3 py-2">Participant</th>
                {visibleFaultLines.map((fl) => (
                  <th key={fl.id} className="px-2.5 py-2 text-center">
                    {fl.number}. {fl.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1D6]">
              {PARTICIPANTS.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF8F4]/70">
                  <td className="px-3 py-2">
                    <div className="font-mono-tech font-semibold text-[#1C1B18]">{p.id}</div>
                    <div className="text-[11px] text-[#57534E]">{p.role}</div>
                  </td>
                  {visibleFaultLines.map((fl) => {
                    const outcome = TRIAL_OUTCOMES.find(
                      (t) => t.participantId === p.id && t.faultLineId === fl.id,
                    );
                    if (!outcome) return <td key={fl.id} />;
                    const tooltipParts = [
                      outcome.baselineFailureMode
                        ? `Baseline: ${outcome.baselineFailureMode}`
                        : null,
                      outcome.solutionFailureMode
                        ? `Solution: ${outcome.solutionFailureMode}`
                        : null,
                    ].filter(Boolean);
                    const tooltipText =
                      tooltipParts.length > 0 ? tooltipParts.join(' · ') : 'Passed both conditions';
                    return (
                      <td key={fl.id} className="px-2 py-2 text-center">
                        <div
                          className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E1D6] bg-[#FAF8F4] px-2 py-1"
                          title={tooltipText}
                        >
                          <span className="inline-flex items-center gap-0.5 font-mono-tech text-[10px]">
                            B:
                            {outcome.baselinePass ? (
                              <CheckCircle2 className="h-3 w-3 text-[#0F6B6B]" />
                            ) : (
                              <XCircle className="h-3 w-3 text-[#C2410C]" />
                            )}
                          </span>
                          <span className="text-[#D6D0C4]">|</span>
                          <span className="inline-flex items-center gap-0.5 font-mono-tech text-[10px]">
                            S:
                            {outcome.solutionPass ? (
                              <CheckCircle2 className="h-3 w-3 text-[#0F6B6B]" />
                            ) : (
                              <XCircle className="h-3 w-3 text-[#B91C1C]" />
                            )}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subgroup & Methodological Sanity Checks */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[#E6E1D6] bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1C1B18]">
            Order-Effect Check &amp; Expertise Confound
          </h2>
          <p className="mt-1 text-xs text-[#57534E]">
            Comparing counterbalance arms. Note: in this small n = 12 sample, Baseline-First
            contains more High-expertise participants ({subgroups.order.baselineFirst.highExpertiseCount}/6)
            than Solution-First ({subgroups.order.solutionFirst.highExpertiseCount}/6), so the baseline
            gap reflects expertise imbalance rather than order carryover.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
              <div className="font-mono-tech text-[10px] uppercase text-[#C2410C]">
                Baseline-First (n = {subgroups.order.baselineFirst.nUsers})
              </div>
              <div className="mt-1 font-mono-tech text-base font-semibold text-[#1C1B18]">
                {subgroups.order.baselineFirst.baselinePassRate}% →{' '}
                <span className="text-[#0F6B6B]">
                  {subgroups.order.baselineFirst.solutionPassRate}%
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-[#57534E]">
                {subgroups.order.baselineFirst.highExpertiseCount} High ·{' '}
                {subgroups.order.baselineFirst.moderateExpertiseCount} Moderate exp.
              </div>
            </div>
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
              <div className="font-mono-tech text-[10px] uppercase text-[#0F6B6B]">
                Solution-First (n = {subgroups.order.solutionFirst.nUsers})
              </div>
              <div className="mt-1 font-mono-tech text-base font-semibold text-[#1C1B18]">
                {subgroups.order.solutionFirst.baselinePassRate}% →{' '}
                <span className="text-[#0F6B6B]">
                  {subgroups.order.solutionFirst.solutionPassRate}%
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-[#57534E]">
                {subgroups.order.solutionFirst.highExpertiseCount} High ·{' '}
                {subgroups.order.solutionFirst.moderateExpertiseCount} Moderate exp.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E6E1D6] bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1C1B18]">
            Domain Expertise Split &amp; Regressions
          </h2>
          <p className="mt-1 text-xs text-[#57534E]">
            Checking whether gains hold for Moderate-expertise users and tracking Baseline-Pass →
            Solution-Fail regressions ({stats.totalRegressions}/84 paired trials).
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
              <div className="font-mono-tech text-[10px] uppercase text-[#57534E]">
                High Expertise (n = {subgroups.expertise.high.nUsers})
              </div>
              <div className="mt-1 font-mono-tech text-base font-semibold text-[#1C1B18]">
                {subgroups.expertise.high.baselinePassRate}% →{' '}
                <span className="text-[#0F6B6B]">
                  {subgroups.expertise.high.solutionPassRate}%
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
              <div className="font-mono-tech text-[10px] uppercase text-[#57534E]">
                Moderate Expertise (n = {subgroups.expertise.moderate.nUsers})
              </div>
              <div className="mt-1 font-mono-tech text-base font-semibold text-[#1C1B18]">
                {subgroups.expertise.moderate.baselinePassRate}% →{' '}
                <span className="text-[#0F6B6B]">
                  {subgroups.expertise.moderate.solutionPassRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How This Formative Study Informs Stage 2 */}
      <section className="rounded-xl border border-[#0F6B6B]/25 bg-[#E8F4F4]/35 p-5 sm:p-6">
        <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#0F6B6B]">
          <Compass className="h-4 w-4" />
          How This n = 12 Formative Study Informs Stage 2 Validation
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-[#E6E1D6] bg-white p-3.5 text-xs leading-relaxed text-[#302E2A]">
            <div className="font-semibold text-[#1C1B18]">
              1. Add 30-Second DAG Legend for Causality
            </div>
            <p className="mt-1 text-[#57534E]">
              2 non-technical participants (P08, P11) still misread the Causal DAG fork with high
              confidence. Adding a one-line legend distinguishing{' '}
              <code className="font-mono-tech">observe(X)</code> vs.{' '}
              <code className="font-mono-tech">do(X)</code> is prioritized before Stage 2.
            </p>
          </div>
          <div className="rounded-lg border border-[#E6E1D6] bg-white p-3.5 text-xs leading-relaxed text-[#302E2A]">
            <div className="font-semibold text-[#1C1B18]">
              2. Clarify Seek vs. Abstain &amp; Reduce Density Regressions
            </div>
            <p className="mt-1 text-[#57534E]">
              P10 hesitated between Seek Evidence and Abstain, and 2 regressions (P04 on 2×2
              Motivation; P05 on Value step 3) show denser controls can induce slip errors without
              progressive disclosure.
            </p>
          </div>
          <div className="rounded-lg border border-[#E6E1D6] bg-white p-3.5 text-xs leading-relaxed text-[#302E2A]">
            <div className="font-semibold text-[#1C1B18]">
              3. Stage 2 Between-Subjects Validation
            </div>
            <p className="mt-1 text-[#57534E]">
              Observed formative effect sizes (+{stats.minEffectPP} to +{stats.maxEffectPP} pp) and
              the {stats.solutionSpecificityRate - stats.baselineSpecificityRate} pp valid-retention
              trade-off ({stats.baselineSpecificityRate}% → {stats.solutionSpecificityRate}%) inform
              a Stage 2 between-subjects trial (target{' '}
              <code className="font-mono-tech">n = 48–60</code>) stratified by domain expertise to
              eliminate both carryover and arm imbalance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
