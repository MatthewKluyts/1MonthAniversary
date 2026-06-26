"use client";

// Deterministic positions/timings so SSR and client render match.
const HEARTS = Array.from({ length: 10 }, (_, i) => ({
  left: (i * 37) % 100,
  duration: 18 + (i % 5) * 3,
  delay: (i * 2.1) % 12,
  size: 14 + (i % 4) * 6,
  drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 10),
}));

export default function FloatingHearts() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="absolute text-rose-300/50 dark:text-rose-700/40 select-none"
          style={{
            left: `${h.left}%`,
            bottom: "-10vh",
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            ["--drift" as string]: `${h.drift}px`,
          }}
        >
          ❤
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) translateX(var(--drift));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
