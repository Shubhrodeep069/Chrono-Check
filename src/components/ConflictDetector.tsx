import { useState } from "react";
import ConfettiBlast from "./ConfettiBlast";

export default function ConflictDetector() {
  const [slot1Start, setSlot1Start] = useState("");
  const [slot1End, setSlot1End] = useState("");
  const [slot2Start, setSlot2Start] = useState("");
  const [slot2End, setSlot2End] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const check = () => {
    const toMin = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const a1 = toMin(slot1Start), a2 = toMin(slot1End);
    const b1 = toMin(slot2Start), b2 = toMin(slot2End);
    const conflict = a1 < b2 && b1 < a2;
    setResult(conflict);
    if (!conflict) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div
      className="relative bg-card p-6 md:p-8 border-[3px] border-electric-pink glow-pink"
      style={{
        borderRadius: "2rem 0.5rem 2rem 0.5rem",
        transform: "rotate(-2deg)",
        animation: "float 4s ease-in-out infinite",
      }}
    >
      {showConfetti && <ConfettiBlast />}
      <h2 className="font-display text-3xl md:text-4xl text-gradient-pink-orange mb-4 text-center">
        ⭐ CONFLICT DETECTOR
      </h2>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input type="time" className="chrono-input flex-1" placeholder="Start" value={slot1Start} onChange={(e) => setSlot1Start(e.target.value)} />
          <input type="time" className="chrono-input flex-1" placeholder="End" value={slot1End} onChange={(e) => setSlot1End(e.target.value)} />
        </div>
        <p className="text-sm text-center text-muted-foreground">🚀 Slot 1 Start-End</p>
        <div className="flex gap-2">
          <input type="time" className="chrono-input flex-1" placeholder="Start" value={slot2Start} onChange={(e) => setSlot2Start(e.target.value)} />
          <input type="time" className="chrono-input flex-1" placeholder="End" value={slot2End} onChange={(e) => setSlot2End(e.target.value)} />
        </div>
        <p className="text-sm text-center text-muted-foreground">🎯 Another One</p>
        <button onClick={check} className="btn-3d-pink w-full py-3 font-display text-xl tracking-wider rounded-lg text-foreground hover:animate-jiggle">
          💥 CLASH OR PASS?
        </button>
      </div>
      {result !== null && (
        <div className={`mt-4 text-center font-display text-2xl animate-bounce-in ${result ? "text-electric-pink" : "text-lime-green"}`}>
          {result ? (
            <div className="comic-bubble !bg-electric-pink !text-foreground !border-foreground">💥 CLASH DETECTED! 💥</div>
          ) : (
            <div className="comic-bubble">🎉 ALL CLEAR! PASS! 🎊</div>
          )}
        </div>
      )}
    </div>
  );
}
