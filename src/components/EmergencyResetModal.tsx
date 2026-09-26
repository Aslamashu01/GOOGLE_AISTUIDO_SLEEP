import React, { useState, useEffect } from 'react';
import { X, Moon, Clock, BookOpen, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface EmergencyResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSoundscape?: () => void;
}

export const EmergencyResetModal: React.FC<EmergencyResetModalProps> = ({
  isOpen,
  onClose,
  onStartSoundscape
}) => {
  const [resetTimer, setResetTimer] = useState<number>(20 * 60); // 20 minutes in seconds
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && resetTimer > 0) {
      interval = setInterval(() => {
        setResetTimer((t) => {
          if (t <= 1) {
            audioEngine.playSoftChime();
            setTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, resetTimer]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            <Moon className="w-3.5 h-3.5" />
            <span>CBT-I Stimulus Control Protocol</span>
          </div>
          <h2 className="text-2xl font-serif-soft text-slate-100">
            The 20-Minute Bed Reset
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The gold-standard medical protocol for breaking sleep latency frustration and chronic insomnia loops.
          </p>
        </div>

        {/* 4 Golden Rules */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="text-xs">
              <strong className="text-slate-200">Get Out of Bed Now: </strong>
              <span className="text-slate-400">
                Do not linger in bed wishing for sleep. Leaving the bed prevents your brain from anchoring your mattress to wakeful anxiety.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="text-xs">
              <strong className="text-slate-200">Sit in a Dim, Warm Spot: </strong>
              <span className="text-slate-400">
                Move to a comfortable chair or sofa with soft indirect warm lighting. Keep lights as low as safely possible.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="text-xs">
              <strong className="text-slate-200">Zero Blue Light or Problem Solving: </strong>
              <span className="text-slate-400">
                No checking phone notifications, work emails, or intense shows. Read a dry physical book, listen to brown noise, or do gentle breathing.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div className="text-xs">
              <strong className="text-slate-200">Return Only When Drowsy: </strong>
              <span className="text-slate-400">
                Wait until your eyelids feel physically heavy and you feel a true yawn. Then return smoothly to bed.
              </span>
            </div>
          </div>
        </div>

        {/* 20-min Timer Companion */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-indigo-300">Out-of-Bed Relax Timer</div>
            <div className="text-2xl font-mono text-amber-300 font-bold">{formatTime(resetTimer)}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md cursor-pointer transition-colors"
            >
              {timerRunning ? 'Pause Timer' : 'Start 20m Timer'}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium transition-colors"
        >
          Got it, I understand the protocol
        </button>
      </div>
    </div>
  );
};
