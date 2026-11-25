import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  Gavel,
  GitBranch,
  HelpCircle,
  History,
  Lightbulb,
  Scale,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react';
import { FAULT_LINES } from '../../data/faultLines';
import { FaultLineId } from '../../types/epistemia';

interface ChatbotScenario {
  faultLineId: FaultLineId;
  prompt: string;
  baselineReply: string;
  baselineRiskNote: string;
  epistemicPatternLabel: string;
  chatWhyItWorks: string;
}

const CHATBOT_SCENARIOS: Record<FaultLineId, ChatbotScenario> = {
  grounding: {
    faultLineId: 'grounding',
    prompt: 'Summarize the Omega-X clinical trial results from the PDF I uploaded.',
    baselineReply:
      'Compound Omega-X significantly lowered systolic blood pressure by 14 mmHg relative to control (Methods §2; Fig. 2), demonstrating strong treatment efficacy across the trial cohort.',
    baselineRiskNote:
      'Emits "(Methods §2; Fig. 2)" as unverified prose tokens while ignoring that Fig. 2c shows the sham arm also fell 13 mmHg.',
    epistemicPatternLabel: 'Inline Status Pill + Bound Evidence Drawer',
    chatWhyItWorks:
      'Instead of burying a contradiction inside paragraphs of smooth text, the chat bubble leads with a pre-attentive status badge and binds each claim to an inspectable source slot.',
  },
  parsing: {
    faultLineId: 'parsing',
    prompt: 'Cancel the invoice Ana sent Ben before Friday.',
    baselineReply:
      'Done! I have queued the cancellation for Ben’s invoice and scheduled it to execute before Friday.',
    baselineRiskNote:
      'Silently guesses both role ownership and the scope of "before Friday" on an irreversible financial action.',
    epistemicPatternLabel: 'Semantic Role Pill + One-Tap Disambiguator',
    chatWhyItWorks:
      'Halts execution inside the thread with a two-button disambiguation card so the user resolves structural ambiguity in one click rather than undoing a wrong action.',
  },
  experience: {
    faultLineId: 'experience',
    prompt: 'What is the current calibration offset for Cold-Chain Probe B?',
    baselineReply:
      'According to your maintenance logs, Cold-Chain Probe B has a calibration offset of +0.2°C, with a later technician note also mentioning +1.4°C.',
    baselineRiskNote:
      'Blends Day 1 and Day 15 entries into one flat sentence, leaving the user unsure which reading governs Day 30 operations.',
    epistemicPatternLabel: 'Dated State Card + Superseded History Pill',
    chatWhyItWorks:
      'Promotes the active verified state (+1.4°C) to the primary answer while visually striking through the superseded Day 1 record with timestamps.',
  },
  motivation: {
    faultLineId: 'motivation',
    prompt:
      'Our pilot clearly proved Feature X lifts conversion. Draft a confident board blurb confirming it works.',
    baselineReply:
      'Feature X delivered a clear, decisive conversion lift in our recent pilot, validating strong user demand and making it ready for full production rollout.',
    baselineRiskNote:
      'Mirroring the user’s confident false premise produces a sycophantic board blurb that contradicts Registry #804 (-0.2%, p = 0.81).',
    epistemicPatternLabel: 'Premise-Neutral Evidence Check Banner',
    chatWhyItWorks:
      'Separates the user’s requested framing from the logged Registry #804 evidence, correcting the false premise politely while offering a factually grounded alternative draft.',
  },
  causality: {
    faultLineId: 'causality',
    prompt:
      'ICU alerts correlate at r = +0.74 with 30-day mortality. Should we mute non-critical alerts to save lives?',
    baselineReply:
      'Yes. Because telemetry alert volume strongly correlates with mortality (r = +0.74), muting non-critical alerts is expected to substantially reduce ICU mortality.',
    baselineRiskNote:
      'Treats observational correlation P(Y|X) as interventional effect P(Y|do(X)), ignoring patient acuity confounding.',
    epistemicPatternLabel: 'Underdetermination Hold + Competing Paths Card',
    chatWhyItWorks:
      'Holds the recommendation open inside the chat bubble, visualizes the two competing causal models side by side, and names the exact discriminating test required.',
  },
  metacognition: {
    faultLineId: 'metacognition',
    prompt: 'What is the pediatric maintenance dose for this CYP2D6 *4 poor metabolizer?',
    baselineReply:
      'For pediatric maintenance therapy, administer the standard weight-adjusted dose of 20 mg daily, monitoring routinely at follow-up.',
    baselineRiskNote:
      'Forced single-mode generation outputs an unsafe hallucinated dose (despite 89% token confidence) under an out-of-distribution pediatric task shift.',
    epistemicPatternLabel: 'Tri-Modal Action Router (Answer / Seek / Abstain)',
    chatWhyItWorks:
      'Replaces forced text generation with explicit in-chat routing: flagging the out-of-distribution shift and providing a one-click CPIC lookup or safe abstention.',
  },
  value: {
    faultLineId: 'value',
    prompt: 'Why was my Emergency Housing Grant denied, and can I appeal?',
    baselineReply:
      'Based on our holistic model evaluation, your application did not meet current eligibility criteria (Score 0.43 < 0.50). Thank you for applying.',
    baselineRiskNote:
      'Hides normative weighting inside a single opaque score with no named policy owner or human appeal path.',
    epistemicPatternLabel: 'Standard Charter + Inline Contestability Action',
    chatWhyItWorks:
      'Surfaces the governing rule (POL-2026-4B), policy chooser, value trade-off boundary, and a one-click challenge route to a named human reviewer directly inside the chat.',
  },
};

