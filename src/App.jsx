import { useEffect, useRef, useState } from "react";
import CharacterPortrait from "./components/CharacterPortrait.jsx";
import ComparisonSpread from "./components/ComparisonSpread.jsx";
import SourcesLibrary from "./components/SourcesLibrary.jsx";
import { assetUrl } from "./asset-url.js";
import { portraits } from "./portraits.js";
import {
  chapterArtwork,
  interfaceArtwork,
  interfaceImages,
  publicationArtwork,
  worldArtwork,
} from "./artwork.js";
import { comparisonLayouts, getChapterArtwork } from "./visual-guide.js";
import { witcherOneChapters, witcherOneSources } from "./data/witcher-one.js";
import { witcherTwoChapters, witcherTwoSources } from "./data/witcher-two.js";
import {
  continuityArticles,
  continuitySources,
  characterEntries,
} from "./data/continuity.js";
import {
  matchesSearch,
  matchesCharacterName,
  parseRoute,
  readSavedState,
  readingMinutes,
  STORAGE_KEY,
  toggleItem,
} from "./lib.js";

const chapters = [...witcherOneChapters, ...witcherTwoChapters];
const allArticles = [...chapters, ...continuityArticles];
const sources = [
  ...new Map(
    [...witcherOneSources, ...witcherTwoSources, ...continuitySources].map(
      (source) => [source.id, source],
    ),
  ).values(),
];
const navigation = [
  { page: "home", label: "Overview" },
  { page: "journey", label: "Game recaps" },
  { page: "characters", label: "Characters" },
  { page: "continuity", label: "Books & games" },
];

function goTo(page, identifier = "") {
  window.location.hash = `/${page}${identifier ? `/${encodeURIComponent(identifier)}` : ""}`;
}

function SectionHeading({ eyebrow, title, children, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-description">{children}</p>}
      </div>
      {action}
    </div>
  );
}

