"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isUnlocked } from "@/lib/unlock";
import Timeline from "@/components/Timeline";
import Letter from "@/components/Letter";
import DaysCounter from "@/components/DaysCounter";
import FloatingHearts from "@/components/FloatingHearts";

export default function SitePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isUnlocked()) {
      router.replace("/");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-dvh bg-gradient-to-b from-rose-50 via-[#fff7f1] to-rose-100 dark:from-zinc-950 dark:via-[#0d0608] dark:to-rose-950"
    >
      <FloatingHearts />

      <div className="relative z-10">
        <header className="px-6 pt-20 pb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            one month with you
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl">
            hi my love
          </h1>
          <DaysCounter />
        </header>

        <Timeline />
      </div>

      <div className="relative z-10">
        <Letter />

        <footer className="px-6 py-16 text-center text-sm text-zinc-500">
          ❤
        </footer>
      </div>
    </motion.div>
  );
}
