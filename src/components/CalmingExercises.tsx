import React, { useState, useEffect, useRef } from 'react';
import { Eye, Brain, Waves, Play, Pause, RotateCcw, Sparkles, Volume2, VolumeX, ChevronRight, ChevronLeft, ShieldCheck, HeartHandshake } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const CalmingExercises: React.FC<{ initialSubTab?: 'eyes' | 'brain' | 'bilateral' }> = ({ initialSubTab = 'eyes' }) => {
  const [activeTab, setActiveTab] = useState<'eyes' | 'brain' | 'bilateral'>(initialSubTab);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('eyes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'eyes'
                ? 'bg-indigo-950 border border-indigo-700/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Eye Relaxation</span>
          </button>
          <button
            onClick={() => setActiveTab('brain')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'brain'
                ? 'bg-indigo-950 border border-indigo-700/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Cognitive Shuffling</span>
          </button>
          <button
            onClick={() => setActiveTab('bilateral')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'bilateral'
                ? 'bg-indigo-950 border border-indigo-700/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>Bilateral Visual Flow</span>
          </button>
        </div>
      </div>

      {activeTab === 'eyes' && <EyeRelaxationSection />}
      {activeTab === 'brain' && <CognitiveShuffleSection />}
      {activeTab === 'bilateral' && <BilateralFlowSection />}
    </div>
  );
};

// -------------------------------------------------------------
// 1. EYE RELAXATION SECTION (Palming & Figure-8 & Soft Gaze)
// -------------------------------------------------------------
const EyeRelaxationSection: React.FC = () => {
  const [selectedEyeMode, setSelectedEyeMode] = useState<'figure8' | 'palming' | 'softgaze'>('figure8');

  return (
    <div className="space-y-6">
      {/* Exercise Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setSelectedEyeMode('figure8')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedEyeMode === 'figure8'
              ? 'bg-indigo-950/60 border-amber-400/70 text-slate-100 ring-1 ring-amber-400/20'
              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-850'
          }`}
        >
          <div className="text-xs uppercase font-semibold text-amber-400 mb-1">Smooth Pursuit</div>
          <div className="font-medium text-sm text-slate-200">Figure-8 Flow</div>
          <p className="text-xs text-slate-500 mt-1">Unclenches ocular rectus muscles locked by screen gaze.</p>
        </button>

        <button
          onClick={() => setSelectedEyeMode('palming')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedEyeMode === 'palming'
              ? 'bg-indigo-950/60 border-amber-400/70 text-slate-100 ring-1 ring-amber-400/20'
              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-850'
          }`}
        >
          <div className="text-xs uppercase font-semibold text-amber-400 mb-1">Thermal Darkness</div>
          <div className="font-medium text-sm text-slate-200">Warm Palming Timer</div>
          <p className="text-xs text-slate-500 mt-1">Total optical rest resets optic nerve hyper-stimulation.</p>
        </button>

        <button
          onClick={() => setSelectedEyeMode('softgaze')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedEyeMode === 'softgaze'
              ? 'bg-indigo-950/60 border-amber-400/70 text-slate-100 ring-1 ring-amber-400/20'
              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-850'
          }`}
        >
          <div className="text-xs uppercase font-semibold text-amber-400 mb-1">Peripheral Vision</div>
          <div className="font-medium text-sm text-slate-200">Panoramic Soft Gaze</div>
          <p className="text-xs text-slate-500 mt-1">Shifts autonomic system from focal stress to open calm.</p>
        </button>
      </div>

      {selectedEyeMode === 'figure8' && <Figure8Visualizer />}
      {selectedEyeMode === 'palming' && <PalmingGuide />}
      {selectedEyeMode === 'softgaze' && <SoftGazeGuide />}
    </div>
  );
};

// Canvas Infinity Figure-8 Smooth Pursuit
const Figure8Visualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<'slow' | 'ultraslow'>('ultraslow');

  useEffect(() => {
    let animId: number;
    let t = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (!ctx || !canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      // Soft nocturnal trail clear
      ctx.fillStyle = 'rgba(8, 11, 20, 0.18)';
      ctx.fillRect(0, 0, width, height);

      // Center parameters
      const cx = width / 2;
      const cy = height / 2;
      const a = width * 0.38; // width scale of lemniscate
      const b = height * 0.32; // height scale

      // Draw faint infinity path guideline
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);
        const denom = 1 + sinA * sinA;
        const px = cx + (a * cosA) / denom;
        const py = cy + (b * sinA * cosA) / denom;
        if (angle === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Current moving orb
      if (isRunning) {
        t += speed === 'slow' ? 0.006 : 0.0035;
      }
      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const denomT = 1 + sinT * sinT;
      const x = cx + (a * cosT) / denomT;
      const y = cy + (b * sinT * cosT) / denomT;

      // Outer gentle glow
      const grad = ctx.createRadialGradient(x, y, 2, x, y, 28);
      grad.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
      grad.addColorStop(0.3, 'rgba(245, 158, 11, 0.4)');
      grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Inner core
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#fffbeb';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRunning, speed]);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-6 text-center space-y-4">
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-serif-soft text-slate-100">Smooth Pursuit Infinity Tracer</h3>
        <p className="text-xs text-slate-400 mt-1">
          Keep your head completely still. Follow the warm amber orb smoothly with your eyes only. Do not rush; let your eye muscles soften.
        </p>
      </div>

      <div className="relative w-full max-w-xl mx-auto aspect-[16/9] bg-[#070912] rounded-xl border border-indigo-950 overflow-hidden shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-500 font-mono">
          Ocular Cadence: {speed === 'slow' ? 'Standard (0.2 Hz)' : 'Nocturnal Hypnotic (0.1 Hz)'}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-xs font-medium text-slate-200"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isRunning ? 'Pause Pursuit' : 'Resume Pursuit'}</span>
        </button>

        <button
          onClick={() => setSpeed(speed === 'slow' ? 'ultraslow' : 'slow')}
          className="px-3.5 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300"
        >
          Speed: {speed === 'slow' ? 'Moderate' : 'Ultra Slow'}
        </button>
      </div>
    </div>
  );
};

// Guided Warm Palming
const PalmingGuide: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const steps = [
    { title: 'Rub Palms Rapidly', desc: 'Vigorously rub your palms together for 15 seconds until they feel pleasantly warm from friction.', duration: 15 },
    { title: 'Cup Gently Over Closed Eyes', desc: 'Gently cup the heels of your warm palms over your eye sockets. Rest fingers over your forehead without pressing on the eyeballs.', duration: 45 },
    { title: 'Breathe Into Absolute Darkness', desc: 'See the absolute velvety blackness. If you see light flashes or phosphenes, breathe gently and imagine dissolving them into ink.', duration: 60 },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            audioEngine.playSoftChime();
            setIsActive(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    setSecondsLeft(120);
    setIsActive(true);
    setStepIndex(0);
    audioEngine.playSoftChime();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-serif-soft text-slate-100">Thermal Ocular Palming Protocol</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Developed by ophthalmologists to relieve deep photoreceptor exhaustion. Total blackness triggers natural nocturnal melatonin surge.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-mono font-medium text-amber-300 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            {formatTime(secondsLeft)}
          </div>
          <button
            onClick={handleStart}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md cursor-pointer"
          >
            {isActive ? 'Restart 2-Min' : 'Start 2-Min Session'}
          </button>
        </div>
      </div>

      {/* Steps breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((st, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              isActive && ((i === 0 && secondsLeft > 105) || (i === 1 && secondsLeft <= 105 && secondsLeft > 60) || (i === 2 && secondsLeft <= 60))
                ? 'bg-amber-950/40 border-amber-400/80 ring-1 ring-amber-400/30'
                : 'bg-slate-950/60 border-slate-850'
            }`}
          >
            <div className="text-amber-400 text-xs font-mono mb-1">Phase 0{i + 1}</div>
            <div className="text-sm font-medium text-slate-200">{st.title}</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300/90 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Pro-tip:</strong> Rest your elbows comfortably on a pillow or mattress so your shoulders and neck stay completely unburdened.
        </span>
      </div>
    </div>
  );
};

// Panoramic Soft Gaze Guide
const SoftGazeGuide: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-4">
      <div>
        <h3 className="text-lg font-serif-soft text-slate-100">Panoramic Soft Gaze (Peripheral Dilation)</h3>
        <p className="text-xs text-slate-400 mt-1">
          Neurobiologically, narrow focal vision drives high vigilance in the autonomic nervous system. Expanding your peripheral awareness physically suppresses fight-or-flight circuits.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-amber-400 font-mono text-xs mb-1">Step 1</div>
          <div className="text-sm font-medium text-slate-200">Unfocus Your Eyes</div>
          <p className="text-xs text-slate-400 mt-1">
            Pick a spot in the dimly lit room. Without moving your eyeballs, soften your gaze so the edges blur slightly.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-amber-400 font-mono text-xs mb-1">Step 2</div>
          <div className="text-sm font-medium text-slate-200">Notice Both Room Corners</div>
          <p className="text-xs text-slate-400 mt-1">
            Expand your visual field horizontally until you can perceive the left and right borders of the room simultaneously.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-amber-400 font-mono text-xs mb-1">Step 3</div>
          <div className="text-sm font-medium text-slate-200">Observe Ceiling & Floor</div>
          <p className="text-xs text-slate-400 mt-1">
            Notice the upper and lower horizons of your field of view without tilting your chin.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-amber-400 font-mono text-xs mb-1">Step 4</div>
          <div className="text-sm font-medium text-slate-200">Release Eyelids</div>
          <p className="text-xs text-slate-400 mt-1">
            Feel the natural heavy drooping of your upper eyelids. Allow them to close like a heavy velvet curtain.
          </p>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. COGNITIVE SHUFFLING (The Alphabet Game)
// -------------------------------------------------------------
const CognitiveShuffleSection: React.FC = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [category, setCategory] = useState<'cozy' | 'nature' | 'food' | 'random'>('cozy');
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [timerProgress, setTimerProgress] = useState<number>(0);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const wordDatabase: Record<string, Record<string, string[]>> = {
    cozy: {
      A: ['Autumn leaves', 'Amber glow', 'Alpaca blanket', 'Armchair'],
      B: ['Bookshop', 'Bedding', 'Breeze', 'Bonfire', 'Blanket'],
      C: ['Cashmere', 'Candlelight', 'Cottage', 'Cushion', 'Cocoa'],
      D: ['Duvet', 'Down pillow', 'Drizzle', 'Dusk', 'Daydream'],
      E: ['Eiderdown', 'Embers', 'Earl Grey', 'Evening mist'],
      F: ['Fireside', 'Flannel sheets', 'Fleece', 'Forest cabin'],
      G: ['Garden', 'Gentle rain', 'Golden hour', 'Green tea'],
      H: ['Hammock', 'Hearth', 'Honey tea', 'Hot bath'],
      I: ['Incense', 'Island breeze', 'Indigo dusk', 'Ivy window'],
      J: ['Jasmine petals', 'Journal', 'Jade stone', 'July twilight'],
      K: ['Kettle steam', 'Knit sweater', 'Kindness', 'Keepsake'],
      L: ['Lavender sprig', 'Linen sheets', 'Lamplight', 'Lullaby'],
      M: ['Midnight rain', 'Moonlight', 'Meadow', 'Mossy path'],
      N: ['Nightstand', 'Nocturne', 'Nest', 'Night sky'],
      O: ['Old library', 'Oatmeal honey', 'Oak table', 'Orchard'],
      P: ['Pillowtop', 'Peace', 'Pine needles', 'Porch swing'],
      Q: ['Quilt', 'Quiet room', 'Quaint hearth', 'Quietude'],
      R: ['Rain on window', 'Rocking chair', 'Rustling leaves'],
      S: ['Starlight', 'Silk robe', 'Soft socks', 'Slippers'],
      T: ['Twilight', 'Teacup', 'Tapestry', 'Thunder in distance'],
      U: ['Umbrella rain', 'Unwinding', 'Underblanket'],
      V: ['Velvet drape', 'Vanilla pod', 'Valley fog'],
      W: ['Warm milk', 'Whispering wind', 'Wool mittens', 'Woodstove'],
      X: ['Xylophone lullaby', 'Xanadu sanctuary'],
      Y: ['Yarn blanket', 'Yellow glow', 'Yarrow blossoms'],
      Z: ['Zen garden', 'Zephyr breeze', 'Zero worries'],
    },
    nature: {
      A: ['Alpine lake', 'Acorn', 'Aspen trees', 'Aurora'],
      B: ['Bamboo grove', 'Brook', 'Birch forest', 'Bayou'],
      C: ['Canyon stream', 'Cloud drifting', 'Cedar breeze'],
      D: ['Dewdrops', 'Driftwood', 'Dunes at night'],
      E: ['Evergreen', 'Estuary', 'Eucalyptus breeze'],
      F: ['Fern moss', 'Forest rain', 'Fallen pinecones'],
      G: ['Glade', 'Geyser mist', 'Gentle tides'],
      H: ['Horizon', 'Hillside pasture', 'Heather blossoms'],
      I: ['Ice cavern', 'Island shore', 'Iris flower'],
      J: ['Jasmine vines', 'Juniper berry', 'Jungle rain'],
      K: ['Kelp canopy', 'Kingfisher perch', 'Kudzu leaves'],
      L: ['Lotus pond', 'Lagoon', 'Lichen on granite'],
      M: ['Mountain peak', 'Morning mist', 'Meadowlark'],
      N: ['Night lily', 'Northern lights', 'Nestled bay'],
      O: ['Ocean swell', 'Old-growth redwood', 'Orchid'],
      P: ['Pebble creek', 'Pine forest', 'Prairie wind'],
      Q: ['Quaking aspen', 'Quartz crystal', 'Quiet marsh'],
      R: ['Riverbed', 'Redwood forest', 'Rainforest canopy'],
      S: ['Seafoam', 'Sand dunes', 'Starlit clearing'],
      T: ['Tide pool', 'Timberline', 'Topiary garden'],
      U: ['Underbrush', 'Upland moss', 'Undersea glow'],
      V: ['Valley mist', 'Vineyard at dusk', 'Violet bloom'],
      W: ['Waterfall spray', 'Wildflower ridge', 'Willow'],
      X: ['Xeriscape succulents', 'Xenon twilight'],
      Y: ['Yellowstone geyser', 'Yucca flower'],
      Z: ['Zinnia petals', 'Zodiac stars'],
    },
    food: {
      A: ['Almonds', 'Apple cider', 'Apricot jam', 'Avocado'],
      B: ['Banana honey', 'Blueberry tart', 'Brioche', 'Bread warm'],
      C: ['Chamomile tea', 'Cinnamon stick', 'Chestnut', 'Cherry'],
      D: ['Dates medjool', 'Dumpling', 'Dark plum', 'Doughnut'],
      E: ['Earl Grey tea', 'Edamame', 'Elderberry cordial'],
      F: ['Figs fresh', 'Focaccia bread', 'Fudge warm'],
      G: ['Grapes purple', 'Ginger tea', 'Golden milk'],
      H: ['Honey drizzle', 'Hazelnuts', 'Hot chocolate'],
      I: ['Ice cream scoop', 'Iced mint tea'],
      J: ['Jasmine green tea', 'Jam strawberry'],
      K: ['Kiwi slices', 'Kumquat', 'Kombucha gentle'],
      L: ['Lavender honey', 'Lemon balm tea', 'Loaf of sourdough'],
      M: ['Mango slices', 'Mulberries', 'Maple syrup', 'Miso soup'],
      N: ['Nutmeg warm milk', 'Nectarine', 'Noodles warm'],
      O: ['Oatmeal bowl', 'Orange blossom tea', 'Olive sourdough'],
      P: ['Peach cobbler', 'Pistachios', 'Pumpkin seeds'],
      Q: ['Quince fruit', 'Quiche warm', 'Quick oats'],
      R: ['Raspberry sorbet', 'Rice pudding', 'Roast chestnuts'],
      S: ['Shortbread cookie', 'Sourdough slice', 'Strawberry'],
      T: ['Tart cherry juice', 'Turmeric milk', 'Toasted pecans'],
      U: ['Udon noodles in broth', 'Ugli fruit'],
      V: ['Vanilla bean milk', 'Vegetable broth'],
      W: ['Warm walnut loaf', 'Watermelon chilled'],
      X: ['Xigua melon', 'Xylitol mint'],
      Y: ['Yogurt with honey', 'Yam roasted'],
      Z: ['Zucchini bread', 'Zest lemon in warm water'],
    },
    random: {
      A: ['Anchor', 'Airship', 'Abacus', 'Anvil', 'Atlas'],
      B: ['Bicycle', 'Bonsai', 'Button', 'Balloon', 'Basket'],
      C: ['Compass', 'Camera antique', 'Chessboard', 'Crayon'],
      D: ['Domino', 'Doorbell brass', 'Drumstick', 'Dial'],
      E: ['Envelope', 'Easel', 'Eraser', 'Engine gentle'],
      F: ['Feather', 'Fountain pen', 'Flashlight', 'Fiddle'],
      G: ['Globe', 'Goggles', 'Guitar acoustic', 'Gear'],
      H: ['Hourglass', 'Harmonica', 'Harp', 'Helmet vintage'],
      I: ['Inkwell', 'Iron key', 'Illuminated dial'],
      J: ['Jigsaw puzzle', 'Jar of marbles', 'Journal leather'],
      K: ['Kite', 'Kaleidoscope', 'Keyring brass'],
      L: ['Lighthouse', 'Lantern antique', 'Lock antique'],
      M: ['Microscope', 'Monocle', 'Music box', 'Map'],
      N: ['Needle thread', 'Notepad', 'Nutcracker'],
      O: ['Origami crane', 'Oil lantern', 'Oboe'],
      P: ['Pendulum clock', 'Pocketwatch', 'Prism glass'],
      Q: ['Quill feather', 'Quilt patch', 'Quarter antique'],
      R: ['Radio vintage', 'Record player', 'Rope woven'],
      S: ['Sundial', 'Spyglass', 'Scarf wool', 'Snowglobe'],
      T: ['Telescope', 'Typewriter', 'Teapot copper'],
      U: ['Umbrella vintage', 'Ukulele gentle'],
      V: ['Violin bow', 'Vase ceramic', 'Vellum scroll'],
      W: ['Windmill', 'Wind chime', 'Watch ticking softly'],
      X: ['Xylophone key'],
      Y: ['Yo-yo wooden', 'Yarn spool'],
      Z: ['Zipper', 'Zeppelin gentle'],
    }
  };

  const currentLetter = alphabet[currentLetterIndex];
  const suggestions = wordDatabase[category]?.[currentLetter] || ['Sleep', 'Softness', 'Slumber'];

  // 6-second auto-advance cycle for cognitive shuffling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoAdvance) {
      interval = setInterval(() => {
        setTimerProgress((prev) => {
          if (prev >= 100) {
            setCurrentLetterIndex((idx) => (idx + 1) % 26);
            return 0;
          }
          return prev + 2.5; // ~5 seconds per letter
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [autoAdvance]);

  const handleNext = () => {
    setTimerProgress(0);
    setCurrentLetterIndex((idx) => (idx + 1) % 26);
  };

  const handlePrev = () => {
    setTimerProgress(0);
    setCurrentLetterIndex((idx) => (idx - 1 + 26) % 26);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6">
      {/* Educational banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-serif-soft text-slate-100">Cognitive Shuffling (The Alphabet Technique)</h3>
            <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
              Dr. Luc Beaudoin Method
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Insomnia happens when your brain is in problem-solving mode. By visualizing random, emotionally neutral words, you mimic natural dream thoughts, signalling safety to your sleep switch.
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-850">
          {(['cozy', 'nature', 'food', 'random'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setTimerProgress(0); }}
              className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-all ${
                category === cat ? 'bg-amber-500/20 text-amber-300 font-medium border border-amber-400/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Alphabet Stage */}
      <div className="relative max-w-md mx-auto py-8 text-center space-y-4">
        {/* Glowing Letter Avatar */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-amber-400/40 shadow-2xl shadow-indigo-950/80">
          <span className="text-6xl font-serif-soft text-amber-200 select-none tracking-tight">
            {currentLetter}
          </span>
          <div className="absolute -bottom-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            Letter {currentLetterIndex + 1} / 26
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">Picture in your mind:</p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {suggestions.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs font-medium tracking-wide shadow-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic max-w-xs mx-auto">
          "Hold the image in your mind for a few seconds. Feel the texture, color, and stillness. Don't analyze it."
        </p>

        {/* Progress Bar for Current Letter */}
        {autoAdvance && (
          <div className="w-48 mx-auto h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${timerProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Letter</span>
        </button>

        <button
          onClick={() => setAutoAdvance(!autoAdvance)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            autoAdvance
              ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {autoAdvance ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{autoAdvance ? 'Auto Pacing (5s)' : 'Manual Mode'}</span>
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300"
        >
          <span>Next Letter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. BILATERAL STIMULATION / VISUAL FLOW
// -------------------------------------------------------------
const BilateralFlowSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [oscillationSpeed, setOscillationSpeed] = useState<number>(7); // seconds per cycle

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-serif-soft text-slate-100">Bilateral Hypnotic Horizon Flow</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Gentle horizontal eye movement downregulates autonomic arousal in the amygdala, producing an immediate parasympathetic calming effect similar to the natural phase of slow-wave sleep.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-xs font-medium text-slate-200"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>
        </div>
      </div>

      {/* The Hypnotic Horizon Stage */}
      <div className="relative w-full h-44 sm:h-52 bg-[#060810] rounded-2xl border border-slate-800/90 overflow-hidden flex items-center justify-center p-6 shadow-inner">
        {/* Soft starry background dots */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Horizon line */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-900/60 to-transparent" />

        {/* Oscillating Bilateral Orb */}
        <div className="w-full relative h-12 flex items-center">
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_35px_rgba(245,158,11,0.6)] ${
              isPlaying ? '' : ''
            }`}
            style={{
              animation: isPlaying ? `bilateralSway ${oscillationSpeed}s ease-in-out infinite alternate` : 'none',
              left: isPlaying ? undefined : '50%',
              transform: isPlaying ? undefined : 'translate(-50%, -50%)',
            }}
          >
            <div className="w-full h-full rounded-full bg-white/40 blur-[1px]" />
          </div>
        </div>

        <div className="absolute bottom-3 text-center w-full">
          <span className="text-[11px] text-slate-500 font-mono tracking-wider">
            Allow your eyes to follow the light effortlessly side to side • Inhale gently • Exhale slowly
          </span>
        </div>
      </div>

      {/* Speed controller */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Rhythm Cadence:</span>
          {[
            { label: 'Deep Calm (8s)', val: 8 },
            { label: 'Hypnotic (6s)', val: 6 },
            { label: 'Gentle (4s)', val: 4 },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setOscillationSpeed(item.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                oscillationSpeed === item.val
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Proven EMDR parasympathetic pathway</span>
        </div>
      </div>

      <style>{`
        @keyframes bilateralSway {
          0% {
            left: 5%;
          }
          100% {
            left: 90%;
          }
        }
      `}</style>
    </div>
  );
};
