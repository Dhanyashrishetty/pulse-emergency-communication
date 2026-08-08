import { Radio } from 'lucide-react';

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'tones', label: 'Tone Dictionary' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'trigger', label: 'Trigger System' },
  { id: 'education', label: 'Education' },
  { id: 'extras', label: 'Differentiators' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'metrics', label: 'Impact' },
  { id: 'pitch', label: 'Pitch Deck' },
];

import { useScrollSpy } from '@/lib/useScrollSpy';

export function Nav() {
  const active = useScrollSpy(SECTIONS);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-canvas/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-pulse/10 ring-1 ring-pulse/30">
            <Radio className="h-4.5 w-4.5 text-pulse" strokeWidth={2.2} />
            <span className="absolute inset-0 rounded-lg ring-2 ring-pulse/40 animate-[pulse-ring_2s_ease-out_infinite]" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">
            PULSE
          </span>
          <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-ink-faint border border-border rounded px-1.5 py-0.5">
            Tier 1
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                active === s.id
                  ? 'text-ink bg-surface-2'
                  : 'text-ink-dim hover:text-ink hover:bg-surface'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href="#trigger"
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-pulse text-white hover:bg-pulse-soft transition-colors shadow-lg shadow-pulse/20"
        >
          Live Demo
        </a>
      </div>
    </header>
  );
}
