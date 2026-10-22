export const STORAGE_KEY = "wolfs-path-reading-v1";

export function readSavedState(storage) {
  try {
    // Access can itself throw when browser privacy settings deny storage.
    const saved = JSON.parse(
      (storage ?? globalThis.localStorage).getItem(STORAGE_KEY),
    );
    return {
      completed: Array.isArray(saved?.completed)
        ? saved.completed.filter((value) => typeof value === "string")
        : [],
      bookmarks: Array.isArray(saved?.bookmarks)
        ? saved.bookmarks.filter((value) => typeof value === "string")
        : [],
      lastRead: typeof saved?.lastRead === "string" ? saved.lastRead : null,
      bookSpoilers: saved?.bookSpoilers === true,
      choices: Object.fromEntries(
        Object.entries(
          saved?.choices && typeof saved.choices === "object"
            ? saved.choices
            : {},
        ).filter(([, value]) => typeof value === "string"),
      ),
    };
  } catch {
    return {
      completed: [],
      bookmarks: [],
      lastRead: null,
      bookSpoilers: false,
      choices: {},
    };
  }
}

export function toggleItem(collection, item) {
  return collection.includes(item)
    ? collection.filter((entry) => entry !== item)
    : [...collection, item];
}

export function readingMinutes(article) {
  const wordCount = [
    article.summary,
    ...(article.paragraphs ?? []),
    ...(article.takeaways ?? []),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 210));
}

function normalizeSearchText(text) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[’']/g, "")
    .toLowerCase();
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Field groups from strongest to weakest. A hit in a name or title outranks
// a passing mention deep in a recap.
function searchFieldTiers(entry) {
  return [
    [entry.title, entry.name],
    [entry.kicker, entry.role, entry.faction, entry.summary],
    [entry.remember, ...(entry.takeaways ?? []), ...(entry.characters ?? [])],
    [...(entry.paragraphs ?? []), ...(entry.earlier ?? [])],
  ].map((fields) => normalizeSearchText(fields.filter(Boolean).join(" ")));
}

// Returns null when nothing matches. Matches must start a word, so Roach
// never matches "approach". A higher tier is a stronger field, and hits
// counts every mention as a tie-breaker.
export function searchRank(entry, query) {
  const needle = normalizeSearchText(query.trim());
  if (!needle) return null;
  const wordStart = new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${escapeRegExp(needle)}`,
    "gu",
  );
  const counts = searchFieldTiers(entry).map(
    (text) => text.match(wordStart)?.length ?? 0,
  );
  const strongest = counts.findIndex((count) => count > 0);
  if (strongest === -1) return null;
  return {
    tier: counts.length - strongest,
    hits: counts.reduce((total, count) => total + count, 0),
  };
}

// An empty query matches everything, so filtered lists start full.
export function matchesSearch(entry, query) {
  return !query.trim() || searchRank(entry, query) !== null;
}

// Compare whole name fragments, so Geralt matches Geralt of Rivia
// while Ves never becomes a match for Vesemir.
export function matchesCharacterName(characterName, referenceName) {
  const words = (name) =>
    name
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .trim()
      .split(/\s+/);
  const characterWords = words(characterName);
  const referenceWords = words(referenceName);
  const shorterWords =
    characterWords.length <= referenceWords.length
      ? characterWords
      : referenceWords;
  const longerWords =
    characterWords.length > referenceWords.length
      ? characterWords
      : referenceWords;
  return (
    shorterWords[0] !== "" &&
    longerWords.some(
      (candidateWord, offset) =>
        candidateWord === shorterWords[0] &&
        shorterWords.every(
          (word, index) => word === longerWords[offset + index],
        ),
    )
  );
}

export function parseRoute(hash) {
  const [page = "home", identifier = ""] = hash.replace(/^#\/?/, "").split("/");
  const validPages = [
    "home",
    "journey",
    "chapter",
    "characters",
    "character",
    "continuity",
    "article",
    "sources",
    "saved",
    "playthrough",
  ];
  let decodedIdentifier;
  try {
    decodedIdentifier = decodeURIComponent(identifier);
  } catch {
    decodedIdentifier = "";
  }
  return {
    page: validPages.includes(page) ? page : "home",
    identifier: decodedIdentifier,
  };
}
