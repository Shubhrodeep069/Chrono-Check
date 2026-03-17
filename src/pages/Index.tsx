import WildClock from "@/components/WildClock";
import ConflictDetector from "@/components/ConflictDetector";
import TimeSlotChecker from "@/components/TimeSlotChecker";
import DurationChecker from "@/components/DurationChecker";
import RandomFactGenerator from "@/components/RandomFactGenerator";
import MoodScheduler from "@/components/MoodScheduler";
import FloatingDecor from "@/components/FloatingDecor";
import ParticleBackground from "@/components/ParticleBackground";
import Tilt3DCard from "@/components/Tilt3DCard";
import VisualTimeGrid from "@/components/VisualTimeGrid";
import ScheduleScore from "@/components/ScheduleScore";
import MultiPersonScheduler from "@/components/MultiPersonScheduler";
import TimeZoneConverter from "@/components/TimeZoneConverter";
import AchievementBadges from "@/components/AchievementBadges";

export default function Index() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(230,30%,14%), hsl(268,72%,20%), hsl(230,30%,14%), hsl(187,60%,15%))",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }}
    >
      <ParticleBackground />
      <FloatingDecor />

      <div className="relative z-10 px-4 py-8 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12" style={{ transform: "rotate(-1deg)" }}>
          <div className="inline-block relative">
            <h1 className="font-display text-7xl md:text-9xl text-gradient-pink-orange leading-none">
              CHRONOCHECK
            </h1>
            <span className="absolute -top-4 -right-8 text-4xl animate-float">⚡</span>
            <span className="absolute -bottom-2 -left-6 text-3xl animate-float-slow">🔥</span>
          </div>
          <p className="font-display text-2xl md:text-3xl text-neon-cyan mt-2 tracking-widest">
            YOUR SCHEDULE, BUT MAKE IT ✨ CHAOTIC ✨
          </p>
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {["🎮 GAMING VIBES", "⚡ ZERO BORING", "🚀 SCHEDULE FLEX"].map((tag) => (
              <span
                key={tag}
                className="bg-muted border-2 border-hot-purple text-foreground font-bold text-xs md:text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Wild Clock */}
        <section className="mb-10 md:mb-16 flex justify-center" style={{ transform: "rotate(1deg)" }}>
          <Tilt3DCard>
            <div className="bg-card/50 backdrop-blur-sm border-2 border-neon-cyan rounded-2xl p-6 md:p-8 glow-cyan">
              <WildClock />
            </div>
          </Tilt3DCard>
        </section>

        {/* === ORIGINAL 5 TOOLS === */}
        <div className="relative space-y-10 lg:space-y-14">
          {/* Row 1: Conflict + TimeSlot */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
            <Tilt3DCard className="lg:w-[55%] z-20">
              <ConflictDetector />
            </Tilt3DCard>
            <Tilt3DCard className="lg:w-[50%] lg:mt-8 z-10">
              <TimeSlotChecker />
            </Tilt3DCard>
          </div>



          {/* Row 2: Duration centered */}
          <div className="flex justify-center relative z-20">
            <Tilt3DCard className="w-full max-w-lg">
              <DurationChecker />
            </Tilt3DCard>
          </div>

          {/* Row 3: Fact + Mood */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
            <Tilt3DCard className="lg:w-[50%] z-10">
              <RandomFactGenerator />
            </Tilt3DCard>
            <Tilt3DCard className="lg:w-[55%] lg:mt-8 z-20">
              <MoodScheduler />
            </Tilt3DCard>
          </div>
        </div>

        {/* === SECTION DIVIDER === */}
        <div className="text-center my-16 md:my-24">
          <div className="inline-block relative">
            <h2 className="font-display text-5xl md:text-7xl text-gradient-cyan-purple">
              🔥 POWER TOOLS 🔥
            </h2>
            <span className="absolute -top-3 -right-6 text-3xl animate-float">💎</span>
          </div>
          <p className="font-display text-xl text-muted-foreground mt-2">NEXT-LEVEL SCHEDULING FEATURES</p>
        </div>

        {/* === NEW FEATURES === */}
        <div className="relative space-y-10 lg:space-y-14">
          {/* Visual Time Grid - Full Width */}
          <Tilt3DCard>
            <VisualTimeGrid />
          </Tilt3DCard>

          {/* Multi Person + Time Zone */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
            <Tilt3DCard className="lg:w-[55%]" >
              <MultiPersonScheduler />
            </Tilt3DCard>
            <Tilt3DCard className="lg:w-[50%] lg:mt-8">
              <TimeZoneConverter />
            </Tilt3DCard>
          </div>

          {/* Schedule Score + Achievements */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
            <Tilt3DCard className="lg:w-[50%]">
              <ScheduleScore />
            </Tilt3DCard>
            <Tilt3DCard className="lg:w-[55%] lg:mt-8">
              <AchievementBadges />
            </Tilt3DCard>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 md:mt-24 pb-8" style={{ transform: "rotate(1deg)" }}>
          <p className="font-display text-xl text-muted-foreground">
            MADE WITH 🔥 AND ZERO BORING MEETINGS
          </p>
          <div className="flex justify-center gap-3 mt-3 text-3xl">
            {"🎮🕹️🎯🏆⚡".split("").filter(c => c.trim()).map((e, i) => (
              <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
