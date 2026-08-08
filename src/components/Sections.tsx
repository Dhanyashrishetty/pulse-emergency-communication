import {
  WifiOff,
  BatteryLow,
  Radio,
  Users,
  Zap,
  Eye,
  Vibrate,
  Tv,
  School,
  CalendarClock,
  Megaphone,
  Sun,
  Heart,
  Languages,
  PawPrint,
  QrCode,
  Smartphone,
  CheckCircle2,
  CircleDot,
  TrendingUp,
  Clock,
  Target,
  Presentation,
  Mic,
  Layers,
  Rocket,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export function Problem() {
  const stats = [
    { icon: WifiOff, value: '72%', label: 'of cell towers lost power in recent major disasters within 24h' },
    { icon: BatteryLow, value: '48hrs', label: 'is how long most smartphone batteries last without charging' },
    { icon: Smartphone, value: '40%', label: 'of at-risk rural residents have no reliable data connection even pre-disaster' },
    { icon: Users, value: '1 in 3', label: 'vulnerable people (elderly, disabled, low-income) are missed by app-only alerts' },
  ];
  return (
    <section id="problem" className="py-24 sm:py-32 relative">
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-rose/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="01"
          eyebrow="Problem Statement"
          title="App-based alerts fail the people who need them most"
          subtitle="When a disaster strikes, power and connectivity collapse first — and the most vulnerable populations are left in silence. Push notifications assume a charged phone, a live data connection, and an installed app. None of those survive the first 24 hours of a real emergency."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-surface/60 p-5"
            >
              <s.icon className="h-5 w-5 text-rose mb-3" />
              <div className="text-3xl font-bold font-mono">{s.value}</div>
              <p className="text-sm text-ink-dim mt-2 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-6 text-ink-dim leading-relaxed">
          <p>
            The connectivity and power gap is not an edge case — it is the defining
            condition of every major disaster. Floods, cyclones, and earthquakes
            take down grid power and cellular backhaul in the same hours they
            displace populations. Emergency apps, however well-designed, require a
            charged device, an active data plan, and a pre-installed application —
            a stack that the elderly, the poor, the rural, and the disabled are
            least likely to have intact when it matters most. The result: the
            people most exposed to risk are the last to be warned.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Solution() {
  return (
    <section id="solution" className="py-24 sm:py-32 relative">
      <div className="absolute top-1/2 -translate-y-1/2 right-0 h-80 w-80 rounded-full bg-signal/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="02"
          eyebrow="Solution Overview"
          title="Sound is the only channel that still works"
        />
        <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          <div className="space-y-5 text-ink-dim leading-relaxed">
            <p className="text-lg">
              Pulse turns the infrastructure that already exists in every town —
              radio stations, municipal sirens, mosque/temple/church PA systems,
              school PA systems — into a single, coordinated emergency alert
              network. Instead of sending a push notification, Pulse broadcasts a
              short, standardized tone pattern that conveys a specific action
              through sound alone. No smartphone, no app, no internet connection,
              and no literacy requirement to receive and understand the alert.
            </p>
            <p>
              The tone language is deliberately small — six patterns — so it can
              be taught in a single school drill and recalled under stress. The
              same pattern plays on every channel simultaneously, so whether a
              person hears it from a radio, a temple loudspeaker, or a municipal
              siren, the meaning is identical.
            </p>
            <div className="rounded-2xl border border-pulse/30 bg-pulse/5 p-5">
              <p className="text-sm font-mono uppercase tracking-widest text-pulse mb-1">
                Tagline
              </p>
              <p className="text-xl font-semibold text-ink">
                "When the network goes down, the sound still reaches you."
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              { icon: Radio, t: 'Radio stations', d: 'FM/AM broadcasters carry the tone live during emergencies.' },
              { icon: Megaphone, t: 'Municipal sirens', d: 'City-owned sirens replay the standard pattern.' },
              { icon: Megaphone, t: 'Religious PA systems', d: 'Mosque, temple, and church loudspeakers join the network.' },
              { icon: School, t: 'School PA systems', d: 'Schools broadcast to surrounding neighborhoods.' },
            ].map((c) => (
              <div
                key={c.t}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 ring-1 ring-signal/20 shrink-0">
                  <c.icon className="h-4.5 w-4.5 text-signal" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{c.t}</p>
                  <p className="text-xs text-ink-dim mt-0.5">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Accessibility() {
  const items = [
    { icon: Zap, t: 'Strobe siren add-on', d: 'A color-matched strobe unit mounted on existing sirens flashes the same pattern in light — red for evacuate, amber for shelter, green for all clear.' },
    { icon: Vibrate, t: 'Vibration wearables', d: 'Low-cost battery-backed wristbands translate each tone into a distinct vibration rhythm for deaf and hard-of-hearing users.' },
    { icon: Tv, t: 'TV / set-top-box crawl', d: 'Partnered broadcasters overlay a color-coded emergency crawl on every channel, synced to the tone broadcast.' },
    { icon: Eye, t: 'Color + shape system', d: 'Every tone has a paired color and shape (triangle, square, circle) used across signage, broadcasts, and wearables for cross-modal recognition.' },
  ];
  return (
    <section id="accessibility" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-violet/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="04"
          eyebrow="Accessibility Layer"
          title="No one is left in silence"
          subtitle="Sound alone is not enough. Pulse runs a parallel visual and tactile alert system so deaf and hard-of-hearing residents receive the same information at the same moment."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div
              key={it.t}
              className="rounded-2xl border border-border bg-surface/60 p-5 hover:bg-surface-2 transition-colors"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10 ring-1 ring-violet/20 mb-4">
                <it.icon className="h-5 w-5 text-violet" />
              </span>
              <h3 className="text-sm font-semibold">{it.t}</h3>
              <p className="text-xs text-ink-dim mt-2 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const steps = [
    { icon: School, t: 'School drill program', d: 'A 15-minute monthly lesson teaches students to recognize all six tones and the action each requires. Children carry the knowledge home to parents and grandparents.' },
    { icon: Megaphone, t: 'Poster & PSA campaign', d: 'Bus stops, ration shops, and community boards display a simple one-page tone dictionary. A 30-second radio PSA runs weekly.' },
    { icon: CalendarClock, t: 'Monthly test broadcast', d: 'A fixed day and time each month plays the Test tone live across all channels, so the public hears the system working and newcomers learn it exists.' },
  ];
  return (
    <section id="education" className="py-24 sm:py-32 relative">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="06"
          eyebrow="Public Education Rollout"
          title="A language only works if people know it"
          subtitle="The tone dictionary is small enough to teach in one sitting. The rollout plan makes sure everyone — especially children and the elderly — learns it before they need it."
        />
        <div className="mt-12 grid lg:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="relative rounded-2xl border border-border bg-surface/60 p-6"
            >
              <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-amber text-canvas text-xs font-bold font-mono">
                {i + 1}
              </span>
              <s.icon className="h-6 w-6 text-amber mb-4 mt-2" />
              <h3 className="text-base font-semibold">{s.t}</h3>
              <p className="text-sm text-ink-dim mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Differentiators() {
  const features = [
    { icon: Sun, t: 'Pulse Points', d: 'Low-cost solar + battery-backed siren kits for areas with no existing PA infrastructure. Deployable by local governments and NGOs in a single afternoon.', tag: 'Hardware' },
    { icon: Users, t: 'Echo Network', d: 'Trained neighborhood volunteers who can manually trigger a backup siren or megaphone relay if the primary broadcast fails — a human mesh fallback.', tag: 'Community' },
    { icon: Languages, t: 'Multilingual follow-up', d: 'After the tone, existing PA and radio systems play a short spoken instruction in 2–3 local languages, so meaning is reinforced in words.', tag: 'Inclusion' },
    { icon: PawPrint, t: 'Livestock-safe variant', d: 'An optional frequency variant tuned to avoid panic-stampede responses in cattle and poultry, for agricultural regions.', tag: 'Stretch' },
    { icon: QrCode, t: 'QR-linked tone dictionary', d: 'Printed QR codes at bus stops and community boards link to the full tone dictionary when connectivity returns.', tag: 'Bridge' },
    { icon: Smartphone, t: 'Tier 2 upgrade path', d: 'A future app-based layer adds rich data (maps, shelter locations) without changing the core Tier 1 tones — so the base system never depends on it.', tag: 'Future' },
  ];
  return (
    <section id="extras" className="py-24 sm:py-32 relative">
      <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-pulse/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="07"
          eyebrow="Differentiators"
          title="What makes Pulse more than a siren"
          subtitle="Six features that turn a tone broadcast into a resilient, community-owned, upgrade-ready network."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.t}
              className="group rounded-2xl border border-border bg-surface/60 p-5 hover:border-pulse/30 hover:bg-surface-2 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pulse/10 ring-1 ring-pulse/20">
                  <f.icon className="h-5 w-5 text-pulse" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-faint border border-border rounded px-2 py-0.5">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-sm font-semibold">{f.t}</h3>
              <p className="text-xs text-ink-dim mt-2 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roadmap() {
  const phases = [
    {
      n: '01',
      t: 'Pilot — One District',
      d: 'Deploy Pulse Points and integrate 3–5 existing PA systems in a single disaster-prone district. Run the school drill program and monthly test broadcast for 6 months. Measure comprehension and response time.',
      partner: 'Local government + 1 NGO',
      icon: CircleDot,
      color: 'var(--color-signal)',
    },
    {
      n: '02',
      t: 'State-Level Standardization',
      d: 'Standardize the tone dictionary across the state. Integrate all municipal sirens, major broadcasters, and religious PA systems. Train Echo Network volunteers in every district.',
      partner: 'State disaster authority',
      icon: Layers,
      color: 'var(--color-amber)',
    },
    {
      n: '03',
      t: 'National Rollout + Regulatory',
      d: 'Work with NDMA-level authorities to codify Pulse as the national Tier 1 standard. Mandate monthly test broadcasts. Integrate the Tier 2 app layer as an optional enhancement.',
      partner: 'National disaster authority',
      icon: Rocket,
      color: 'var(--color-pulse)',
    },
  ];
  return (
    <section id="roadmap" className="py-24 sm:py-32 relative">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="08"
          eyebrow="Implementation Roadmap"
          title="From one district to a national standard"
        />
        <div className="mt-12 space-y-4">
          {phases.map((p, i) => (
            <div key={p.n} className="relative">
              <div className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-border bg-surface/60 p-6">
                <div className="flex items-center gap-4 sm:w-64 shrink-0">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl ring-1"
                    style={{ background: `${p.color}15`, borderColor: `${p.color}40` }}
                  >
                    <p.icon className="h-5 w-5" style={{ color: p.color }} />
                  </span>
                  <div>
                    <p className="text-xs font-mono text-ink-faint">PHASE {p.n}</p>
                    <p className="text-base font-semibold">{p.t}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-ink-dim leading-relaxed">{p.d}</p>
                  <p className="text-xs text-ink-faint mt-3 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" style={{ color: p.color }} />
                    Partnership required: <span className="text-ink-dim">{p.partner}</span>
                  </p>
                </div>
              </div>
              {i < phases.length - 1 && (
                <div className="ml-6 h-6 w-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  const metrics = [
    { icon: Target, t: 'Comprehension rate', d: 'Survey a random sample of residents after each monthly test broadcast: "What does this tone mean?" Target ≥ 85% correct recall within 12 months.' },
    { icon: TrendingUp, t: 'Alert reach', d: 'Estimate the population within audible range of any Pulse channel, cross-referenced with census data. Target ≥ 95% of the district population.' },
    { icon: Clock, t: 'Response time', d: 'Measure time from broadcast to first documented evacuation/shelter action at sampled households. Compare to the pre-Pulse baseline for the same hazard.' },
    { icon: Users, t: 'Vulnerable coverage', d: 'Track the share of elderly, disabled, and low-income residents reached, measured against the same groups missed by app-only systems.' },
  ];
  return (
    <section id="metrics" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-emerald/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="09"
          eyebrow="Impact Metrics"
          title="How we know it works"
          subtitle="Pulse is measurable. Every metric is designed to be collected without a smartphone, so the evaluation itself does not reproduce the gap the system is meant to close."
        />
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div
              key={m.t}
              className="rounded-2xl border border-border bg-surface/60 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald/10 ring-1 ring-emerald/20">
                  <m.icon className="h-4.5 w-4.5 text-emerald" />
                </span>
                <h3 className="text-sm font-semibold">{m.t}</h3>
              </div>
              <p className="text-sm text-ink-dim leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PitchDeck() {
  const slides = [
    { n: '01', t: 'The Problem', d: 'Connectivity and power collapse in disasters; app-only alerts miss the most vulnerable. Open with a real stat and a map of dead cell towers.', icon: WifiOff },
    { n: '02', t: 'The Solution', d: 'Pulse: a sound-first alert network over existing infrastructure. One tagline, one diagram of the three channels.', icon: Radio },
    { n: '03', t: 'Tone Showcase (Live Demo)', d: 'Play 2–3 tones live for the audience. Let them guess the action. This is the "wow" moment — sound, not slides.', icon: Mic, demo: true },
    { n: '04', t: 'Differentiation', d: 'Pulse Points, Echo Network, multilingual follow-up, accessibility layer. Why this is not just another siren.', icon: Layers },
    { n: '05', t: 'Roadmap', d: 'Pilot → state → national. Name the pilot district and the partner already lined up.', icon: Rocket },
    { n: '06', t: 'Impact', d: 'Comprehension, reach, response time. Show the baseline vs. target chart.', icon: TrendingUp },
    { n: '07', t: 'The Ask', d: 'Funding for the pilot, the partner MOU, and the hardware kit BOM. Be specific about the number.', icon: Target },
  ];
  return (
    <section id="pitch" className="py-24 sm:py-32 relative">
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-pulse/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="10"
          eyebrow="Presentation Structure"
          title="A 7-slide pitch that ends on sound"
          subtitle="The deck is built around one live moment: playing the tones for the room. Everything else supports that."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((s) => (
            <div
              key={s.n}
              className={`relative rounded-2xl border p-5 ${
                s.demo
                  ? 'border-pulse/40 bg-pulse/5'
                  : 'border-border bg-surface/60'
              }`}
            >
              {s.demo && (
                <span className="absolute -top-2.5 right-4 text-[10px] font-mono uppercase tracking-widest text-pulse bg-canvas border border-pulse/40 rounded-full px-2 py-0.5">
                  Live demo
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-ink-faint">{s.n}</span>
                <s.icon className={`h-4 w-4 ${s.demo ? 'text-pulse' : 'text-ink-dim'}`} />
              </div>
              <h3 className="text-sm font-semibold">{s.t}</h3>
              <p className="text-xs text-ink-dim mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-pulse/30 bg-pulse/5 p-6 flex items-start gap-4">
          <Presentation className="h-6 w-6 text-pulse shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-ink">The live demo moment</p>
            <p className="text-sm text-ink-dim mt-1 leading-relaxed">
              At slide 03, play the Evacuate, Shelter, and All Clear tones through the room's speakers. Ask the audience to shout the action each one means — before you show the answer. By the third tone, most of the room will get it right. That is the entire pitch: a language you learned in under a minute, with no app, no phone, and no instructions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Radio className="h-4 w-4 text-pulse" />
          <span className="font-mono text-sm font-semibold">PULSE</span>
          <span className="text-xs text-ink-faint">— Tier 1 emergency alert network</span>
        </div>
        <p className="text-xs text-ink-faint font-mono">
          A fundable, buildable proposal · Interactive demo
        </p>
      </div>
    </footer>
  );
}