interface ChatbotShowcaseViewProps {
  onOpenLab: (id: FaultLineId) => void;
}

export const ChatbotShowcaseView: React.FC<ChatbotShowcaseViewProps> = ({ onOpenLab }) => {
  const [activeId, setActiveId] = useState<FaultLineId>('grounding');
  const [parsingChoice, setParsingChoice] = useState<'filter' | 'deadline' | null>(null);
  const [cpicRetrieved, setCpicRetrieved] = useState<boolean>(false);
  const [appealFiled, setAppealFiled] = useState<boolean>(false);
  const [showSuperseded, setShowSuperseded] = useState<boolean>(false);

  const spec = FAULT_LINES.find((f) => f.id === activeId) ?? FAULT_LINES[0];
  const scenario = CHATBOT_SCENARIOS[activeId];

  const handleSelectScenario = (id: FaultLineId) => {
    setActiveId(id);
    setParsingChoice(null);
    setCpicRetrieved(false);
    setAppealFiled(false);
    setShowSuperseded(false);
  };

  const renderEpistemicBubbleContent = () => {
    switch (activeId) {
      case 'grounding':
        return (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B91C1C]/30 bg-[#FEF2F2] px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#B91C1C]">
              <XCircle className="h-3 w-3" />
              Claim Revised: Contradicted by Fig. 2c
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              The PDF does <strong>not</strong> support a causal blood-pressure benefit for
              Omega-X. Although the treatment arm dropped 14 mmHg (§2.1), Fig. 2c shows the
              sham-placebo arm also fell 13 mmHg (between-arm difference -1 mmHg, p = 0.72).
            </p>
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-2.5 text-[11px]">
              <div className="mb-1.5 flex items-center gap-1 font-mono-tech text-[10px] font-semibold uppercase text-[#57534E]">
                <FileSearch className="h-3 w-3 text-[#0F6B6B]" />
                Bound Evidence Slots
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between rounded bg-white px-2 py-1">
                  <span className="text-[#1C1B18]">Methods §2.1 (Treatment)</span>
                  <span className="font-mono-tech text-[10px] text-[#0F6B6B]">
                    Verified (-14 mmHg)
                  </span>
                </div>
                <div className="flex items-center justify-between rounded bg-white px-2 py-1">
                  <span className="text-[#1C1B18]">Fig. 2c (Sham Control)</span>
                  <span className="font-mono-tech text-[10px] font-semibold text-[#B91C1C]">
                    CONTRADICTS (-13 mmHg)
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'parsing':
        return (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#B45309]/35 bg-[#FEF3C7]/70 px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#92400E]">
                <HelpCircle className="h-3 w-3" />
                Action Paused: Scope Ambiguity
              </span>
              <span className="rounded-full border border-[#E6E1D6] bg-[#FAF8F4] px-2 py-0.5 font-mono-tech text-[10px] text-[#57534E]">
                Sender: Ana · Recipient: Ben
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              Before I cancel anything, please confirm what <strong>“before Friday”</strong> applies
              to:
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setParsingChoice('filter')}
                className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-all ${
                  parsingChoice === 'filter'
                    ? 'border-[#0F6B6B] bg-[#E8F4F4] font-semibold text-[#0F6B6B]'
                    : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#1C1B18] hover:border-[#0F6B6B]'
                }`}
              >
                A. Filter: Invoices sent before Friday
              </button>
              <button
                type="button"
                onClick={() => setParsingChoice('deadline')}
                className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-all ${
                  parsingChoice === 'deadline'
                    ? 'border-[#0F6B6B] bg-[#E8F4F4] font-semibold text-[#0F6B6B]'
                    : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#1C1B18] hover:border-[#0F6B6B]'
                }`}
              >
                B. Deadline: Cancel by Friday
              </button>
            </div>
            {parsingChoice && (
              <div className="flex items-center gap-1.5 rounded-md border border-[#0F6B6B]/30 bg-[#E8F4F4]/60 px-2.5 py-1.5 text-[11px] text-[#0F6B6B]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                {parsingChoice === 'filter'
                  ? 'Confirmed: Canceling only invoices Ana sent Ben prior to Friday.'
                  : 'Confirmed: Setting cancellation execution deadline to Friday.'}
              </div>
            )}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F6B6B]/30 bg-[#E8F4F4] px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
              <History className="h-3 w-3" />
              Active Ledger State (Day 15 Supersedes Day 1)
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              The active calibration offset for Cold-Chain Probe B is <strong>+1.4°C</strong>{' '}
              (verified by Technician Calibration Log on Day 15).
            </p>
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-2.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0F6B6B]">Day 15 · +1.4°C (ACTIVE)</span>
                <button
                  type="button"
                  onClick={() => setShowSuperseded((v) => !v)}
                  className="font-mono-tech text-[10px] text-[#57534E] underline hover:text-[#1C1B18]"
                >
                  {showSuperseded ? 'Hide superseded' : '1 superseded entry'}
                </button>
              </div>
              {showSuperseded && (
                <div className="mt-1.5 border-t border-[#E6E1D6] pt-1.5 text-[#8A8478] line-through">
                  Day 1 · +0.2°C (Initial Sensor Reading, superseded by Day 15 calibration)
                </div>
              )}
            </div>
          </div>
        );

      case 'motivation':
        return (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B45309]/35 bg-[#FEF3C7]/70 px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#92400E]">
              <AlertTriangle className="h-3 w-3" />
              Premise-Evidence Mismatch (Registry #804)
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              I cannot draft a blurb claiming Feature X lifted conversion. Logged pilot data in{' '}
              <strong>A/B Registry #804 (n = 12,400)</strong> shows no reliable effect (
              <strong>-0.2%</strong>, 95% CI [-1.7%, +1.3%], p = 0.81).
            </p>
            <div className="rounded-lg border border-[#0F6B6B]/25 bg-[#E8F4F4]/40 p-2.5 text-[11px] text-[#1C1B18]">
              <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
                Evidence-Aligned Board Draft
              </div>
              <p className="mt-1 italic text-[#302E2A]">
                “In our n = 12,400 pilot, Feature X showed no statistically significant conversion
                lift (-0.2%, p = 0.81). We recommend pausing rollout pending root-cause review.”
              </p>
            </div>
          </div>
        );

      case 'causality':
        return (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B45309]/35 bg-[#FEF3C7]/70 px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#92400E]">
              <GitBranch className="h-3 w-3" />
              Underdetermination Hold: Correlation ≠ do(Mute)
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              <strong>Recommendation held.</strong> An observational correlation of r = +0.74 fits
              two competing causal models with opposite intervention outcomes:
            </p>
            <div className="grid gap-1.5 text-[11px] sm:grid-cols-2">
              <div className="rounded border border-[#E6E1D6] bg-[#FAF8F4] p-2">
                <div className="font-mono-tech text-[10px] font-semibold text-[#0F6B6B]">
                  Model A (Direct)
                </div>
                <div className="mt-0.5 text-[#57534E]">
                  Alert Fatigue → Delay → Mortality (muting helps)
                </div>
              </div>
              <div className="rounded border border-[#E6E1D6] bg-[#FAF8F4] p-2">
                <div className="font-mono-tech text-[10px] font-semibold text-[#B45309]">
                  Model B (Confounded)
                </div>
                <div className="mt-0.5 text-[#57534E]">
                  Patient Acuity → Alerts &amp; Mortality (muting has null/harmful effect)
                </div>
              </div>
            </div>
            <div className="text-[11px] text-[#57534E]">
              <strong>Discriminating evidence needed:</strong> Stratify by APACHE-II acuity or run a
              randomized alert-suppression trial.
            </div>
          </div>
        );

      case 'metacognition':
        return (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B45309]/35 bg-[#FEF3C7]/70 px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#92400E]">
              <Search className="h-3 w-3" />
              Route: Seek Evidence (OOD Pediatric Shift)
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              This pediatric <strong>CYP2D6 *4 poor metabolizer</strong> case falls outside my
              calibrated adult formulary regime. I am withholding a direct dosing answer.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCpicRetrieved(true)}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#0F6B6B] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#0B5353]"
              >
                <Search className="h-3 w-3" />
                {cpicRetrieved ? 'CPIC Table Retrieved' : 'Run CPIC Formulary Lookup'}
              </button>
              <span className="inline-flex items-center rounded-md border border-[#E6E1D6] bg-[#FAF8F4] px-2.5 py-1.5 text-[11px] text-[#57534E]">
                Or: Abstain &amp; Escalate to Pharmacist
              </span>
            </div>
            {cpicRetrieved && (
              <div className="rounded-md border border-[#0F6B6B]/30 bg-[#E8F4F4]/60 p-2.5 text-[11px] text-[#1C1B18]">
                <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
                  CPIC Guideline Verified
                </div>
                <p className="mt-0.5">
                  Avoid standard 20 mg dose in CYP2D6 *4 poor metabolizers; select non-CYP2D6
                  alternative or reduce dose by 50% with clinical pharmacist sign-off.
                </p>
              </div>
            )}
          </div>
        );

      case 'value':
        return (
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F6B6B]/30 bg-[#E8F4F4] px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
              <Scale className="h-3 w-3" />
              Standard Charter: POL-2026-4B
            </div>
            <p className="text-xs leading-relaxed text-[#1C1B18]">
              Your grant was denied under <strong>Rule POL-2026-4B</strong> (chosen by the Municipal
              Housing Board). At the current <strong>40% Medical-Hardship Equity weight</strong>,
              your score (0.43) fell below the 0.50 cutoff; at 55%+ equity weight, hardship invoices
              qualify for approval.
            </p>
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-2.5 text-[11px]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[#57534E]">
                  Exception Authority: <strong className="text-[#1C1B18]">M. Alvarez (Case Officer)</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setAppealFiled(true)}
                  className="inline-flex items-center gap-1 rounded bg-[#0F6B6B] px-2.5 py-1 font-semibold text-white hover:bg-[#0B5353]"
                >
                  <Gavel className="h-3 w-3" />
                  {appealFiled ? 'Challenge Logged (#APL-409)' : 'File Hardship Challenge'}
                </button>
              </div>
              {appealFiled && (
                <div className="mt-2 flex items-center gap-1.5 border-t border-[#E6E1D6] pt-2 text-[#0F6B6B]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  Routed to M. Alvarez with hospital invoice attachment. Target decision SLA: 48h.
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-[1320px] space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#0F6B6B]">
            Applied Conversational UI · All 7 Epistemological Fault Lines
          </p>
          <h1 className="font-serif-display text-3xl font-medium text-[#1C1B18]">
            How the 7 Solutions Look Inside a Chatbot
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-[#57534E]">
            Pick any fault-line prompt below to compare how a conventional fluent chatbot answers
            versus an epistemic-scaffolded chatbot with lightweight inline UX widgets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenLab(activeId)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E1D6] bg-white px-3 py-2 font-mono-tech text-xs font-medium text-[#0F6B6B] transition-colors hover:border-[#0F6B6B]"
        >
          Open {spec.title} in Full Lab
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Prompt Selector Strip */}
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-3.5">
        <div className="mb-2.5 font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#8A8478]">
          Select a Fault-Line Chat Prompt (1 to 7)
        </div>
        <div className="flex flex-wrap gap-2">
          {FAULT_LINES.map((fl) => {
            const active = fl.id === activeId;
            return (
              <button
                key={fl.id}
                type="button"
                onClick={() => handleSelectScenario(fl.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? 'border-[#0F6B6B] bg-[#E8F4F4] text-[#0F6B6B] ring-1 ring-[#0F6B6B]/25'
                    : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#57534E] hover:bg-white hover:text-[#1C1B18]'
                }`}
              >
                <span className="font-mono-tech text-[10px] font-semibold">{fl.number}.</span>
                {fl.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Chatbot Windows (Real Output Only) + Outside Annotations */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left Column: Conventional Chatbot + Outside Failure Note */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#C2410C]/30 bg-white shadow-[0_2px_8px_rgba(28,27,24,0.05)]">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-[#E6E1D6] bg-[#FFF7ED]/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C2410C]/15 text-[#C2410C]">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C1B18]">
                    Conventional Fluent Chatbot
                  </div>
                  <div className="font-mono-tech text-[10px] text-[#C2410C]">
                    Baseline · Unscaffolded Prose
                  </div>
                </div>
              </div>
              <span className="rounded bg-white px-2 py-0.5 font-mono-tech text-[10px] text-[#8A8478]">
                {spec.paperFaultName}
              </span>
            </div>

            {/* Chat Thread (Pure Real Output Only) */}
            <div className="flex-1 space-y-4 bg-[#FAF8F4]/60 p-4 sm:p-5">
              {/* User Bubble */}
              <div className="flex justify-end gap-2.5">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#1C1B18] px-3.5 py-2.5 text-xs leading-relaxed text-white">
                  {scenario.prompt}
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E6E1D6] bg-white text-[#57534E]">
                  <User className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Assistant Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#C2410C]/25">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[#E6E1D6] bg-white px-4 py-3 shadow-xs">
                  <p className="text-xs leading-relaxed text-[#1C1B18]">{scenario.baselineReply}</p>
                </div>
              </div>
            </div>

            {/* Mock Composer */}
            <div className="border-t border-[#E6E1D6] bg-white px-4 py-2.5">
              <div className="flex items-center justify-between rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1.5 text-[11px] text-[#8A8478]">
                <span>Message Conventional Assistant...</span>
                <Send className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Outside Note: Baseline Failure Annotation */}
          <div className="rounded-xl border border-[#FEE2E2] bg-[#FEF2F2]/60 p-3.5">
            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#B91C1C]">
              <AlertTriangle className="h-3.5 w-3.5" />
              Baseline Annotation: Hidden Epistemia Risk
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
              {scenario.baselineRiskNote}
            </p>
          </div>
        </div>

        {/* Right Column: Epistemic Chatbot + Outside UX Annotation */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#0F6B6B]/40 bg-white shadow-[0_2px_8px_rgba(28,27,24,0.05)]">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-[#E6E1D6] bg-[#E8F4F4]/65 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F6B6B] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C1B18]">
                    Epistemic-Scaffolded Chatbot
                  </div>
                  <div className="font-mono-tech text-[10px] text-[#0F6B6B]">
                    {scenario.epistemicPatternLabel}
                  </div>
                </div>
              </div>
              <span className="rounded bg-white px-2 py-0.5 font-mono-tech text-[10px] text-[#0F6B6B]">
                Interactive Bubble
              </span>
            </div>

            {/* Chat Thread (Pure Real Output Only) */}
            <div className="flex-1 space-y-4 bg-[#FAF8F4]/60 p-4 sm:p-5">
              {/* User Bubble */}
              <div className="flex justify-end gap-2.5">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#1C1B18] px-3.5 py-2.5 text-xs leading-relaxed text-white">
                  {scenario.prompt}
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E6E1D6] bg-white text-[#57534E]">
                  <User className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Assistant Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F4F4] text-[#0F6B6B] ring-1 ring-[#0F6B6B]/30">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[#0F6B6B]/25 bg-white px-4 py-3 shadow-xs">
                  {renderEpistemicBubbleContent()}
                </div>
              </div>
            </div>

            {/* Mock Composer */}
            <div className="border-t border-[#E6E1D6] bg-white px-4 py-2.5">
              <div className="flex items-center justify-between rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1.5 text-[11px] text-[#8A8478]">
                <span>Message Epistemic Assistant...</span>
                <Send className="h-3.5 w-3.5 text-[#0F6B6B]" />
              </div>
            </div>
          </div>

          {/* Outside Note: UX Solution Rationale */}
          <div className="rounded-xl border border-[#B45309]/30 bg-[#FFFDF7] p-3.5">
            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#92400E]">
              <Lightbulb className="h-3.5 w-3.5 text-[#B45309]" />
              UX Annotation: Why This Inline Pattern Works ({spec.paperFaultName})
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#302E2A]">
              {scenario.chatWhyItWorks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
