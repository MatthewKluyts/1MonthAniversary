"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { letter } from "@/content/letter";

type Stage = "sealed" | "open";

export default function Letter() {
  const [stage, setStage] = useState<Stage>("sealed");
  const isOpen = stage === "open";

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">
          a little something
        </p>
        <h2 className="font-serif italic text-3xl sm:text-4xl">
          for you to open
        </h2>
      </motion.div>

      <div className="relative mx-auto" style={{ perspective: 1400 }}>
        {/* envelope */}
        <div
          className="relative mx-auto z-0"
          style={{ width: "min(360px, 90vw)", aspectRatio: "5 / 3.2" }}
        >
          {/* envelope body (back) */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-rose-200 to-rose-300 dark:from-rose-800 dark:to-rose-900 shadow-lg" />

          {/* envelope front V-cut */}
          <div
            className="absolute inset-0 rounded-md bg-gradient-to-br from-rose-300 to-rose-400 dark:from-rose-700 dark:to-rose-800 shadow-md"
            style={{
              clipPath: "polygon(0 40%, 50% 100%, 100% 40%, 100% 100%, 0 100%)",
              zIndex: 3,
            }}
          />

          {/* envelope flap */}
          <motion.div
            className="absolute inset-0 origin-top"
            initial={false}
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              transformStyle: "preserve-3d",
              zIndex: isOpen ? 1 : 4,
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-rose-300 to-rose-400 dark:from-rose-700 dark:to-rose-800 shadow-sm"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 60%)" }}
            />
          </motion.div>

          {/* wax seal */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="seal"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-rose-600 text-white shadow-md"
                style={{
                  width: 60,
                  height: 60,
                  zIndex: 5,
                  boxShadow:
                    "0 4px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)",
                }}
              >
                <span className="text-2xl">❤</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* the letter — emerges from the envelope, takes the foreground */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="letter-wrap"
              initial={{ height: 0, scaleX: 0.55, scaleY: 0.08, opacity: 0 }}
              animate={{ height: "auto", scaleX: 1, scaleY: 1, opacity: 1 }}
              exit={{ height: 0, scaleX: 0.55, scaleY: 0.08, opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              style={{
                transformOrigin: "50% 0%",
                overflow: "visible",
              }}
              className="relative -mt-24 sm:-mt-28 z-10 mx-auto"
            >
              <article
                className="mx-auto rounded-md bg-[#fffaf3] dark:bg-zinc-100 text-zinc-800 shadow-2xl font-serif overflow-hidden"
                style={{
                  width: "min(560px, 92vw)",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(244, 114, 182, 0.08) 32px)",
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="px-8 py-10 sm:px-12 sm:py-14"
                >
                  <p className="italic text-lg mb-6">{letter.greeting}</p>
                  {letter.paragraphs.map((p, i) => (
                    <p key={i} className="mb-5 leading-relaxed text-[1.05rem]">
                      {p}
                    </p>
                  ))}
                  <p className="mt-8 italic">{letter.signoff}</p>
                  <p className="mt-1 text-xl italic">{letter.signature}</p>
                </motion.div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>

        {/* button */}
        <div className="mt-8 text-center relative z-20">
          {!isOpen ? (
            <motion.button
              onClick={() => setStage("open")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-8 shadow-md transition-colors"
            >
              tap to open
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              onClick={() => setStage("sealed")}
              className="text-sm text-rose-400 hover:text-rose-500 underline underline-offset-4 italic"
            >
              close
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
