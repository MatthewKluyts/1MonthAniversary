"use client";

import { motion } from "framer-motion";
import { timeline } from "@/content/timeline";
import TimelineEntry from "./TimelineEntry";

export default function Timeline() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">
          a month, in moments
        </p>
        <h2 className="font-serif italic text-3xl sm:text-4xl">
          us, so far
        </h2>
      </motion.div>

      <ol className="relative space-y-12 sm:space-y-20 before:absolute before:left-0 sm:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:-translate-x-1/2 before:bg-rose-200 dark:before:bg-rose-900">
        {timeline.map((entry, i) => (
          <TimelineEntry key={i} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  );
}
