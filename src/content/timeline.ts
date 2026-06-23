export type TimelineEntry = {
  /** Display date, e.g. "May 23" or "Late May". Free-form — keep it short. */
  date: string;
  /** Short title for this memory. */
  title: string;
  /** The story — 1–3 sentences. */
  caption: string;
  /** Optional inside joke or aside, italic + smaller. */
  joke?: string;
  /** Optional photo path under /public, e.g. "/photos/walk.jpg". */
  photo?: string;
  /** Optional alt text for the photo. */
  alt?: string;
};

// TODO: replace placeholders with the real memories.
// Drop photos in public/photos/ and reference them like "/photos/filename.jpg".
export const timeline: TimelineEntry[] = [
  {
    date: "the day we met",
    title: "the very first time",
    caption:
      "all i can remember is walking into beer yard and seeing you. i was so nervous to talk, even look at you, to you but somehow managed to still speak to you. best decision ever.",
    photo: "/photos/first-meet.jpg",
    alt: "the day we met",
  },
  {
    date: "our first proper date",
    title: "and then dinner",
    caption:
      "you wore that thing i told you i loved. we talked for hours and i forgot to check the time once — which never happens.",
    joke: "you also stole half my fries. unforgivable. ✨",
  },
  {
    date: "the day i asked",
    title: "be mine?",
    caption:
      "i had a whole speech and forgot most of it. you said yes anyway. best day so far.",
  },
  {
    date: "this past month",
    title: "every little thing",
    caption:
      "the texts, the silly photos, the late-night phone calls, the way you make ordinary days feel like a soft place to land.",
  },
];
