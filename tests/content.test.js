import test from "node:test";
import assert from "node:assert/strict";
import {
  witcherOneChapters,
  witcherOneSources,
} from "../src/data/witcher-one.js";
import {
  witcherTwoChapters,
  witcherTwoSources,
} from "../src/data/witcher-two.js";
import {
  characterEntries,
  continuityArticles,
  continuitySources,
} from "../src/data/continuity.js";

const articles = [
  ...witcherOneChapters,
  ...witcherTwoChapters,
  ...continuityArticles,
];
const entries = [...articles, ...characterEntries];
const sources = [
  ...witcherOneSources,
  ...witcherTwoSources,
  ...continuitySources,
];

test("every entry has a unique stable identifier suitable for a bookmarked URL", () => {
  const identifiers = entries.map((entry) => entry.id);
  assert.equal(new Set(identifiers).size, identifiers.length);
  for (const identifier of identifiers)
    assert.match(identifier, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test("every displayed citation resolves to a labelled, valid external source", () => {
  const sourcesByIdentifier = new Map();
  for (const source of sources) {
    if (sourcesByIdentifier.has(source.id))
      assert.deepEqual(
        source,
        sourcesByIdentifier.get(source.id),
        `Conflicting source: ${source.id}`,
      );
    sourcesByIdentifier.set(source.id, source);
    assert.equal(new URL(source.url).protocol, "https:");
    for (const field of ["id", "title", "kind", "detail"])
      assert.ok(source[field]?.trim(), `Missing ${field} in ${source.id}`);
  }
  for (const entry of entries) {
    assert.ok(entry.sourceIds.length > 0, `Unsourced entry: ${entry.id}`);
    for (const sourceId of entry.sourceIds)
      assert.ok(
        sourcesByIdentifier.has(sourceId),
        `Broken citation ${sourceId} in ${entry.id}`,
      );
  }
});

test("articles and character histories supply the fields required by the reader", () => {
  for (const article of articles) {
    for (const field of ["title", "summary", "kicker"])
      assert.ok(article[field]?.trim(), `${article.id}: missing ${field}`);
    for (const field of ["paragraphs", "takeaways", "characters"]) {
      assert.ok(
        Array.isArray(article[field]) && article[field].length > 0,
        `${article.id}: missing ${field}`,
      );
      assert.ok(
        article[field].every(
          (value) => typeof value === "string" && value.trim(),
        ),
        `${article.id}: invalid ${field}`,
      );
    }
  }
  for (const character of characterEntries) {
    for (const field of ["name", "role", "faction", "summary", "remember"])
      assert.ok(character[field]?.trim(), `${character.id}: missing ${field}`);
    assert.ok(
      character.earlier.length > 0,
      `${character.id}: missing earlier history`,
    );
  }
});

test("the first-game reading path spans the theft, investigation, faction split and ending", () => {
  const requiredChapters = [
    "w1-kaer-morhen",
    "w1-outskirts",
    "w1-vizima-investigation",
    "w1-trade-quarter",
    "w1-source-and-assault",
    "w1-murky-waters",
    "w1-destiny-and-choice",
    "w1-burning-vizima",
    "w1-old-manor",
    "w1-frozen-reflections",
  ];
  assert.deepEqual(
    witcherOneChapters.map((chapter) => chapter.id),
    requiredChapters,
  );
});

test("the second-game reading path retains both routes and the personal and political resolution", () => {
  const requiredChapters = [
    "between-the-first-two-games",
    "foltests-last-campaign",
    "flotsam-under-loredo",
    "letho-and-the-crossroads",
    "the-pontar-curse",
    "roches-war",
    "iorveths-vergen",
    "triss-and-the-figurine",
    "loc-muinnes-impossible-rescues",
    "summit-and-dragon",
    "lethos-final-account",
  ];
  assert.deepEqual(
    witcherTwoChapters.map((chapter) => chapter.id),
    requiredChapters,
  );
  for (const identifier of [
    "roches-war",
    "iorveths-vergen",
    "loc-muinnes-impossible-rescues",
    "summit-and-dragon",
    "lethos-final-account",
  ]) {
    assert.ok(
      witcherTwoChapters.find((chapter) => chapter.id === identifier)
        .branchNote,
      `Missing choice context: ${identifier}`,
    );
  }
});

test("the reference layer keeps book continuity, inter-game media and key returning people", () => {
  const articleIdentifiers = new Set(
    continuityArticles.map((article) => article.id),
  );
  for (const identifier of [
    "separate-continuities",
    "saga-ending",
    "amnesia-and-hunt",
    "triss-and-yennefer",
    "between-first-two",
    "premium-adventures",
    "other-games",
    "screens-and-branches",
  ])
    assert.ok(
      articleIdentifiers.has(identifier),
      `Missing comparison: ${identifier}`,
    );
  const characterIdentifiers = new Set(
    characterEntries.map((character) => character.id),
  );
  for (const identifier of [
    "geralt",
    "yennefer",
    "triss",
    "ciri",
    "dandelion",
    "zoltan",
    "vesemir",
    "roche",
    "iorveth",
    "letho",
    "philippa",
    "emhyr",
    "radovid",
    "sile",
    "thaler",
    "alvin",
  ])
    assert.ok(
      characterIdentifiers.has(identifier),
      `Missing reference: ${identifier}`,
    );
});
