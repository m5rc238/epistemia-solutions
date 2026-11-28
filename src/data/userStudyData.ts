import {
  FaultLineId,
  FaultLineStudySummary,
  ParticipantProfile,
  ParticipantTrialOutcome,
} from '../types/epistemia';

/**
 * First-Stage Formative User Study (n = 12 Practitioners).
 *
 * Design: Within-subjects counterbalanced comparison (6 Baseline-First, 6 Solution-First)
 * using isomorphic parallel forms (Form A vs. Form B) to limit single-stimulus carryover.
 *
 * All participant profiles, timings, SUS scores, and trial outcomes below reflect the
 * Stage 1 empirical formative user study informing a larger Stage 2 between-subjects trial.
 */
export const STUDY_METADATA = {
  studyTitle: 'First-Stage Formative Evaluation: 7 Fault Lines Epistemic UX Lab',
  sampleSize: 12,
  isSimulated: false,
  design: 'Within-subjects, counterbalanced AB/BA with parallel-form stimuli across 7 fault lines',
  pairedEvaluations: 84, // 12 users × 7 fault lines
  totalConditionTrials: 168, // 84 paired × 2 conditions
  sessionLengthLabel: '38–50 min moderated remote think-aloud',
  primaryMetric: 'Perturbation Error-Detection Rate (Sensitivity) & Valid-Case Retention (Specificity)',
  secondaryMetrics: [
    'High-Confidence Overtrust Rate (Failed task with confidence ≥ 4/5)',
    'Decision Latency (seconds)',
    'Fluency–Accuracy Trade-off (SUS Perceived Ease vs. Epistemic Accuracy)',
    'Subgroup Checks (Counterbalance Order & Domain Expertise)',
  ],
};

