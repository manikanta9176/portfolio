import { marqueeItems } from "@/lib/profile";

export function MarqueeBand() {
  const track = [...marqueeItems, ...marqueeItems];

  return (
    <div aria-hidden="true" className="marquee-shell border-y border-[var(--line)] bg-[var(--ink)] py-4 text-[var(--paper)]">
      <div className="marquee-track">
        {track.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
