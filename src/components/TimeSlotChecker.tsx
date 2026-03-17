import { useState } from "react";
import TypewriterText from "./TypewriterText";

export default function TimeSlotChecker() {
  const [checkTime, setCheckTime] = useState("");
  const [busySlots, setBusySlots] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [shake, setShake] = useState(false);

  const check = () => {
    const toMin = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const time = toMin(checkTime);
    const busy = busySlots.split(",").map((s) => s.trim()).filter(Boolean);
    const isBusy = busy.some((slot) => {
      const parts = slot.split("-");
      if (parts.length !== 2) return false;
      return time >= toMin(parts[0]) && time < toMin(parts[1]);
    });
    setResult(isBusy);
    if (isBusy) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div
      className={`relative bg-card p-8 md:p-10 border-[3px] border-neon-cyan glow-cyan overflow-hidden ${shake ? "animate-shake" : ""}`}
      style={{
        borderRadius: "2.5rem 1rem 2.5rem 1rem",
        transform: "rotate(3deg)",
        animation: shake ? undefined : "float 5s ease-in-out 0.5s infinite",
      }}
    >
      <h2 className="font-display text-3xl md:text-4xl text-gradient-cyan-purple mb-4 text-center">
        ☁️ TIME-SLOT SPY
      </h2>
      <div className="space-y-3">
        <input type="time" className="chrono-input w-full" value={checkTime} onChange={(e) => setCheckTime(e.target.value)} />
        <p className="text-sm text-muted-foreground">⏰ What time to check?</p>
        <input className="chrono-input w-full" placeholder="📋 09:00-10:00, 14:00-15:30" value={busySlots} onChange={(e) => setBusySlots(e.target.value)} />
        <p className="text-sm text-muted-foreground">📋 Busy slots (comma-sep)</p>
        <button onClick={check} className="chrono-btn-cyan w-full py-3 font-display text-xl tracking-wider rounded-xl hover:animate-jiggle">
          🔍 SPY ON SCHEDULE
        </button>
      </div>
      {result !== null && (
        <div className="mt-4 text-center animate-bounce-in">
          {result ? (
            <div className="comic-bubble !bg-electric-pink !text-foreground !border-foreground text-2xl font-display">
              <TypewriterText text="😴 BUSY! NO CAN DO!" speed={40} />
            </div>
          ) : (
            <div className="comic-bubble text-2xl font-display">
              <TypewriterText text="🥳 FREE! GO FOR IT!" speed={40} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
