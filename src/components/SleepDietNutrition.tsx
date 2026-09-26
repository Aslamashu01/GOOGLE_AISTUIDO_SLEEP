import React, { useState } from 'react';
import { 
  Coffee, 
  Flame, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CupSoda, 
  Heart, 
  ShieldAlert,
  HelpCircle,
  Apple
} from 'lucide-react';
import herbalTeaImage from '../assets/images/sleep_herbal_elixir_1790452581964.jpg';

export const SleepDietNutrition: React.FC = () => {
  const [selectedStomachState, setSelectedStomachState] = useState<'hungry' | 'anxious' | 'warm_drink' | 'sweet_craving'>('hungry');

  const superfoods = [
    {
      name: 'Chamomile & Lavender Tea',
      category: 'Herbal Elixir',
      compound: 'Apigenin & Linalool',
      mechanism: 'Apigenin binds directly to benzodiazepine/GABA-A receptors in the brain, exerting anxiolytic and sedative effects without grogginess.',
      howToTake: 'Steep 2 chamomile tea bags covered for 7–10 minutes. Sip warm 45–60 minutes before bed.',
      badge: 'Best for Anxiety & Racing Mind'
    },
    {
      name: 'Montmorency Tart Cherry Juice',
      category: 'Phyto-Melatonin',
      compound: 'Natural Melatonin & Procyanidins',
      mechanism: 'One of the few concentrated plant sources of bioactive melatonin. Clinical trials showed an average 84-minute increase in sleep time.',
      howToTake: 'Mix 2 oz pure tart cherry concentrate with 4 oz warm or room-temp water 1 hour before bed.',
      badge: 'Clinically Proven'
    },
    {
      name: 'Almonds & Pumpkin Seeds',
      category: 'Mineral Rich Snack',
      compound: 'Magnesium Glycinate & Tryptophan',
      mechanism: 'Magnesium regulates neurotransmitters that quiet down the nervous system and relaxes neuromuscular junction spindles.',
      howToTake: 'A small handful (~12 almonds or 1 tbsp pumpkin seeds) 60 minutes before lights out.',
      badge: 'Best for Restless Limbs'
    },
    {
      name: 'Kiwi Fruit (1 or 2 small)',
      category: 'Serotonin Booster',
      compound: 'Serotonin & Folate Complex',
      mechanism: 'A landmark study showed eating 2 kiwis 1 hour before bed improved total sleep time by 13% and fell asleep 35% faster.',
      howToTake: 'Slice 1 or 2 ripe kiwis. Consume 60 minutes before sleep.',
      badge: 'Fast Sleep Onset'
    },
    {
      name: 'Warm Golden Milk with Nutmeg',
      category: 'Ancient Bedtime Elixir',
      compound: 'Tryptophan, Curcumin, Myristicin',
      mechanism: 'Warm milk promotes vasodilation (blood flow to extremities, dropping core body temperature). A micro-pinch of nutmeg contains myristicin, a mild natural sedative.',
      howToTake: 'Warm oat milk or whole milk with a pinch of turmeric and a tiny grating of fresh nutmeg.',
      badge: 'Deep Comfort Ritual'
    }
  ];

  const sleepDisruptors = [
    {
      name: 'Hidden Caffeine Traps',
      examples: 'Dark chocolate (>70%), decaf espresso (can carry 12mg), green tea ice cream, headache pills (Excedrin).',
      why: 'Caffeine blocks adenosine receptors. Adenosine is the biological chemical that builds "sleep pressure" throughout the day.',
      cutoff: 'Cut off all caffeine at least 10–12 hours before planned bedtime.'
    },
    {
      name: 'Heavy Saturated Fats & Fried Foods',
      examples: 'Burgers, greasy pizza, deep-fried snacks, heavy cheese plates.',
      why: 'Takes 4–6 hours to digest. The stomach stays metabolically active, causing gastroesophageal reflux and fragmenting slow-wave sleep.',
      cutoff: 'Avoid within 3–4 hours of sleep.'
    },
    {
      name: 'High-Glycemic Sugar Spikes',
      examples: 'Candy, pastries, sodas, sweetened breakfast cereals.',
      why: 'Causes a rapid spike in insulin, followed by a nocturnal blood sugar crash. The body releases cortisol and adrenaline at 2–3 AM to raise glucose, jolting you awake.',
      cutoff: 'Avoid refined sugars 2 hours before bed.'
    },
    {
      name: 'Late-Night Alcohol ("The Nightcap Fallacy")',
      examples: 'Wine, whiskey, beer, cocktails.',
      why: 'While alcohol helps you fall unconscious faster, as it metabolizes it completely suppresses REM sleep and causes severe rebound sympathetic wakefulness in the second half of the night.',
      cutoff: 'Cease alcohol intake at least 3–4 hours before sleep.'
    }
  ];

  const quickCures = {
    hungry: {
      title: 'Light Metabolic Snack',
      items: [
        'Half a ripe banana + 1 tablespoon almond butter',
        'Or: 1 slice of whole-grain sourdough with a thin smear of goat cheese or tahini'
      ],
      why: 'The complex carb carries tryptophan across the blood-brain barrier without triggering an insulin roller coaster.'
    },
    anxious: {
      title: 'GABA-Elevating Soother',
      items: [
        'Steeped organic chamomile + lemon balm tea',
        'Optional: 200–300mg Magnesium Glycinate supplement with water'
      ],
      why: 'Calms the gut-brain axis and dampens excess gastric acid caused by stress hormones.'
    },
    warm_drink: {
      title: 'Warm Spiced Oat Bedtime Elixir',
      items: [
        '6 oz warm unsweetened oat or almond milk',
        'Tiny pinch of cinnamon and freshly grated nutmeg',
        '1/2 teaspoon pure raw honey'
      ],
      why: 'Warm liquids stimulate vagal sensory receptors in the esophagus, triggering parasympathetic vasodilation.'
    },
    sweet_craving: {
      title: 'Phyto-Melatonin Sweet Bite',
      items: [
        '1 or 2 small kiwis, sliced',
        'Or: 4-5 tart dried cherries or 2 medjool dates with 2 walnut halves'
      ],
      why: 'Satisfies nocturnal dopamine cravings while directly feeding the pineal melatonin synthesis pathway.'
    }
  };

  const activeCure = quickCures[selectedStomachState];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Editorial Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 sm:p-8 md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Circadian Biochemistry Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-soft text-slate-100">
              Sleep-Inducing Diet & Bedtime Nutrition
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              What you consume in the final 90 minutes before lights out directly controls neurotransmitters like GABA, melatonin, and adenosine. Learn how to bio-hack your sleep onset without morning brain fog.
            </p>

            {/* Golden Timing Rule Card */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-400/30 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-amber-200">The 90-Minute Rule: </span>
                  <span className="text-slate-300">
                    Finish all snacks and hot drinks 60–90 minutes prior to bed. This prevents digestive peristalsis and bladder wake-ups while allowing amino acids to cross into the brain.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 h-56 md:h-full relative overflow-hidden">
            <img
              src={herbalTeaImage}
              alt="Artisan bedtime herbal tea"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Interactive Bedtime Craving & Stomach Matcher */}
      <div className="p-5 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
        <div>
          <h3 className="text-lg font-serif-soft text-slate-100">Tonight's Stomach & Craving Matcher</h3>
          <p className="text-xs text-slate-400 mt-1">
            How is your stomach feeling right now? Pick your current physical sensation for an instant, safe bedtime remedy:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'hungry', label: 'Hungry / Empty', icon: '🍞' },
            { id: 'anxious', label: 'Anxious / Acid', icon: '🌿' },
            { id: 'warm_drink', label: 'Need Warm Drink', icon: '☕' },
            { id: 'sweet_craving', label: 'Craving Sweet', icon: '🥝' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedStomachState(item.id as any)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedStomachState === item.id
                  ? 'bg-indigo-950/80 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/30 font-medium'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs">{item.label}</div>
            </button>
          ))}
        </div>

        {/* Selected Match Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-amber-400/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Recommended Bedtime Remedy</span>
            <span className="text-xs text-slate-400">{activeCure.title}</span>
          </div>

          <div className="space-y-1.5">
            {activeCure.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 italic">
            <strong>Biological Rationale: </strong> {activeCure.why}
          </p>
        </div>
      </div>

      {/* Before-Bed Superfoods Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif-soft text-slate-100">Sleep-Promoting Superfoods & Elixirs</h3>
            <p className="text-xs text-slate-400">Nutrients that cross the blood-brain barrier to trigger melatonin and GABA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {superfoods.map((food, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono uppercase text-indigo-400">{food.category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium">
                    {food.badge}
                  </span>
                </div>
                <h4 className="text-base font-medium text-slate-100">{food.name}</h4>
                <div className="text-xs text-amber-400/90 font-mono mt-0.5">Active Agent: {food.compound}</div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {food.mechanism}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/70 text-xs text-slate-400 flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Protocol:</strong> {food.howToTake}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What to Avoid (Disruptors) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-serif-soft text-slate-100">Nocturnal Saboteurs (What to Avoid)</h3>
          <p className="text-xs text-slate-400">Hidden chemicals that fragment slow-wave sleep and cause 3 AM awakenings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sleepDisruptors.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-rose-950/15 border border-rose-900/30 space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <h4 className="text-sm font-semibold text-rose-200">{item.name}</h4>
              </div>

              <div className="text-xs text-slate-300">
                <strong className="text-rose-300/80">Common culprits:</strong> {item.examples}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.why}
              </p>

              <div className="text-[11px] font-mono text-amber-400/90 pt-1">
                ⏱ Cutoff Guideline: {item.cutoff}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
