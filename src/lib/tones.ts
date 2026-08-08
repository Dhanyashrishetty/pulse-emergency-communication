// Pulse tone engine — synthesizes the siren language in-browser via Web Audio API.
// Each tone pattern is a sequence of beeps with defined frequency, duration, and rhythm.

export type ToneStep = {
  freq: number;
  duration: number; // seconds
  gap: number; // seconds of silence after this step
};

export type TonePattern = {
  id: string;
  name: string;
  action: string;
  meaning: string;
  color: string;
  frequencyRange: string;
  pulseCount: string;
  rhythm: string;
  description: string;
  distinctiveness: string;
  steps: ToneStep[];
};

export const TONE_PATTERNS: TonePattern[] = [
  {
    id: 'evacuate',
    name: 'Evacuate Now',
    action: 'Move to higher ground immediately',
    meaning: 'Leave the area now. Follow marked evacuation routes.',
    color: 'var(--color-evacuate)',
    frequencyRange: '880 Hz – 1.4 kHz',
    pulseCount: '3 long pulses',
    rhythm: 'LONG — LONG — LONG  (repeat)',
    description:
      'Three sustained rising tones, each ~1.2s with a short gap, then a longer pause before the cycle repeats. The rising pitch creates instinctive urgency.',
    distinctiveness:
      'Rising contour + group-of-three is the most universally recognized emergency pattern. Long durations cut through ambient noise.',
    steps: [
      { freq: 880, duration: 1.2, gap: 0.25 },
      { freq: 1100, duration: 1.2, gap: 0.25 },
      { freq: 1400, duration: 1.2, gap: 0.9 },
    ],
  },
  {
    id: 'shelter',
    name: 'Shelter in Place',
    action: 'Stay indoors, seal openings',
    meaning: 'Go inside, close doors and windows, await further signal.',
    color: 'var(--color-shelter)',
    frequencyRange: '700 Hz – 950 Hz',
    pulseCount: '2 medium pulses',
    rhythm: 'MED — MED  (pause)  repeat',
    description:
      'Two steady mid-pitch tones at a calm, level frequency — no rising contour. The flat pitch signals "hold" rather than "go".',
    distinctiveness:
      'Flat contour and lower register contrast sharply with the rising Evacuate tone. Two-beat grouping reads as "settle" across cultures.',
    steps: [
      { freq: 750, duration: 0.7, gap: 0.3 },
      { freq: 750, duration: 0.7, gap: 1.0 },
    ],
  },
  {
    id: 'allclear',
    name: 'All Clear',
    action: 'Resume normal activity',
    meaning: 'The danger has passed. It is safe to come out.',
    color: 'var(--color-allclear)',
    frequencyRange: '600 Hz – 900 Hz',
    pulseCount: '1 long sustained pulse',
    rhythm: 'LONG continuous  (then silence)',
    description:
      'A single long, continuous, gently descending tone — the sonic equivalent of an exhale. Played once, then silence.',
    distinctiveness:
      'Singular, smooth, descending. No repetition means no confusion with the repeating alert patterns. Descending = "release".',
    steps: [
      { freq: 900, duration: 2.5, gap: 1.5 },
    ],
  },
  {
    id: 'imminent',
    name: 'Imminent Danger',
    action: 'Take cover instantly',
    meaning: 'Life-threatening event is occurring now. Drop, cover, hold.',
    color: 'var(--color-imminent)',
    frequencyRange: '1.2 kHz – 2.4 kHz',
    pulseCount: '5 rapid short pulses',
    rhythm: 'SHORT-SHORT-SHORT-SHORT-SHORT  (repeat fast)',
    description:
      'Five high, staccato bursts in rapid succession — the most frantic pattern. High frequency + speed triggers immediate startle-and-act response.',
    distinctiveness:
      'Highest register and fastest rhythm in the set. Five-beat grouping is unique here and reads as "critical / now".',
    steps: [
      { freq: 1200, duration: 0.18, gap: 0.08 },
      { freq: 1600, duration: 0.18, gap: 0.08 },
      { freq: 2000, duration: 0.18, gap: 0.08 },
      { freq: 2000, duration: 0.18, gap: 0.08 },
      { freq: 2400, duration: 0.18, gap: 0.6 },
    ],
  },
  {
    id: 'test',
    name: 'Test / Drill',
    action: 'This is only a test',
    meaning: 'System check. No action required.',
    color: 'var(--color-test)',
    frequencyRange: '500 Hz – 700 Hz',
    pulseCount: '1 short pulse (single beep)',
    rhythm: 'SHORT  (once, then silence)',
    description:
      'A single brief, low, soft beep — deliberately understated so it is never mistaken for a real alert. Always followed by a spoken "this is a test".',
    distinctiveness:
      'Lowest pitch, shortest duration, no repetition. Designed to be recognizable yet clearly non-urgent.',
    steps: [
      { freq: 600, duration: 0.4, gap: 0.4 },
    ],
  },
  {
    id: 'medical',
    name: 'Medical Assistance Needed',
    action: 'Community → Authority reverse signal',
    meaning: 'A neighborhood is requesting medical help. Authorities dispatch.',
    color: 'var(--color-medical)',
    frequencyRange: '950 Hz – 1.5 kHz',
    pulseCount: '4 alternating pulses',
    rhythm: 'HIGH-LOW-HIGH-LOW  (repeat)',
    description:
      'A two-tone alternating warble (high-low-high-low) — the reverse-direction signal, triggered from community sirens to signal an unmet medical need.',
    distinctiveness:
      'Alternating two-pitch warble is the only non-monotone-direction pattern in the set, making it unmistakable as a distinct "request" rather than "alert".',
    steps: [
      { freq: 1500, duration: 0.4, gap: 0.12 },
      { freq: 950, duration: 0.4, gap: 0.12 },
      { freq: 1500, duration: 0.4, gap: 0.12 },
      { freq: 950, duration: 0.4, gap: 0.8 },
    ],
  },
];

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export type PlayHandle = {
  promise: Promise<void>;
  stop: () => void;
};

