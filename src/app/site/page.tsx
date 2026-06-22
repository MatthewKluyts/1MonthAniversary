"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUnlocked } from "@/lib/unlock";

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
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-rose-50 via-white to-rose-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-rose-950 text-zinc-900 dark:text-zinc-100">
      <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
        one month
      </p>
      <h1 className="text-4xl font-serif italic text-center">
        hi my love &mdash; the rest is coming soon
      </h1>
    </div>
  );
}
