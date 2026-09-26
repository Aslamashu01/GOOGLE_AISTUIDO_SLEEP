/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sparkles, 
  Wind, 
  Eye, 
  Brain, 
  Coffee, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Radio,
  SlidersHorizontal,
  Pause,
  Play
} from 'lucide-react';
import { AssessmentAnswers, SleepPrescription } from './types/sleep';
import { generateSleepPrescription } from './utils/prescriptionGenerator';
import { SleepAssessment } from './components/SleepAssessment';
import { PrescriptionDashboard } from './components/PrescriptionDashboard';
import { CalmingExercises } from './components/CalmingExercises';
import { MeditationAudioHub } from './components/MeditationAudioHub';
import { SleepDietNutrition } from './components/SleepDietNutrition';
import { EmergencyResetModal } from './components/EmergencyResetModal';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentAnswers | null>(() => {
    try {
      const saved = localStorage.getItem('somnasleep_assessment');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<'plan' | 'exercises' | 'meditation' | 'diet'>(() => {
    return 'plan';
  });

  const [exerciseSubTab, setExerciseSubTab] = useState<'eyes' | 'brain' | 'bilateral'>('eyes');
  const [meditationSubTab, setMeditationSubTab] = useState<'breathing' | 'soundscape' | 'bodyscan'>('breathing');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeAudioName, setActiveAudioName] = useState<string | null>(null);

  // Poll current audio engine state to update mini-player
  useEffect(() => {
    const interval = setInterval(() => {
      const current = audioEngine.getCurrentSound();
      setIsPlayingAudio(!!current);
      if (current === 'brown_noise') setActiveAudioName('Brown Noise');
      else if (current === 'rain') setActiveAudioName('Midnight Rain');
      else if (current === 'delta_432') setActiveAudioName('432 Hz Delta Drone');
      else if (current === 'whispering_wind') setActiveAudioName('Nocturnal Wind');
      else setActiveAudioName(null);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleAssessmentComplete = (answers: AssessmentAnswers) => {
    setAssessmentAnswers(answers);
    try {
      localStorage.setItem('somnasleep_assessment', JSON.stringify(answers));
    } catch {
      // ignore
    }
    setActiveTab('plan');
  };

  const handleRetakeAssessment = () => {
    setAssessmentAnswers(null);
    try {
      localStorage.removeItem('somnasleep_assessment');
    } catch {
      // ignore
    }
    setActiveTab('plan');
  };

  const prescription: SleepPrescription = assessmentAnswers
    ? generateSleepPrescription(assessmentAnswers)
    : generateSleepPrescription({
        mood: 'restless',
        tossingTime: 'under_30m',
        busyMind: 'racing_thoughts'
      });

  const navigateToTab = (tab: 'exercises' | 'meditation' | 'diet', subTab?: string) => {
    setActiveTab(tab);
    if (tab === 'exercises' && subTab) {
      setExerciseSubTab(subTab as any);
    }
    if (tab === 'meditation' && subTab) {
      setMeditationSubTab(subTab as any);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSoundscapeQuick = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
    } else {
      audioEngine.play('brown_noise');
    }
  };

  return (
    <div className="min-h-screen bg-[#080a12] text-slate-100 flex flex-col selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Nocturnal Bar */}
      <header className="sticky top-0 z-40 bg-[#080a12]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('plan')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-900 to-indigo-700 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md shadow-indigo-950">
              <Moon className="w-4 h-4 fill-amber-300/30" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-soft text-xl font-normal tracking-wide text-slate-100 group-hover:text-amber-200 transition-colors">
                SomnaSleep
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono -mt-1">
                Sleep Sanctuary
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'plan'
                  ? 'bg-indigo-950 text-amber-300 border border-indigo-700/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {assessmentAnswers ? "Tonight's Plan" : "Sleep Assessment"}
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'exercises'
                  ? 'bg-indigo-950 text-amber-300 border border-indigo-700/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Exercises (Eyes & Brain)
            </button>
            <button
              onClick={() => setActiveTab('meditation')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'meditation'
                  ? 'bg-indigo-950 text-amber-300 border border-indigo-700/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Meditation & Audio
            </button>
            <button
              onClick={() => setActiveTab('diet')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'diet'
                  ? 'bg-indigo-950 text-amber-300 border border-indigo-700/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sleep Diet & Elixirs
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Quick Audio Toggle button */}
            <button
              onClick={toggleSoundscapeQuick}
              title={isPlayingAudio ? 'Pause ambient noise' : 'Play calming brown noise'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline font-mono">{activeAudioName || 'Playing'}</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Brown Noise</span>
                </>
              )}
            </button>

            {/* Emergency Bed Reset button */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-amber-300/90 text-xs font-medium cursor-pointer transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Can't Sleep?</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around gap-1 pt-2.5 mt-2 border-t border-slate-850 text-[11px] font-medium">
          <button
            onClick={() => setActiveTab('plan')}
            className={`py-1 px-2 rounded-lg ${activeTab === 'plan' ? 'text-amber-300 font-semibold' : 'text-slate-400'}`}
          >
            Plan
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`py-1 px-2 rounded-lg ${activeTab === 'exercises' ? 'text-amber-300 font-semibold' : 'text-slate-400'}`}
          >
            Exercises
          </button>
          <button
            onClick={() => setActiveTab('meditation')}
            className={`py-1 px-2 rounded-lg ${activeTab === 'meditation' ? 'text-amber-300 font-semibold' : 'text-slate-400'}`}
          >
            Meditation
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`py-1 px-2 rounded-lg ${activeTab === 'diet' ? 'text-amber-300 font-semibold' : 'text-slate-400'}`}
          >
            Diet
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 pb-16">
        {activeTab === 'plan' && (
          assessmentAnswers ? (
            <PrescriptionDashboard
              prescription={prescription}
              answers={assessmentAnswers}
              onRetake={handleRetakeAssessment}
              onNavigateToTab={navigateToTab}
              onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            />
          ) : (
            <SleepAssessment
              onComplete={handleAssessmentComplete}
              onSkip={() => handleAssessmentComplete({
                mood: 'restless',
                tossingTime: 'under_30m',
                busyMind: 'racing_thoughts',
                timestamp: Date.now()
              })}
            />
          )
        )}

        {activeTab === 'exercises' && (
          <CalmingExercises initialSubTab={exerciseSubTab} />
        )}

        {activeTab === 'meditation' && (
          <MeditationAudioHub initialSection={meditationSubTab} />
        )}

        {activeTab === 'diet' && (
          <SleepDietNutrition />
        )}
      </main>

      {/* Emergency Stimulus Reset Modal */}
      <EmergencyResetModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#06080e] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="flex items-center justify-center gap-1.5 text-slate-400">
            <Moon className="w-3.5 h-3.5 text-amber-400/80" />
            <span>SomnaSleep Sanctuary • Science-based non-pharmacological sleep induction</span>
          </p>
          <p className="text-[11px] text-slate-600">
            Based on clinical CBT-I stimulus control, vagus nerve respiratory pacing, and Luc Beaudoin serial diverse imagining. Not intended to replace clinical medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
