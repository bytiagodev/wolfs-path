import test from "node:test";
import assert from "node:assert/strict";
import {
  matchesCharacterName,
  matchesSearch,
  parseRoute,
  readSavedState,
  readingMinutes,
  searchRank,
  STORAGE_KEY,
  toggleItem,
} from "../src/lib.js";

test("character links match whole names without confusing Ves with Vesemir", () => {
  assert.equal(matchesCharacterName("Ves", "Vesemir"), false);
  assert.equal(matchesCharacterName("Geralt of Rivia", "Geralt"), true);
  assert.equal(matchesCharacterName("King Foltest", "Foltest"), true);
  assert.equal(matchesCharacterName("Vernon Roche", "Roche"), true);
  assert.equal(matchesCharacterName("Síle de Tansarville", "Sile"), true);
  assert.equal(matchesCharacterName("Geralt of Rivia", ""), false);
});

const emptyState = {
  completed: [],
  bookmarks: [],
  lastRead: null,
  bookSpoilers: false,
  choices: {},
};

test("a new browser starts with no reading history and book spoilers hidden", () => {
  assert.deepEqual(readSavedState({ getItem: () => null }), emptyState);
});

test("saved reading history survives a reload without accepting invalid field types", () => {
  let requestedKey;
  const storage = {
    getItem(key) {
      requestedKey = key;
      return JSON.stringify({
        completed: ["w1-kaer-morhen", 5, null],
        bookmarks: ["letho"],
        lastRead: "w1-kaer-morhen",
        bookSpoilers: "true",
      });
    },
  };
  assert.deepEqual(readSavedState(storage), {
    completed: ["w1-kaer-morhen"],
    bookmarks: ["letho"],
    lastRead: "w1-kaer-morhen",
    bookSpoilers: false,
    choices: {},
  });
  assert.equal(requestedKey, STORAGE_KEY);
  assert.equal(
    readSavedState({ getItem: () => '{"bookSpoilers":true}' }).bookSpoilers,
    true,
  );
});

test("malformed JSON, primitive JSON and denied reads leave a usable empty state", () => {
  for (const storedValue of [
    "{broken",
    "null",
    "3",
    '"a string"',
    '{"completed":{}}',
  ]) {
    assert.deepEqual(
      readSavedState({ getItem: () => storedValue }),
      emptyState,
    );
  }
  assert.deepEqual(
    readSavedState({
      getItem() {
        throw new Error("Storage denied");
      },
    }),
    emptyState,
  );
});

test("denial of the localStorage property itself cannot crash application startup", () => {
  const previousDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "localStorage",
  );
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("SecurityError");
      },
    });
    assert.deepEqual(readSavedState(), emptyState);
  } finally {
    if (previousDescriptor)
      Object.defineProperty(globalThis, "localStorage", previousDescriptor);
    else delete globalThis.localStorage;
  }
});

test("bookmark and completion toggles are reversible without mutating React state", () => {
  const originalCollection = Object.freeze(["w1-kaer-morhen"]);
  const expandedCollection = toggleItem(
    originalCollection,
    "foltests-last-campaign",
  );
  assert.deepEqual(originalCollection, ["w1-kaer-morhen"]);
  assert.deepEqual(expandedCollection, [
    "w1-kaer-morhen",
    "foltests-last-campaign",
  ]);
  assert.deepEqual(
    toggleItem(expandedCollection, "foltests-last-campaign"),
    originalCollection,
  );
});

test("removing an item also repairs duplicate values from a manually changed save", () => {
  assert.deepEqual(toggleItem(["alvin", "letho", "alvin"], "alvin"), ["letho"]);
});

test("route parsing supports direct links and encoded names", () => {
  assert.deepEqual(parseRoute("#/character/S%C3%ADle"), {
    page: "character",
    identifier: "Síle",
  });
  assert.deepEqual(parseRoute("#/chapter/w1-kaer-morhen"), {
    page: "chapter",
    identifier: "w1-kaer-morhen",
  });
  assert.deepEqual(parseRoute(""), { page: "home", identifier: "" });
  assert.deepEqual(parseRoute("#/not-a-page"), {
    page: "home",
    identifier: "",
  });
});

