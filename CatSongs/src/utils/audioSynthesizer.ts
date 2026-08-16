// Web Audio API Synthesizer for Authentic Nostalgic Sounds

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Authentic Indian Truck Melodic Air Horn ("Po-Po-Poo-Poo" dual frequency air blast)
export function playTruckHorn(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Master gain for horn
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.4, now + 0.05);
    masterGain.gain.setValueAtTime(0.4, now + 0.8);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    masterGain.connect(ctx.destination);

    // Primary low air horn frequency (around 220Hz - 275Hz brass resonance)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.setValueAtTime(220, now + 0.2);
    osc1.frequency.setValueAtTime(277.18, now + 0.35); // C#4
    osc1.frequency.setValueAtTime(329.63, now + 0.6); // E4
    osc1.frequency.setValueAtTime(220, now + 0.85);

    // Harmonic horn resonance
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.setValueAtTime(440, now + 0.2);
    osc2.frequency.setValueAtTime(554.37, now + 0.35);
    osc2.frequency.setValueAtTime(659.25, now + 0.6);
    osc2.frequency.setValueAtTime(440, now + 0.85);

    // Filter to give brassy truck air horn body
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(2.5, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.25);
    osc2.stop(now + 1.25);
  } catch (err) {
    console.warn('AudioContext playback error:', err);
  }
}

// Vintage Cassette Click Sound
export function playCassetteClick(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // ignore
  }
}

// Ambient Noise Generators
class AmbientGenerator {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private currentType: string = 'off';

  start(type: 'rain' | 'engine' | 'chai' | 'night' | 'off', volume: number = 0.25): void {
    this.stop();
    if (type === 'off') return;

    try {
      this.ctx = getAudioContext();
      this.currentType = type;
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // White/Pink noise generation
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'rain') {
          // Pink-ish rain hiss with random drop clicks
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        } else if (type === 'engine') {
          // Low frequency diesel engine rumble
          output[i] = (Math.sin(i / 15) + Math.sin(i / 22) + white * 0.15) * 0.1;
        } else if (type === 'night') {
          // Crickets & night breeze
          output[i] = (Math.sin(i / 3) * (i % 2400 < 600 ? 0.3 : 0.02) + white * 0.03) * 0.1;
        } else {
          // Chai stall murmur & kettle simmer
          output[i] = (white * 0.1 + Math.sin(i / 50) * 0.05) * 0.15;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
      } else if (type === 'engine') {
        filter.type = 'lowpass';
        filter.frequency.value = 250;
      } else {
        filter.type = 'bandpass';
        filter.frequency.value = 800;
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.noiseNode = whiteNoise;
    } catch (e) {
      console.warn('Ambient noise error:', e);
    }
  }

  setVolume(volume: number): void {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
    }
  }

  stop(): void {
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    this.currentType = 'off';
  }

  getType(): string {
    return this.currentType;
  }
}

export const ambientAudio = new AmbientGenerator();
