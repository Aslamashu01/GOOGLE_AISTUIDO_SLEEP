import { AssessmentAnswers, SleepPrescription, SleepProtocolItem } from '../types/sleep';

export function generateSleepPrescription(answers: AssessmentAnswers): SleepPrescription {
  const { mood, tossingTime, busyMind } = answers;
  const isExtendedTossing = tossingTime === '1_to_2h' || tossingTime === 'over_2h';
  const emergencyStimulusReset = isExtendedTossing && (mood === 'anxious' || mood === 'exhausted_wired' || mood === 'restless');

  let statusTitle = 'Autonomic De-escalation Plan';
  let statusHeadline = 'Transitioning from active beta brainwaves into drowsy theta waves.';
  let cnsState = 'Elevated sympathetic tone';
  let suggestedImmediateAction = 'Start with the 4-7-8 breathing sequence to trigger your vagus nerve.';

  const protocols: SleepProtocolItem[] = [];

  // Determine top priority based on answers
  if (emergencyStimulusReset) {
    protocols.push({
      id: 'stimulus-reset',
      stepNumber: 1,
      title: '20-Minute Bed Reset (Stimulus Control)',
      tagline: 'Break the conditioned association between your bed and wakeful frustration.',
      rationale: `You've been tossing for ${tossingTime === 'over_2h' ? 'over 2 hours' : '1 to 2 hours'}. Staying in bed awake teaches your brain that your mattress is a place of alertness. Step into a dimly lit chair for 10-15 minutes before trying again.`,
      timeEstimate: '10–15 mins',
      actionKey: 'stimulus_reset',
      actionLabel: 'Read Reset Protocol',
      category: 'reset'
    });
  }

  if (mood === 'anxious' || busyMind === 'racing_thoughts') {
    statusTitle = 'Anxiety & Racing Mind De-Escalation';
    statusHeadline = 'Slowing cortical firing rate and calming hyperactive amygdala alerts.';
    cnsState = 'High vigilance / fight-or-flight arousal';
    suggestedImmediateAction = 'Use Cognitive Shuffling to distract the linguistic cortex with harmless mental imagery.';

    if (!emergencyStimulusReset) {
      protocols.push({
        id: 'cog-shuffle',
        stepNumber: protocols.length + 1,
        title: 'Cognitive Shuffling (The Alphabet Game)',
        tagline: 'Trick your brain into entering the hypnagogic dream state.',
        rationale: 'When anxious, the prefrontal cortex searches for threats. Giving your brain random, non-threatening words mimics natural dream micro-thoughts, signaling safety.',
        timeEstimate: '5–8 mins',
        actionKey: 'cognitive_shuffle',
        actionLabel: 'Start Alphabet Shuffler',
        category: 'mind'
      });
    }

    protocols.push({
      id: 'breath-478',
      stepNumber: protocols.length + 1,
      title: '4-7-8 Vagus Nerve Reset',
      tagline: 'The natural tranquilizer for the nervous system.',
      rationale: 'Prolonging the exhale to 8 seconds physically forces your heart rate to drop via baroreceptor activation and parasympathetic vagal stimulation.',
      timeEstimate: '4 mins',
      actionKey: '478_breath',
      actionLabel: 'Open 4-7-8 Breathing Guide',
      category: 'breathing'
    });

    protocols.push({
      id: 'eye-palming',
      stepNumber: protocols.length + 1,
      title: 'Warm Ocular Palming',
      tagline: 'Rest optic nerves and release micro-saccadic eye tremors.',
      rationale: 'Visual input drives 80% of brain stimulation. Complete darkness and gentle palm heat relieve ciliary spasm from screens.',
      timeEstimate: '3 mins',
      actionKey: 'eye_palming',
      actionLabel: 'Start Palming Exercise',
      category: 'ocular'
    });
  } else if (mood === 'stressed' || busyMind === 'work_todo') {
    statusTitle = 'Cortisol Clearing & Mental Unburdening';
    statusHeadline = 'Silencing executive task-loops and releasing anticipatory stress.';
    cnsState = 'Executive loop / high cortisol';
    suggestedImmediateAction = 'Practice Box Breathing to restore autonomic balance.';

    protocols.push({
      id: 'breath-box',
      stepNumber: protocols.length + 1,
      title: '4x4 Box Breathing Protocol',
      tagline: 'Tactical autonomic nervous system stabilization.',
      rationale: 'Equalized 4-second phases restore carbon dioxide tolerance, balance blood pH, and quiet the racing thought machinery.',
      timeEstimate: '4 mins',
      actionKey: 'box_breath',
      actionLabel: 'Launch Box Visualizer',
      category: 'breathing'
    });

    protocols.push({
      id: 'bilateral-flow',
      stepNumber: protocols.length + 1,
      title: 'Bilateral Hypnotic Visual Flow',
      tagline: 'Desensitize emotional charge via smooth lateral tracking.',
      rationale: 'Slow alternating lateral gaze induces inter-hemispheric balance similar to REM sleep, calming stress centers in the brain.',
      timeEstimate: '3–5 mins',
      actionKey: 'bilateral',
      actionLabel: 'Launch Bilateral Flow',
      category: 'ocular'
    });

    protocols.push({
      id: 'cog-shuffle-stress',
      stepNumber: protocols.length + 1,
      title: 'Cognitive Shuffling (Distract Work Mind)',
      tagline: 'Override unfinished task reminders (Zeigarnik effect).',
      rationale: 'Your brain refuses to sleep because it treats tomorrow’s to-do list as active survival items. Shuffling resets this loop.',
      timeEstimate: '5 mins',
      actionKey: 'cognitive_shuffle',
      actionLabel: 'Start Cognitive Shuffler',
      category: 'mind'
    });
  } else if (mood === 'exhausted_wired') {
    statusTitle = 'Exhausted-Yet-Wired Restoration';
    statusHeadline = 'Reconciling heavy physical fatigue with an overstimulated nervous system.';
    cnsState = 'High adenosine with elevated autonomic adrenaline';
    suggestedImmediateAction = 'Perform the Figure-8 Smooth Pursuit to release eye lock and ground your nervous system.';

    protocols.push({
      id: 'eye-figure8',
      stepNumber: protocols.length + 1,
      title: 'Smooth Pursuit Infinity Figure-8',
      tagline: 'Untie optical muscle tension from device glare and screen fatigue.',
      rationale: 'Screens lock eyes in a narrow focal tunnel. Smooth figure-8 pursuits relax the extraocular rectus muscles and cue your melatonin cascade.',
      timeEstimate: '3 mins',
      actionKey: 'figure8',
      actionLabel: 'Start Figure-8 Tracker',
      category: 'ocular'
    });

    protocols.push({
      id: 'body-scan-wired',
      stepNumber: protocols.length + 1,
      title: 'Progressive Somatic Body Scan',
      tagline: 'Dissolve residual neuromuscular armor from head to toe.',
      rationale: 'Systematically unclench jaw, neck, shoulders, and hips to drop baseline muscle spindle tone and invite non-REM sleep.',
      timeEstimate: '7 mins',
      actionKey: 'body_scan',
      actionLabel: 'Begin Guided Body Scan',
      category: 'somatic'
    });

    protocols.push({
      id: 'breath-478-wired',
      stepNumber: protocols.length + 1,
      title: '4-7-8 Sleep Onset Breathing',
      tagline: 'Signal biological safety to your brainstem.',
      rationale: 'The extended 8-second exhale simulates slow breathing during deep sleep, physically persuading the brain that it is safe to surrender.',
      timeEstimate: '4 mins',
      actionKey: '478_breath',
      actionLabel: 'Open Breathing Guide',
      category: 'breathing'
    });
  } else if (mood === 'restless' || busyMind === 'physical_tension') {
    statusTitle = 'Somatic Grounding & Physical Unwinding';
    statusHeadline = 'Releasing physical motor tension and limb restlessness.';
    cnsState = 'Motor restlessness / hypertonic musculature';
    suggestedImmediateAction = 'Complete the progressive body scan to release clenched muscle groups.';

    protocols.push({
      id: 'body-scan-restless',
      stepNumber: protocols.length + 1,
      title: 'Toes-to-Crown Somatic Body Scan',
      tagline: 'Discharge accumulated micro-tension stored in the body.',
      rationale: 'Restlessness often stems from subconscious clenching in the jaw, lower back, and calves. Step-by-step awareness releases motor recruitment.',
      timeEstimate: '8 mins',
      actionKey: 'body_scan',
      actionLabel: 'Begin Guided Body Scan',
      category: 'somatic'
    });

    protocols.push({
      id: 'bilateral-restless',
      stepNumber: protocols.length + 1,
      title: 'Bilateral Hypnotic Horizon Flow',
      tagline: 'Entrain nervous system rhythms to a slow, tranquil pulse.',
      rationale: 'Oscillating gentle motion lulls motor neurons and reduces restless leg sensations.',
      timeEstimate: '4 mins',
      actionKey: 'bilateral',
      actionLabel: 'Launch Bilateral Flow',
      category: 'ocular'
    });

    protocols.push({
      id: 'breath-478-restless',
      stepNumber: protocols.length + 1,
      title: '4-7-8 Rhythm Breathing',
      tagline: 'Drop pulse rate and calm motor impulses.',
      rationale: 'Deep diaphragmatic breathing relaxes the abdominal wall and pelvic floor muscles.',
      timeEstimate: '4 mins',
      actionKey: '478_breath',
      actionLabel: 'Start 4-7-8 Breathing',
      category: 'breathing'
    });
  } else {
    // Neutral or gentle wind down
    statusTitle = 'Gentle Sleep Transition Sanctuary';
    statusHeadline = 'Smoothly guiding your awareness toward restorative slow-wave sleep.';
    cnsState = 'Calm baseline with pending sleep initiation';
    suggestedImmediateAction = 'Engage in a 5-minute wind down meditation or ambient sound immersion.';

    protocols.push({
      id: 'breath-478-neutral',
      stepNumber: 1,
      title: '4-7-8 Sleep Induction Breathing',
      tagline: 'The gold standard bedtime respiratory cadence.',
      rationale: 'Slows resting pulse by 5-10 beats per minute within 4 cycles.',
      timeEstimate: '4 mins',
      actionKey: '478_breath',
      actionLabel: 'Launch Breathing Guide',
      category: 'breathing'
    });

    protocols.push({
      id: 'eye-palming-neutral',
      stepNumber: 2,
      title: 'Warm Ocular Palming',
      tagline: 'Rest optic nerve and soothe the vision centers.',
      rationale: 'Prepares retinal rod cells for nocturnal melatonin secretion.',
      timeEstimate: '3 mins',
      actionKey: 'eye_palming',
      actionLabel: 'Start Palming Exercise',
      category: 'ocular'
    });

    protocols.push({
      id: 'body-scan-neutral',
      stepNumber: 3,
      title: 'Gentle Body Scan & Release',
      tagline: 'Release residual tension throughout the body.',
      rationale: 'Prepares the body for deep stage 3 and stage 4 slow-wave restorative sleep.',
      timeEstimate: '6 mins',
      actionKey: 'body_scan',
      actionLabel: 'Start Body Scan',
      category: 'somatic'
    });
  }

  // Ensure at least 3-4 distinct actionable protocols
  if (protocols.length < 4) {
    protocols.push({
      id: 'tea-elixir',
      stepNumber: protocols.length + 1,
      title: 'Circadian Herbal & Magnesium Ritual',
      tagline: 'Biological biochemical sleep primers.',
      rationale: 'Apigenin in chamomile binds to GABA-A receptors, while magnesium glycinate lowers cortisol and enhances melatonin synthesis.',
      timeEstimate: '2 mins',
      actionKey: 'chamomile_elixir',
      actionLabel: 'View Bedtime Nutrition Recipe',
      category: 'somatic'
    });
  }

  return {
    statusTitle,
    statusHeadline,
    cnsState,
    suggestedImmediateAction,
    emergencyStimulusReset,
    protocols: protocols.slice(0, 4)
  };
}