// Plays a tone pattern, optionally looping. Returns a handle to stop playback.
export function playPattern(pattern: TonePattern, loops = 1): PlayHandle {
  const ctx = getCtx();
  let stopped = false;
  let stopFn: (() => void) | null = null;

  const playOnce = (offsetStart: number): Promise<void> => {
    return new Promise((resolve) => {
      let t = offsetStart;
      const sources: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      for (const step of pattern.steps) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(step.freq, t);

        // gentle attack/decay envelope to avoid clicks
        const attack = 0.02;
        const release = 0.06;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.28, t + attack);
        gain.gain.setValueAtTime(0.28, t + step.duration - release);
        gain.gain.linearRampToValueAtTime(0, t + step.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + step.duration + 0.05);
        sources.push(osc);
        gains.push(gain);
        t += step.duration + step.gap;
      }

      stopFn = () => {
        stopped = true;
        const now = ctx.currentTime;
        sources.forEach((s) => {
          try {
            s.stop(now);
          } catch {
            /* already stopped */
          }
        });
      };

      const totalMs = (t - offsetStart) * 1000;
      window.setTimeout(() => {
        if (!stopped) resolve();
      }, totalMs + 20);
    });
  };

  const run = async () => {
    const start = ctx.currentTime + 0.05;
    for (let i = 0; i < loops; i++) {
      if (stopped) return;
      const base = start + i * totalPatternDuration(pattern);
      await playOnce(base);
    }
  };

  const promise = run();

  return {
    promise,
    stop: () => {
      if (stopFn) stopFn();
      else stopped = true;
    },
  };
}

function totalPatternDuration(p: TonePattern): number {
  return p.steps.reduce((acc, s) => acc + s.duration + s.gap, 0);
}

export function patternDurationMs(p: TonePattern): number {
  return totalPatternDuration(p) * 1000;
}
