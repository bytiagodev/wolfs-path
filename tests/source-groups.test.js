import test from "node:test";
import assert from "node:assert/strict";
import { witcherOneSources } from "../src/data/witcher-one.js";
import { witcherTwoSources } from "../src/data/witcher-two.js";
import { continuitySources } from "../src/data/continuity.js";
import {
  getSourceType,
  groupSources,
  SOURCE_TYPES,
} from "../src/source-groups.js";

const libraries = { witcherOneSources, witcherTwoSources, continuitySources };
const allSources = Object.values(libraries).flat();

test("the grouped library retains every source once without modifying records", () => {
  const originalRecords = JSON.stringify(libraries);
  const groups = groupSources(libraries);
  const groupedSources = groups.flatMap((game) =>
    game.types.flatMap((type) => type.sources),
  );

  assert.equal(groupedSources.length, allSources.length);
  assert.equal(
    new Set(groupedSources.map((source) => source.id)).size,
    allSources.length,
  );
  assert.deepEqual(
    groupedSources.map((source) => source.id).sort(),
    allSources.map((source) => source.id).sort(),
  );
  for (const source of groupedSources) assert.ok(allSources.includes(source));
  assert.equal(JSON.stringify(libraries), originalRecords);
  assert.deepEqual(
    groups.map((game) => game.count),
    Object.values(libraries).map((sources) => sources.length),
  );
});

test("source types describe the provenance rather than the subject of a title", () => {
  const expectedTypes = {
    "w1-manual": "Official CDPR",
    "w2-cdpr-bridge": "Official CDPR",
    "w2-official-handbook": "Official CDPR",
    "c-interactive-comic": "Official CDPR",
    "c-board-lore": "Official CDPR",
    "c-thronebreaker": "Official CDPR",
    "c-author-canon": "Author statements",
    "c-season-storms": "Books",
    "c-crossroads": "Books",
    "w1-thaler": "Community transcripts",
    "w1-secrets": "Community transcripts",
    "w2-prologue-script": "Community transcripts",
    "w1-defence": "Walkthroughs",
    "w2-roche-camp": "Walkthroughs",
    "c-prima-branch": "Walkthroughs",
    "c-blood-elves": "Other references",
    "c-lady-lake": "Other references",
    "c-ganszyniec-ama": "Other references",
    "c-geralt": "Other references",
    "c-netflix": "Other references",
  };

  for (const [identifier, expected] of Object.entries(expectedTypes)) {
    const source = allSources.find((entry) => entry.id === identifier);
    assert.equal(getSourceType(source), expected, identifier);
  }
});

test("game groups contain their own records and populated types in a stable order", () => {
  const groups = groupSources(libraries);
  assert.deepEqual(
    groups.map((game) => game.title),
    ["The Witcher", "The Witcher 2", "Books and wider continuity"],
  );

  for (const [gameIndex, game] of groups.entries()) {
    const gameSources = Object.values(libraries)[gameIndex];
    let previousTypeIndex = -1;
    for (const type of game.types) {
      assert.ok(type.sources.length > 0);
      const currentTypeIndex = SOURCE_TYPES.indexOf(type.label);
      assert.ok(currentTypeIndex > previousTypeIndex);
      previousTypeIndex = currentTypeIndex;
      for (const source of type.sources) {
        assert.ok(gameSources.includes(source));
        assert.equal(getSourceType(source), type.label);
      }
    }
  }
});
