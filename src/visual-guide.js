import { chapterArtwork } from "./artwork.js";
import { bookComparisons } from "./data/book-comparisons.js";

export const bookTitles = {
  "last-wish": "The Last Wish",
  "sword-of-destiny": "Sword of Destiny",
  "blood-of-elves": "Blood of Elves",
  "time-of-contempt": "The Time of Contempt",
  "baptism-of-fire": "Baptism of Fire",
  "tower-of-swallows": "The Tower of Swallows",
  "lady-of-the-lake": "The Lady of the Lake",
  "season-of-storms": "Season of Storms",
};

const chapterImages = {
  "w1-kaer-morhen": "w1-kaer-morhen-art",
  "w1-outskirts": "w1-ss-0",
  "w1-vizima-investigation": "w1-ss-12",
  "w1-trade-quarter": "w1-ss-5",
  "w1-source-and-assault": "w1-ss-2",
  "w1-murky-waters": "w1-ss-1",
  "w1-destiny-and-choice": "w1-ss-6",
  "w1-burning-vizima": "w1-ss-7",
  "w1-old-manor": "w1-ss-16",
  "w1-frozen-reflections": "w1-ss-15",
  "between-the-first-two-games": "w2-ss-2",
  "foltests-last-campaign": "w2-ss-12",
  "flotsam-under-loredo": "w2-ss-3",
  "letho-and-the-crossroads": "w2-ss-1",
  "the-pontar-curse": "w2-ss-21",
  "roches-war": "w2-ss-5",
  "iorveths-vergen": "w2-ss-0",
  "triss-and-the-figurine": "w2-ss-13",
  "loc-muinnes-impossible-rescues": "w2-ss-20",
  "summit-and-dragon": "w2-ss-15",
  "lethos-final-account": "w2-ss-8",
};

export function getChapterArtwork(identifier) {
  return chapterArtwork.find(
    (artwork) => artwork.id === chapterImages[identifier],
  );
}

export function getBookTitle(identifier) {
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
  return bookTitles[bookId];
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
  },
  "saga-ending": {
    left: [0, 1],
    right: [2],
    context: [],
  },
  "amnesia-and-hunt": {
    left: [0],
    right: [1, 2],
    context: [3],
    leftLabel: "Geralt at the opening",
    rightLabel: "The history recovered",
  },
  "family-before-games": {
    left: [0, 1],
    right: [3],
    context: [2],
  },
  "triss-and-yennefer": {
    left: [0],
    right: [1],
    context: [2],
  },
  "documented-adaptation-decisions": {
    left: [0],
    right: [1],
    context: [2],
    leftLabel: "The narrative decision",
    rightLabel: "The production decision",
  },
  "new-stories-familiar-history": {
    left: [2],
    right: [0, 1],
    context: [],
  },
  "names-and-translations": {
    left: [0],
    right: [1],
    context: [2, 3],
  },
  "between-first-two": {
    left: [1],
    right: [0],
    context: [2, 3, 4],
  },
  "premium-adventures": {
    left: [0, 1],
    right: [2],
    context: [],
    leftLabel: "The Price of Neutrality",
    rightLabel: "Side Effects",
  },
  "other-games": {
    left: [0, 1],
    right: [2, 3],
    context: [],
    leftLabel: "Earlier campaigns",
    rightLabel: "Other formats",
  },
  "screens-and-branches": {
    left: [0],
    right: [1],
    context: [2],
    leftLabel: "Screen adaptations",
    rightLabel: "Game continuity",
  },
};
