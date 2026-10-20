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
    };
  } catch {
    return {
      completed: [],
      bookmarks: [],
      lastRead: null,
      bookSpoilers: false,
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
