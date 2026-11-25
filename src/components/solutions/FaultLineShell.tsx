import React, { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  MessageSquareQuote,
  ShieldAlert,
  ShieldCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { FAULT_LINE_ANNOTATIONS } from '../../data/faultLineAnnotations';
import { getFaultLineSummary } from '../../data/userStudyData';
import { FaultLineSpec } from '../../types/epistemia';

export interface ScoreCheckItem {
  label: string;
  conventionalPass: boolean;
  conventionalNote: string;
  epistemicPass: boolean;
  epistemicNote: string;
}

interface FaultLineShellProps {
  spec: FaultLineSpec;
  controlsTitle?: string;
  controls: React.ReactNode;
  conventionalTitle?: string;
  conventionalContent: React.ReactNode;
  epistemicTitle?: string;
  epistemicContent: React.ReactNode;
  checks: ScoreCheckItem[];
}

export const FaultLineShell: React.FC<FaultLineShellProps> = ({
  spec,
  controlsTitle = 'Evaluation Perturbation : How to Tell Whether It Works',
  controls,
  conventionalTitle = 'Conventional Fluent UI (Epistemia Risk)',
  conventionalContent,
  epistemicTitle = `Epistemic UX Solution · ${spec.uxPatternName}`,
  epistemicContent,
  checks,
}) => {
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const annotations = FAULT_LINE_ANNOTATIONS[spec.id] ?? [];
  const summary = getFaultLineSummary(spec.id);

  const baselinePct = Math.round((summary.baselinePassCount / summary.totalUsers) * 100);
  const solutionPct = Math.round((summary.solutionPassCount / summary.totalUsers) * 100);

  return (
    <div className="space-y-5">
      {/* Header Card */}
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#1C1B18] px-2 py-0.5 font-mono-tech text-xs font-semibold text-white">
                FAULT LINE {spec.number} / 7
              </span>
              <span className="rounded bg-[#E8F4F4] px-2.5 py-0.5 text-xs font-medium text-[#0F6B6B]">
                {spec.uxPatternName}
              </span>
            </div>
            <h2 className="font-serif-display text-2xl font-medium text-[#1C1B18] sm:text-3xl">
              {spec.title}
            </h2>
            <p className="text-xs font-medium text-[#8A8478]">
              Pipeline Mismatch: <span className="text-[#57534E]">{spec.humanVsAiMismatch}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAnnotations((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono-tech text-xs font-medium transition-colors ${
                showAnnotations
                  ? 'border-[#B45309]/40 bg-[#FEF3C7]/70 text-[#92400E]'
                  : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#57534E] hover:border-[#B45309]/40'
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {showAnnotations ? 'Hide UX Annotations' : 'Show UX Annotations'}
            </button>

            <a
              href={spec.citationUrl}
              target="_blank"
              rel="noreferrer"
              title="Related empirical benchmark literature (UI demo uses an original illustrative scenario)"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1.5 font-mono-tech text-xs text-[#0F6B6B] transition-colors hover:border-[#0F6B6B]"
            >
              <span className="text-[#8A8478]">Related Benchmark:</span> {spec.citationLabel}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[#1C1B18]/15 bg-[#F3EFE7]/70 p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#1C1B18]">
              Paper Definition · {spec.paperFaultName}
            </span>
            <a
              href="https://arxiv.org/html/2512.19466v1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono-tech text-[10px] font-medium text-[#0F6B6B] hover:underline"
            >
              Quattrociocchi, Capraro &amp; Perc (arXiv:2512.19466v1)
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[#1C1B18]">
            {spec.paperDefinition}
          </p>
        </div>

        <div className="mt-3 grid gap-3 border-t border-[#E6E1D6] pt-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F6B6B]">
              Proposed Intervention
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#302E2A]">
              {spec.proposedIntervention}
            </p>
          </div>
          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#B45309]">
              Verification Criterion
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#302E2A]">
              {spec.evaluationCriterion}
            </p>
          </div>
        </div>
      </div>

      {/* Perturbation Controls Strip */}
      <div className="rounded-xl border border-[#E6E1D6] bg-[#F3EFE7]/75 p-4 sm:p-5">
        <div className="mb-3 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
          {controlsTitle}
        </div>
        {controls}
      </div>

      {/* Side-by-Side Live UI Comparison */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Conventional */}
        <div className="flex flex-col rounded-xl border border-[#C2410C]/30 bg-white shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
          <div className="flex items-center justify-between border-b border-[#E6E1D6] bg-[#FFF7ED]/70 px-4 py-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C2410C]">
              <ShieldAlert className="h-4 w-4" />
              {conventionalTitle}
            </span>
            <span className="font-mono-tech text-[10px] uppercase text-[#C2410C]">
              Baseline
            </span>
          </div>
          <div className="flex-1 p-4 sm:p-5">{conventionalContent}</div>
        </div>

        {/* Right: Epistemic UX */}
        <div className="flex flex-col rounded-xl border border-[#0F6B6B]/35 bg-white shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
          <div className="flex items-center justify-between border-b border-[#E6E1D6] bg-[#E8F4F4]/60 px-4 py-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F6B6B]">
              <ShieldCheck className="h-4 w-4" />
              {epistemicTitle}
            </span>
            <span className="font-mono-tech text-[10px] uppercase text-[#0F6B6B]">
              UX Solution
            </span>
          </div>
          <div className="flex-1 p-4 sm:p-5">{epistemicContent}</div>
        </div>
      </div>

      {/* Design Rationale Annotations ("Why This Solution Works") */}
      {showAnnotations && annotations.length > 0 && (
        <div className="rounded-xl border border-[#B45309]/30 bg-[#FFFDF7] p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#92400E]">
              <Lightbulb className="h-4 w-4 text-[#B45309]" />
              UX Design Annotations : Why This Solution Works
            </div>
            <span className="font-mono-tech text-[10px] text-[#8A8478]">
              {annotations.length} annotated mechanisms
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {annotations.map((ann) => (
              <div
                key={ann.id}
                className="flex flex-col justify-between rounded-lg border border-[#E6E1D6] bg-white p-3.5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B45309] font-mono-tech text-[11px] font-semibold text-white">
                      {ann.number}
                    </span>
                    <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wide text-[#0F6B6B]">
                      {ann.targetElement}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs font-semibold text-[#1C1B18]">{ann.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
                    {ann.whyItWorks}
                  </p>
                </div>
                <div className="mt-3 border-t border-[#E6E1D6] pt-2 text-[11px] text-[#92400E]">
                  <span className="font-semibold">Mechanism:</span> {ann.cognitiveMechanism}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Verification Scoreboard */}
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-4 sm:p-5">
        <div className="mb-3 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
          Live Evaluation Scoreboard (Current Perturbation)
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {checks.map((chk) => (
            <div
              key={chk.label}
              className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3"
            >
              <div className="text-xs font-semibold text-[#1C1B18]">{chk.label}</div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div
                  className={`flex items-start gap-1.5 rounded border p-2 text-[11px] ${
                    chk.conventionalPass
                      ? 'border-[#0F6B6B]/25 bg-[#E8F4F4]/50 text-[#0F6B6B]'
                      : 'border-[#FEE2E2] bg-[#FEF2F2] text-[#B91C1C]'
                  }`}
                >
                  {chk.conventionalPass ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  )}
                  <div>
                    <div className="font-semibold">Conventional</div>
                    <div className="text-[#57534E]">{chk.conventionalNote}</div>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-1.5 rounded border p-2 text-[11px] ${
                    chk.epistemicPass
                      ? 'border-[#0F6B6B]/30 bg-[#E8F4F4]/60 text-[#0F6B6B]'
                      : 'border-[#FEE2E2] bg-[#FEF2F2] text-[#B91C1C]'
                  }`}
                >
                  {chk.epistemicPass ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  )}
                  <div>
                    <div className="font-semibold">Epistemic UX</div>
                    <div className="text-[#57534E]">{chk.epistemicNote}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First-Stage User Test Benchmark (n = 12 Simulated) */}
      <div className="rounded-xl border border-[#0F6B6B]/25 bg-white p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#0F6B6B]">
            <Users className="h-4 w-4" />
            Formative User Test Benchmark · {spec.title} (n = 12 Simulated)
          </div>
          <span className="rounded-full border border-[#E6E1D6] bg-[#FAF8F4] px-2.5 py-0.5 font-mono-tech text-[10px] text-[#57534E]">
            +{solutionPct - baselinePct} pp Accuracy Gain
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Perturbation Pass Rate
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono-tech text-lg font-semibold text-[#C2410C]">
                {summary.baselinePassCount}/{summary.totalUsers}
              </span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="font-mono-tech text-lg font-semibold text-[#0F6B6B]">
                {summary.solutionPassCount}/{summary.totalUsers}
              </span>
              <span className="font-mono-tech text-xs text-[#0F6B6B]">({solutionPct}%)</span>
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Valid Retention (Specificity)
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono-tech text-lg font-semibold text-[#57534E]">
                {summary.baselineValidRetentionCount}/12
              </span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="font-mono-tech text-lg font-semibold text-[#0F6B6B]">
                {summary.solutionValidRetentionCount}/12
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              High-Confidence Overtrust
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono-tech text-lg font-semibold text-[#C2410C]">
                {summary.baselineOvertrustCount}/12
              </span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="font-mono-tech text-lg font-semibold text-[#0F6B6B]">
                {summary.solutionOvertrustCount}/12
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">
              Median Decision Latency
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono-tech text-lg font-semibold text-[#57534E]">
                {summary.baselineMedianTimeSec}s
              </span>
              <span className="text-xs text-[#8A8478]">→</span>
              <span className="font-mono-tech text-lg font-semibold text-[#1C1B18]">
                {summary.solutionMedianTimeSec}s
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3 text-xs leading-relaxed text-[#302E2A]">
            <span className="font-mono-tech text-[10px] font-semibold uppercase text-[#57534E]">
              Key Finding:{' '}
            </span>
            {summary.keyFinding}
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-[#E6E1D6] bg-[#E8F4F4]/35 p-3 text-xs text-[#302E2A]">
            <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6B6B]" />
            <div>
              <p className="italic">“{summary.representativeQuote.quote}”</p>
              <p className="mt-1 font-mono-tech text-[10px] font-semibold text-[#0F6B6B]">
                - {summary.representativeQuote.participantId} · {summary.representativeQuote.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
