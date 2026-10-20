import test from "node:test";
import assert from "node:assert/strict";
import {
  parseRoute,
  readSavedState,
  readingMinutes,
  STORAGE_KEY,
  toggleItem,
} from "../src/lib.js";

const emptyState = {
  completed: [],
  bookmarks: [],
  lastRead: null,
  bookSpoilers: false,
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
