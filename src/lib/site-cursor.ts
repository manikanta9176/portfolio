export const SITE_CURSOR_SYNC = "site-cursor-sync";

export function dispatchSiteCursorSync(x: number, y: number) {
  window.dispatchEvent(
    new CustomEvent(SITE_CURSOR_SYNC, { detail: { x, y } }),
  );
}