function ArticleLink({
  article,
  onClick,
  completed = false,
  number,
  tracked = false,
}) {
  const artwork = getChapterArtwork(article.id);
  return (
    <button className="article-row" onClick={onClick}>
      <span className={`chapter-number ${completed ? "is-complete" : ""}`}>
        {String(number).padStart(2, "0")}
      </span>
      {artwork && (
        <img
          className="article-thumbnail"
          src={assetUrl(artwork.path)}
          alt=""
          loading="lazy"
        />
      )}
      <span className="article-row-copy">
        <span className="eyebrow">{article.kicker}</span>
        <strong>
          {tracked && (
            <img
              className="quest-marker"
              src={assetUrl(interfaceImages["main-quest"])}
              alt="Next chapter"
            />
          )}
          {article.title}
        </strong>
        <span>{article.summary}</span>
      </span>
      <span className="row-duration">{readingMinutes(article)} min</span>
    </button>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const [savedState, setSavedState] = useState(readSavedState);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [journeyFilter, setJourneyFilter] = useState("all");
  const [characterFilter, setCharacterFilter] = useState("all");
  const [characterQuery, setCharacterQuery] = useState("");
  const [storageError, setStorageError] = useState(false);
  const searchDialog = useRef(null);
  const pageHeading = useRef(null);
  const completedChapters = chapters.filter((chapter) =>
    savedState.completed.includes(chapter.id),
  ).length;
  const lastArticle = allArticles.find(
    (article) => article.id === savedState.lastRead,
  );
  const nextChapter =
    chapters.find((chapter) => !savedState.completed.includes(chapter.id)) ??
    chapters[0];
  const currentArticle = (
    route.page === "article" ? continuityArticles : chapters
  ).find((article) => article.id === route.identifier);
  const currentCharacter = characterEntries.find(
    (character) => character.id === route.identifier,
  );

  const currentNavigation =
    route.page === "chapter"
      ? "journey"
      : route.page === "character"
        ? "characters"
        : route.page === "article"
          ? "continuity"
          : route.page;

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute(window.location.hash));
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() =>
        pageHeading.current?.focus({ preventScroll: true }),
      );
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [savedState]);

  useEffect(() => {
    if (searchOpen) searchDialog.current?.showModal();
    else if (searchDialog.current?.open) searchDialog.current.close();
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, []);

  useEffect(() => {
    if (currentArticle && ["chapter", "article"].includes(route.page)) {
      setSavedState((previous) => ({
        ...previous,
        lastRead: currentArticle.id,
      }));
      document.title = `${currentArticle.title} | The Wolf's Path`;
    } else
      document.title = `${navigation.find((item) => item.page === route.page)?.label ?? "The Wolf's Path"} | A Witcher companion`;
  }, [route.page, route.identifier, currentArticle]);

  function openArticle(article) {
    goTo(
      chapters.some((chapter) => chapter.id === article.id)
        ? "chapter"
        : "article",
      article.id,
    );
  }

  function toggleSaved(field, identifier) {
    setSavedState((previous) => ({
      ...previous,
      [field]: toggleItem(previous[field], identifier),
    }));
  }

  function sourceLinks(sourceIds = []) {
    return sourceIds
      .map((identifier) => sources.find((source) => source.id === identifier))
      .filter(Boolean);
  }

  function renderHome() {
    const games = [
      {
        id: "one",
        year: "2007",
        title: "The Witcher",
        logo: interfaceImages["logo-w1"],
        image: "/images/witcher-one-scene.jpg",
        alt: "Geralt beside a lake in The Witcher",
        summary:
          "Geralt’s return, the Salamandra investigation, and the conflict in Vizima.",
        entries: witcherOneChapters,
      },
      {
        id: "two",
        year: "2011",
        title: "The Witcher 2: Assassins of Kings",
        logo: interfaceImages["logo-w2"],
        image: "/images/witcher-two-scene.jpg",
        alt: "Geralt overlooking a mountain settlement in The Witcher 2",
        summary:
          "Foltest’s murder, Roche and Iorveth’s routes, and Geralt’s recovered memories.",
        entries: witcherTwoChapters,
      },
    ];
    return (
      <>
        <section className="hero">
          <img
            className="hero-image"
            src={assetUrl("/images/world/w3-key-art.jpg")}
            alt=""
          />
          <div className="hero-content">
            <img
              className="hero-medallion"
              src={assetUrl(interfaceImages.medallion)}
              alt=""
            />
            <p className="eyebrow">THE WOLF'S PATH</p>
            <h1 ref={pageHeading} tabIndex={-1}>
              Before
              <br />
              <span className="nowrap">The Witcher 3</span>
            </h1>
            <p className="hero-description">
              Recaps of The Witcher and The Witcher 2, character histories, and
              the books behind the games.
            </p>
            <div className="hero-actions">
              <button
                className="button primary"
                onClick={() => openArticle(lastArticle ?? nextChapter)}
              >
                {lastArticle ? "Continue reading" : "Start the first recap"}
              </button>
              <span className="hero-meta">Witcher 3 plot protected</span>
            </div>
          </div>
        </section>
        <div className="home-body">
          <div className="spoiler-notice">
            <p>
              <strong>Spoiler scope</strong> Full spoilers for The Witcher 1 &
              2. No later Witcher 3 story revelations. Book ending spoilers are
              opt-in.
            </p>
            <button onClick={() => goTo("sources")}>Our approach</button>
          </div>
          <section id="your-path" className="path-section">
            <SectionHeading
              eyebrow="GAME RECAPS"
              title="The first two games"
              action={
                <button className="text-link" onClick={() => goTo("journey")}>
                  All chapters
                </button>
              }
            >
              Follow the main stories and their alternative routes.
            </SectionHeading>
            <div className="game-grid">
              {games.map((game) => {
                const completedCount = game.entries.filter((entry) =>
                  savedState.completed.includes(entry.id),
                ).length;
                return (
                  <button
                    key={game.id}
                    className="game-card framed"
                    onClick={() => openArticle(game.entries[0])}
                  >
                    <img src={assetUrl(game.image)} alt={game.alt} />
                    <span className="game-card-copy">
                      <span className="eyebrow">
                        {game.year} · {game.entries.length} chapters
                      </span>
                      <img
                        className="game-logo"
                        src={assetUrl(game.logo)}
                        alt={game.title}
                      />
                      <span className="game-card-summary">{game.summary}</span>
                      <span className="game-card-footer">
                        <span className="mini-progress">
                          <span
                            style={{
                              width: `${(completedCount / game.entries.length) * 100}%`,
                            }}
                          />
                        </span>
                        <span>
                          {completedCount} / {game.entries.length} remembered
                        </span>
                        <span className="text-link">Read the recap</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
        <figure className="interlude">
          <img src={assetUrl("/images/world/w3-0.jpg")} alt="" loading="lazy" />
          <blockquote>
            “Evil is evil. Lesser, greater, middling, it’s all the same.”
            <cite>GERALT OF RIVIA · THE LAST WISH</cite>
          </blockquote>
        </figure>
        <div className="home-body">
          <section className="glossary-teaser">
            <SectionHeading
              eyebrow="CHARACTER GUIDE"
              title="Returning characters"
              action={
                <button
                  className="text-link"
                  onClick={() => goTo("characters")}
                >
                  Browse {characterEntries.length} characters
                </button>
              }
            >
              Look up earlier appearances, relationships, and allegiances.
            </SectionHeading>
            <div className="portrait-row">
              {["geralt", "yennefer", "triss", "ciri", "vesemir", "dandelion"]
                .map((identifier) =>
                  characterEntries.find(
                    (character) => character.id === identifier,
                  ),
                )
                .map((character) => (
                  <button
                    key={character.id}
                    className="portrait-tile"
                    onClick={() => goTo("character", character.id)}
                  >
                    <CharacterPortrait characterId={character.id} decorative />
                    <span>{character.name}</span>
                  </button>
                ))}
            </div>
          </section>
          <div className="home-split">
            <button
              className="books-panel framed"
              onClick={() => goTo("continuity")}
            >
              <span className="books-panel-copy">
                <span className="eyebrow">CONTINUITY & ADAPTATION</span>
                <strong>Books & games</strong>
                <span>Differences and documented decisions.</span>
                <span className="text-link">Read the comparisons</span>
              </span>
            </button>
            <section className="journey-strip framed">
              <p className="eyebrow">READING PROGRESS</p>
              <h3>Your saved progress</h3>
              <div className="journey-count">
                <img src={assetUrl(interfaceImages.xp)} alt="" />
                <strong>{completedChapters}</strong>
                <span>/ {chapters.length}</span>
              </div>
              <div className="progress-track">
                <span
                  style={{
                    width: `${(completedChapters / chapters.length) * 100}%`,
                  }}
                />
              </div>
              <p>
                {completedChapters} of {chapters.length} chapters remembered.
                Your progress stays in this browser.
              </p>
              <button
                className="text-link"
                onClick={() => openArticle(lastArticle ?? nextChapter)}
              >
                {lastArticle
                  ? "Return to your reading"
                  : "Start at Kaer Morhen"}
              </button>
            </section>
          </div>
          <section className="remember-section">
            <SectionHeading
              eyebrow="ABOUT THIS GUIDE"
              title="Choices, sources, and spoilers"
            />
            <div className="principles-grid">
              <div>
                <img
                  className="sign-icon"
                  src={assetUrl(interfaceImages.axii)}
                  alt=""
                />
                <h3>Alternative routes</h3>
                <p>
                  Different routes are marked throughout. Roche or Iorveth,
                  Order or Scoia’tael: there is no single version of every
                  decision.
                </p>
              </div>
              <div>
                <img
                  className="sign-icon"
                  src={assetUrl(interfaceImages.yrden)}
                  alt=""
                />
                <h3>Sources for each chapter</h3>
                <p>
                  Follow each chapter’s sources. Game events, book material, and
                  documented creative decisions are clearly distinguished.
                </p>
              </div>
              <div>
                <img
                  className="sign-icon"
                  src={assetUrl(interfaceImages.quen)}
                  alt=""
                />
                <h3>Witcher 3 spoiler protection</h3>
                <p>
                  Get the history you need for Witcher 3 without learning its
                  later twists. Book ending details wait behind a separate
                  choice.
                </p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  function renderJourney() {
    const sections = [
      {
        id: "one",
        label: "THE WITCHER · 2007",
        title: "The Witcher",
        intro:
          "From the walls of Kaer Morhen to the burning streets of Vizima.",
        entries: witcherOneChapters,
        logo: interfaceImages["logo-w1"],
        image: "/images/chapters/w1-04.jpg",
      },
      {
        id: "two",
        label: "THE WITCHER 2 · 2011",
        title: "The Witcher 2",
        intro:
          "The kingslayers, two very different roads, and the truth Geralt recovers.",
        entries: witcherTwoChapters,
        logo: interfaceImages["logo-w2"],
        image: "/images/chapters/w2-04.jpg",
      },
    ];
    return (
      <div className="page-content">
        <PageIntro
          image="/images/world/w3-18.jpg"
          position="50% 55%"
          eyebrow="GAME RECAPS"
          title="The Witcher 1 & 2"
          description="A chapter-by-chapter return to the first two games. Read in order, or pick up the part you’ve forgotten."
          headingRef={pageHeading}
        />
        <div className="inline-notice">
          <span>
            Full spoilers for games 1 & 2. Choices are presented as branches,
            never a single mandatory history.
          </span>
        </div>
        <div className="filter-bar">
          {[
            ["all", "The whole journey"],
            ["one", "The Witcher"],
            ["two", "The Witcher 2"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={journeyFilter === value ? "active" : ""}
              aria-pressed={journeyFilter === value}
              onClick={() => setJourneyFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        {sections
          .filter(
            (section) =>
              journeyFilter === "all" || journeyFilter === section.id,
          )
          .map((section) => (
            <section className="chapter-section" key={section.id}>
              <div className="section-banner">
                <img src={assetUrl(section.image)} alt="" loading="lazy" />
                <SectionHeading
                  eyebrow={section.label}
                  title={
                    <img
                      className="section-logo"
                      src={assetUrl(section.logo)}
                      alt={section.title}
                    />
                  }
                  action={
                    <span className="section-progress">
                      {
                        section.entries.filter((entry) =>
                          savedState.completed.includes(entry.id),
                        ).length
                      }{" "}
                      / {section.entries.length} remembered
                    </span>
                  }
                >
                  {section.intro}
                </SectionHeading>
              </div>
              <div className="chapter-list">
                {section.entries.map((article, index) => (
                  <ArticleLink
                    key={article.id}
                    article={article}
                    number={index + 1}
                    tracked={article.id === nextChapter.id}
                    completed={savedState.completed.includes(article.id)}
                    onClick={() => openArticle(article)}
                  />
                ))}
              </div>
            </section>
          ))}
      </div>
    );
  }

  function renderArticle() {
    if (!currentArticle) return renderNotFound();
    const isBookArticle = route.page === "article";
    const articleCollection = isBookArticle ? continuityArticles : chapters;
    const articleIndex = articleCollection.findIndex(
      (article) => article.id === currentArticle.id,
    );
    const nextArticle = articleCollection[articleIndex + 1];
    const previousArticle = articleCollection[articleIndex - 1];
    const bookSpoilersLocked = isBookArticle && !savedState.bookSpoilers;
    const chapterArt = isBookArticle
      ? null
      : getChapterArtwork(currentArticle.id);
    const relatedCharacters = characterEntries.filter((character) =>
      currentArticle.characters.some((name) =>
        matchesCharacterName(character.name, name),
      ),
    );
    return (
      <div
        className={`reader-layout ${isBookArticle ? "comparison-reader-layout" : ""}`}
      >
        <header className="reader-banner">
          <img
            src={assetUrl(chapterArt?.path ?? "/images/rogue-mage-scene.jpg")}
            alt={chapterArt?.caption ?? ""}
          />
          <div className="reader-banner-copy">
            <button
              className="back-link"
              onClick={() => goTo(isBookArticle ? "continuity" : "journey")}
            >
              {isBookArticle ? "Books & games" : "All chapters"}
            </button>
            <span className="eyebrow">{currentArticle.kicker}</span>
            <h1 ref={pageHeading} tabIndex={-1}>
              {currentArticle.title}
            </h1>
            <div className="reader-meta">
              {readingMinutes(currentArticle)} minute read<span>·</span>
              <span>
                {isBookArticle
                  ? "Book & game spoilers"
                  : "Witcher 1 & 2 spoilers"}
              </span>
              <button
                className={`icon-button ${savedState.bookmarks.includes(currentArticle.id) ? "bookmarked" : ""}`}
                onClick={() => toggleSaved("bookmarks", currentArticle.id)}
                aria-label={
                  savedState.bookmarks.includes(currentArticle.id)
                    ? "Remove bookmark"
                    : "Bookmark chapter"
                }
                aria-pressed={savedState.bookmarks.includes(currentArticle.id)}
              >
                {savedState.bookmarks.includes(currentArticle.id)
                  ? "Bookmarked"
                  : "Bookmark"}
              </button>
            </div>
          </div>
          {chapterArt && (
            <span className="reader-banner-caption">
              {chapterArt.game === "one" ? "The Witcher" : "The Witcher 2"}{" "}
              imagery · {chapterArt.caption}
            </span>
          )}
        </header>
        <aside className="reader-sidebar">
          <p className="eyebrow">
            {isBookArticle ? "COMPARISONS" : "YOUR READING PATH"}
          </p>
          <nav aria-label="Chapters">
            {articleCollection.map((article, index) => (
              <button
                className={`${article.id === currentArticle.id ? "active" : ""} ${savedState.completed.includes(article.id) ? "is-complete" : ""}`}
                key={article.id}
                onClick={() => openArticle(article)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {article.title}
              </button>
            ))}
          </nav>
        </aside>
        <article className="reader">
          {bookSpoilersLocked ? (
            <div className="spoiler-gate">
              <img
                className="gate-lock"
                src={assetUrl(interfaceImages.locked)}
                alt=""
              />
              <h2>Book spoilers are hidden</h2>
              <p>
                This comparison discusses the books, including the ending of the
                original saga. It does not reveal later Witcher 3 outcomes.
              </p>
              <button
                className="button primary"
                onClick={() =>
                  setSavedState((previous) => ({
                    ...previous,
                    bookSpoilers: true,
                  }))
                }
              >
                Show book comparisons
              </button>
            </div>
          ) : (
            <>
              <p className="reader-lead">{currentArticle.summary}</p>
              {currentArticle.branchNote && (
                <div className="branch-note">
                  <div>
                    <strong>A fork in the Path</strong>
                    <p>{currentArticle.branchNote}</p>
                  </div>
                </div>
              )}
              {isBookArticle ? (
                <ComparisonSpread article={currentArticle} />
              ) : (
                <div className="reader-prose">
                  {currentArticle.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              <div className="takeaways">
                <p className="eyebrow">CARRY THIS INTO WITCHER 3</p>
                <ul>
                  {currentArticle.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>
              {relatedCharacters.length > 0 && (
                <div className="related-characters">
                  <p className="eyebrow">PEOPLE IN THIS CHAPTER</p>
                  <div>
                    {relatedCharacters.map((character) => (
                      <button
                        key={character.id}
                        onClick={() => goTo("character", character.id)}
                      >
                        <CharacterPortrait
                          characterId={character.id}
                          decorative
                          className="related-portrait"
                        />
                        <span>{character.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <details className="chapter-sources">
                <summary>
                  Sources & further reading{" "}
                  <span>{sourceLinks(currentArticle.sourceIds).length}</span>
                </summary>
                {sourceLinks(currentArticle.sourceIds).map((source) => (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    key={source.id}
                  >
                    <span>
                      <strong>{source.title}</strong>
                      <small>{source.detail}</small>
                    </span>
                  </a>
                ))}
              </details>
              <button
                className={`button completion-button ${savedState.completed.includes(currentArticle.id) ? "completed" : ""}`}
                onClick={() => toggleSaved("completed", currentArticle.id)}
              >
                {savedState.completed.includes(currentArticle.id)
                  ? "Chapter remembered"
                  : "Mark as remembered"}
              </button>
              <div className="reader-pagination">
                {previousArticle ? (
                  <button onClick={() => openArticle(previousArticle)}>
                    <span>
                      <small>PREVIOUS</small>
                      {previousArticle.title}
                    </span>
                  </button>
                ) : (
                  <span />
                )}
                {nextArticle ? (
                  <button onClick={() => openArticle(nextArticle)}>
                    <span>
                      <small>NEXT CHAPTER</small>
                      {nextArticle.title}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => goTo(isBookArticle ? "home" : "characters")}
                  >
                    <span>
                      <small>KEEP EXPLORING</small>
                      {isBookArticle
                        ? "Back to the beginning"
                        : "Familiar faces"}
                    </span>
                  </button>
                )}
              </div>
            </>
          )}
        </article>
      </div>
    );
  }

  function renderCharacters() {
    const visibleCharacters = characterEntries.filter(
      (character) =>
        matchesSearch(
          {
            name: character.name,
            role: character.role,
            faction: character.faction,
          },
          characterQuery,
        ) &&
        (characterFilter === "all" ||
          (characterFilter === "witchers"
            ? /witcher/i.test(character.role + character.faction)
            : characterFilter === "magic"
              ? /sorcer|mage|magic/i.test(character.role + character.faction)
              : /king|queen|emperor|intelligence|commander|politic|spy|soldier/i.test(
                  character.role + character.faction,
                ))),
    );
    return (
      <div className="page-content">
        <PageIntro
          image="/images/world/w3-7.jpg"
          position="50% 45%"
          eyebrow="CHARACTER GUIDE"
          title="Returning characters"
          description="The people behind the names. Their history, their loyalties, and what to remember before you meet again."
          headingRef={pageHeading}
        />
        <div className="character-tools">
          <div className="filter-bar">
            {[
              ["all", "Everyone"],
              ["witchers", "Witchers"],
              ["magic", "Magic"],
              ["politics", "Power & politics"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={characterFilter === value ? "active" : ""}
                aria-pressed={characterFilter === value}
                onClick={() => setCharacterFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="inline-search">
            <input
              value={characterQuery}
              onChange={(event) => setCharacterQuery(event.target.value)}
              placeholder="Find a familiar name…"
              aria-label="Search characters"
            />
          </label>
        </div>
        <p className="result-count">
          {visibleCharacters.length} people on the Path
        </p>
        <div className="character-grid">
          {visibleCharacters.map((character) => (
            <button
              className="character-card"
              key={character.id}
              onClick={() => goTo("character", character.id)}
            >
              <CharacterPortrait
                characterId={character.id}
                name={character.name}
                decorative
              />
              <div className="character-card-copy">
                <p className="eyebrow">{character.faction}</p>
                <h2>{character.name}</h2>
                <p>{character.role}</p>
                <span className="text-link">View character history</span>
              </div>
            </button>
          ))}
        </div>
        {visibleCharacters.length === 0 && (
          <EmptyState
            title="No characters found"
            description="Try another name or choose Everyone to widen your search."
          />
        )}
      </div>
    );
  }

  function renderCharacter() {
    if (!currentCharacter) return renderNotFound();
    const relatedArticles = chapters.filter((article) =>
      article.characters.some((name) =>
        matchesCharacterName(currentCharacter.name, name),
      ),
    );
    return (
      <div className="page-content character-detail">
        <button className="back-link" onClick={() => goTo("characters")}>
          All familiar faces
        </button>
        <div className="character-detail-header">
          <div className="character-detail-intro">
            <p className="eyebrow">{currentCharacter.faction}</p>
            <h1 ref={pageHeading} tabIndex={-1}>
              {currentCharacter.name}
            </h1>
            <p className="character-role">{currentCharacter.role}</p>
            <p className="reader-lead">{currentCharacter.summary}</p>
          </div>
          <CharacterPortrait
            characterId={currentCharacter.id}
            name={currentCharacter.name}
            className="character-detail-portrait framed"
          />
        </div>
        <div className="character-history">
          <h2>Before the Wild Hunt</h2>
          {currentCharacter.earlier.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="takeaways">
          <p className="eyebrow">THE THING TO REMEMBER</p>
          <p>{currentCharacter.remember}</p>
        </div>
        {relatedArticles.length > 0 && (
          <section className="character-chapters">
            <SectionHeading
              eyebrow="RELATED CHAPTERS"
              title="Earlier appearances"
            />
            {relatedArticles.map((article, index) => (
              <ArticleLink
                key={article.id}
                article={article}
                number={index + 1}
                completed={savedState.completed.includes(article.id)}
                onClick={() => openArticle(article)}
              />
            ))}
          </section>
        )}
        <details className="chapter-sources">
          <summary>Character sources</summary>
          {sourceLinks(currentCharacter.sourceIds).map((source) => (
            <a
              href={source.url}
              key={source.id}
              target="_blank"
              rel="noreferrer"
            >
              {source.title}
            </a>
          ))}
        </details>
      </div>
    );
  }

  function renderComparisonCard(article, index) {
    return (
      <button
        className="comparison-card"
        key={article.id}
        onClick={() => openArticle(article)}
      >
        <div
          className={`comparison-card-art ${article.id === "other-games" ? "comparison-game-art" : ""}`}
        >
          {article.id === "other-games" ? (
            <>
              {["thronebreaker", "rogue-mage"].map((identifier) => (
                <img
                  key={identifier}
                  src={assetUrl(
                    publicationArtwork.find(
                      (publication) => publication.id === identifier,
                    ).path,
                  )}
                  alt=""
                  loading="lazy"
                />
              ))}
            </>
          ) : (
            <CharacterPortrait
              characterId={comparisonLayouts[article.id].character}
              decorative
            />
          )}
          <span className="comparison-card-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="comparison-card-copy">
          <p className="eyebrow">{article.kicker}</p>
          <h2>{article.title}</h2>
          <p>
            {savedState.bookSpoilers
              ? article.summary
              : "Open to choose whether to reveal the book and game comparison."}
          </p>
          <span className="text-link">
            {!savedState.bookSpoilers && (
              <img
                className="lock-icon"
                src={assetUrl(interfaceImages.locked)}
                alt=""
              />
            )}
            {savedState.bookSpoilers
              ? "Read comparison"
              : "Book spoilers hidden"}
          </span>
        </div>
      </button>
    );
  }

  function renderContinuity() {
    return (
      <div className="page-content">
        <PageIntro
          image="/images/rogue-mage-scene.jpg"
          position="50% 55%"
          eyebrow="BOOKS & GAMES"
          title="Books & games"
          description="The same roots. Different continuities. Understand what CD Projekt Red continued, what it adapted, and where the evidence ends."
          headingRef={pageHeading}
        />
        <div className="continuity-banner">
          <div>
            <h2>A continuation, in the games’ own continuity.</h2>
            <p>
              The games build on Andrzej Sapkowski’s books. They do not turn
              their later events into sequels written by Sapkowski. This guide
              keeps that distinction visible.
            </p>
          </div>
        </div>
        <div className="inline-notice">
          <span>
            Comparisons may discuss the original saga’s ending.{" "}
            {savedState.bookSpoilers
              ? "Book spoilers are currently enabled."
              : "You’ll be asked to reveal the comparison text."}
          </span>
          {savedState.bookSpoilers && (
            <button
              onClick={() =>
                setSavedState((previous) => ({
                  ...previous,
                  bookSpoilers: false,
                }))
              }
            >
              Hide book spoilers
            </button>
          )}
        </div>
        <section className="comparison-group">
          <SectionHeading
            eyebrow="BOOKS AND GAMES COMPARED"
            title="What the books add"
          >
            The saga’s version of each person and event, set against the first
            two games, and what Witcher 3 assumes you already know.
          </SectionHeading>
          <div className="comparison-card-grid">
            {continuityArticles
              .filter((article) => article.group === "compare")
              .map((article, index) => renderComparisonCard(article, index))}
          </div>
        </section>
        <section className="comparison-group">
          <SectionHeading
            eyebrow="CANON AND OTHER MEDIA"
            title="Notes on continuity"
          >
            How the games relate to the books as canon, plus the side games,
            comics and adaptations around them.
          </SectionHeading>
          <div className="comparison-card-grid">
            {continuityArticles
              .filter((article) => article.group === "canon")
              .map((article, index) => renderComparisonCard(article, index))}
          </div>
        </section>
      </div>
    );
  }

  function renderSources() {
    return (
      <div className="page-content">
        <PageIntro
          image="/images/world/w3-15.jpg"
          position="50% 40%"
          eyebrow="REFERENCE LIBRARY"
          title="Sources & lore"
          description="A reference library for this companion. Every recap and character entry links back to the sources used to write it."
          headingRef={pageHeading}
        />
        <div className="source-principles">
          <div>
            <h2>How this guide handles facts</h2>
            <p>
              Game plot is checked against quest walkthroughs, game dialogue,
              and CD Projekt Red’s own material. Community-maintained references
              are identified as such. A character’s accusation or theory is not
              automatically a confirmed event.
            </p>
          </div>
          <div>
            <h2>Branches stay branches</h2>
            <p>
              Player-dependent outcomes are conditional. Adaptation explanations
              are attributed when documented; an unexplained difference stays
              unexplained. No later Witcher 3 story outcomes are needed for
              these recaps.
            </p>
          </div>
        </div>
        <p className="source-date">
          Research compiled 19 October 2026. This is an independent fan
          companion, not an official CD Projekt Red publication. External source
          sites can contain spoilers beyond this companion.
        </p>
        <h2 className="source-section-title">
          Reading & reference library <span>{sources.length}</span>
        </h2>
        <SourcesLibrary
          witcherOneSources={witcherOneSources}
          witcherTwoSources={witcherTwoSources}
          continuitySources={continuitySources}
        />
        <section className="art-credits">
          <h2>Artwork & attribution</h2>
          <p>
            The Witcher universe was created by Andrzej Sapkowski. The Witcher
            game artwork and characters © CD PROJEKT S.A. Game screenshots via
            the{" "}
            <a
              href="https://store.steampowered.com/app/20900/"
              target="_blank"
              rel="noreferrer"
            >
              original game
            </a>{" "}
            and{" "}
            <a
              href="https://store.steampowered.com/app/20920/"
              target="_blank"
              rel="noreferrer"
            >
              sequel
            </a>{" "}
            Steam pages, along with Witcher 3 and expansion screenshots and the
            three game logos. The School of the Wolf medallion, Signs and quest
            markers are game interface art, hosted by the Witcher Wiki.
          </p>
          <details className="visual-credits">
            <summary>
              Image credits and original sources{" "}
              <span>
                {Object.keys(portraits).length +
                  chapterArtwork.length +
                  publicationArtwork.length +
                  worldArtwork.length +
                  interfaceArtwork.length}
              </span>
            </summary>
            {Object.entries(portraits).map(([identifier, portrait]) => (
              <a
                key={identifier}
                href={portrait.sourcePage}
                target="_blank"
                rel="noreferrer"
              >
                <strong>
                  {
                    characterEntries.find(
                      (character) => character.id === identifier,
                    ).name
                  }
                </strong>
                <span>{portrait.credit}</span>
              </a>
            ))}
            {[
              ...chapterArtwork,
              ...publicationArtwork,
              ...worldArtwork,
              ...interfaceArtwork,
            ].map((artwork) => (
              <a
                key={artwork.id}
                href={artwork.sourcePage}
                target="_blank"
                rel="noreferrer"
              >
                <strong>{artwork.title ?? artwork.caption}</strong>
                <span>{artwork.credit}</span>
              </a>
            ))}
          </details>
        </section>
      </div>
    );
  }

  function renderSaved() {
    const savedArticles = allArticles.filter((article) =>
      savedState.bookmarks.includes(article.id),
    );
    return (
      <div className="page-content">
        <PageIntro
          image="/images/world/w3-2.jpg"
          position="50% 50%"
          eyebrow="READING LIST"
          title="Bookmarked chapters"
          description="Your bookmarked chapters, ready when a name or a memory needs another look. Saved only in this browser."
          headingRef={pageHeading}
        />
        {savedArticles.length ? (
          <div className="chapter-list">
            {savedArticles.map((article, index) => (
              <ArticleLink
                key={article.id}
                article={
                  continuityArticles.includes(article) &&
                  !savedState.bookSpoilers
                    ? {
                        ...article,
                        summary:
                          "Book and game comparison. Book spoiler protection is enabled.",
                      }
                    : article
                }
                number={index + 1}
                completed={savedState.completed.includes(article.id)}
                onClick={() => openArticle(article)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No bookmarks yet"
            description="Use the bookmark icon in any chapter to keep it here."
            action={
              <button
                className="button primary"
                onClick={() => goTo("journey")}
              >
                Explore the story
              </button>
            }
          />
        )}
      </div>
    );
  }

  function renderNotFound() {
    return (
      <div className="page-content">
        <PageIntro
          eyebrow="UNKNOWN ENTRY"
          title="Page not found"
          description="That entry could not be found. Return to the chapter list to find your way."
          headingRef={pageHeading}
        />
        <button className="button primary" onClick={() => goTo("journey")}>
          Back to the story
        </button>
      </div>
    );
  }

  const searchResults =
    searchQuery.trim().length > 1
      ? [
          ...chapters
            .filter((article) => matchesSearch(article, searchQuery))
            .map((article) => ({
              ...article,
              type: "Chapter",
              target: "chapter",
            })),
          ...characterEntries
            .filter((character) => matchesSearch(character, searchQuery))
            .map((character) => ({
              ...character,
              title: character.name,
              type: "Character",
              target: "character",
            })),
          ...continuityArticles
            .filter((article) =>
              matchesSearch(
                savedState.bookSpoilers
                  ? article
                  : { title: article.title, kicker: article.kicker },
                searchQuery,
              ),
            )
            .map((article) => ({
              ...article,
              summary: savedState.bookSpoilers
                ? article.summary
                : "Book comparison · spoiler protection enabled",
              type: "Books & games",
              target: "article",
            })),
        ]
      : [];

  const navTabs = navigation.map(({ page, label }) => (
    <a
      key={page}
      href={`#/${page}`}
      onClick={() => setMobileMenuOpen(false)}
      className={`nav-link ${currentNavigation === page ? "active" : ""}`}
      aria-current={currentNavigation === page ? "page" : undefined}
    >
      <span>{label}</span>
    </a>
  ));
  const progressPercent = Math.round(
    (completedChapters / chapters.length) * 100,
  );

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content").focus();
        }}
      >
        Skip to content
      </a>
      <header className="topbar">
        <button
          className="mobile-menu icon-button"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((previous) => !previous)}
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
        <a href="#/home" className="brand">
          <img src={assetUrl(interfaceImages.medallion)} alt="" />
          <span>THE WOLF’S PATH</span>
        </a>
        <nav className="main-tabs" aria-label="Main navigation">
          {navTabs}
        </nav>
        <div className="topbar-actions">
          <a
            href="#/saved"
            className={`topbar-icon ${route.page === "saved" ? "active" : ""}`}
            aria-label={`Your bookmarks${savedState.bookmarks.length ? `, ${savedState.bookmarks.length}` : ""}`}
            title="Your bookmarks"
          >
            Bookmarks
            {savedState.bookmarks.length > 0 && (
              <span className="nav-count">{savedState.bookmarks.length}</span>
            )}
          </a>
          <a
            href="#/sources"
            className={`topbar-icon ${route.page === "sources" ? "active" : ""}`}
            aria-label="Sources & lore"
            title="Sources & lore"
          >
            Sources
          </a>
          <button
            className="search-trigger"
            aria-label="Search the Continent"
            onClick={() => setSearchOpen(true)}
          >
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
      </header>
      <aside
        className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}
        inert={!mobileMenuOpen}
        aria-label="Navigation"
      >
        <nav aria-label="Main navigation, compact">{navTabs}</nav>
        <div className="ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <div className="sidebar-secondary">
          <a
            href="#/saved"
            onClick={() => setMobileMenuOpen(false)}
            className={`nav-link ${route.page === "saved" ? "active" : ""}`}
          >
            <span>Your bookmarks</span>
            {savedState.bookmarks.length > 0 && (
              <span className="nav-count">{savedState.bookmarks.length}</span>
            )}
          </a>
          <a
            href="#/sources"
            onClick={() => setMobileMenuOpen(false)}
            className={`nav-link ${route.page === "sources" ? "active" : ""}`}
          >
            <span>Sources & lore</span>
          </a>
        </div>
        <div className="sidebar-progress">
          <span>
            YOUR JOURNEY
            <span>{progressPercent}%</span>
          </span>
          <div className="progress-track">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <small>
            {completedChapters} / {chapters.length} chapters remembered
          </small>
        </div>
      </aside>
      {mobileMenuOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div className="main-shell">
        <main id="main-content" tabIndex={-1}>
          {route.page === "home"
            ? renderHome()
            : route.page === "journey"
              ? renderJourney()
              : route.page === "characters"
                ? renderCharacters()
                : route.page === "character"
                  ? renderCharacter()
                  : route.page === "continuity"
                    ? renderContinuity()
                    : ["chapter", "article"].includes(route.page)
                      ? renderArticle()
                      : route.page === "sources"
                        ? renderSources()
                        : renderSaved()}
        </main>
        {storageError && (
          <p className="storage-warning" role="status">
            Browser storage is unavailable. Progress will last for this visit
            only.
          </p>
        )}
        <footer className="footer">
          <div className="ornament" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <div className="footer-row">
            <span>
              THE WOLF’S PATH <span className="footer-diamond">◆</span>{" "}
              UNOFFICIAL WITCHER COMPANION
            </span>
            <span>
              Inspired by the world of Andrzej Sapkowski & CD PROJEKT RED.
              <button onClick={() => goTo("sources")}>Sources & credits</button>
            </span>
          </div>
          <p className="footer-disclaimer">
            Unofficial fan project, not affiliated with or endorsed by CD
            PROJEKT RED. The Witcher was created by Andrzej Sapkowski.
          </p>
        </footer>
      </div>
      <dialog
        className="search-dialog"
        aria-label="Search the companion"
        ref={searchDialog}
        onCancel={() => setSearchOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSearchOpen(false);
        }}
      >
        <div className="search-panel">
          <div className="search-input-wrap">
            <input
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="A name, a place, a half-remembered story…"
              aria-label="Search the companion"
            />
            <button
              className="icon-button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="search-results">
            {searchQuery.trim().length < 2 ? (
              <div className="search-hint">
                <p>Search the companion</p>
                <span>
                  Search chapters, characters, and book comparisons.
                  <br />
                  Try “Letho”, “Salamandra”, or “Yennefer”.
                </span>
              </div>
            ) : searchResults.length ? (
              <>
                <p className="eyebrow">{searchResults.length} THREADS FOUND</p>
                {searchResults.slice(0, 30).map((result) => (
                  <button
                    key={`${result.target}-${result.id}`}
                    onClick={() => {
                      goTo(result.target, result.id);
                      setSearchOpen(false);
                    }}
                  >
                    <span className="eyebrow">{result.type}</span>
                    <strong>{result.title}</strong>
                    <span>{result.summary}</span>
                  </button>
                ))}
              </>
            ) : (
              <div className="search-hint">
                <p>No results found</p>
                <span>Try a shorter name or another spelling.</span>
              </div>
            )}
          </div>
          <div className="search-footer">
            <span>
              <kbd>Esc</kbd> to close
            </span>
            <span>Chapters, characters, and comparisons</span>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function PageIntro({
  eyebrow,
  title,
  description,
  headingRef,
  image,
  position = "50% 50%",
}) {
  return (
    <div className={`page-intro ${image ? "has-art" : ""}`}>
      {image && (
        <img
          src={assetUrl(image)}
          alt=""
          style={{ objectPosition: position }}
        />
      )}
      <div className="page-intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 ref={headingRef} tabIndex={-1}>
          {title}
        </h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <img
        className="empty-medallion"
        src={assetUrl(interfaceImages.medallion)}
        alt=""
      />
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
