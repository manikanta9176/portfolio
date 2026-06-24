"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { PortfolioPicker } from "@/components/portfolio-picker";
import { animateFolioCoverOpen, animateFolioPageTurn } from "@/lib/folio-page-turn";
import {
  expertise,
  formatTimelineOrganization,
  metrics,
  principles,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

const chapters = [
  {
    id: "intro",
    roman: "I",
    title: "Frontispiece",
    leftNote: "Volume one · personal register",
    margin: "Here begins the record of Manikanta Potnuru, engineer and builder of systems.",
  },
  {
    id: "craft",
    roman: "II",
    title: "Competencies",
    leftNote: "Annotated inventory",
    margin: "Skills catalogued as one might list tools in a workshop ledger.",
  },
  {
    id: "journey",
    roman: "III",
    title: "Chronicle",
    leftNote: "Years in order",
    margin: "Each role a dated entry; each entry another layer of sediment.",
  },
  {
    id: "work",
    roman: "IV",
    title: "Selected Works",
    leftNote: "Exhibit catalog",
    margin: "Projects listed in the catalog, continued on the facing page.",
  },
  {
    id: "contact",
    roman: "V",
    title: "Correspondence",
    leftNote: "Return address enclosed",
    margin: "Should this record merit further inquiry, reply by post or wire.",
  },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

type TurnState = {
  direction: "forward" | "back";
  from: number;
  to: number;
};

type BookPhase = "closed" | "opening" | "open";

type FolioSpreadDefinition = {
  chapter: ChapterId;
  id: string;
  right: ReactNode;
};

function setCursorHand(mode: "turn" | null) {
  if (mode) {
    document.body.dataset.cursorHand = mode;
    return;
  }

  delete document.body.dataset.cursorHand;
}

function isChapterId(value: string): value is ChapterId {
  return chapters.some((chapter) => chapter.id === value);
}

function readChapterFromHash(): ChapterId {
  if (typeof window === "undefined") {
    return "intro";
  }

  const hash = window.location.hash.replace("#", "");
  return isChapterId(hash) ? hash : "intro";
}

function chapterIndexOf(id: ChapterId) {
  return chapters.findIndex((item) => item.id === id);
}

function chapterMeta(id: ChapterId) {
  return chapters.find((item) => item.id === id) ?? chapters[0];
}

function FolioSpine({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="folio-spine">
      <span>{label}</span>
    </div>
  );
}

function FolioChapterIntro({ id }: { id: ChapterId }) {
  const meta = chapterMeta(id);

  return (
    <>
      <p className="folio-chapter-mark">Chapter {meta.roman}</p>
      <h2 className="folio-chapter-title">{meta.title}</h2>
      <p className="folio-left-note">{meta.leftNote}</p>
      <p className="folio-margin-note">{meta.margin}</p>
    </>
  );
}

function FolioChapterLeft({ id }: { id: ChapterId }) {
  switch (id) {
    case "intro":
      return (
        <>
          <p className="folio-vol">Vol. I</p>
          <FolioChapterIntro id="intro" />
        </>
      );
    case "craft":
      return (
        <>
          <FolioChapterIntro id="craft" />
          <ul className="folio-index">
            {expertise.map((item, index) => (
              <li key={item.title}>
                {String(index + 1).padStart(2, "0")}. {item.title}
              </li>
            ))}
          </ul>
        </>
      );
    case "journey":
      return (
        <>
          <FolioChapterIntro id="journey" />
          <ul className="folio-principles">
            {principles.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </>
      );
    case "work":
      return (
        <>
          <FolioChapterIntro id="work" />
          <ol className="folio-catalog">
            {projects.map((project, index) => (
              <li key={project.name}>
                {String(index + 1).padStart(2, "0")}. {project.name}
              </li>
            ))}
          </ol>
        </>
      );
    case "contact":
      return (
        <>
          <FolioChapterIntro id="contact" />
          <div aria-hidden="true" className="folio-wax-seal">
            <span>MP</span>
          </div>
        </>
      );
  }
}

const chapterSpine: Record<ChapterId, string> = {
  intro: "POTNURU",
  craft: "CRAFT",
  journey: "JOURNEY",
  work: "WORK",
  contact: "CONTACT",
};

function FolioExpertiseEntries({ start, end }: { start: number; end: number }) {
  return (
    <div className="folio-entries">
      {expertise.slice(start, end).map((item, offset) => {
        const index = start + offset;

        return (
          <article className="folio-entry" key={item.title}>
            <p className="folio-entry-ref">§{index + 1}</p>
            <h3>{item.title}</h3>
            <p className="folio-entry-eyebrow">{item.eyebrow}</p>
            <p>{item.copy}</p>
            <p className="folio-entry-tags">{item.stack.join(" · ")}</p>
          </article>
        );
      })}
    </div>
  );
}

function FolioTimelineEntries({ start, end }: { start: number; end: number }) {
  return (
    <div className="folio-entries">
      {timeline.slice(start, end).map((item) => (
        <article className="folio-entry folio-entry-dated" key={item.title}>
          <p className="folio-entry-date">{item.period}</p>
          <h3>{item.title}</h3>
          <p className="folio-entry-org">{formatTimelineOrganization(item)}</p>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

function FolioProjectEntries({ start, end }: { start: number; end: number }) {
  return (
    <div className="folio-entries">
      {projects.slice(start, end).map((project, offset) => {
        const index = start + offset;

        return (
          <article className="folio-entry folio-entry-catalog" key={project.name}>
            <p className="folio-entry-type">
              {String(index + 1).padStart(2, "0")}. {project.type} · {project.year}
            </p>
            <h3>{project.name}</h3>
            <p>{project.copy}</p>
            <p className="folio-entry-links">
              {project.links.map((link, linkIndex) => (
                <span key={link.href}>
                  {linkIndex > 0 ? " · " : null}
                  <a href={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </article>
        );
      })}
    </div>
  );
}

const folioSpreads: FolioSpreadDefinition[] = [
  {
    chapter: "intro",
    id: "intro",
    right: (
      <>
        <p className="folio-right-kicker">Personal register · {siteConfig.role}</p>
        <h1>{siteConfig.displayName.join(" ")}</h1>
        <p className="folio-lede">{siteConfig.headline}</p>
        <dl className="folio-metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
  },
  {
    chapter: "craft",
    id: "craft-1",
    right: <FolioExpertiseEntries start={0} end={2} />,
  },
  {
    chapter: "craft",
    id: "craft-2",
    right: <FolioExpertiseEntries start={2} end={4} />,
  },
  {
    chapter: "journey",
    id: "journey-1",
    right: <FolioTimelineEntries start={0} end={2} />,
  },
  {
    chapter: "journey",
    id: "journey-2",
    right: <FolioTimelineEntries start={2} end={3} />,
  },
  {
    chapter: "work",
    id: "work-1",
    right: <FolioProjectEntries start={0} end={2} />,
  },
  {
    chapter: "work",
    id: "work-2",
    right: <FolioProjectEntries start={2} end={4} />,
  },
  {
    chapter: "contact",
    id: "contact",
    right: (
      <div className="folio-page-letter">
        <p className="folio-letter-date">{new Date().getFullYear()}</p>
        <p className="folio-letter-salutation">To whom it may concern,</p>
        <p className="folio-letter-body">
          I am available for full-stack product work, React and Next.js builds, CMS
          platforms, and teams that value careful engineering. You may reach me at the
          addresses below.
        </p>
        <address className="folio-address">
          <p>
            <span>Post</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>
            <span>Wire · LinkedIn</span>
            <a href={siteConfig.linkedin}>Open profile</a>
          </p>
          <p>
            <span>Repository</span>
            <a href={siteConfig.github}>GitHub</a>
          </p>
          <p>
            <span>Domain</span>
            <a href={siteConfig.url}>{siteConfig.url.replace("https://", "")}</a>
          </p>
        </address>
        <p className="folio-letter-signoff">Yours faithfully,</p>
        <p className="folio-letter-name">{siteConfig.name}</p>
      </div>
    ),
  },
];

function firstSpreadIndexForChapter(id: ChapterId) {
  const index = folioSpreads.findIndex((spread) => spread.chapter === id);
  return index >= 0 ? index : 0;
}

function readSpreadIndexFromHash() {
  return firstSpreadIndexForChapter(readChapterFromHash());
}

function FolioPage({
  children,
  pageNumber,
  side,
  className = "",
}: {
  children: ReactNode;
  pageNumber: number;
  side: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`folio-page folio-page-${side} ${className}`.trim()}>
      {children}
      <p className={`folio-page-num folio-page-num-${side}`}>{pageNumber}</p>
    </div>
  );
}

function FolioSpread({
  className = "",
  id,
  spread,
  spreadIndex,
}: {
  className?: string;
  id?: string;
  spread: FolioSpreadDefinition;
  spreadIndex: number;
}) {
  return (
    <section className={`folio-spread ${className}`.trim()} id={id}>
      <FolioPage pageNumber={spreadIndex * 2 + 1} side="left">
        <FolioChapterLeft id={spread.chapter} />
      </FolioPage>
      <FolioPage pageNumber={spreadIndex * 2 + 2} side="right">
        {spread.right}
      </FolioPage>
      <FolioSpine label={chapterSpine[spread.chapter]} />
    </section>
  );
}

function FolioSpreadPage({
  side,
  spread,
  spreadIndex,
  hidden = false,
}: {
  side: "left" | "right";
  spread: FolioSpreadDefinition;
  spreadIndex: number;
  hidden?: boolean;
}) {
  if (hidden) {
    return <div aria-hidden="true" className={`folio-page folio-page-${side} folio-page-ghost`} />;
  }

  return (
    <FolioPage pageNumber={spreadIndex * 2 + (side === "left" ? 1 : 2)} side={side}>
      {side === "left" ? <FolioChapterLeft id={spread.chapter} /> : spread.right}
    </FolioPage>
  );
}

function FolioTurnOverlay({
  bookRef,
  onComplete,
  turn,
}: {
  bookRef: React.RefObject<HTMLDivElement | null>;
  onComplete: (nextSpreadIndex: number) => void;
  turn: TurnState;
}) {
  const forward = turn.direction === "forward";
  const fromSpread = folioSpreads[turn.from] ?? folioSpreads[0];
  const toSpread = folioSpreads[turn.to] ?? fromSpread;
  const sheetRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const foldRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const book = bookRef.current;
    const sheet = sheetRef.current;
    if (!book || !sheet) {
      onComplete(turn.to);
      return;
    }

    const leaf = sheet.parentElement;
    if (leaf) {
      leaf.style.opacity = "1";
      leaf.style.visibility = "visible";
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      onComplete(turn.to);
      return;
    }

    let cancelAnimation = () => {};

    cancelAnimation = animateFolioPageTurn(
      book,
      sheet,
      shadowRef.current,
      foldRef.current,
      turn.direction,
      () => onComplete(turn.to),
    );

    return () => {
      cancelAnimation();
    };
  }, [bookRef, onComplete, turn.direction, turn.from, turn.to]);

  return (
    <div className={`folio-turn-scene folio-turn-${forward ? "forward" : "backward"}`}>
      <div className="folio-spread folio-spread-mask">
        {forward ? (
          <>
            <FolioSpreadPage side="left" spread={fromSpread} spreadIndex={turn.from} />
            <FolioSpreadPage side="right" spread={toSpread} spreadIndex={turn.to} />
            <FolioSpine label={chapterSpine[toSpread.chapter]} />
          </>
        ) : (
          <>
            <FolioSpreadPage side="left" spread={toSpread} spreadIndex={turn.to} />
            <FolioSpreadPage side="right" spread={fromSpread} spreadIndex={turn.from} />
            <FolioSpine label={chapterSpine[fromSpread.chapter]} />
          </>
        )}
      </div>

      <div className={`folio-flip-leaf folio-flip-leaf-${turn.direction}`}>
        <div className={`folio-flip-sheet folio-flip-sheet-${turn.direction}`} ref={sheetRef}>
          <div
            aria-hidden="true"
            className={`folio-page-fold folio-page-fold-${turn.direction}`}
            ref={foldRef}
          />
          <div className="folio-flip-face folio-flip-face-front">
            {forward ? (
              <FolioPage
                pageNumber={turn.from * 2 + 2}
                side="right"
                className="folio-page-turning"
              >
                {fromSpread.right}
              </FolioPage>
            ) : (
              <FolioPage
                pageNumber={turn.from * 2 + 1}
                side="left"
                className="folio-page-turning"
              >
                <FolioChapterLeft id={fromSpread.chapter} />
              </FolioPage>
            )}
          </div>
          <div className="folio-flip-face folio-flip-face-reverse">
            {forward ? (
              <FolioPage pageNumber={turn.to * 2 + 1} side="left" className="folio-page-turning">
                <FolioChapterLeft id={toSpread.chapter} />
              </FolioPage>
            ) : (
              <FolioPage pageNumber={turn.to * 2 + 2} side="right" className="folio-page-turning">
                {toSpread.right}
              </FolioPage>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="folio-turn-shadow" ref={shadowRef} />
    </div>
  );
}

function FolioDeathNoteCover({
  coverRef,
  onOpen,
  phase,
}: {
  coverRef: React.RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  phase: BookPhase;
}) {
  return (
    <button
      aria-label="Open Death Note folio"
      className={`folio-deathnote-cover folio-deathnote-cover-${phase}`}
      disabled={phase !== "closed"}
      onClick={onOpen}
      ref={coverRef}
      type="button"
    >
      <div className="folio-cover-corner folio-cover-corner-tl" />
      <div className="folio-cover-corner folio-cover-corner-tr" />
      <div className="folio-cover-corner folio-cover-corner-bl" />
      <div className="folio-cover-corner folio-cover-corner-br" />
      <div className="folio-cover-face">
        <p className="folio-cover-eyebrow">How to use it</p>
        <h2 className="folio-cover-title">NOTEBOOK</h2>
        <p className="folio-cover-name">{siteConfig.displayName.join(" ")}</p>
        <p className="folio-cover-rule">The human whose name is written in this notebook shall… build reliable software.</p>
        <p className="folio-cover-open-note">Click to open</p>
      </div>
    </button>
  );
}

export function FolioPortfolio() {
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<BookPhase>("closed");
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turn, setTurn] = useState<TurnState | null>(null);

  const currentSpread = folioSpreads[spreadIndex] ?? folioSpreads[0];
  const displaySpread = turn ? (folioSpreads[turn.to] ?? currentSpread) : currentSpread;
  const displaySpreadIndex = turn ? turn.to : spreadIndex;
  const current = chapterMeta(currentSpread.chapter);
  const turning = turn !== null;
  const bookOpen = phase === "open";

  const completeTurn = useCallback((nextSpreadIndex: number) => {
    const nextSpread = folioSpreads[nextSpreadIndex] ?? folioSpreads[0];
    setSpreadIndex(nextSpreadIndex);
    window.history.replaceState(null, "", `#${nextSpread.chapter}`);
    setTurn(null);
  }, []);

  const goToSpread = useCallback(
    (nextSpreadIndex: number) => {
      if (
        !bookOpen ||
        turn ||
        nextSpreadIndex === spreadIndex ||
        nextSpreadIndex < 0 ||
        nextSpreadIndex >= folioSpreads.length
      ) {
        return;
      }

      setTurn({
        from: spreadIndex,
        to: nextSpreadIndex,
        direction: nextSpreadIndex > spreadIndex ? "forward" : "back",
      });
    },
    [bookOpen, spreadIndex, turn],
  );

  const goToChapter = useCallback(
    (id: ChapterId) => {
      goToSpread(firstSpreadIndexForChapter(id));
    },
    [goToSpread],
  );

  const stepChapter = useCallback(
    (delta: number) => {
      goToSpread(spreadIndex + delta);
    },
    [goToSpread, spreadIndex],
  );

  const openBook = useCallback(() => {
    if (phase === "closed") {
      setPhase("opening");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening" || !coverRef.current) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("open");
      return;
    }

    return animateFolioCoverOpen(coverRef.current, () => setPhase("open"));
  }, [phase]);

  useEffect(() => {
    setSpreadIndex(readSpreadIndexFromHash());

    const onHashChange = () => {
      setSpreadIndex(readSpreadIndexFromHash());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const activeSpread = turn ? folioSpreads[turn.to] : currentSpread;
    document.body.dataset.cursorSection = activeSpread?.chapter ?? "intro";
    return () => {
      delete document.body.dataset.cursorHand;
    };
  }, [currentSpread, turn]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!bookOpen || turn) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        stepChapter(1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        stepChapter(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [bookOpen, stepChapter, turn]);

  return (
    <div
      className={`folio-portfolio folio-phase-${phase}${turning ? " folio-portfolio-turning" : ""}${bookOpen ? " folio-portfolio-open" : ""}`}
    >
      <header className="folio-chrome">
        <p className="folio-chrome-kicker">Death Note · folio edition</p>
        <p className="folio-chrome-title">
          {bookOpen ? `Page ${current.roman} — ${current.title}` : "Notebook closed"}
        </p>
        <PortfolioPicker className="folio-picker-trigger" />
      </header>

      <nav aria-label="Chapter bookmarks" className="folio-bookmarks">
        {chapters.map((item) => (
          <button
            aria-current={
              currentSpread.chapter === item.id && bookOpen && !turning ? "true" : undefined
            }
            className={`folio-bookmark${
              currentSpread.chapter === item.id && bookOpen && !turning
                ? " folio-bookmark-active"
                : ""
            }`}
            disabled={!bookOpen || turning}
            key={item.id}
            onClick={() => goToChapter(item.id)}
            type="button"
          >
            <span>{item.roman}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>

      <div className="folio-book-wrap">
        <div className="folio-book" ref={bookRef}>
          <FolioSpread
            id={displaySpread.chapter}
            spread={displaySpread}
            spreadIndex={displaySpreadIndex}
          />
          {bookOpen && !turn ? (
            <>
              {spreadIndex > 0 ? (
                <button
                  aria-label="Turn to previous page"
                  className="folio-turn-zone folio-turn-zone-back"
                  onClick={() => stepChapter(-1)}
                  onPointerEnter={() => setCursorHand("turn")}
                  onPointerLeave={() => setCursorHand(null)}
                  type="button"
                />
              ) : null}
              {spreadIndex < folioSpreads.length - 1 ? (
                <button
                  aria-label="Turn to next page"
                  className="folio-turn-zone folio-turn-zone-forward"
                  onClick={() => stepChapter(1)}
                  onPointerEnter={() => setCursorHand("turn")}
                  onPointerLeave={() => setCursorHand(null)}
                  type="button"
                />
              ) : null}
            </>
          ) : null}
        </div>
        {turn && bookOpen ? (
          <FolioTurnOverlay bookRef={bookRef} onComplete={completeTurn} turn={turn} />
        ) : null}
        {phase !== "open" ? (
          <FolioDeathNoteCover coverRef={coverRef} onOpen={openBook} phase={phase} />
        ) : null}
      </div>

      <div className="folio-turn-controls">
        <button disabled={!bookOpen || spreadIndex === 0 || turning} onClick={() => stepChapter(-1)} type="button">
          ← Turn back
        </button>
        <p aria-live="polite">
          {bookOpen
            ? `Spread ${spreadIndex + 1} of ${folioSpreads.length}`
            : phase === "closed"
              ? "Notebook closed"
              : "Opening notebook…"}
        </p>
        <button
          disabled={!bookOpen || spreadIndex === folioSpreads.length - 1 || turning}
          onClick={() => stepChapter(1)}
          type="button"
        >
          Turn forward →
        </button>
      </div>
    </div>
  );
}