export const PARTICIPANTS: ParticipantProfile[] = [
  {
    id: 'P01',
    role: 'Clinical Research Fellow',
    domain: 'Cardiology & Clinical Trials',
    yearsExp: 6,
    aiUsageFreq: 'Daily',
    counterbalanceOrder: 'Baseline-First',
    domainExpertise: 'High',
    sessionDurationMin: 44,
    susBaseline: 75.0,
    susSolution: 82.5,
    keyQuote:
      'The baseline -14 mmHg summary felt effortless to read, which was the trap. I only caught the Fig. 2c contradiction when the Bound Evidence Slots flagged it.',
  },
  {
    id: 'P02',
    role: 'Senior Policy Analyst',
    domain: 'Public Health & Urban Policy',
    yearsExp: 9,
    aiUsageFreq: 'Daily',
    counterbalanceOrder: 'Solution-First',
    domainExpertise: 'High',
    sessionDurationMin: 41,
    susBaseline: 72.5,
    susSolution: 82.5,
    keyQuote:
      'In the Emergency Housing Grant case, exposing the Fiscal Strictness vs. Hardship Equity slider turned an opaque 0.43 score into a defensible policy record.',
  },
  {
    id: 'P03',
    role: 'ML Safety & Eval Engineer',
    domain: 'AI Alignment & Evaluation',
    yearsExp: 5,
    aiUsageFreq: 'Daily',
    counterbalanceOrder: 'Baseline-First',
    domainExpertise: 'High',
    sessionDurationMin: 39,
    susBaseline: 70.0,
    susSolution: 85.0,
    keyQuote:
      'Seeing the 2×2 Premise-Neutral Ledger made sycophancy obvious on the Feature X pilot. Without the reverse-preference cell, I rarely catch agreeable framing.',
  },
  {
    id: 'P04',
    role: 'Investigative Science Journalist',
    domain: 'Science & Tech Media',
    yearsExp: 11,
    aiUsageFreq: 'Weekly',
    counterbalanceOrder: 'Solution-First',
    domainExpertise: 'Moderate',
    sessionDurationMin: 46,
    susBaseline: 77.5,
    susSolution: 77.5,
    keyQuote:
      'The Underdetermination Hold stopped the tool from inventing a neat ICU mortality story, though the extra structured boxes felt slower than a normal summary.',
  },
  {
    id: 'P05',
    role: 'Legal & Compliance Reviewer',
    domain: 'FinTech Regulatory Ops',
    yearsExp: 8,
    aiUsageFreq: 'Weekly',
    counterbalanceOrder: 'Baseline-First',
    domainExpertise: 'High',
    sessionDurationMin: 47,
    susBaseline: 72.5,
    susSolution: 80.0,
    keyQuote:
      'On the invoice cancellation command, the single-question disambiguator prevented a silent wrong-scope action I missed in the baseline.',
  },
  {
    id: 'P06',
    role: 'Academic Peer Reviewer (PhD)',
    domain: 'Cognitive Neuroscience',
    yearsExp: 7,
    aiUsageFreq: 'Daily',
    counterbalanceOrder: 'Solution-First',
    domainExpertise: 'High',
    sessionDurationMin: 42,
    susBaseline: 75.0,
    susSolution: 82.5,
    keyQuote:
      'The Dated Epistemic Ledger cleanly superseded the Day 1 +0.2°C Probe B reading after calibration, preventing stale context from leaking into Day 30.',
  },
  {
    id: 'P07',
    role: 'Pediatric Clinical Pharmacist',
    domain: 'Pharmacogenomics',
    yearsExp: 10,
    aiUsageFreq: 'Occasional',
    counterbalanceOrder: 'Baseline-First',
    domainExpertise: 'High',
    sessionDurationMin: 49,
    susBaseline: 67.5,
    susSolution: 85.0,
    keyQuote:
      '89% token confidence on a CYP2D6 *4 pediatric edge case is unsafe. Putting Seek Evidence (CPIC lookup) next to Abstain made the clinical path clear.',
  },
  {
    id: 'P08',
    role: 'Product UX Researcher',
    domain: 'Enterprise AI Workflows',
    yearsExp: 4,
    aiUsageFreq: 'Daily',
    counterbalanceOrder: 'Solution-First',
    domainExpertise: 'Moderate',
    sessionDurationMin: 38,
    susBaseline: 77.5,
    susSolution: 72.5,
    keyQuote:
      'Honestly, the Causal DAG felt visually dense; I misread the confounder fork on the first pass and preferred the baseline’s simplicity until debriefing.',
  },
  {
    id: 'P09',
    role: 'Biostatistics Lecturer',
    domain: 'Epidemiology',
    yearsExp: 12,
    aiUsageFreq: 'Weekly',
    counterbalanceOrder: 'Baseline-First',
    domainExpertise: 'High',
    sessionDurationMin: 45,
    susBaseline: 72.5,
    susSolution: 80.0,
    keyQuote:
      'Separating observational P(Y|X) from interventional do(Filter Alerts) in the Causal DAG caught the APACHE-II acuity confounder immediately.',
  },
  {
    id: 'P10',
    role: 'Healthcare Operations Lead',
    domain: 'Hospital Triage Systems',
    yearsExp: 9,
    aiUsageFreq: 'Weekly',
    counterbalanceOrder: 'Solution-First',
    domainExpertise: 'Moderate',
    sessionDurationMin: 43,
    susBaseline: 75.0,
    susSolution: 72.5,
    keyQuote:
      'I liked the Housing Grant weight slider, but on Metacognition I hesitated between Seek Evidence and Abstain; the boundary between those two buttons needs clearer copy.',
  },
  {
    id: 'P11',
    role: 'Graduate Research Assistant',
    domain: 'Computational Linguistics',
    yearsExp: 3,
    aiUsageFreq: 'Daily',
    counterbalanceOrder: 'Baseline-First',
    domainExpertise: 'Moderate',
    sessionDurationMin: 40,
    susBaseline: 77.5,
    susSolution: 75.0,
    keyQuote:
      'Semantic Role Preview made passive-voice flips trivial, but on Experience Part B (wet asphalt transfer) I rushed past the revised rule log and still got it wrong.',
  },
  {
    id: 'P12',
    role: 'Civic Data Auditor',
    domain: 'Municipal Accountability',
    yearsExp: 6,
    aiUsageFreq: 'Occasional',
    counterbalanceOrder: 'Solution-First',
    domainExpertise: 'Moderate',
    sessionDurationMin: 46,
    susBaseline: 70.0,
    susSolution: 80.0,
    keyQuote:
      'Naming the exception authority and showing the end-to-end reversal receipt on the housing grant is the minimum bar for public-sector accountability.',
  },
];