test("malformed external links never throw while decoding an identifier", () => {
  for (const malformedHash of [
    "#/chapter/%",
    "#/character/%E0%A4%A",
    "#/article/%FF",
  ]) {
    assert.doesNotThrow(() => parseRoute(malformedHash));
    assert.equal(parseRoute(malformedHash).identifier, "");
  }
});

test("search finds memories, roles, character lists and reader takeaways", () => {
  const chapter = {
    title: "A forgotten memory",
    paragraphs: ["A king ruled Temeria."],
    takeaways: ["Remember the Viper School."],
    characters: ["Letho of Gulet"],
  };
  assert.equal(matchesSearch(chapter, "  TEMERIA  "), true);
  assert.equal(matchesSearch(chapter, "viper school"), true);
  assert.equal(matchesSearch(chapter, "Gulet"), true);
  assert.equal(
    matchesSearch(
      { earlier: ["Served Foltest."], role: "Commander" },
      "commander",
    ),
    true,
  );
  assert.equal(matchesSearch(chapter, "Novigrad"), false);
});

test("search accepts unaccented names and both styles of apostrophe", () => {
  assert.equal(matchesSearch({ name: "Síle de Tansarville" }, "sile"), true);
  assert.equal(matchesSearch({ faction: "Scoia’tael" }, "scoia'tael"), true);
  assert.equal(matchesSearch({ faction: "Scoia’tael" }, "scoiatael"), true);
});

test("reading estimates retain a one-minute minimum and round longer articles up", () => {
  assert.equal(readingMinutes({}), 1);
  assert.equal(readingMinutes({ summary: "word ".repeat(209).trim() }), 1);
  assert.equal(readingMinutes({ paragraphs: ["word ".repeat(211).trim()] }), 2);
  assert.equal(
    readingMinutes({
      summary: "word ".repeat(100),
      paragraphs: ["word ".repeat(100)],
      takeaways: ["word ".repeat(20)],
    }),
    2,
  );
});

test("search ranks a name match above passing mentions in the prose", () => {
  const character = { name: "Letho of Gulet", role: "The kingslayer" };
  const chapter = {
    title: "Two conspiracies, one weakened North",
    summary: "Letho explains the plot.",
    paragraphs: ["Letho, Letho and Letho again."],
  };
  const mention = { title: "Flotsam", paragraphs: ["Later, Letho appears."] };
  assert.equal(searchRank(character, "letho").tier, 4);
  assert.equal(searchRank(chapter, "Letho").tier, 3);
  assert.equal(searchRank(mention, "LETHO").tier, 1);
  assert.equal(searchRank(chapter, "Letho").hits, 4);
  assert.equal(searchRank(mention, "Roach"), null);
  assert.equal(searchRank({ name: "Síle de Tansarville" }, "sile").tier, 4);
  assert.equal(searchRank({ paragraphs: ["On the approach."] }, "roach"), null);
  assert.equal(searchRank({ name: "Letho of Gulet" }, "leth").tier, 4);
  assert.equal(searchRank({ name: "Vesemir" }, "  "), null);
});

test("an empty character filter shows every character", () => {
  assert.equal(matchesSearch({ name: "Roach", role: "Geralt’s horse" }, ""), true);
  assert.equal(matchesSearch({ name: "Roach" }, "   "), true);
  assert.equal(matchesSearch({ name: "Roach" }, "roa"), true);
  assert.equal(matchesSearch({ name: "Roach" }, "letho"), false);
});

test("recorded playthrough choices survive a reload and ignore malformed values", () => {
  const storage = {
    getItem: () =>
      JSON.stringify({ choices: { route: "roche", letho: 5, sile: null } }),
  };
  assert.deepEqual(readSavedState(storage).choices, { route: "roche" });
  assert.deepEqual(
    readSavedState({ getItem: () => '{"choices":"roche"}' }).choices,
    {},
  );
});
