import { useState, useEffect } from "react";

interface ScoreCategory {
  label: string;
  emoji: string;
  score: number;
  grade: string;
  color: string;
}

const generateScore = (): { total: number; categories: ScoreCategory[] } => {
  const cats: ScoreCategory[] = [
    { label: "Free Time Balance", emoji: "⏳", score: 70 + Math.floor(Math.random() * 30), grade: "", color: "bg-lime-green" },
    { label: "Meeting Density", emoji: "📅", score: 50 + Math.floor(Math.random() * 40), grade: "", color: "bg-neon-cyan" },
    { label: "Break Intervals", emoji: "☕", score: 60 + Math.floor(Math.random() * 35), grade: "", color: "bg-sunny-yellow" },
    { label: "Overtime Risk", emoji: "⚠️", score: 65 + Math.floor(Math.random() * 30), grade: "", color: "bg-electric-pink" },
  ];
  cats.forEach((c) => {
    c.grade = c.score >= 90 ? "A+" : c.score >= 80 ? "A" : c.score >= 70 ? "B+" : c.score >= 60 ? "B" : "C";
  });
  const total = Math.round(cats.reduce((a, c) => a + c.score, 0) / cats.length);
  return { total, categories: cats };
};

export default function ScheduleScore() {
  const [data, setData] = useState(() => generateScore());
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, [data]);

  const refresh = () => {
    setAnimated(false);
    setTimeout(() => {
      setData(generateScore());
    }, 50);
  };

  const totalEmoji = data.total >= 90 ? "🏆" : data.total >= 75 ? "⭐" : data.total >= 60 ? "👍" : "💪";

  return (
    <div
      className="bg-card p-8 md:p-10 border-[3px] border-hot-purple glow-purple overflow-hidden"
      style={{ borderRadius: "0.5rem 2rem 0.5rem 2rem" }}
    >
      <h2 className="font-display text-3xl md:text-4xl text-gradient-cyan-purple mb-4 text-center">
        📈 SCHEDULE SCORE
      </h2>

      {/* Big Score */}
      <div className="text-center mb-4">
        <div className="inline-block relative">
          <span className="font-display text-7xl md:text-8xl text-gradient-pink-orange">
            {animated ? data.total : 0}
          </span>
          <span className="font-display text-2xl text-muted-foreground">/100</span>
          <span className="absolute -top-2 -right-8 text-3xl">{totalEmoji}</span>
        </div>
      </div>

      {/* Category bars */}
      <div className="space-y-3">
        {data.categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>{cat.emoji} {cat.label}</span>
              <span className="font-display text-lg">{cat.grade}</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${cat.color} transition-all duration-1000 ease-out`}
                style={{ width: animated ? `${cat.score}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={refresh}
        className="btn-3d-purple w-full py-3 font-display text-xl tracking-wider rounded-lg text-foreground mt-4 hover:animate-jiggle"
      >
        🔄 RECALCULATE
      </button>
    </div>
  );
}
