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
  /** Optional video path under /public, e.g. "/photos/walk.mp4". Loops + autoplays muted. Takes precedence over photo. */
  video?: string;
  /** Optional alt text for the photo / aria label for the video. */
  alt?: string;
};

// TODO: replace placeholders with the real memories.
// Drop photos in public/photos/ and reference them like "/photos/filename.jpg".
export const timeline: TimelineEntry[] = [
  {
    date: "the day we met",
    title: "the very first time",
    caption:
      "all i can remember is walking into beer yard and seeing you. i was so nervous even look at, but somehow managed to still speak to you. best decision i've made.",
    photo: "/photos/5.jpg",
  },
  {
    date: "our first date",
    title: "dinner",
    caption:
      "i've never been more nervous in my life. i was so scared i wouldn't know what to say, yet we still managed to talk for hours. i still remember the way you laughed at my jokes, even the bad ones.",
    photo: "/photos/1.jpg",
    },
  {
    date: "the second date",
    title: "bowling and drinks",
    caption:
      "i thought i wouldn't be nervous the second time around, but yet i was still just as nervous, but talking to you felt like i had known you for years. i still remember that first kiss, and how it felt like the world stopped for a moment.",
    joke: "i still can't believe you beat me.",
 
   video: "/photos/3.mp4",
  },
  {
    date: "the day i asked you to be my girlfriend",
    title: "my best decision",
    caption:
      "we spent the whole day together, and there wasn't a single moment where i didn't feel like i was in the best place i could be. when were sitting in my bed and i was looking into your eyes, i knew i needed you to be mine.",
    photo: "/photos/6.jpg",
  },
  {
    date: "everything else",
    title: "the rest of this month",
    caption:
      "this has been the best month of my life. thank you for all the laughs, texts and late calls. thank you for being the best thing that has ever happened to me. i can't wait to see what the future holds for us. i know that whatever it is, it will be amazing",
    video: "/photos/4.mp4",
    
  }
];
