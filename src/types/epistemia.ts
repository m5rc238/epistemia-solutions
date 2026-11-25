export type CaseStudyTab = 'case-study' | 'lab' | 'chatbot' | 'results';

export type FaultLineId =
  | 'grounding'
  | 'parsing'
  | 'experience'
  | 'motivation'
  | 'causality'
  | 'metacognition'
  | 'value';

export interface FaultLineSpec {
  id: FaultLineId;
  number: number;
  title: string;
  paperFaultName: string;
  paperDefinition: string;
  humanVsAiMismatch: string;
  proposedIntervention: string;
  evaluationCriterion: string;
  uxPatternName: string;
  citationLabel: string;
  citationUrl: string;
}

export interface UXAnnotation {
  id: string;
  number: number;
  targetElement: string;
  title: string;
  whyItWorks: string;
  cognitiveMechanism: string;
}

export interface ParticipantProfile {
  id: string;
  role: string;
  domain: string;
  yearsExp: number;
  aiUsageFreq: 'Daily' | 'Weekly' | 'Occasional';
  counterbalanceOrder: 'Baseline-First' | 'Solution-First';
  domainExpertise: 'High' | 'Moderate';
  sessionDurationMin: number;
  susBaseline: number;
  susSolution: number;
  keyQuote: string;
}

export interface ParticipantTrialOutcome {
  participantId: string;
  faultLineId: FaultLineId;
  baselinePass: boolean;
  solutionPass: boolean;
  baselineValidRetained: boolean;
  solutionValidRetained: boolean;
  baselineTimeSec: number;
  solutionTimeSec: number;
  baselineConfidence: number; // 1-5
  solutionConfidence: number; // 1-5
  baselineFailureMode?: string;
}

export interface FaultLineStudySummary {
  faultLineId: FaultLineId;
  baselinePassCount: number;
  solutionPassCount: number;
  totalUsers: number;
  baselineValidRetentionCount: number;
  solutionValidRetentionCount: number;
  regressionsCount: number;
  baselineMedianTimeSec: number;
  solutionMedianTimeSec: number;
  baselineOvertrustCount: number;
  solutionOvertrustCount: number;
  keyFinding: string;
  representativeQuote: {
    participantId: string;
    role: string;
    quote: string;
  };
}
