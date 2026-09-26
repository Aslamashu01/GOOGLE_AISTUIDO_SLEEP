// Generative Web Audio API ambient sound generator for sleep
class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentType: string | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentSound(): string | null {
    return this.currentType;
  }

  public stop() {
    if (!this.ctx) return;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.4);
      setTimeout(() => {
        this.cleanupNodes();
        this.currentType = null;
      }, 450);
    } else {
      this.cleanupNodes();
      this.currentType = null;
    }
  }

  private cleanupNodes() {
    this.activeNodes.forEach((item) => {
      if (typeof item === 'number') {
        window.clearInterval(item);
      } else {
        try {
          if ('stop' in item && typeof (item as AudioScheduledSourceNode).stop === 'function') {
            (item as AudioScheduledSourceNode).stop();
          }
          item.disconnect();
        } catch {
          // ignore already stopped nodes
        }
      }
    });
    this.activeNodes = [];
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain = null;
    }
  }

  public play(type: 'brown_noise' | 'rain' | 'delta_432' | 'whispering_wind') {
    this.initContext();
    if (!this.ctx) return;

    if (this.currentType === type) {
      this.stop();
      return;
    }

    this.stop();

    setTimeout(() => {
      if (!this.ctx) return;
      this.currentType = type;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.6);
      this.masterGain.connect(this.ctx.destination);

      if (type === 'brown_noise') {
        this.generateBrownNoise();
      } else if (type === 'rain') {
        this.generateRainSound();
      } else if (type === 'delta_432') {
        this.generateDeltaDrone();
      } else if (type === 'whispering_wind') {
        this.generateWindSound();
      }
    }, 100);
  }

  // Brown noise (integrated white noise filtered deeply)
  private generateBrownNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Compensate for low amplitude
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Gentle low-pass warm filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.masterGain);
    noise.start();

    this.activeNodes.push(noise, filter);
  }

  // Rain sound generation using dual-filtered noise with gentle droplets
  private generateRainSound() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    for (let i = 0; i < bufferSize; i++) {
      left[i] = Math.random() * 2 - 1;
      right[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter 1: Bandpass for steady rainfall wash
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(900, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(0.7, this.ctx.currentTime);

    // Filter 2: Low-shelf for deep distant ground rumble
    const lowshelf = this.ctx.createBiquadFilter();
    lowshelf.type = 'lowshelf';
    lowshelf.frequency.setValueAtTime(200, this.ctx.currentTime);
    lowshelf.gain.setValueAtTime(4, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(lowshelf);
    lowshelf.connect(rainGain);
    rainGain.connect(this.masterGain);
    noise.start();

    this.activeNodes.push(noise, bandpass, lowshelf, rainGain);
  }

  // 432Hz Solfeggio frequency + 2Hz delta binaural difference
  private generateDeltaDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Left oscillator: 432 Hz
    const oscLeft = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(432, this.ctx.currentTime);

    // Right oscillator: 434 Hz (2 Hz difference induces delta state ~2Hz)
    const oscRight = this.ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(434, this.ctx.currentTime);

    // Sub-bass root: 108 Hz (2 octaves down) for warm grounding
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(108, this.ctx.currentTime);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    const toneGain = this.ctx.createGain();
    toneGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    // Filter to soften any harsh high harmonics
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, this.ctx.currentTime);

    oscLeft.connect(toneGain);
    oscRight.connect(toneGain);
    subOsc.connect(subGain);

    toneGain.connect(filter);
    subGain.connect(filter);
    filter.connect(this.masterGain);

    oscLeft.start();
    oscRight.start();
    subOsc.start();

    this.activeNodes.push(oscLeft, oscRight, subOsc, toneGain, subGain, filter);
  }

  // Soft nocturnal wind
  private generateWindSound() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // LFO to create slow swaying wind gusts
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 second wind swell
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(noise, filter, lfo, lfoGain, windGain);
  }

  // Play a gentle Tibetan singing bowl chime for breath pacing cues
  public playSoftChime() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // Love/peace frequency
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 3.3);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }
}

export const audioEngine = new SoundEngine();
