import React from 'react';
import { AssessmentAnswers, SleepPrescription, SleepProtocolItem } from '../types/sleep';
import { 
  Sparkles, 
  RotateCcw, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Wind, 
  Eye, 
  Brain, 
  Moon, 
  Coffee,
  HeartHandshake
} from 'lucide-react';
import sanctuaryImg from '../assets/images/sleep_sanctuary_night_1790452569369.jpg';

interface PrescriptionDashboardProps {
  prescription: SleepPrescription;
  answers: AssessmentAnswers;
  onRetake: () => void;
  onNavigateToTab: (tab: 'exercises' | 'meditation' | 'diet', subTab?: string) => void;
  onOpenEmergencyModal: () => void;
}

export const PrescriptionDashboard: React.FC<PrescriptionDashboardProps> = ({
  prescription,
  answers,
  onRetake,
  onNavigateToTab,
  onOpenEmergencyModal,
}) => {
  const getActionIcon = (actionKey: string) => {
    switch (actionKey) {
      case 'box_breath':
      case '478_breath':
        return Wind;
      case 'cognitive_shuffle':
        return Brain;
      case 'eye_palming':
      case 'figure8':
      case 'bilateral':
        return Eye;
      case 'body_scan':
        return Moon;
      case 'chamomile_elixir':
        return Coffee;
      default:
        return Sparkles;
    }
  };

  const handleActionClick = (protocol: SleepProtocolItem) => {
    switch (protocol.actionKey) {
      case '478_breath':
        onNavigateToTab('meditation', 'breathing');
        break;
      case 'box_breath':
        onNavigateToTab('meditation', 'breathing');
        break;
      case 'cognitive_shuffle':
        onNavigateToTab('exercises', 'brain');
        break;
      case 'eye_palming':
      case 'figure8':
        onNavigateToTab('exercises', 'eyes');
        break;
      case 'bilateral':
        onNavigateToTab('exercises', 'bilateral');
        break;
      case 'body_scan':
        onNavigateToTab('meditation', 'bodyscan');
        break;
      case 'chamomile_elixir':
        onNavigateToTab('diet');
        break;
      case 'stimulus_reset':
        onOpenEmergencyModal();
        break;
      default:
        onNavigateToTab('exercises');
    }
  };

  const formatMoodLabel = (m: string) => {
    switch (m) {
      case 'anxious': return 'Anxious & Worrying';
      case 'stressed': return 'Stressed / Work Preoccupied';
      case 'restless': return 'Restless & Fidgety';
      case 'exhausted_wired': return 'Exhausted but Wired';
      case 'neutral': return 'Neutral / Calm';
      default: return m;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Header Sanctuary Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 sm:p-8 md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tonight's Sleep Prescription</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
                CNS: {prescription.cnsState}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif-soft text-slate-100 tracking-tight leading-snug">
              {prescription.statusTitle}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {prescription.statusHeadline}
            </p>

            {/* Assessment recap pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
                Mood: <strong className="text-slate-200">{formatMoodLabel(answers.mood)}</strong>
              </span>
              <span className="bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
                Awake in bed: <strong className="text-slate-200">
                  {answers.tossingTime === 'under_30m' ? '< 30m' : answers.tossingTime === '1_to_2h' ? '1–2 hours' : '> 2 hours'}
                </strong>
              </span>
              <button
                onClick={onRetake}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 px-2 py-1 rounded hover:bg-slate-800/50 transition-colors ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-5 h-48 md:h-full relative overflow-hidden">
            <img
              src={sanctuaryImg}
              alt="Cozy sleep sanctuary"
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Emergency 20-minute Bed Reset Warning Card if prolonged tossing */}
      {prescription.emergencyStimulusReset && (
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-amber-200">
                  Critical Intervention: 20-Minute Stimulus Control Protocol
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  You’ve been tossing and turning for over an hour. Staying in bed while feeling frustration creates a conditioned reflex linking your mattress to stress and alertness.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenEmergencyModal}
              className="shrink-0 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md cursor-pointer transition-colors"
            >
              Open Reset Guide
            </button>
          </div>
        </div>
      )}

      {/* Prioritized Action Plan Steps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif-soft text-slate-100">
              Tonight's Guided Action Protocol
            </h2>
            <p className="text-xs text-slate-400">
              Complete these steps in order. Take your time; there is zero pressure to fall asleep instantly.
            </p>
          </div>
        </div>

        <div className="grid gap-3.5">
          {prescription.protocols.map((protocol, index) => {
            const IconComponent = getActionIcon(protocol.actionKey);
            return (
              <div
                key={protocol.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-amber-400 font-mono text-sm shrink-0 mt-0.5">
                    0{index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-base text-slate-100 group-hover:text-amber-200 transition-colors">
                        {protocol.title}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {protocol.timeEstimate}
                      </span>
                    </div>

                    <p className="text-xs text-amber-300/80 font-medium">
                      {protocol.tagline}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                      {protocol.rationale}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleActionClick(protocol)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-xs font-semibold text-amber-300 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{protocol.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-70" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gentle reassurance box */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-center">
        <p className="text-xs text-indigo-300/80 italic">
          "Sleep is not a test to be passed. It is an act of trust in the natural circadian rhythm of your body. Let go of the effort."
        </p>
      </div>
    </div>
  );
};
