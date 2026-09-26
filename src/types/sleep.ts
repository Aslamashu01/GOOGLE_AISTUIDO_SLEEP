export type MoodType = 
  | 'anxious' 
  | 'stressed' 
  | 'restless' 
  | 'exhausted_wired' 
  | 'neutral';

export type TossingTimeType = 
  | 'under_30m' 
  | '1_to_2h' 
  | 'over_2h';

export type BusyMindType = 
  | 'work_todo' 
  | 'racing_thoughts' 
  | 'physical_tension' 
  | 'no_reason';

export interface AssessmentAnswers {
  mood: MoodType;
  tossingTime: TossingTimeType;
  busyMind: BusyMindType;
  timestamp?: number;
}

export interface SleepProtocolItem {
  id: string;
  stepNumber: number;
  title: string;
  tagline: string;
  rationale: string;
  timeEstimate: string;
  actionKey: 'box_breath' | '478_breath' | 'cognitive_shuffle' | 'eye_palming' | 'figure8' | 'body_scan' | 'bilateral' | 'stimulus_reset' | 'chamomile_elixir';
  actionLabel: string;
  category: 'breathing' | 'mind' | 'ocular' | 'somatic' | 'reset';
}

export interface SleepPrescription {
  statusTitle: string;
  statusHeadline: string;
  cnsState: string;
  suggestedImmediateAction: string;
  emergencyStimulusReset: boolean;
  protocols: SleepProtocolItem[];
}
