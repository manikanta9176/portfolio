function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function computeSectionScrollTop(
  section: HTMLElement,
  chromeHeight: number,
  gap: number,
): number {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const offset = chromeHeight + gap;

  return clamp(sectionTop - offset, 0, maxScroll);
}
