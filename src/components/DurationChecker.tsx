import { useState } from "react";
import ConfettiBlast from "./ConfettiBlast";

export default function DurationChecker() {
  const [start, setStart] = useState("");
  const [minutes, setMinutes] = useState("");
  const [blocked, setBlocked] = useState("");
  const [result, setResult] = useState<null | { works: boolean; endTime?: string }>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const check = () => {
    const toMin = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const fromMin = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

    const startMin = toMin(start);
    const dur = parseInt(minutes) || 0;
    const endMin = startMin + dur;
    const endTime = fromMin(endMin);

    const blockedSlots = blocked.split(",").map((s) => s.trim()).filter(Boolean);
    const hasConflict = blockedSlots.some((slot) => {
      const parts = slot.split("-");
      if (parts.length !== 2) return false;
      const bs = toMin(parts[0]), be = toMin(parts[1]);
      return startMin < be && endMin > bs;
    });

    setResult({ works: !hasConflict, endTime });
    if (!hasConflict) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div
      className="relative bg-card p-6 md:p-8 border-[3px] border-sunny-yellow"
      style={{
        borderRadius: "0.5rem 2.5rem 0.5rem 2.5rem",
        transform: "rotate(-1deg)",
        animation: "float 3.5s ease-in-out 1s infinite",
        boxShadow: "0 0 20px hsla(49, 100%, 65%, 0.5)",
      }}
    >
      {showConfetti && <ConfettiBlast />}
      <h2 className="font-display text-3xl md:text-4xl text-gradient-lime-yellow mb-4 text-center">
        ⚡ DURATION CHECK
      </h2>
      <div className="space-y-3">
        <input type="time" className="chrono-input w-full" value={start} onChange={(e) => setStart(e.target.value)} />
        <p className="text-sm text-muted-foreground">⚡ Start time</p>
        <input type="number" className="chrono-input w-full" placeholder="⏱️ Minutes needed" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        <input className="chrono-input w-full" placeholder="🚫 10:00-11:00, 14:00-15:00" value={blocked} onChange={(e) => setBlocked(e.target.value)} />
        <p className="text-sm text-muted-foreground">🚫 Blocked slots</p>
        <button onClick={check} className="btn-3d-orange w-full py-3 font-display text-xl tracking-wider rounded-lg hover:animate-jiggle">
          🧮 DO THE MATH
        </button>
      </div>
      {result && (
        <div className="mt-4 text-center animate-bounce-in">
          {result.works ? (
            <div className="comic-bubble text-xl font-display">
              🎉 WORKS! Ends at {result.endTime}
            </div>
          ) : (
            <div className="comic-bubble !bg-electric-pink !text-foreground !border-foreground text-xl font-display">
              🙅‍♂️ NOPE! BLOCKED!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
