import { FaultLineId, UXAnnotation } from '../types/epistemia';

export const FAULT_LINE_ANNOTATIONS: Record<FaultLineId, UXAnnotation[]> = {
  grounding: [
    {
      id: 'g-1',
      number: 1,
      targetElement: 'Dynamic Claim Status Banner',
      title: 'Decisive-Cue Qualification Instead of Static Fluency',
      whyItWorks:
        'Conventional interfaces emit identical confident prose whether the sham-control arm is intact, missing, or contradicted. Shifting the banner state (Grounded -> Qualified -> Revised) forces epistemic status into pre-attentive visual hierarchy before the user reads the summary.',
      cognitiveMechanism: 'Pre-attentive status framing breaks fluency-driven System 1 acceptance.',
    },
    {
      id: 'g-2',
      number: 2,
      targetElement: 'Bound Evidence Slots Inspector',
      title: 'Live Passage-to-Claim Slot Binding',
      whyItWorks:
        'Instead of inline citation tokens like "(Fig. 2)" that are indistinguishable from hallucinated text, each load-bearing premise is bound to an inspectable evidence slot showing Verified, MISSING CUE, or CONTRADICTED.',
      cognitiveMechanism: 'Transforms unverified citation strings into falsifiable provenance checks.',
    },
    {
      id: 'g-3',
      number: 3,
      targetElement: 'Null-Replication Override',
      title: 'Automatic Conclusion Reversal on Contradiction',
      whyItWorks:
        'When Fig. 2c contradicts the treatment effect, the UI explicitly computes and surfaces the between-arm delta (-1 mmHg, p = 0.72), preventing readers from anchoring on the initial -14 mmHg headline.',
      cognitiveMechanism: 'Counters anchoring bias with explicit comparative counter-evidence.',
    },
  ],
  parsing: [
    {
      id: 'p-1',
      number: 1,
      targetElement: 'Semantic Role Preview Card',
      title: 'Explicit Agent–Patient Role Decomposition',
      whyItWorks:
        'Surface-order heuristics fail on passive voice ("Ben was paid by Ana") and minimal reversals ("Ben paid Ana"). Extracting Payer vs. Recipient into labeled semantic slots makes role reversal immediately visible across paraphrases.',
      cognitiveMechanism: 'Externalizes thematic roles so users verify meaning rather than word order.',
    },
    {
      id: 'p-2',
      number: 2,
      targetElement: 'Single-Question Disambiguator',
      title: 'Action-Gating Clarification on Scope Ambiguity',
      whyItWorks:
        'When a command has two structurally valid readings ("Cancel the invoice Ana sent Ben before Friday"), the UI halts execution and asks one targeted binary question rather than silently guessing a destructive action.',
      cognitiveMechanism: 'Introduces productive friction at irreversible decision boundaries.',
    },
    {
      id: 'p-3',
      number: 3,
      targetElement: 'Paraphrase vs. Edit Parity Check',
      title: 'Dual Invariance & Sensitivity Verification',
      whyItWorks:
        'Showing both active/passive invariance and minimal-edit reversal side-by-side lets reviewers confirm the parser tracks syntax-to-semantics mapping rather than memorizing entity priors.',
      cognitiveMechanism: 'Supports mental model calibration of parser reliability.',
    },
  ],
  experience: [
    {
      id: 'e-1',
      number: 1,
      targetElement: 'Dated Epistemic Ledger',
      title: 'Superseding Corrections Over Context Blending',
      whyItWorks:
        'Static context windows blend outdated notes with new corrections, causing stale facts to resurface after delays. A chronological ledger with explicit SUPERSEDED badges ensures only the latest verified state governs downstream decisions.',
      cognitiveMechanism: 'Separates episodic state history from active working truth.',
    },
    {
      id: 'e-2',
      number: 2,
      targetElement: 'Transfer Revision Loop',
      title: 'Outcome-Driven Rule Updating Under Shift',
      whyItWorks:
        'By logging prediction -> observed outcome -> rule revision in a structured trace, users can see whether an agent actually updated its policy from feedback or merely repeated prior training priors.',
      cognitiveMechanism: 'Makes experiential learning auditable rather than opaque.',
    },
  ],
  motivation: [
    {
      id: 'm-1',
      number: 1,
      targetElement: 'Premise-Neutral Evidence Ledger',
      title: 'Decoupling User Preference from Evidential Verdict',
      whyItWorks:
        'RLHF-tuned assistants often validate false user premises ("Confirm my belief that...") to maximize perceived helpfulness. Separating the user’s stated hypothesis from the 2×2 Evidence–Preference matrix prevents sycophantic agreement.',
      cognitiveMechanism: 'Neutralizes social-desirability and confirmation bias loops.',
    },
    {
      id: 'm-2',
      number: 2,
      targetElement: 'Symmetric Correction & Confirmation',
      title: 'Evidence-Tracking Across All 4 Factorial Cells',
      whyItWorks:
        'Users must trust that a system agrees when they are right and corrects them when they are wrong, not one that is reflexively contrarian. Displaying the evidence score independently proves non-sycophantic calibration.',
      cognitiveMechanism: 'Builds calibrated trust through transparent, premise-independent criteria.',
    },
  ],
  causality: [
    {
      id: 'c-1',
      number: 1,
      targetElement: 'Causal Mechanism DAG',
      title: 'Distinguishing Observational Correlation from do(X)',
      whyItWorks:
        'Two scenarios with identical observational correlation can yield opposite interventional outcomes depending on confounding vs. direct causation. Rendering the causal graph exposes which arrows are assumed vs. tested.',
      cognitiveMechanism: 'Translates abstract Pearlian do-calculus into scannable visual structure.',
    },
    {
      id: 'c-2',
      number: 2,
      targetElement: 'Underdetermination Hold State',
      title: 'Explicitly Naming Competing Explanations',
      whyItWorks:
        'When observational data underdetermines the causal model, fluent prose invents a single story. Holding the verdict open and listing the exact discriminating test prevents premature causal closure.',
      cognitiveMechanism: 'Replaces narrative completeness bias with disciplined epistemic restraint.',
    },
  ],
  metacognition: [
    {
      id: 'mc-1',
      number: 1,
      targetElement: 'Tri-Modal Action Router',
      title: 'Replacing Forced Answers with Answer / Seek / Abstain',
      whyItWorks:
        'Single-mode generation forces the model to emit high-fluency guesses even under out-of-distribution task shift (e.g., Pediatric CYP2D6 *4). Routing to Seek Evidence or Abstain cuts errors at matched coverage.',
      cognitiveMechanism: 'Aligns interface affordances with calibrated uncertainty.',
    },
    {
      id: 'mc-2',
      number: 2,
      targetElement: 'Seek-Evidence Lookup Action',
      title: 'Converting Abstentions into Grounded Resolutions',
      whyItWorks:
        'Abstaining alone leaves the user stuck; providing a one-click CPIC/formulary lookup demonstrates how targeted evidence retrieval resolves uncertainty safely without hallucination.',
      cognitiveMechanism: 'Closes the metacognitive loop between doubt detection and verification.',
    },
  ],
  value: [
    {
      id: 'v-1',
      number: 1,
      targetElement: 'Explicit Standard Charter',
      title: 'Naming the Governing Rule & Exception Authority',
      whyItWorks:
        'Unattributed probabilistic scores hide normative choices behind false objectivity. Declaring who set the threshold and who holds exception authority makes value judgments accountable.',
      cognitiveMechanism: 'Surfaces hidden normative assumptions for human oversight.',
    },
    {
      id: 'v-2',
      number: 2,
      targetElement: 'Trade-Off Weight Slider & Contestability Route',
      title: 'End-to-End Challenge & Reversal Workflow',
      whyItWorks:
        'Exposing trade-off weights (Fiscal Strictness vs. Medical-Hardship Equity, with an explicit 55% flip threshold) alongside a concrete challenge route to a named reviewer ensures affected individuals can contest and reverse flawed automated determinations.',
      cognitiveMechanism: 'Operationalizes procedural fairness and institutional contestability.',
    },
  ],
};
