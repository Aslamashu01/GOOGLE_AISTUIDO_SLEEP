import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  CloudRain, 
  Radio, 
  Moon, 
  Sparkles, 
  Check, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Volume1
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const MeditationAudioHub: React.FC<{ initialSection?: 'breathing' | 'soundscape' | 'bodyscan' }> = ({
  initialSection = 'breathing'
}) => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'soundscape' | 'bodyscan'>(initialSection);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Navigation tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('breathing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'breathing'
                ? 'bg-indigo-950 border border-indigo-700/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Paced Breathing</span>
          </button>
          <button
            onClick={() => setActiveTab('soundscape')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'soundscape'
                ? 'bg-indigo-950 border border-indigo-700/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Sleep Soundscapes</span>
          </button>
          <button
            onClick={() => setActiveTab('bodyscan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'bodyscan'
                ? 'bg-indigo-950 border border-indigo-700/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Somatic Body Scan</span>
          </button>
        </div>
      </div>

      {activeTab === 'breathing' && <BreathingVisualizer />}
      {activeTab === 'soundscape' && <SoundscapePlayer />}
      {activeTab === 'bodyscan' && <BodyScanRelaxation />}
    </div>
  );
};

// -------------------------------------------------------------
// 1. PACED BREATHING VISUALIZER (4-7-8 & Box Breathing)
// -------------------------------------------------------------
const BreathingVisualizer: React.FC = () => {
  const [technique, setTechnique] = useState<'478' | 'box'>('478');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [audioChime, setAudioChime] = useState<boolean>(true);

  // Configuration for phases
  const protocols = {
    '478': [
      { phase: 'inhale', duration: 4, instruction: 'Inhale silently through nose', sub: 'Expand belly gently' },
      { phase: 'hold', duration: 7, instruction: 'Hold breath softly', sub: 'Retain oxygen in lungs' },
      { phase: 'exhale', duration: 8, instruction: 'Slow whoosh exhale', sub: 'Empty all air slowly' }
    ],
    'box': [
      { phase: 'inhale', duration: 4, instruction: 'Inhale smoothly', sub: 'Equal 4s intake' },
      { phase: 'hold', duration: 4, instruction: 'Hold gently', sub: 'Relax shoulders' },
      { phase: 'exhale', duration: 4, instruction: 'Exhale smoothly', sub: 'Equal 4s release' },
      { phase: 'hold2', duration: 4, instruction: 'Hold empty', sub: 'Stillness before next breath' }
    ]
  };

  const currentProtocol = protocols[technique];
  const [phaseIndex, setPhaseIndex] = useState<number>(0);

  // Paced countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Next phase
            const nextIdx = (phaseIndex + 1) % currentProtocol.length;
            setPhaseIndex(nextIdx);
            const nextPhaseObj = currentProtocol[nextIdx];
            setCurrentPhase(nextPhaseObj.phase as any);

            if (nextIdx === 0) {
              setCycleCount((c) => c + 1);
            }
            if (audioChime) {
              audioEngine.playSoftChime();
            }
            return nextPhaseObj.duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phaseIndex, currentProtocol, audioChime]);

  const handleToggle = () => {
    if (!isActive) {
      setIsActive(true);
      setPhaseIndex(0);
      setCurrentPhase(currentProtocol[0].phase as any);
      setSecondsRemaining(currentProtocol[0].duration);
      if (audioChime) audioEngine.playSoftChime();
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setCurrentPhase('inhale');
    setSecondsRemaining(currentProtocol[0].duration);
    setCycleCount(0);
  };

  const activePhaseInfo = currentProtocol[phaseIndex];

  // Visual scale calculation
  const getHaloScale = () => {
    if (!isActive) return 'scale-90';
    if (currentPhase === 'inhale') return 'scale-125';
    if (currentPhase === 'hold') return 'scale-125';
    if (currentPhase === 'exhale') return 'scale-75';
    return 'scale-75';
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6">
      {/* Top selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-serif-soft text-slate-100">
            {technique === '478' ? '4-7-8 Parasympathetic Vagus Reset' : '4x4 Tactical Box Breathing'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            {technique === '478'
              ? 'Dr. Andrew Weil’s clinically proven rhythm. Prolonged exhalations lower heart rate within 4 cycles.'
              : 'Equalized 4s phases calm the autonomic nervous system and restore physiological equilibrium.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => { setTechnique('478'); handleReset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                technique === '478' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-400'
              }`}
            >
              4-7-8 Sleep Mode
            </button>
            <button
              onClick={() => { setTechnique('box'); handleReset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                technique === 'box' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-400'
              }`}
            >
              4x4 Box Mode
            </button>
          </div>
        </div>
      </div>

      {/* Halo Visualizer Circle */}
      <div className="relative py-12 flex flex-col items-center justify-center">
        {/* Ambient background pulsing rings */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Animated Glow Aura */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out ${getHaloScale()} ${
              currentPhase === 'inhale'
                ? 'bg-gradient-to-tr from-indigo-500/20 via-sky-500/30 to-amber-500/20 blur-2xl'
                : currentPhase === 'hold' || currentPhase === 'hold2'
                ? 'bg-gradient-to-tr from-amber-500/30 via-indigo-600/30 to-amber-400/20 blur-2xl'
                : 'bg-gradient-to-tr from-slate-700/20 via-indigo-900/30 to-slate-800/20 blur-xl'
            }`}
          />

          {/* Central expanding ring */}
          <div
            className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 transition-all duration-[4000ms] ease-in-out flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md shadow-2xl ${getHaloScale()} ${
              currentPhase === 'inhale'
                ? 'border-sky-400 shadow-sky-500/20'
                : currentPhase === 'hold' || currentPhase === 'hold2'
                ? 'border-amber-400 shadow-amber-500/30'
                : 'border-indigo-500/60 shadow-indigo-500/20'
            }`}
          >
            <span className="text-3xl sm:text-4xl font-mono font-medium text-amber-200">
              {isActive ? secondsRemaining : activePhaseInfo.duration}s
            </span>
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-300 mt-1 capitalize">
              {isActive ? currentPhase.replace('2', '') : 'Ready'}
            </span>
          </div>
        </div>

        {/* Dynamic Instructional text */}
        <div className="text-center mt-6 space-y-1">
          <p className="text-base sm:text-lg font-medium text-slate-100">
            {isActive ? activePhaseInfo.instruction : 'Press Begin when you are comfortable in bed'}
          </p>
          <p className="text-xs text-slate-400">
            {isActive ? activePhaseInfo.sub : 'Keep your chest still, breathe deep into your lower diaphragm'}
          </p>
        </div>
      </div>

      {/* Action Controls & Cycle Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs shadow-lg transition-all cursor-pointer ${
              isActive
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-750'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause Breathing' : 'Begin Breathing Cadence'}</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset"
            className="p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-750 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setAudioChime(!audioChime)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
              audioChime
                ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {audioChime ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Tibetan Bell Cue: {audioChime ? 'On' : 'Off'}</span>
          </button>

          <div className="text-slate-400 font-mono">
            Cycles Completed: <span className="text-amber-300 font-bold">{cycleCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. SLEEP SOUNDSCAPE PLAYER (Generative Web Audio)
// -------------------------------------------------------------
const SoundscapePlayer: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(30);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number | null>(null);

  const soundscapes = [
    {
      id: 'brown_noise',
      name: 'Pure Brown Noise',
      desc: 'Deep warm rumble that masks sudden room noises and calms an overactive amygdala.',
      icon: Moon,
      color: 'from-amber-950/40 to-indigo-950/40'
    },
    {
      id: 'rain',
      name: 'Nocturnal Rainfall',
      desc: 'Gentle, hypnotic rainfall hitting rooftop tiles. Naturally induces theta waves.',
      icon: CloudRain,
      color: 'from-sky-950/40 to-indigo-950/40'
    },
    {
      id: 'delta_432',
      name: '432 Hz + 2Hz Delta Drone',
      desc: 'Harmonic Solfeggio frequency with a 2Hz binaural difference tuned to restorative slow-wave sleep.',
      icon: Radio,
      color: 'from-purple-950/40 to-indigo-950/40'
    },
    {
      id: 'whispering_wind',
      name: 'Nocturnal Breeze',
      desc: 'Soft, swaying midnight wind rolling through quiet pine valleys.',
      icon: Wind,
      color: 'from-slate-900/60 to-indigo-950/40'
    }
  ];

  const handlePlaySound = (id: 'brown_noise' | 'rain' | 'delta_432' | 'whispering_wind') => {
    if (activeSound === id) {
      audioEngine.stop();
      setActiveSound(null);
      setTimeRemainingSeconds(null);
    } else {
      audioEngine.play(id);
      setActiveSound(id);
      if (timerMinutes) {
        setTimeRemainingSeconds(timerMinutes * 60);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  // Sleep timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSound && timeRemainingSeconds !== null && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev !== null && prev <= 1) {
            audioEngine.stop();
            setActiveSound(null);
            return null;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSound, timeRemainingSeconds]);

  const formatTimer = (secs: number | null) => {
    if (secs === null) return '--:--';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-serif-soft text-slate-100">Generative Sleep Soundscapes</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Synthesized directly inside your browser via real-time Web Audio API. Zero streaming bandwidth, continuous non-looping serenity, and automatic sleep timer.
          </p>
        </div>

        {/* Master Active Status */}
        {activeSound && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Sound Playing • Timer: {formatTimer(timeRemainingSeconds)}</span>
          </div>
        )}
      </div>

      {/* Grid of Soundscapes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {soundscapes.map((snd) => {
          const isCurrent = activeSound === snd.id;
          const IconComp = snd.icon;
          return (
            <div
              key={snd.id}
              className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-indigo-950/70 border-amber-400/80 shadow-lg shadow-indigo-950/50 ring-1 ring-amber-400/30'
                  : 'bg-slate-950/60 border-slate-850 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${isCurrent ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-850 text-slate-400'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className={`font-medium text-sm ${isCurrent ? 'text-amber-200' : 'text-slate-200'}`}>
                      {snd.name}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{snd.desc}</p>
              </div>

              <button
                onClick={() => handlePlaySound(snd.id as any)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300'
                }`}
              >
                {isCurrent ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isCurrent ? 'Stop Soundscape' : 'Play Soundscape'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Player Bar (Volume & Sleep Timer) */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Volume Slider */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <Volume1 className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
          <span className="text-xs font-mono text-slate-400 w-8">{Math.round(volume * 100)}%</span>
        </div>

        {/* Sleep Auto-Off Timer Selector */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Sleep Timer:</span>
          {[15, 30, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setTimerMinutes(mins);
                if (activeSound) {
                  setTimeRemainingSeconds(mins * 60);
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                timerMinutes === mins
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              {mins}m
            </button>
          ))}
          <button
            onClick={() => {
              setTimerMinutes(null);
              setTimeRemainingSeconds(null);
            }}
            className={`px-2 py-1 rounded-lg text-xs transition-all ${
              timerMinutes === null
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                : 'bg-slate-850 text-slate-500 hover:text-slate-300'
            }`}
          >
            Off
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. SOMATIC BODY SCAN RELAXATION (Toes to Crown)
// -------------------------------------------------------------
const BodyScanRelaxation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [autoProgress, setAutoProgress] = useState<boolean>(true);
  const [progressSecs, setProgressSecs] = useState<number>(0);

  const zones = [
    {
      title: 'Feet & Toes',
      subtitle: 'The foundation of daily weight',
      cue: 'Notice the soles of your feet. Let your toes uncurl completely. Imagine warm sand or a heavy warm blanket over your feet. Feel all tension dissolving down through your soles.',
      duration: 15
    },
    {
      title: 'Calves & Shins',
      subtitle: 'Releasing walking momentum',
      cue: 'Soften the muscular bulk in your calves. Let your shins sink heavy into the mattress. Allow both lower legs to feel completely limp and weightless.',
      duration: 15
    },
    {
      title: 'Thighs, Hips & Pelvis',
      subtitle: 'Unlocking deep emotional bracing',
      cue: 'The pelvic bowl stores subconscious tension. Release your glutes, thighs, and groin. Feel the heavy, warm sinking sensation of surrendering to gravity.',
      duration: 15
    },
    {
      title: 'Belly & Diaphragm',
      subtitle: 'The enteric nervous system',
      cue: 'Let your abdominal wall go completely soft. Do not hold your stomach in. With every slow exhale, feel your navel sink closer to your spine without any effort.',
      duration: 15
    },
    {
      title: 'Chest & Heart Center',
      subtitle: 'Slowing cardiac cadence',
      cue: 'Feel your ribs gently expanding and contracting. Picture your heartbeat slowing down, steady and calm. There is nowhere to rush. Tonight has nothing left to prove.',
      duration: 15
    },
    {
      title: 'Shoulders, Neck & Throat',
      subtitle: 'Unburdening the weight of the day',
      cue: 'Allow your shoulders to drop away from your ears. Open your throat. Melt the knots in the back of your neck down into the softness of your pillow.',
      duration: 15
    },
    {
      title: 'Jaw, Mouth & Tongue',
      subtitle: 'The primary insomnia lock',
      cue: 'Part your lips slightly. Unclench your back molars. Let your tongue drop gently away from the roof of your mouth. Smooth the micro-muscles around your lips.',
      duration: 15
    },
    {
      title: 'Eyes, Forehead & Crown',
      subtitle: 'Total cognitive surrender',
      cue: 'Smooth away any furrows between your eyebrows. Let your eyelids feel as heavy as velvet curtains. Imagine a soothing wave of warm quiet pouring over your entire scalp.',
      duration: 15
    }
  ];

  // Auto-progress timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoProgress) {
      interval = setInterval(() => {
        setProgressSecs((p) => {
          if (p >= 15) {
            setCurrentStep((prev) => (prev < zones.length - 1 ? prev + 1 : prev));
            audioEngine.playSoftChime();
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoProgress, zones.length]);

  const activeZone = zones[currentStep];

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-serif-soft text-slate-100">Progressive Somatic Body Scan</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Neuromuscular tension prevents stage 1 sleep onset. By sequentially focusing attention on each zone and releasing motor recruitment, your brain receives the somatic green light for deep slumber.
          </p>
        </div>

        <button
          onClick={() => setAutoProgress(!autoProgress)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            autoProgress
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {autoProgress ? 'Auto-Advance: Active (15s)' : 'Manual Step Mode'}
        </button>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-8 gap-1.5">
        {zones.map((z, idx) => (
          <button
            key={idx}
            onClick={() => { setCurrentStep(idx); setProgressSecs(0); }}
            className={`h-2 rounded-full transition-all ${
              idx === currentStep
                ? 'bg-amber-400 ring-2 ring-amber-400/30'
                : idx < currentStep
                ? 'bg-indigo-600'
                : 'bg-slate-800'
            }`}
            title={z.title}
          />
        ))}
      </div>

      {/* Main Focus Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-900/50 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-300 border border-slate-800 text-xs font-mono">
          Zone {currentStep + 1} of {zones.length} • {activeZone.title}
        </div>

        <h4 className="text-2xl sm:text-3xl font-serif-soft text-slate-100">
          {activeZone.subtitle}
        </h4>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          "{activeZone.cue}"
        </p>

        {autoProgress && (
          <div className="w-36 mx-auto h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${(progressSecs / 15) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
              setProgressSecs(0);
            }
          }}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 disabled:opacity-40 text-xs font-medium text-slate-300"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Zone</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          {currentStep === zones.length - 1 ? 'Final Relaxation Zone' : `Next: ${zones[currentStep + 1]?.title}`}
        </span>

        <button
          onClick={() => {
            if (currentStep < zones.length - 1) {
              setCurrentStep(currentStep + 1);
              setProgressSecs(0);
            }
          }}
          disabled={currentStep === zones.length - 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 disabled:opacity-40 text-xs font-medium text-slate-300"
        >
          <span>Next Zone</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
