import { useState } from "react";

const BADGES = [
  { id: "no-conflict", emoji: "🏆", label: "No Conflicts Master", desc: "10 perfect days", unlocked: true, progress: 10, max: 10 },
  { id: "early-bird", emoji: "🐦", label: "Early Bird", desc: "5 morning meetings before 9 AM", unlocked: true, progress: 5, max: 5 },
  { id: "night-owl", emoji: "🦉", label: "Night Owl", desc: "3 evening planning sessions", unlocked: false, progress: 2, max: 3 },
  { id: "minimizer", emoji: "🧘", label: "Meeting Minimizer", desc: "<3 meetings/day for a week", unlocked: false, progress: 4, max: 7 },
  { id: "flex-king", emoji: "👑", label: "Flex King", desc: "Rescheduled 5 conflicts", unlocked: true, progress: 5, max: 5 },
  { id: "streak-master", emoji: "🔥", label: "Streak Master", desc: "14-day conflict-free streak", unlocked: false, progress: 7, max: 14 },
];

export default function AchievementBadges() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className="bg-card p-8 md:p-10 border-[3px] border-electric-pink glow-pink overflow-hidden"
      style={{ borderRadius: "2.5rem 0.5rem 2.5rem 0.5rem" }}
    >
      <h2 className="font-display text-3xl md:text-4xl text-gradient-pink-orange mb-2 text-center">
        🏆 ACHIEVEMENTS
      </h2>

      {/* Streak counter */}
      <div className="text-center mb-4 p-3 rounded-xl bg-muted/50 border border-muted-foreground/20">
        <p className="font-display text-2xl text-gradient-lime-yellow">
          🔥 7 DAY CONFLICT-FREE STREAK!
        </p>
        <p className="text-xs text-muted-foreground">Keep it going!</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {BADGES.map((badge) => (
          <button
            key={badge.id}
            onClick={() => setSelected(selected === badge.id ? null : badge.id)}
            className={`relative p-3 rounded-xl border-2 transition-all duration-300 text-center ${
              badge.unlocked
                ? "border-sunny-yellow bg-sunny-yellow/10 hover:scale-105 cursor-pointer"
                : "border-muted-foreground/30 bg-muted/20 opacity-60"
            } ${selected === badge.id ? "scale-110 ring-2 ring-sunny-yellow" : ""}`}
          >
            <span className="text-3xl block mb-1">{badge.unlocked ? badge.emoji : "🔒"}</span>
            <p className="font-display text-xs leading-tight">{badge.label}</p>
            {/* Mini progress bar */}
            <div className="h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-sunny-yellow transition-all duration-500"
                style={{ width: `${(badge.progress / badge.max) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{badge.progress}/{badge.max}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-3 text-center animate-bounce-in">
          <div className="comic-bubble text-sm">
            {BADGES.find((b) => b.id === selected)?.desc}
          </div>
        </div>
      )}
    </div>
  );
}