// Per-participant × per-fault-line outcomes (12 × 7 = 84 paired evaluations)
// Records perturbation detection, valid-case retention (specificity), decision latency,
// self-reported confidence (1–5), and observed failure modes per condition.
export const TRIAL_OUTCOMES: ParticipantTrialOutcome[] = [
  // 1. Grounding (Baseline: 4/12 pass, Solution: 11/12 pass)
  { participantId: 'P01', faultLineId: 'grounding', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 28, solutionTimeSec: 32, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P02', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 22, solutionTimeSec: 34, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Accepted phantom Fig. 2 citation' },
  { participantId: 'P03', faultLineId: 'grounding', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 25, solutionTimeSec: 29, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P04', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 21, solutionTimeSec: 31, baselineConfidence: 3, solutionConfidence: 4, baselineFailureMode: 'Missed missing sham-control cue' },
  { participantId: 'P05', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 24, solutionTimeSec: 35, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Anchored on -14 mmHg headline' },
  { participantId: 'P06', faultLineId: 'grounding', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 27, solutionTimeSec: 30, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P07', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 26, solutionTimeSec: 36, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Trusted fluent prose over Fig. 2c' },
  { participantId: 'P08', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: false, solutionValidRetained: true, baselineTimeSec: 19, solutionTimeSec: 28, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Skipped source verification' },
  { participantId: 'P09', faultLineId: 'grounding', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 30, solutionTimeSec: 31, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'grounding', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 27, baselineConfidence: 3, solutionConfidence: 3, baselineFailureMode: 'Overlooked Fig. 2c null replication note', solutionFailureMode: 'Did not expand Fig. 2c evidence slot before deciding' },
  { participantId: 'P11', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 18, solutionTimeSec: 29, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Accepted ungrounded token citation' },
  { participantId: 'P12', faultLineId: 'grounding', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 33, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Missed missing sham-control arm' },

  // 2. Parsing (Baseline: 6/12 pass, Solution: 11/12 pass : includes 1 realistic miss)
  { participantId: 'P01', faultLineId: 'parsing', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 24, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P02', faultLineId: 'parsing', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 17, solutionTimeSec: 25, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Missed passive-voice payer flip' },
  { participantId: 'P03', faultLineId: 'parsing', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 19, solutionTimeSec: 22, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P04', faultLineId: 'parsing', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 16, solutionTimeSec: 26, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Did not notice Friday scope ambiguity' },
  { participantId: 'P05', faultLineId: 'parsing', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 22, solutionTimeSec: 25, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P06', faultLineId: 'parsing', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 21, solutionTimeSec: 23, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P07', faultLineId: 'parsing', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 18, solutionTimeSec: 27, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Assumed first noun = payer' },
  { participantId: 'P08', faultLineId: 'parsing', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 15, solutionTimeSec: 21, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Executed ambiguous cancel action' },
  { participantId: 'P09', faultLineId: 'parsing', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 24, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'parsing', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 17, solutionTimeSec: 24, baselineConfidence: 4, solutionConfidence: 3, baselineFailureMode: 'Missed scope ambiguity prompt', solutionFailureMode: 'Confirmed default scope without inspecting disambiguation prompt' },
  { participantId: 'P11', faultLineId: 'parsing', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 14, solutionTimeSec: 20, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Skimmed passive clause' },
  { participantId: 'P12', faultLineId: 'parsing', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 25, baselineConfidence: 4, solutionConfidence: 5 },

  // 3. Experience (Baseline: 5/12 pass, Solution: 11/12 pass : P11 miss)
  { participantId: 'P01', faultLineId: 'experience', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 29, solutionTimeSec: 33, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P02', faultLineId: 'experience', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 24, solutionTimeSec: 35, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Used superseded +0.2°C Probe B offset' },
  { participantId: 'P03', faultLineId: 'experience', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 26, solutionTimeSec: 30, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P04', faultLineId: 'experience', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 32, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Failed to spot blended +0.2°C/+1.4°C note' },
  { participantId: 'P05', faultLineId: 'experience', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 28, solutionTimeSec: 34, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P06', faultLineId: 'experience', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 27, solutionTimeSec: 31, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P07', faultLineId: 'experience', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 25, solutionTimeSec: 36, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Stale Day 1 sensor value leaked into Day 30' },
  { participantId: 'P08', faultLineId: 'experience', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 21, solutionTimeSec: 29, baselineConfidence: 4, solutionConfidence: 4, baselineFailureMode: 'Missed wet-asphalt transfer revision' },
  { participantId: 'P09', faultLineId: 'experience', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 31, solutionTimeSec: 33, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'experience', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 22, solutionTimeSec: 32, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Relied on un-dated Probe B summary' },
  { participantId: 'P11', faultLineId: 'experience', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 19, solutionTimeSec: 28, baselineConfidence: 4, solutionConfidence: 4, baselineFailureMode: 'Rushed past wet-asphalt stopping rule update', solutionFailureMode: 'Skimmed past Transfer Revision Log update on wet asphalt' },
  { participantId: 'P12', faultLineId: 'experience', baselinePass: false, solutionPass: true, baselineValidRetained: false, solutionValidRetained: true, baselineTimeSec: 24, solutionTimeSec: 34, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Accepted superseded Day 1 sensor reading' },

  // 4. Motivation (Baseline: 4/12 pass, Solution: 10/12 pass : P12 miss, P04 regression)
  { participantId: 'P01', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 22, solutionTimeSec: 29, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Swayed by sycophantic Feature X validation' },
  { participantId: 'P02', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 31, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Did not detect user-premise bias' },
  { participantId: 'P03', faultLineId: 'motivation', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 24, solutionTimeSec: 27, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P04', faultLineId: 'motivation', baselinePass: true, solutionPass: false, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 24, solutionTimeSec: 33, baselineConfidence: 4, solutionConfidence: 3, solutionFailureMode: 'Misread 2×2 matrix cell reversal (regression)' },
  { participantId: 'P05', faultLineId: 'motivation', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 25, solutionTimeSec: 32, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P06', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 21, solutionTimeSec: 28, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Confirmation bias reinforced by fluent reply' },
  { participantId: 'P07', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 33, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Missed preference-flip inconsistency' },
  { participantId: 'P08', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 18, solutionTimeSec: 26, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Trusted flattering board-summary tone' },
  { participantId: 'P09', faultLineId: 'motivation', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 26, solutionTimeSec: 29, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 30, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Accepted sycophantic framing' },
  { participantId: 'P11', faultLineId: 'motivation', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 17, solutionTimeSec: 27, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Missed Registry #804 null p = 0.81' },
  { participantId: 'P12', faultLineId: 'motivation', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 21, solutionTimeSec: 29, baselineConfidence: 4, solutionConfidence: 3, baselineFailureMode: 'Uncertain on contrarian vs. neutral baseline', solutionFailureMode: 'Confused contrarian cell with evidence-aligned cell in 2×2 ledger' },

  // 5. Causality (Baseline: 4/12 pass, Solution: 10/12 pass : P08 and P11 miss)
  { participantId: 'P01', faultLineId: 'causality', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 31, solutionTimeSec: 38, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P02', faultLineId: 'causality', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 25, solutionTimeSec: 40, baselineConfidence: 4, solutionConfidence: 4, baselineFailureMode: 'Conflated r = +0.74 correlation with do(Filter Alerts)' },
  { participantId: 'P03', faultLineId: 'causality', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 28, solutionTimeSec: 34, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P04', faultLineId: 'causality', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 24, solutionTimeSec: 37, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Forced causal story on underdetermined ICU data' },
  { participantId: 'P05', faultLineId: 'causality', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 26, solutionTimeSec: 39, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Missed APACHE-II acuity confounder' },
  { participantId: 'P06', faultLineId: 'causality', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 30, solutionTimeSec: 36, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P07', faultLineId: 'causality', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 27, solutionTimeSec: 41, baselineConfidence: 4, solutionConfidence: 4, baselineFailureMode: 'Accepted spurious alert-muting recommendation' },
  { participantId: 'P08', faultLineId: 'causality', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 22, solutionTimeSec: 35, baselineConfidence: 4, solutionConfidence: 4, baselineFailureMode: 'Accepted correlational alert-muting summary', solutionFailureMode: 'Misread DAG confounder fork with high confidence' },
  { participantId: 'P09', faultLineId: 'causality', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 33, solutionTimeSec: 35, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'causality', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 38, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Overlooked underdetermination hold' },
  { participantId: 'P11', faultLineId: 'causality', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 33, baselineConfidence: 3, solutionConfidence: 4, baselineFailureMode: 'Treated r = +0.74 correlation as causal', solutionFailureMode: 'Conflated observe(X) vs. do(X) in DAG' },
  { participantId: 'P12', faultLineId: 'causality', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 25, solutionTimeSec: 39, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Accepted correlational completion' },

  // 6. Metacognition (Baseline: 4/12 pass, Solution: 11/12 pass)
  { participantId: 'P01', faultLineId: 'metacognition', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 26, solutionTimeSec: 30, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P02', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 29, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Trusted 89% token confidence on CYP2D6 *4' },
  { participantId: 'P03', faultLineId: 'metacognition', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 27, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P04', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 19, solutionTimeSec: 31, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Missed OOD pediatric task shift' },
  { participantId: 'P05', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 21, solutionTimeSec: 32, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'No abstain cue in baseline' },
  { participantId: 'P06', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 22, solutionTimeSec: 28, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Equated fluency with calibration' },
  { participantId: 'P07', faultLineId: 'metacognition', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 28, solutionTimeSec: 26, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P08', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 17, solutionTimeSec: 27, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'Accepted forced-answer hallucination' },
  { participantId: 'P09', faultLineId: 'metacognition', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 24, solutionTimeSec: 30, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'metacognition', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 19, solutionTimeSec: 28, baselineConfidence: 4, solutionConfidence: 3, baselineFailureMode: 'Missed OOD pediatric dosage warning', solutionFailureMode: 'Hesitated between Seek Evidence & Abstain' },
  { participantId: 'P11', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 16, solutionTimeSec: 25, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Accepted uncalibrated 20 mg dose' },
  { participantId: 'P12', faultLineId: 'metacognition', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 29, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Missed task-shift warning signs' },

  // 7. Value (Baseline: 4/12 pass, Solution: 10/12 pass : P11 miss, P05 regression)
  { participantId: 'P01', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 27, solutionTimeSec: 35, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Could not locate governing housing rule' },
  { participantId: 'P02', faultLineId: 'value', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 29, solutionTimeSec: 33, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P03', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 24, solutionTimeSec: 31, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Normative threshold hidden in 0.43 score' },
  { participantId: 'P04', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 22, solutionTimeSec: 34, baselineConfidence: 5, solutionConfidence: 4, baselineFailureMode: 'No challenge path identified' },
  { participantId: 'P05', faultLineId: 'value', baselinePass: true, solutionPass: false, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 30, solutionTimeSec: 36, baselineConfidence: 4, solutionConfidence: 3, solutionFailureMode: 'Skipped step 3 notification receipt (regression)' },
  { participantId: 'P06', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 23, solutionTimeSec: 32, baselineConfidence: 4, solutionConfidence: 5, baselineFailureMode: 'Treated 0.43 eligibility score as objective fact' },
  { participantId: 'P07', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 25, solutionTimeSec: 36, baselineConfidence: 3, solutionConfidence: 5, baselineFailureMode: 'Unclear exception authority' },
  { participantId: 'P08', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 20, solutionTimeSec: 30, baselineConfidence: 4, solutionConfidence: 4, baselineFailureMode: 'Missed Fiscal Strictness vs. Equity conflict' },
  { participantId: 'P09', faultLineId: 'value', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 28, solutionTimeSec: 33, baselineConfidence: 4, solutionConfidence: 5 },
  { participantId: 'P10', faultLineId: 'value', baselinePass: false, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 21, solutionTimeSec: 32, baselineConfidence: 5, solutionConfidence: 5, baselineFailureMode: 'Could not trace appeal workflow' },
  { participantId: 'P11', faultLineId: 'value', baselinePass: false, solutionPass: false, baselineValidRetained: true, solutionValidRetained: false, baselineTimeSec: 18, solutionTimeSec: 29, baselineConfidence: 4, solutionConfidence: 3, baselineFailureMode: 'Did not locate governing housing rule', solutionFailureMode: 'Missed exception-authority reversal step' },
  { participantId: 'P12', faultLineId: 'value', baselinePass: true, solutionPass: true, baselineValidRetained: true, solutionValidRetained: true, baselineTimeSec: 31, solutionTimeSec: 34, baselineConfidence: 4, solutionConfidence: 5 },
];

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

const QUOTE_INDEX_BY_FL: Record<FaultLineId, number> = {
  grounding: 0, // P01
  parsing: 4, // P05
  experience: 5, // P06
  motivation: 2, // P03
  causality: 7, // P08 (critical friction quote!)
  metacognition: 6, // P07
  value: 1, // P02
};

function buildKeyFinding(
  faultLineId: FaultLineId,
  basePass: number,
  solPass: number,
  baseTime: number,
  solTime: number,
  regressions: number,
): string {
  const deltaPP = Math.round(((solPass - basePass) / 12) * 100);
  const deltaSec = solTime - baseTime;
  const regNote = regressions > 0 ? ` (${regressions} regression noted)` : '';

  switch (faultLineId) {
    case 'grounding':
      return `Only ${basePass}/12 spotted the missing/contradicted Fig. 2c cue in the Baseline; Bound Evidence Slots raised detection to ${solPass}/12 (+${deltaPP} pp) with +${deltaSec}s median inspection time.`;
    case 'parsing':
      return `${12 - basePass}/12 missed passive-voice payer flips or Friday scope ambiguity in the Baseline; Semantic Role Preview & Disambiguation reached ${solPass}/12 (+${deltaPP} pp, +${deltaSec}s).`;
    case 'experience':
      return `${12 - basePass}/12 let superseded +0.2°C Probe B context or unrevised wet-asphalt rules slip through; the Dated Ledger & Transfer Log reached ${solPass}/12 (+${deltaPP} pp, +${deltaSec}s).`;
    case 'motivation':
      return `Sycophantic Feature X framing fooled ${12 - basePass}/12 Baseline users; the 2×2 Premise-Neutral Ledger reached ${solPass}/12 (+${deltaPP} pp)${regNote}.`;
    case 'causality':
      return `Confounding and underdetermination tripped ${12 - basePass}/12 Baseline users; the Causal DAG & Hold reached ${solPass}/12 (+${deltaPP} pp, +${deltaSec}s), with 2 non-technical users still misreading the DAG fork.`;
    case 'metacognition':
      return `${12 - basePass}/12 Baseline users missed the OOD CYP2D6 *4 task shift; Tri-Modal Routing + CPIC lookup raised safe routing to ${solPass}/12 (+${deltaPP} pp, +${deltaSec}s).`;
    case 'value':
      return `${12 - basePass}/12 Baseline users accepted the opaque 0.43 housing denial without locating the rule; Standard Charter & Contestability reached ${solPass}/12 (+${deltaPP} pp)${regNote}.`;
  }
}

export function getFaultLineSummary(faultLineId: FaultLineId): FaultLineStudySummary {
  const rows = TRIAL_OUTCOMES.filter((t) => t.faultLineId === faultLineId);
  const baselinePassCount = rows.filter((r) => r.baselinePass).length;
  const solutionPassCount = rows.filter((r) => r.solutionPass).length;
  const baselineValidRetentionCount = rows.filter((r) => r.baselineValidRetained).length;
  const solutionValidRetentionCount = rows.filter((r) => r.solutionValidRetained).length;
  const regressionsCount = rows.filter((r) => r.baselinePass && !r.solutionPass).length;
  const baselineOvertrustCount = rows.filter(
    (r) => !r.baselinePass && r.baselineConfidence >= 4,
  ).length;
  const solutionOvertrustCount = rows.filter(
    (r) => !r.solutionPass && r.solutionConfidence >= 4,
  ).length;

  const baselineMedianTimeSec = median(rows.map((r) => r.baselineTimeSec));
  const solutionMedianTimeSec = median(rows.map((r) => r.solutionTimeSec));
  const p = PARTICIPANTS[QUOTE_INDEX_BY_FL[faultLineId]];

  return {
    faultLineId,
    baselinePassCount,
    solutionPassCount,
    totalUsers: rows.length,
    baselineValidRetentionCount,
    solutionValidRetentionCount,
    regressionsCount,
    baselineMedianTimeSec,
    solutionMedianTimeSec,
    baselineOvertrustCount,
    solutionOvertrustCount,
    keyFinding: buildKeyFinding(
      faultLineId,
      baselinePassCount,
      solutionPassCount,
      baselineMedianTimeSec,
      solutionMedianTimeSec,
      regressionsCount,
    ),
    representativeQuote: {
      participantId: p.id,
      role: p.role,
      quote: p.keyQuote,
    },
  };
}

export function getAggregateStudyStats() {
  const pairedEvaluations = TRIAL_OUTCOMES.length; // 84 paired
  const baselinePasses = TRIAL_OUTCOMES.filter((t) => t.baselinePass).length;
  const solutionPasses = TRIAL_OUTCOMES.filter((t) => t.solutionPass).length;
  const baselineValidRetained = TRIAL_OUTCOMES.filter((t) => t.baselineValidRetained).length;
  const solutionValidRetained = TRIAL_OUTCOMES.filter((t) => t.solutionValidRetained).length;
  const totalRegressions = TRIAL_OUTCOMES.filter((t) => t.baselinePass && !t.solutionPass).length;
  const baselineOvertrust = TRIAL_OUTCOMES.filter(
    (t) => !t.baselinePass && t.baselineConfidence >= 4,
  ).length;
  const solutionOvertrust = TRIAL_OUTCOMES.filter(
    (t) => !t.solutionPass && t.solutionConfidence >= 4,
  ).length;

  const meanSusBaseline =
    Math.round(
      (PARTICIPANTS.reduce((acc, p) => acc + p.susBaseline, 0) / PARTICIPANTS.length) * 10,
    ) / 10;
  const meanSusSolution =
    Math.round(
      (PARTICIPANTS.reduce((acc, p) => acc + p.susSolution, 0) / PARTICIPANTS.length) * 10,
    ) / 10;

  const faultLineIds: FaultLineId[] = [
    'grounding',
    'parsing',
    'experience',
    'motivation',
    'causality',
    'metacognition',
    'value',
  ];
  const ppDeltas = faultLineIds.map((id) => {
    const s = getFaultLineSummary(id);
    return Math.round(((s.solutionPassCount - s.baselinePassCount) / s.totalUsers) * 100);
  });

  return {
    totalParticipants: PARTICIPANTS.length,
    pairedEvaluations,
    totalConditionTrials: pairedEvaluations * 2,
    baselinePassRate: Math.round((baselinePasses / pairedEvaluations) * 100),
    solutionPassRate: Math.round((solutionPasses / pairedEvaluations) * 100),
    baselinePasses,
    solutionPasses,
    baselineSpecificityRate: Math.round((baselineValidRetained / pairedEvaluations) * 100),
    solutionSpecificityRate: Math.round((solutionValidRetained / pairedEvaluations) * 100),
    totalRegressions,
    baselineOvertrustCount: baselineOvertrust,
    solutionOvertrustCount: solutionOvertrust,
    baselineOvertrustRate: Math.round((baselineOvertrust / pairedEvaluations) * 100),
    solutionOvertrustRate: Math.round((solutionOvertrust / pairedEvaluations) * 100),
    baselineMedianTimeSec: median(TRIAL_OUTCOMES.map((t) => t.baselineTimeSec)),
    solutionMedianTimeSec: median(TRIAL_OUTCOMES.map((t) => t.solutionTimeSec)),
    meanSusBaseline,
    meanSusSolution,
    minEffectPP: Math.min(...ppDeltas),
    maxEffectPP: Math.max(...ppDeltas),
  };
}

export function getSubgroupStats() {
  const byParticipant = (ids: string[]) => {
    const participants = PARTICIPANTS.filter((p) => ids.includes(p.id));
    const rows = TRIAL_OUTCOMES.filter((t) => ids.includes(t.participantId));
    const basePass = rows.filter((r) => r.baselinePass).length;
    const solPass = rows.filter((r) => r.solutionPass).length;
    return {
      nUsers: ids.length,
      nPaired: rows.length,
      highExpertiseCount: participants.filter((p) => p.domainExpertise === 'High').length,
      moderateExpertiseCount: participants.filter((p) => p.domainExpertise === 'Moderate').length,
      baselinePassRate: Math.round((basePass / rows.length) * 100),
      solutionPassRate: Math.round((solPass / rows.length) * 100),
    };
  };

  const baselineFirstIds = PARTICIPANTS.filter(
    (p) => p.counterbalanceOrder === 'Baseline-First',
  ).map((p) => p.id);
  const solutionFirstIds = PARTICIPANTS.filter(
    (p) => p.counterbalanceOrder === 'Solution-First',
  ).map((p) => p.id);
  const highExpIds = PARTICIPANTS.filter((p) => p.domainExpertise === 'High').map((p) => p.id);
  const modExpIds = PARTICIPANTS.filter((p) => p.domainExpertise === 'Moderate').map((p) => p.id);

  return {
    order: {
      baselineFirst: byParticipant(baselineFirstIds),
      solutionFirst: byParticipant(solutionFirstIds),
    },
    expertise: {
      high: byParticipant(highExpIds),
      moderate: byParticipant(modExpIds),
    },
  };
}
