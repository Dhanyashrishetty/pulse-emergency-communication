import { Radio, Waves, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [bars, setBars] = useState<number[]>(Array(28).fill(0.3));

  useEffect(() => {
    const id = window.setInterval(() => {
      setBars((prev) => {
        const next = [...prev];
        // shift left, push a new value
        next.shift();
        const phase = Date.now() / 1000;
        const v =
          0.3 +
          0.5 * Math.abs(Math.sin(phase * 2.3)) +
          0.2 * Math.random();
        next.push(Math.min(1, v));
        return next;
      });
    }, 90);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
    >
      {/* grid + glow backdrop */}
      <div className="absolute inset-0 grid-noise radial-fade" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-pulse/15 blur-[120px]" />
      <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-signal/10 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* left: copy */}
          <div className="animate-float-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-pulse opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">
                Zero-app · Zero-internet · Zero-barrier
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] text-balance">
              When the network
              <br />
              goes down, the{' '}
              <span className="text-pulse">sound</span>
              <br />
              still reaches you.
            </h1>

            <p className="mt-6 text-lg text-ink-dim max-w-xl leading-relaxed">
              Pulse is a Tier 1 emergency communication network that broadcasts
              distinct audible tone patterns through existing infrastructure —
              radio, sirens, PA systems — so every person, with or without a
              phone, knows exactly what to do.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#tones"
                className="inline-flex items-center gap-2 rounded-lg bg-pulse px-5 py-3 text-sm font-semibold text-white hover:bg-pulse-soft transition-colors shadow-lg shadow-pulse/25"
              >
                <Volume2 className="h-4 w-4" />
                Hear the tone language
              </a>
              <a
                href="#problem"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-5 py-3 text-sm font-semibold text-ink hover:bg-surface-2 transition-colors"
              >
                Read the proposal
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: '6', v: 'distinct alert tones' },
                { k: '0', v: 'apps or data required' },
                { k: '3', v: 'infrastructure channels reused' },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-3xl font-bold text-ink font-mono">{s.k}</dt>
                  <dd className="text-xs text-ink-faint mt-1 leading-snug">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* right: animated pulse visual */}
          <div className="relative animate-float-up [animation-delay:120ms]">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* concentric rings */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-pulse/30"
                  style={{
                    transform: `scale(${1 - i * 0.22})`,
                    animation: `pulse-ring 3s ease-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}

              {/* core */}
              <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-pulse to-pulse-deep flex items-center justify-center shadow-2xl shadow-pulse/40">
                <Radio className="h-12 w-12 text-white" strokeWidth={1.8} />
              </div>

              {/* waveform bar strip */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[88%] h-20 flex items-end justify-center gap-1 rounded-2xl border border-border bg-surface/80 backdrop-blur px-4 py-3">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 max-w-[6px] rounded-full bg-gradient-to-t from-pulse-deep to-signal"
                    style={{
                      height: `${h * 100}%`,
                      transition: 'height 90ms linear',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-ink-faint">
              <Waves className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-widest">
                Live waveform · synthesized in your browser
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
