import { useState, useCallback } from "react";

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM

type SlotStatus = "free" | "busy" | "meeting" | "lunch";

const STATUS_CONFIG: Record<SlotStatus, { label: string; emoji: string; bgClass: string }> = {
  free: { label: "Free", emoji: "░░", bgClass: "bg-lime-green/20 border-lime-green/40" },
  busy: { label: "Busy", emoji: "██", bgClass: "bg-electric-pink/30 border-electric-pink/50" },
  meeting: { label: "Meeting", emoji: "██", bgClass: "bg-hot-purple/30 border-hot-purple/50" },
  lunch: { label: "Lunch", emoji: "░░", bgClass: "bg-sunny-yellow/30 border-sunny-yellow/50" },
};

const CYCLE: SlotStatus[] = ["free", "busy", "meeting", "lunch"];

export default function VisualTimeGrid() {
  const [slots, setSlots] = useState<Record<number, SlotStatus>>(() => {
    const init: Record<number, SlotStatus> = {};
    HOURS.forEach((h) => {
      if (h === 12) init[h] = "lunch";
      else if (h >= 9 && h <= 11) init[h] = "busy";
      else init[h] = "free";
    });
    return init;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStatus, setDragStatus] = useState<SlotStatus>("busy");

  const cycleSlot = useCallback((hour: number) => {
    setSlots((prev) => {
      const current = prev[hour] || "free";
      const nextIdx = (CYCLE.indexOf(current) + 1) % CYCLE.length;
      return { ...prev, [hour]: CYCLE[nextIdx] };
    });
  }, []);

  const handleMouseDown = useCallback((hour: number) => {
    const current = slots[hour] || "free";
    const nextIdx = (CYCLE.indexOf(current) + 1) % CYCLE.length;
    const next = CYCLE[nextIdx];
    setDragStatus(next);
    setIsDragging(true);
    setSlots((prev) => ({ ...prev, [hour]: next }));
  }, [slots]);

  const handleMouseEnter = useCallback((hour: number) => {
    if (isDragging) {
      setSlots((prev) => ({ ...prev, [hour]: dragStatus }));
    }
  }, [isDragging, dragStatus]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const freeCount = Object.values(slots).filter((s) => s === "free" || s === "lunch").length;
  const busyCount = Object.values(slots).filter((s) => s === "busy" || s === "meeting").length;
  const freePercent = Math.round((freeCount / HOURS.length) * 100);

  return (
    <div
      className="bg-card p-8 md:p-10 border-[3px] border-neon-cyan glow-cyan overflow-hidden"
      style={{ borderRadius: "1.5rem 0.5rem 1.5rem 0.5rem" }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h2 className="font-display text-3xl md:text-4xl text-gradient-cyan-purple mb-2 text-center">
        📊 VISUAL TIME GRID
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Click or drag to block time • Color-coded view
      </p>

      <div className="space-y-1 select-none">
        {HOURS.map((hour) => {
          const status = slots[hour] || "free";
          const config = STATUS_CONFIG[status];
          const timeStr = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
          return (
            <div
              key={hour}
              className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${config.bgClass}`}
              onMouseDown={() => handleMouseDown(hour)}
              onMouseEnter={() => handleMouseEnter(hour)}
            >
              <span className="font-display text-sm w-16 text-muted-foreground">{timeStr}</span>
              <div className="flex-1 h-6 rounded-md relative overflow-hidden">
                <div
                  className={`absolute inset-0 rounded-md ${
                    status === "free" ? "bg-lime-green/30" :
                    status === "busy" ? "bg-electric-pink/50" :
                    status === "meeting" ? "bg-hot-purple/50" :
                    "bg-sunny-yellow/40"
                  }`}
                  style={{ animation: status !== "free" ? "pulse-glow 2s infinite" : undefined }}
                />
              </div>
              <span className="text-xs font-bold w-16 text-right">{config.emoji} {config.label}</span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm font-display mb-1">
          <span className="text-lime-green">FREE: {freeCount}h</span>
          <span className="text-electric-pink">BUSY: {busyCount}h</span>
        </div>
        <div className="h-4 rounded-full bg-muted overflow-hidden border border-muted-foreground/20">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${freePercent}%`,
              background: "linear-gradient(90deg, hsl(82, 100%, 61%), hsl(187, 100%, 50%))",
            }}
          />
        </div>
        <p className="text-center font-display text-sm mt-1 text-muted-foreground">{freePercent}% FREE TIME</p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-3 mt-3 flex-wrap">
        {CYCLE.map((s) => (
          <span key={s} className={`text-xs font-bold px-2 py-1 rounded-full border ${STATUS_CONFIG[s].bgClass}`}>
            {STATUS_CONFIG[s].emoji} {STATUS_CONFIG[s].label}
          </span>
        ))}
      </div>
    </div>
  );
}
