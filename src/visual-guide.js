import { publicationArtwork } from "./artwork.js";
import { bookComparisons } from "./data/book-comparisons.js";

export function getBookArtwork(identifier) {
  const layoutBook = comparisonLayouts[identifier]?.book;
  const bookId =
    layoutBook ??
    (identifier === "between-first-two"
      ? "season-of-storms"
      : identifier === "saga-ending"
        ? "lady-of-the-lake"
        : ["family-before-games", "triss-and-yennefer"].includes(identifier)
          ? "blood-of-elves"
          : "last-wish");
  return publicationArtwork.find((artwork) => artwork.id === bookId);
}

export const comparisonLayouts = {
  ...Object.fromEntries(
    bookComparisons.map((article) => [
      article.id,
      { ...article.layout, contextLabel: "Before Witcher 3" },
    ]),
  ),
  "separate-continuities": {
    left: [1],
    right: [0],
    context: [2],
    character: "geralt",
  },
  "saga-ending": {
    left: [0, 1],
    right: [2],
    context: [],
    character: "yennefer",
  },
  "amnesia-and-hunt": {
    left: [0],
    right: [1, 2],
    context: [3],
    leftLabel: "Geralt at the opening",
    rightLabel: "The history recovered",
    character: "letho",
  },
  "family-before-games": {
    left: [0, 1],
    right: [3],
    context: [2],
    character: "ciri",
  },
  "triss-and-yennefer": {
    left: [0],
    right: [1],
    context: [2],
    character: "triss",
  },
  "documented-adaptation-decisions": {
    left: [0],
    right: [1],
    context: [2],
    leftLabel: "The narrative decision",
    rightLabel: "The production decision",
    character: "geralt",
  },
  "new-stories-familiar-history": {
    left: [2],
    right: [0, 1],
    context: [],
    character: "iorveth",
  },
  "names-and-translations": {
    left: [0],
    right: [1],
    context: [2, 3],
    character: "dandelion",
  },
  "between-first-two": {
    left: [1],
    right: [0],
    context: [2, 3, 4],
    character: "foltest",
  },
  "premium-adventures": {
    left: [0, 1],
    right: [2],
    context: [],
    leftLabel: "The Price of Neutrality",
    rightLabel: "Side Effects",
    character: "eskel",
  },
  "other-games": {
    left: [0, 1],
    right: [2, 3],
    context: [],
    leftLabel: "Earlier campaigns",
    rightLabel: "Other formats",
    character: "geralt",
  },
  "screens-and-branches": {
    left: [0],
    right: [1],
    context: [2],
    leftLabel: "Screen adaptations",
    rightLabel: "Game continuity",
    character: "geralt",
  },
};
