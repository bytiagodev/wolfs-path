import { useEffect, useRef, useState } from "react";
import { parseRoute } from "./lib.js";

const navigation = [{ page: "home", label: "Overview" }];

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const pageHeading = useRef(null);

  const currentNavigation = route.page;

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
      </header>
      <div className="main-shell">
        <main id="main-content" tabIndex={-1}>
          {renderHome()}
        </main>
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
