import { useEffect, useRef, useState } from "react";
import CharacterPortrait from "./components/CharacterPortrait.jsx";
import { witcherOneChapters, witcherOneSources } from "./data/witcher-one.js";
import { witcherTwoChapters, witcherTwoSources } from "./data/witcher-two.js";
import { continuitySources, characterEntries } from "./data/continuity.js";
import {
  matchesCharacterName,
  parseRoute,
  readSavedState,
  readingMinutes,
  STORAGE_KEY,
  toggleItem,
} from "./lib.js";

const chapters = [...witcherOneChapters, ...witcherTwoChapters];
const allArticles = [...chapters];
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

function ArticleLink({ article, onClick, completed = false, number }) {
  return (
    <button className="article-row" onClick={onClick}>
      <span className={`chapter-number ${completed ? "is-complete" : ""}`}>
        {String(number).padStart(2, "0")}
      </span>
      <span className="article-row-copy">
        <span className="eyebrow">{article.kicker}</span>
        <strong>{article.title}</strong>
        <span>{article.summary}</span>
      </span>
      <span className="row-duration">{readingMinutes(article)} min</span>
    </button>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const [savedState, setSavedState] = useState(readSavedState);
  const [journeyFilter, setJourneyFilter] = useState("all");
  const [characterFilter, setCharacterFilter] = useState("all");
  const [storageError, setStorageError] = useState(false);
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
  const currentArticle = chapters.find(
    (article) => article.id === route.identifier,
  );
  const currentCharacter = characterEntries.find(
    (character) => character.id === route.identifier,
  );

  const currentNavigation =
    route.page === "chapter"
      ? "journey"
      : route.page === "character"
        ? "characters"
        : route.page;

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute(window.location.hash));
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
    return (
      <>
        <section className="hero">
          <div className="hero-content">
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
          </div>
        </section>
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
      },
      {
        id: "two",
        label: "THE WITCHER 2 · 2011",
        title: "The Witcher 2",
        intro:
          "The kingslayers, two very different roads, and the truth Geralt recovers.",
        entries: witcherTwoChapters,
      },
    ];
    return (
      <div className="page-content">
        <PageIntro
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
              <SectionHeading
                eyebrow={section.label}
                title={section.title}
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
              <div className="chapter-list">
                {section.entries.map((article, index) => (
                  <ArticleLink
                    key={article.id}
                    article={article}
                    number={index + 1}
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
    const articleCollection = chapters;
    const articleIndex = articleCollection.findIndex(
      (article) => article.id === currentArticle.id,
    );
    const nextArticle = articleCollection[articleIndex + 1];
    const previousArticle = articleCollection[articleIndex - 1];
    const relatedCharacters = characterEntries.filter((character) =>
      currentArticle.characters.some((name) =>
        matchesCharacterName(character.name, name),
      ),
    );
    return (
      <div className="reader-layout">
        <header className="reader-banner">
          <div className="reader-banner-copy">
            <button className="back-link" onClick={() => goTo("journey")}>
              All chapters
            </button>
            <span className="eyebrow">{currentArticle.kicker}</span>
            <h1 ref={pageHeading} tabIndex={-1}>
              {currentArticle.title}
            </h1>
            <div className="reader-meta">
              {readingMinutes(currentArticle)} minute read<span>·</span>
              <span>Witcher 1 & 2 spoilers</span>
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
        </header>
        <aside className="reader-sidebar">
          <p className="eyebrow">YOUR READING PATH</p>
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
            <div className="reader-prose">
              {currentArticle.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
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
                <button onClick={() => goTo("characters")}>
                  <span>
                    <small>KEEP EXPLORING</small>
                    Familiar faces
                  </span>
                </button>
              )}
            </div>
          </>
        </article>
      </div>
    );
  }

  function renderCharacters() {
    const visibleCharacters = characterEntries.filter(
      (character) =>
        characterFilter === "all" ||
        (characterFilter === "witchers"
          ? /witcher/i.test(character.role + character.faction)
          : characterFilter === "magic"
            ? /sorcer|mage|magic/i.test(character.role + character.faction)
            : /king|queen|emperor|intelligence|commander|politic|spy|soldier/i.test(
                character.role + character.faction,
              )),
    );
    return (
      <div className="page-content">
        <PageIntro
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

  function renderSaved() {
    const savedArticles = allArticles.filter((article) =>
      savedState.bookmarks.includes(article.id),
    );
    return (
      <div className="page-content">
        <PageIntro
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
                article={article}
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

  const navTabs = navigation.map(({ page, label }) => (
    <a
      key={page}
      href={`#/${page}`}
      className={`nav-link ${currentNavigation === page ? "active" : ""}`}
      aria-current={currentNavigation === page ? "page" : undefined}
    >
      <span>{label}</span>
    </a>
  ));

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
        <a href="#/home" className="brand">
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
        </div>
      </header>
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
                  : ["chapter", "article"].includes(route.page)
                    ? renderArticle()
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
              THE WOLF’S PATH <span className="footer-diamond">◆</span> PRIVATE
              READING COMPANION
            </span>
            <span>
              Inspired by the world of Andrzej Sapkowski & CD PROJEKT RED.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function PageIntro({ eyebrow, title, description, headingRef }) {
  return (
    <div className="page-intro">
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
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
