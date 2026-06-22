const STORAGE_KEY = "anniversary:unlocked";

export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function formatDateKey(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export async function checkDate(
  year: number,
  month: number,
  day: number,
  expectedHash: string,
): Promise<boolean> {
  const hash = await sha256Hex(formatDateKey(year, month, day));
  return hash === expectedHash.toLowerCase();
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

export function markUnlocked(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "1");
}

export function clearUnlocked(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
