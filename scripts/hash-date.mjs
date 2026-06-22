#!/usr/bin/env node
// Generate the SHA-256 hash for a date string (YYYY-MM-DD).
// Usage: node scripts/hash-date.mjs 2026-05-23
import { createHash } from "node:crypto";

const arg = process.argv[2];
if (!arg || !/^\d{4}-\d{2}-\d{2}$/.test(arg)) {
  console.error("Usage: node scripts/hash-date.mjs YYYY-MM-DD");
  console.error("Example: node scripts/hash-date.mjs 2026-05-23");
  process.exit(1);
}

const hash = createHash("sha256").update(arg).digest("hex");
console.log(hash);
