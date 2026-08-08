import { useEffect, useRef, useState } from 'react';
import { Play, Square, Volume2, Radio } from 'lucide-react';
import {
  TONE_PATTERNS,
  playPattern,
  patternDurationMs,
  type TonePattern,
  type PlayHandle,
} from '@/lib/tones';
import { SectionHeader } from './SectionHeader';

export function ToneDictionary() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const handleRef = useRef<PlayHandle | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const stop = () => {
    handleRef.current?.stop();
    handleRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setActiveId(null);
    setProgress(0);
  };

  useEffect(() => () => stop(), []);

  const play = (p: TonePattern) => {
    stop();
    const loops = p.id === 'test' || p.id === 'allclear' ? 1 : 2;
    setActiveId(p.id);
    startRef.current = performance.now();
    const total = patternDurationMs(p) * loops;

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      setProgress(Math.min(1, elapsed / total));
      if (elapsed < total) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        stop();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    handleRef.current = playPattern(p, loops);
  };

  return (
    <section id="tones" className="py-24 sm:py-32 relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 h-72 w-72 rounded-full bg-signal/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="03"
          eyebrow="Tone Dictionary"
          title="A siren language anyone can understand"
          subtitle="Six acoustically distinct patterns, each mapped to one clear action. Tap any tone to hear it synthesized live — no audio files, no downloads."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TONE_PATTERNS.map((p, i) => {
            const isActive = activeId === p.id;
            return (
              <article
                key={p.id}
                className={`group relative rounded-2xl border bg-surface/60 p-5 transition-all duration-300 ${
                  isActive
                    ? 'border-pulse/50 shadow-lg shadow-pulse/10 scale-[1.015]'
                    : 'border-border hover:border-border/80 hover:bg-surface-2'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* color bar */}
                <div
                  className="absolute top-0 left-5 right-5 h-px rounded-b-full"
                  style={{ background: p.color }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold">{p.name}</h3>
                    <p className="text-xs text-ink-faint mt-0.5">{p.action}</p>
                  </div>
                  <button
                    onClick={() => (isActive ? stop() : play(p))}
                    aria-label={isActive ? `Stop ${p.name}` : `Play ${p.name}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      isActive
                        ? 'bg-pulse text-white shadow-lg shadow-pulse/30'
                        : 'bg-surface-2 text-ink-dim hover:text-ink group-hover:bg-border'
                    }`}
                  >
                    {isActive ? (
                      <Square className="h-4 w-4" fill="currentColor" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                </div>

                {/* waveform mock */}
                <div className="h-12 flex items-center gap-0.5 mb-4 overflow-hidden">
                  {p.steps.map((s, si) =>
                    Array.from({ length: Math.max(4, Math.round(s.duration * 12)) }).map(
                      (_, bi) => (
                        <div
                          key={`${si}-${bi}`}
                          className="flex-1 rounded-full transition-all"
                          style={{
                            height: isActive
                              ? `${30 + 60 * Math.abs(Math.sin((bi + si) * 0.7 + performance.now() / 300))}%`
                              : `${20 + 40 * Math.abs(Math.sin((bi + si) * 0.7))}%`,
                            background: isActive ? p.color : 'var(--color-border)',
                            opacity: isActive ? 0.9 : 0.5,
                          }}
                        />
                      ),
                    ),
                  )}
                </div>

                <p className="text-sm text-ink-dim leading-relaxed mb-4">
                  {p.meaning}
                </p>

                <dl className="space-y-1.5 text-xs">
                  {[
                    ['Freq', p.frequencyRange],
                    ['Pulses', p.pulseCount],
                    ['Rhythm', p.rhythm],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-ink-faint font-mono uppercase tracking-wider text-[10px]">
                        {k}
                      </dt>
                      <dd className="text-ink-dim font-mono text-right text-[11px]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                {isActive && (
                  <div className="mt-4 h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-100"
                      style={{ width: `${progress * 100}%`, background: p.color }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* why distinct */}
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="h-4 w-4 text-signal" />
            <h4 className="text-sm font-semibold">Why these patterns are hard to confuse</h4>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm text-ink-dim">
            {[
              ['Pitch contour', 'Rising = go, flat = hold, descending = release. Three unambiguous directions.'],
              ['Grouping', 'Group-of-three, group-of-two, group-of-five, and single-tone are all perceptually distinct counts.'],
              ['Register', 'Alert tones sit in different octaves (500 Hz–2.4 kHz) so they never blur into each other.'],
              ['Tempo', 'Imminent Danger is the only fast staccato pattern; Test is the only single soft beep.'],
              ['Direction', 'Medical is the only two-tone warble, signaling a reverse community→authority request.'],
              ['Repetition', 'All Clear plays once then stops — no loop — so it never reads as an ongoing alert.'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-signal font-mono text-xs mt-0.5">▸</span>
                <p>
                  <span className="text-ink font-medium">{k}.</span> {v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-ink-faint">
          <Volume2 className="h-3.5 w-3.5" />
          Tones are synthesized live with the Web Audio API. Turn your volume up.
        </p>
      </div>
    </section>
  );
}
