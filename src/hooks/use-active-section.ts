import { useEffect, useState } from "react";

const BOTTOM_THRESHOLD_PX = 72;
const ANCHOR_RATIO = 0.42;
const BIND_RETRIES_MS = [0, 50, 150, 300, 600];

export function useActiveSection(
  sectionIds: readonly string[],
  _rootMargin = "-40% 0px -45% 0px",
  enabled = true,
) {
  const [active, setActive] = useState(sectionIds[0] ?? "");
  const sectionKey = sectionIds.join(",");

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const updateActive = () => {
      const lastId = sectionIds[sectionIds.length - 1] ?? "";
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - BOTTOM_THRESHOLD_PX;

      if (atBottom && lastId) {
        setActive(lastId);
        return;
      }

      const anchor = window.innerHeight * ANCHOR_RATIO;
      let anchoredId: string | undefined;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom >= anchor) {
          anchoredId = section.id;
        }
      }

      if (anchoredId) {
        setActive(anchoredId);
        return;
      }

      let bestId = sectionIds[0] ?? "";
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
          continue;
        }

        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - anchor);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = section.id;
        }
      }

      setActive(bestId);
    };

    updateActive();

    const retryTimers = BIND_RETRIES_MS.map((delay) =>
      window.setTimeout(updateActive, delay),
    );

    const observer = new IntersectionObserver(updateActive, {
      threshold: [0, 0.01, 0.1, 0.25],
    });

    for (const section of sections) {
      observer.observe(section);
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      for (const timer of retryTimers) {
        window.clearTimeout(timer);
      }
    };
  }, [enabled, sectionKey, sectionIds]);

  return active;
}
