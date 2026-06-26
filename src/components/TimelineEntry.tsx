"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TimelineEntry as Entry } from "@/content/timeline";

export default function TimelineEntry({
  entry,
  index,
}: {
  entry: Entry;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  const textBlock = (
    <div className={isLeft ? "sm:text-right" : "sm:text-left"}>
      <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">
        {entry.date}
      </p>
      <h3 className="font-serif italic text-2xl mb-3 leading-snug">
        {entry.title}
      </h3>
      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {entry.caption}
      </p>
      {entry.joke && (
        <p className="mt-2 italic text-sm text-rose-400">{entry.joke}</p>
      )}
    </div>
  );

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const tilt = index % 2 === 0 ? "-rotate-2" : "rotate-2";

  let mediaInner: React.ReactNode = null;
  if (entry.video) {
    mediaInner = (
      <video
        src={`${basePath}${entry.video}`}
        aria-label={entry.alt ?? entry.title}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-auto object-cover block"
      />
    );
  } else if (entry.photo) {
    mediaInner = (
      <Image
        src={`${basePath}${entry.photo}`}
        alt={entry.alt ?? entry.title}
        width={600}
        height={800}
        className="w-full h-auto object-cover block"
      />
    );
  }

  const mediaBlock = mediaInner ? (
    <div
      className={`relative bg-white dark:bg-zinc-100 p-3 pb-10 shadow-xl ${tilt} transition-transform hover:rotate-0 hover:scale-[1.02] duration-300`}
    >
      <div className="overflow-hidden">{mediaInner}</div>
    </div>
  ) : null;

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pl-8 sm:pl-0"
    >
      {/* mobile-only dot on left rail */}
      <span
        aria-hidden
        className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-400 ring-4 ring-rose-100 dark:ring-rose-950 sm:hidden"
      />

      {/* mobile layout: stacked text then photo */}
      <div className="sm:hidden space-y-4">
        {textBlock}
        {mediaBlock}
      </div>

      {/* tablet+ layout: text in one column, photo in the opposite */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-8 sm:items-start">
        <div>{isLeft ? textBlock : mediaBlock}</div>
        <span
          aria-hidden
          className="relative h-3 w-3 mt-2 mx-auto rounded-full bg-rose-400 ring-4 ring-rose-100 dark:ring-rose-950"
        />
        <div>{isLeft ? mediaBlock : textBlock}</div>
      </div>
    </motion.li>
  );
}
