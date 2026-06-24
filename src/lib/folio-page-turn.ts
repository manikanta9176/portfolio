export const FOLIO_TURN_MS = 1480;
export const FOLIO_OPEN_MS = 1400;

export type FolioPageMetrics = {
  height: number;
  left: number;
  originX: string;
  top: number;
  width: number;
};

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

export function measureFolioPageMetrics(
  bookEl: HTMLElement,
  direction: "forward" | "back",
  pageEl?: HTMLElement | null,
): FolioPageMetrics | null {
  const bookRect = bookEl.getBoundingClientRect();
  let page = pageEl ?? null;

  if (!page) {
    const selector =
      direction === "forward"
        ? ".folio-page-right:not(.folio-page-ghost)"
        : ".folio-page-left:not(.folio-page-ghost)";
    page =
      bookEl.querySelector<HTMLElement>(selector) ??
      bookEl.querySelector<HTMLElement>(
        direction === "forward" ? ".folio-page-right" : ".folio-page-left",
      );
  }

  if (!page) {
    return null;
  }

  const pageRect = page.getBoundingClientRect();

  return {
    left: pageRect.left - bookRect.left,
    top: pageRect.top - bookRect.top,
    width: pageRect.width,
    height: pageRect.height,
    originX: direction === "forward" ? "0% 50%" : "100% 50%",
  };
}

export function applyFolioFlipMetrics(sheet: HTMLElement, metrics: FolioPageMetrics) {
  sheet.style.left = `${metrics.left}px`;
  sheet.style.top = `${metrics.top}px`;
  sheet.style.width = `${metrics.width}px`;
  sheet.style.height = `${metrics.height}px`;
  sheet.style.transformOrigin = metrics.originX;
}

export function animateFolioPageTurn(
  bookEl: HTMLElement,
  sheet: HTMLElement,
  shadow: HTMLElement | null,
  fold: HTMLElement | null,
  direction: "forward" | "back",
  onComplete: () => void,
  pageEl?: HTMLElement | null,
): () => void {
  const metrics = measureFolioPageMetrics(bookEl, direction, pageEl);

  if (!metrics) {
    onComplete();
    return () => {};
  }

  applyFolioFlipMetrics(sheet, metrics);

  const endRotate = direction === "forward" ? -180 : 180;
  const start = performance.now();
  let timer: number | null = null;

  const tick = (now: number) => {
    const progress = Math.min((now - start) / FOLIO_TURN_MS, 1);
    const eased = easeInOutQuint(progress);
    const rotateY = endRotate * eased;
    const foldAmount = Math.sin(Math.PI * eased);
    const lift = foldAmount * 28;

    sheet.style.transform = `rotateY(${rotateY}deg) translateZ(${lift}px)`;
    sheet.style.setProperty("--folio-fold", String(foldAmount));
    sheet.style.setProperty("--folio-turn-progress", String(eased));

    if (shadow) {
      shadow.style.opacity = String(0.12 + foldAmount * 0.38);
    }

    if (fold) {
      const cornerLift = foldAmount * (direction === "forward" ? -16 : 16);
      fold.style.opacity = String(0.15 + foldAmount * 0.85);
      fold.style.transform = `scale(${0.55 + foldAmount * 0.55}) rotate(${cornerLift}deg)`;
    }

    if (progress < 1) {
      timer = window.setTimeout(() => tick(performance.now()), 16);
      return;
    }

    onComplete();
  };

  sheet.style.transform = "rotateY(0deg) translateZ(0px)";
  sheet.style.setProperty("--folio-fold", "0");
  sheet.style.setProperty("--folio-turn-progress", "0");
  timer = window.setTimeout(() => tick(performance.now()), 16);

  return () => {
    if (timer) {
      window.clearTimeout(timer);
    }
  };
}

export function animateFolioCoverOpen(
  cover: HTMLElement,
  onComplete: () => void,
): () => void {
  const start = performance.now();
  let timer: number | null = null;

  const tick = (now: number) => {
    const progress = Math.min((now - start) / FOLIO_OPEN_MS, 1);
    const eased = easeInOutQuint(progress);
    const rotate = -165 * eased;
    const lift = Math.sin(Math.PI * eased) * 18;

    cover.style.transform = `rotateY(${rotate}deg) translateZ(${lift}px)`;
    cover.style.setProperty("--folio-cover-shadow", String(Math.sin(Math.PI * eased) * 0.45));

    if (progress < 1) {
      timer = window.setTimeout(() => tick(performance.now()), 16);
      return;
    }

    onComplete();
  };

  timer = window.setTimeout(() => tick(performance.now()), 16);
  return () => {
    if (timer) {
      window.clearTimeout(timer);
    }
  };
}
