export function ensureHttps(url: string): string {
  if (!url) return "";
  return url.replace(/^http:/, "https:");
}

export const ANIMATION_DELAY_PER_ITEM = 0.05;
export const MAX_CONCURRENT_ANIMATIONS = 6; 