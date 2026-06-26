"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { startDate } from "@/content/site";

export default function DaysCounter() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;

  // Accept "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM" — append seconds if missing.
  const iso = startDate.includes("T")
    ? startDate.length === 16
      ? `${startDate}:00`
      : startDate
    : `${startDate}T00:00:00`;
  const start = new Date(iso).getTime();
  const diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1_000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-6 flex justify-center gap-4 sm:gap-6 font-serif"
      aria-label="time we've been together"
    >
      <Unit value={days} label="days" />
      <Unit value={hours} label="hours" />
      <Unit value={mins} label="mins" />
      <Unit value={secs} label="secs" />
    </motion.div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl text-rose-600 italic tabular-nums leading-none">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-rose-400">
        {label}
      </div>
    </div>
  );
}
