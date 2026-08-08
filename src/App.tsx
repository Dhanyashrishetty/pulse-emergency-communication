import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { ToneDictionary } from '@/components/ToneDictionary';
import { TriggerDashboard } from '@/components/TriggerDashboard';
import {
  Problem,
  Solution,
  Accessibility,
  Education,
  Differentiators,
  Roadmap,
  Metrics,
  PitchDeck,
  Footer,
} from '@/components/Sections';

function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <ToneDictionary />
        <Accessibility />
        <TriggerDashboard />
        <Education />
        <Differentiators />
        <Roadmap />
        <Metrics />
        <PitchDeck />
      </main>
      <Footer />
    </div>
  );
}

export default App;
