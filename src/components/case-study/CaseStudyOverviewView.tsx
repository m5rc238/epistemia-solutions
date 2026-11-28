import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { FAULT_LINES } from '../../data/faultLines';
import {
  getAggregateStudyStats,
  getFaultLineSummary,
  PARTICIPANTS,
  STUDY_METADATA,
} from '../../data/userStudyData';
import { FaultLineId } from '../../types/epistemia';

interface CaseStudyOverviewViewProps {
  onOpenLab: (id?: FaultLineId) => void;
  onOpenResults: () => void;
}

export const CaseStudyOverviewView: React.FC<CaseStudyOverviewViewProps> = ({
  onOpenLab,
  onOpenResults,
}) => {
  const stats = getAggregateStudyStats();

  return (
    <div className="mx-auto max-w-[1320px] space-y-8 px-4 py-8 sm:px-6">
      {/* Hero Case Study Header */}
      <section className="rounded-2xl border border-[#E6E1D6] bg-white p-6 shadow-[0_1px_4px_rgba(28,27,24,0.04)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#1C1B18] px-2.5 py-1 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-white">
            UX Research Case Study
          </span>
          <span className="rounded bg-[#E8F4F4] px-2.5 py-1 font-mono-tech text-[11px] font-semibold text-[#0F6B6B]">
            Stage 1 Formative Study · n = 12 Practitioners
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl font-serif-display text-3xl font-medium leading-tight text-[#1C1B18] sm:text-4xl">
          Designing Against Epistemia: A 7-Fault-Line UX Solutions Lab &amp; Formative Evaluation
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#57534E] sm:text-base">
          Operationalizing{' '}
          <a
            href="https://arxiv.org/html/2512.19466v1"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#0F6B6B] underline decoration-[#0F6B6B]/40 underline-offset-2 hover:decoration-[#0F6B6B]"
          >
            Quattrociocchi, Capraro &amp; Perc (arXiv:2512.19466v1)
          </a>
          : AI interfaces frequently trigger <strong className="text-[#1C1B18]">epistemia</strong>, where
          linguistic plausibility substitutes for genuine epistemic evaluation. This case study pairs an
          interactive before/after prototype lab across all{' '}
          <strong className="text-[#1C1B18]">7 epistemological fault lines</strong> with a{' '}
          <strong className="text-[#1C1B18]">first-stage formative user study (n = 12 practitioners)</strong>{' '}
          to inform a full Stage 2 empirical trial.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenLab('grounding')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0F6B6B] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0B5353]"
          >
            Explore 7 Fault Lines UX Lab
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenResults}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] px-4 py-2.5 text-xs font-semibold text-[#1C1B18] transition-colors hover:border-[#0F6B6B] hover:text-[#0F6B6B]"
          >
            View 12-User Results &amp; Matrix
          </button>
        </div>

        {/* High-level Snapshot */}
        <div className="mt-7 grid gap-3 border-t border-[#E6E1D6] pt-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Formative Sample
            </div>
            <div className="mt-1 font-mono-tech text-xl font-semibold text-[#1C1B18]">
              n = {stats.totalParticipants} users
            </div>
            <div className="mt-0.5 text-[11px] text-[#57534E]">
              {stats.pairedEvaluations} paired ({stats.totalConditionTrials} condition trials)
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Error Detection (Sensitivity)
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-mono-tech text-xl font-semibold">
              <span className="text-[#C2410C]">{stats.baselinePassRate}%</span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="text-[#0F6B6B]">{stats.solutionPassRate}%</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#57534E]">
              {stats.baselinePasses}/84 → {stats.solutionPasses}/84 ({stats.totalRegressions}{' '}
              regressions)
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Valid Retention (Specificity)
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-mono-tech text-xl font-semibold">
              <span className="text-[#57534E]">{stats.baselineSpecificityRate}%</span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="text-[#0F6B6B]">{stats.solutionSpecificityRate}%</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#57534E]">
              {stats.solutionSpecificityRate - stats.baselineSpecificityRate} pp trade-off (mild
              over-skepticism on valid items)
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              High-Confidence Overtrust
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-mono-tech text-xl font-semibold">
              <span className="text-[#C2410C]">{stats.baselineOvertrustRate}%</span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="text-[#0F6B6B]">{stats.solutionOvertrustRate}%</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#57534E]">
              Failed tasks rated ≥ 4/5 ({stats.baselineOvertrustCount} →{' '}
              {stats.solutionOvertrustCount})
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Fluency vs. SUS Trade-off
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-mono-tech text-xl font-semibold">
              <span className="text-[#57534E]">{stats.meanSusBaseline}</span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="text-[#0F6B6B]">{stats.meanSusSolution}</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#57534E]">
              Baseline feels easy ({stats.meanSusBaseline} SUS), yet masks errors
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Study Protocol */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#C2410C]">
            <ShieldAlert className="h-4 w-4" />
            1. Problem Statement &amp; Research Questions
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#302E2A]">
            Conventional AI interfaces optimize for smooth, authoritative prose. When an underlying
            premise is ungrounded, ambiguous, outdated, sycophantically echoed, causally confounded,
            out-of-distribution, or normatively contested, fluent UIs mask the failure.
          </p>
          <ul className="mt-3 space-y-2 text-xs text-[#57534E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F6B6B]" />
              <span>
                <strong className="text-[#1C1B18]">RQ1 (Detection):</strong> Do fault-line-specific
                UX interventions increase user detection of perturbed/invalid AI outputs?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F6B6B]" />
              <span>
                <strong className="text-[#1C1B18]">RQ2 (Calibration):</strong> Do explicit evidence
                slots and abstention routes reduce high-confidence overtrust without prohibitive
                decision latency?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F6B6B]" />
              <span>
                <strong className="text-[#1C1B18]">RQ3 (Formative Friction):</strong> Which patterns
                still confuse domain practitioners and need refinement before Stage 2 testing?
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#0F6B6B]">
            <FlaskConical className="h-4 w-4" />
            2. Formative Test Protocol (n = 12)
          </div>
          <dl className="mt-3 space-y-2.5 text-xs">
            <div className="flex justify-between gap-4 border-b border-[#E6E1D6] pb-2">
              <dt className="font-medium text-[#57534E]">Experimental Design</dt>
              <dd className="text-right font-semibold text-[#1C1B18]">{STUDY_METADATA.design}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#E6E1D6] pb-2">
              <dt className="font-medium text-[#57534E]">Counterbalancing</dt>
              <dd className="text-right font-semibold text-[#1C1B18]">
                6 Baseline-First · 6 Solution-First
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#E6E1D6] pb-2">
              <dt className="font-medium text-[#57534E]">Session Format</dt>
              <dd className="text-right font-semibold text-[#1C1B18]">
                {STUDY_METADATA.sessionLengthLabel}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-[#57534E]">Study Stage</dt>
              <dd className="text-right font-semibold text-[#0F6B6B]">
                Stage 1 Formative Study (informs Stage 2 trial)
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 12-User Cohort Roster Table */}
      <section className="rounded-xl border border-[#E6E1D6] bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#0F6B6B]">
              <Users className="h-4 w-4" />
              3. Participant Cohort Details (n = 12 Practitioners)
            </div>
            <p className="mt-1 text-xs text-[#57534E]">
              Purposive sample across clinical, policy, legal, safety-eval, journalism, and
              operations roles who routinely audit AI-generated syntheses.
            </p>
          </div>
          <span className="rounded-full border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1 font-mono-tech text-[11px] text-[#57534E]">
            6 Baseline-First · 6 Solution-First
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E1D6] bg-[#FAF8F4] font-mono-tech text-[10px] uppercase tracking-wider text-[#8A8478]">
                <th className="px-3 py-2.5">ID</th>
                <th className="px-3 py-2.5">Role &amp; Domain</th>
                <th className="px-3 py-2.5">Exp</th>
                <th className="px-3 py-2.5">AI Usage</th>
                <th className="px-3 py-2.5">Order</th>
                <th className="px-3 py-2.5">Session</th>
                <th className="px-3 py-2.5">SUS (Base → Sol)</th>
                <th className="px-3 py-2.5">Think-Aloud Observation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1D6]">
              {PARTICIPANTS.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF8F4]/70">
                  <td className="px-3 py-2.5 font-mono-tech font-semibold text-[#1C1B18]">
                    {p.id}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-[#1C1B18]">{p.role}</div>
                    <div className="text-[11px] text-[#57534E]">{p.domain}</div>
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech text-[#57534E]">{p.yearsExp}y</td>
                  <td className="px-3 py-2.5">
                    <span className="rounded border border-[#E6E1D6] bg-[#FAF8F4] px-2 py-0.5 font-mono-tech text-[10px] text-[#57534E]">
                      {p.aiUsageFreq}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`rounded px-2 py-0.5 font-mono-tech text-[10px] font-medium ${
                        p.counterbalanceOrder === 'Baseline-First'
                          ? 'bg-[#FFF7ED] text-[#C2410C]'
                          : 'bg-[#E8F4F4] text-[#0F6B6B]'
                      }`}
                    >
                      {p.counterbalanceOrder}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech text-[#57534E]">
                    {p.sessionDurationMin}m
                  </td>
                  <td className="px-3 py-2.5 font-mono-tech">
                    <span className="text-[#C2410C]">{p.susBaseline}</span>
                    <span className="mx-1 text-[#8A8478]">→</span>
                    <span className="font-semibold text-[#0F6B6B]">{p.susSolution}</span>
                  </td>
                  <td className="max-w-xs px-3 py-2.5 text-[11px] italic text-[#57534E]">
                    “{p.keyQuote}”
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Index of the 7 Fault Lines */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#57534E]">
          <ClipboardList className="h-4 w-4 text-[#0F6B6B]" />
          4. The 7 Epistemological Fault Lines : Jump to Interactive Prototype
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FAULT_LINES.map((fl) => {
            const s = getFaultLineSummary(fl.id);
            return (
              <button
                key={fl.id}
                type="button"
                onClick={() => onOpenLab(fl.id)}
                className="group flex flex-col justify-between rounded-xl border border-[#E6E1D6] bg-white p-4 text-left transition-all hover:border-[#0F6B6B] hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#1C1B18] px-2 py-0.5 font-mono-tech text-[10px] font-semibold text-white">
                      0{fl.number} · {fl.title.toUpperCase()}
                    </span>
                    <span className="font-mono-tech text-[11px] font-semibold text-[#0F6B6B]">
                      {s.baselinePassCount}/12 → {s.solutionPassCount}/12
                    </span>
                  </div>
                  <div className="mt-2.5 text-sm font-semibold text-[#1C1B18] group-hover:text-[#0F6B6B]">
                    {fl.paperFaultName}: {fl.uxPatternName}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
                    {fl.paperDefinition}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 font-mono-tech text-[11px] font-medium text-[#0F6B6B]">
                  Inspect Baseline, Solution &amp; Annotations
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
