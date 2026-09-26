import React, { useState } from 'react';
import { AssessmentAnswers, MoodType, TossingTimeType, BusyMindType } from '../types/sleep';
import { Moon, Clock, Brain, ArrowRight, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';

interface SleepAssessmentProps {
  onComplete: (answers: AssessmentAnswers) => void;
  initialAnswers?: AssessmentAnswers | null;
  onSkip?: () => void;
}

export const SleepAssessment: React.FC<SleepAssessmentProps> = ({ onComplete, initialAnswers, onSkip }) => {
  const [step, setStep] = useState<number>(1);
  const [mood, setMood] = useState<MoodType>(initialAnswers?.mood || 'restless');
  const [tossingTime, setTossingTime] = useState<TossingTimeType>(initialAnswers?.tossingTime || 'under_30m');
  const [busyMind, setBusyMind] = useState<BusyMindType>(initialAnswers?.busyMind || 'racing_thoughts');

  const moodOptions: { id: MoodType; title: string; subtitle: string; icon: string }[] = [
    { id: 'anxious', title: 'Anxious / Worrying', subtitle: 'Racing heart, anticipatory anxiety, or dread', icon: '⚡' },
    { id: 'stressed', title: 'Stressed & Preoccupied', subtitle: 'Replaying today or planning tomorrow’s tasks', icon: '📑' },
    { id: 'restless', title: 'Restless & Fidgety', subtitle: 'Physical agitation, heavy legs, tossing & turning', icon: '🌀' },
    { id: 'exhausted_wired', title: 'Exhausted but Wired', subtitle: 'Body is completely drained, but brain is buzzing', icon: '🔋' },
    { id: 'neutral', title: 'Neutral / Calm', subtitle: 'Just need assistance easing into deep slow-wave rest', icon: '🌙' },
  ];

  const tossingOptions: { id: TossingTimeType; title: string; subtitle: string; badge?: string }[] = [
    { id: 'under_30m', title: 'Less than 30 minutes', subtitle: 'Just got into bed or recently began trying to sleep' },
    { id: '1_to_2h', title: '1 to 2 hours', subtitle: 'Stuck in sleep latency loop, feeling frustration build', badge: 'Elevated Alert' },
    { id: 'over_2h', title: 'More than 2 hours', subtitle: 'Prolonged insomnia, high alert, clock-watching stress', badge: 'Critical Bed Reset Needed' },
  ];

  const busyMindOptions: { id: BusyMindType; title: string; subtitle: string; icon: string }[] = [
    { id: 'work_todo', title: 'Work & To-Do List', subtitle: 'Emails, deadlines, unfinished chores, calendar tasks', icon: '💼' },
    { id: 'racing_thoughts', title: 'Racing Random Thoughts', subtitle: 'Past conversations, existential thoughts, jumping topics', icon: '💭' },
    { id: 'physical_tension', title: 'Physical Tension / Aches', subtitle: 'Tight jaw, stiff neck, shoulder knots, restless limbs', icon: '🧘' },
    { id: 'no_reason', title: 'No Specific Reason', subtitle: 'Mind is quiet or foggy, yet sleep switch won’t flip', icon: '🌌' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        mood,
        tossingTime,
        busyMind,
        timestamp: Date.now()
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full px-4 py-8 sm:py-12">
      {/* Gentle ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-950/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-800/50 text-indigo-300 text-xs font-medium tracking-wide mb-3">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>Nocturnal Triage • Step {step} of 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-soft font-normal tracking-tight text-slate-100">
          {step === 1 && "How is your mood right now?"}
          {step === 2 && "How long have you been tossing & turning?"}
          {step === 3 && "What is keeping your mind busy?"}
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          {step === 1 && "Your nervous system requires different somatic interventions depending on emotional arousal."}
          {step === 2 && "Understanding your sleep latency prevents conditioned bedroom frustration."}
          {step === 3 && "We will target your cognitive load with specific neuro-distraction exercises."}
        </p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                s === step
                  ? 'w-8 bg-amber-400'
                  : s < step
                  ? 'w-4 bg-indigo-400'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-3">
        {step === 1 && (
          <div className="grid gap-3">
            {moodOptions.map((opt) => {
              const isSelected = mood === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setMood(opt.id)}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-indigo-950/70 border-amber-400/80 shadow-lg shadow-indigo-950/40 ring-1 ring-amber-400/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-2xl pt-0.5 select-none">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-base ${isSelected ? 'text-amber-200' : 'text-slate-100'}`}>
                        {opt.title}
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 ml-2" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{opt.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3">
            {tossingOptions.map((opt) => {
              const isSelected = tossingTime === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setTossingTime(opt.id)}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-indigo-950/70 border-amber-400/80 shadow-lg shadow-indigo-950/40 ring-1 ring-amber-400/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`font-medium text-base ${isSelected ? 'text-amber-200' : 'text-slate-100'}`}>
                        {opt.title}
                      </span>
                      {opt.badge && (
                        <span className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded ${
                          opt.id === 'over_2h' 
                            ? 'bg-rose-950/80 border border-rose-800/60 text-rose-300'
                            : 'bg-amber-950/80 border border-amber-800/60 text-amber-300'
                        }`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.subtitle}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 self-center ml-2" />}
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-3">
            {busyMindOptions.map((opt) => {
              const isSelected = busyMind === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setBusyMind(opt.id)}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-indigo-950/70 border-amber-400/80 shadow-lg shadow-indigo-950/40 ring-1 ring-amber-400/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-2xl pt-0.5 select-none">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-base ${isSelected ? 'text-amber-200' : 'text-slate-100'}`}>
                        {opt.title}
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 ml-2" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{opt.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-800/80">
        <div>
          {step > 1 ? (
            <button
              onClick={handleBack}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : onSkip ? (
            <button
              onClick={onSkip}
              type="button"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline-offset-4 hover:underline"
            >
              Skip to All Tools
            </button>
          ) : null}
        </div>

        <button
          onClick={handleNext}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          <span>{step === 3 ? "Generate Sleep Plan" : "Continue"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Gentle reassuring footer message */}
      <div className="mt-8 text-center">
        <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400/70" />
          <span>You are safe. Nothing needs to be solved tonight. Sleep is an involuntary surrender.</span>
        </p>
      </div>
    </div>
  );
};
