"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { checkDate, isUnlocked, markUnlocked } from "@/lib/unlock";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const CURRENT_YEAR = 2026;
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1];

type Status = "idle" | "checking" | "wrong" | "right";

export default function DateGate() {
  const router = useRouter();
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isUnlocked()) {
      router.replace("/site");
    }
  }, [router]);

  const expectedHash = process.env.NEXT_PUBLIC_SECRET_HASH ?? "";
  const canSubmit = day !== "" && month !== "" && year !== "" && status !== "checking";

  const hint = useMemo(() => {
    if (status !== "wrong") return null;
    if (attempts >= 3) return "hint: it was a Friday · think back to that walk ❤️";
    if (attempts >= 2) return "think back to the day i finally asked…";
    return "not quite — try again";
  }, [status, attempts]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("checking");
    const ok = await checkDate(Number(year), Number(month), Number(day), expectedHash);
    if (ok) {
      markUnlocked();
      setStatus("right");
      setTimeout(() => router.push("/site"), 1700);
    } else {
      setStatus("wrong");
      setAttempts((a) => a + 1);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-rose-50 via-white to-rose-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-rose-950 text-zinc-900 dark:text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            for you
          </p>
          <h1 className="text-3xl font-serif italic leading-snug">
            what was the date i asked you to be mine?
          </h1>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          animate={status === "wrong" ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-3 gap-3">
            <Select
              label="day"
              value={day}
              onChange={(v) => setDay(v === "" ? "" : Number(v))}
              options={DAYS.map((d) => ({ value: d, label: String(d) }))}
            />
            <Select
              label="month"
              value={month}
              onChange={(v) => setMonth(v === "" ? "" : Number(v))}
              options={MONTHS.map((name, i) => ({ value: i + 1, label: name }))}
            />
            <Select
              label="year"
              value={year}
              onChange={(v) => setYear(v === "" ? "" : Number(v))}
              options={YEARS.map((y) => ({ value: y, label: String(y) }))}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 transition-colors shadow-sm"
          >
            unlock
          </button>

          <AnimatePresence>
            {hint && (
              <motion.p
                key={hint}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-rose-500 italic"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>

      <AnimatePresence>
        {status === "right" && <HeartBurst />}
      </AnimatePresence>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number | "";
  onChange: (v: string) => void;
  options: { value: number; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
      >
        <option value="">--</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function HeartBurst() {
  const hearts = Array.from({ length: 14 });
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-7xl"
      >
        {"❤️"}
      </motion.div>
      {hearts.map((_, i) => {
        const angle = (i / hearts.length) * Math.PI * 2;
        const distance = 140 + (i % 3) * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <motion.span
            key={i}
            className="absolute text-3xl"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{ x, y, opacity: [0, 1, 0], scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          >
            {"❤️"}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
