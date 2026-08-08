import { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Radio,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  KeyRound,
  X,
  Megaphone,
} from 'lucide-react';
import { TONE_PATTERNS, playPattern, type PlayHandle } from '@/lib/tones';
import { SectionHeader } from './SectionHeader';
import { useRef } from 'react';

type LogEntry = {
  time: string;
  tone: string;
  region: string;
  operator: string;
  status: 'broadcast' | 'denied';
};

const REGIONS = [
  'Coastal District A',
  'River Basin Zone',
  'Metro Central',
  'Northern Highlands',
];

export function TriggerDashboard() {
  const [selectedTone, setSelectedTone] = useState(TONE_PATTERNS[0].id);
  const [region, setRegion] = useState(REGIONS[0]);
  const [operator, setOperator] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([
    {
      time: '14:02',
      tone: 'Test / Drill',
      region: 'Metro Central',
      operator: 'ops_ndma',
      status: 'broadcast',
    },
  ]);
  const [broadcasting, setBroadcasting] = useState(false);
  const handleRef = useRef<PlayHandle | null>(null);

  const tone = TONE_PATTERNS.find((t) => t.id === selectedTone)!;

  const isDrillTone = tone.id === 'test';
  const canSubmit =
    operator.trim().length >= 3 &&
    authCode.trim().length >= 6 &&
    (isDrillTone ? true : confirm && twoFactor);

  const submit = () => {
    setError(null);
    if (!canSubmit) {
      setError('Complete every required safeguard before broadcasting.');
      return;
    }
    // anti-misuse: Test tone requires no 2FA, live tones require both confirmation and 2FA.
    setBroadcasting(true);
    handleRef.current = playPattern(tone, tone.id === 'test' || tone.id === 'allclear' ? 1 : 2);
    const entry: LogEntry = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tone: tone.name,
      region,
      operator,
      status: 'broadcast',
    };
    setLog((l) => [entry, ...l].slice(0, 6));
    const dur = tone.steps.reduce((a, s) => a + s.duration + s.gap, 0) * 1000 * (tone.id === 'test' || tone.id === 'allclear' ? 1 : 2);
    window.setTimeout(() => setBroadcasting(false), dur + 200);
  };

  const reset = () => {
    handleRef.current?.stop();
    setBroadcasting(false);
    setSelectedTone(TONE_PATTERNS[0].id);
    setOperator('');
    setAuthCode('');
    setConfirm(false);
    setTwoFactor(false);
    setError(null);
  };

  return (
    <section id="trigger" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-pulse/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="05"
          eyebrow="Broadcast Trigger System"
          title="One console. Every safeguard. Seconds to reach a city."
          subtitle="A mock authority dashboard showing how an NDMA-level operator selects a tone, authenticates, and broadcasts across all connected infrastructure — with anti-misuse checks at every step."
        />

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* console */}
          <div className="rounded-2xl border border-border bg-surface/60 overflow-hidden">
            {/* terminal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose/80" />
                <span className="h-3 w-3 rounded-full bg-amber/80" />
                <span className="h-3 w-3 rounded-full bg-emerald/80" />
                <span className="ml-3 font-mono text-xs text-ink-dim">
                  pulse-ops // broadcast console
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                LINK ACTIVE
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* step 1: tone */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-faint mb-2">
                  <span className="text-pulse">01</span> Select alert tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TONE_PATTERNS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTone(t.id)}
                      className={`text-left rounded-lg border px-3 py-2.5 transition-all ${
                        selectedTone === t.id
                          ? 'border-pulse/50 bg-pulse/10'
                          : 'border-border bg-surface hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: t.color }}
                        />
                        <span className="text-xs font-semibold">{t.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* step 2: region */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-faint mb-2">
                  <span className="text-pulse">02</span> Target region
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-ink focus:border-pulse/50 focus:outline-none"
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* step 3: auth */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-faint mb-2">
                    <span className="text-pulse">03</span> Operator ID
                  </label>
                  <input
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    placeholder="ops_ndma"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-mono text-ink focus:border-pulse/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-faint mb-2">
                    <span className="text-pulse">04</span> Authorization code
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
                    <input
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-border bg-surface pl-10 pr-3 py-2.5 text-sm font-mono text-ink focus:border-pulse/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* step 5: safeguards */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-faint mb-2">
                  <span className="text-pulse">05</span> Anti-misuse safeguards
                </label>
                <div className="space-y-2">
                  <Check
                    checked={twoFactor}
                    onChange={setTwoFactor}
                    icon={<Lock className="h-3.5 w-3.5" />}
                    label="Two-factor code verified (SMS / hardware token)"
                  />
                  <Check
                    checked={confirm}
                    onChange={setConfirm}
                    icon={<AlertTriangle className="h-3.5 w-3.5" />}
                    label="I confirm this is a real emergency, not a drill"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-rose/30 bg-rose/10 px-3 py-2 text-xs text-rose">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {/* actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={submit}
                  disabled={!canSubmit || broadcasting}
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
                    broadcasting
                      ? 'bg-signal text-white'
                      : canSubmit
                        ? 'bg-pulse text-white hover:bg-pulse-soft shadow-lg shadow-pulse/25'
                        : 'bg-surface-2 text-ink-faint cursor-not-allowed'
                  }`}
                >
                  {broadcasting ? (
                    <>
                      <Radio className="h-4 w-4 animate-pulse" />
                      Broadcasting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Broadcast alert
                    </>
                  )}
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-ink-dim hover:text-ink hover:bg-surface-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Reset
                </button>
                <span className="text-xs text-ink-faint ml-auto">
                  Plays the selected tone through your speakers as a demo.
                </span>
              </div>
            </div>
          </div>

          {/* sidebar: log + safeguards explainer */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-signal" />
                <h4 className="text-sm font-semibold">Safeguards built in</h4>
              </div>
              <ul className="space-y-3 text-sm text-ink-dim">
                {[
                  ['Tiered auth', 'Drill tones need operator ID only; live tones require 2FA + explicit confirmation.'],
                  ['Rotating codes', 'Authorization codes rotate daily and are scoped per region.'],
                  ['Immutable log', 'Every broadcast — and every denied attempt — is written to an append-only audit trail.'],
                  ['Kill switch', 'Any operator can issue an immediate All Clear to cancel a false or stale alert.'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-2">
                    <span className="text-signal mt-0.5">✓</span>
                    <p>
                      <span className="text-ink font-medium">{k}.</span> {v}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Megaphone className="h-4 w-4 text-pulse" />
                <h4 className="text-sm font-semibold">Broadcast log</h4>
              </div>
              <ul className="space-y-2.5">
                {log.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-xs font-mono"
                  >
                    <Clock className="h-3.5 w-3.5 text-ink-faint shrink-0" />
                    <span className="text-ink-faint">{e.time}</span>
                    <span className="text-ink">{e.tone}</span>
                    <span className="text-ink-faint hidden sm:inline">→ {e.region}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald ml-auto" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check({
  checked,
  onChange,
  label,
  icon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
        checked
          ? 'border-signal/40 bg-signal/10'
          : 'border-border bg-surface hover:bg-surface-2'
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
          checked ? 'border-signal bg-signal text-canvas' : 'border-border text-ink-faint'
        }`}
      >
        {checked ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <span className="opacity-60">{icon}</span>
        )}
      </span>
      <span className={`text-xs ${checked ? 'text-ink' : 'text-ink-dim'}`}>
        {label}
      </span>
    </button>
  );
}
