import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: readonly string[],
  rootMargin = "-40% 0px -45% 0px",
) {
  const [active, setActive] = useState(sectionIds[0] ?? "");
  const sectionKey = sectionIds.join(",");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(section.id);
            }
          },
          { rootMargin, threshold: 0.01 },
        );
        observer.observe(section);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [rootMargin, sectionKey, sectionIds]);

  return active;
}
