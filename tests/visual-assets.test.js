import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { portraits } from "../src/portraits.js";
import {
  chapterArtwork,
  publicationArtwork,
  topicArtwork,
} from "../src/artwork.js";
import {
  bookTitles,
  comparisonLayouts,
  getBookTitle,
  getChapterArtwork,
} from "../src/visual-guide.js";
import {
  characterEntries,
  continuityArticles,
} from "../src/data/continuity.js";
import { witcherOneChapters } from "../src/data/witcher-one.js";
import { witcherTwoChapters } from "../src/data/witcher-two.js";

function assertLocalImage(asset) {
  assert.match(asset.path, /^\/images\/[a-z0-9/-]+\.(?:png|jpg|jpeg|webp)$/);
  const image = readFileSync(
    new URL(`../public${asset.path}`, import.meta.url),
  );
  const isPng = image
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const isJpeg = image[0] === 255 && image[1] === 216 && image[2] === 255;
  const isWebp =
    image.toString("ascii", 0, 4) === "RIFF" &&
    image.toString("ascii", 8, 12) === "WEBP";
  assert.ok(
    isPng || isJpeg || isWebp,
    `${asset.id}: local asset must contain image bytes`,
  );
  assert.ok(image.length > 500, `${asset.id}: image is unexpectedly small`);
  assert.ok(asset.credit?.trim(), `${asset.id}: missing image credit`);
  for (const field of ["sourcePage", "sourceUrl"])
    assert.equal(
      new URL(asset[field]).protocol,
      "https:",
      `${asset.id}: invalid ${field}`,
    );
}

test("every character has a distinct locally available credited game portrait", () => {
  const characterIds = characterEntries.map((character) => character.id).sort();
  assert.equal(characterIds.length, 25);
  assert.deepEqual(Object.keys(portraits).sort(), characterIds);
  assert.equal(
    new Set(Object.values(portraits).map((portrait) => portrait.path)).size,
    characterIds.length,
  );
  for (const character of characterEntries) {
    const portrait = portraits[character.id];
    assert.equal(portrait.id, character.id);
    assert.match(portrait.objectPosition, /^\d+(?:\.\d+)?% \d+(?:\.\d+)?%$/);
    assert.match(portrait.credit, /CD PROJEKT RED/i);
    assertLocalImage(portrait);
  }
});

test("comparison spreads show every approved paragraph exactly once", () => {
  assert.deepEqual(
    Object.keys(comparisonLayouts).sort(),
    continuityArticles.map((article) => article.id).sort(),
  );
  for (const article of continuityArticles) {
    const layout = comparisonLayouts[article.id];
    const indices = [...layout.left, ...layout.right, ...layout.context];
    assert.ok(
      layout.left.length > 0 && layout.right.length > 0,
      `${article.id}: both comparison columns need content`,
    );
    assert.ok(
      indices.every(Number.isInteger),
      `${article.id}: paragraph indices must be integers`,
    );
    assert.deepEqual(
      indices.toSorted((first, second) => first - second),
      article.paragraphs.map((_, index) => index),
      `${article.id}: missing, repeated or invalid paragraph`,
    );
    assert.ok(
      Object.values(bookTitles).includes(getBookTitle(article.id)),
      `${article.id}: unavailable book title`,
    );
  }
});

test("every comparison has its own locally available credited topic image", () => {
  const articleIds = continuityArticles.map((article) => article.id).sort();
  assert.deepEqual(Object.keys(topicArtwork).sort(), articleIds);
  assert.equal(
    new Set(Object.values(topicArtwork).map((artwork) => artwork.path)).size,
    articleIds.length,
  );
  assert.equal(
    new Set(Object.values(topicArtwork).map((artwork) => artwork.sourceUrl))
      .size,
    articleIds.length,
  );
  for (const [identifier, artwork] of Object.entries(topicArtwork)) {
    assert.ok(artwork.caption?.trim(), `${identifier}: missing caption`);
    assert.match(
      artwork.objectPosition,
      /^\d+(?:\.\d+)?% \d+(?:\.\d+)?%$/,
      `${identifier}: missing banner focal point`,
    );
    assertLocalImage({ id: identifier, ...artwork });
  }
});

test("all 21 recap chapters resolve to artwork from their own game", () => {
  assert.equal(witcherOneChapters.length + witcherTwoChapters.length, 21);
  for (const [chapters, game] of [
    [witcherOneChapters, "one"],
    [witcherTwoChapters, "two"],
  ]) {
    for (const chapter of chapters) {
      const artwork = getChapterArtwork(chapter.id);
      assert.ok(
        chapterArtwork.includes(artwork),
        `${chapter.id}: missing chapter artwork`,
      );
      assert.equal(
        artwork.game,
        game,
        `${chapter.id}: artwork belongs to another game`,
      );
    }
  }
  assert.equal(getChapterArtwork("unrecognised-chapter"), undefined);
});

test("chapter illustrations and publication artwork are available offline with original source credits", () => {
  const artwork = [...chapterArtwork, ...publicationArtwork];
  assert.equal(new Set(artwork.map((asset) => asset.id)).size, artwork.length);
  for (const asset of artwork) assertLocalImage(asset);
  for (const identifier of [
    "thronebreaker",
    "rogue-mage",
    "gwent",
    "adventure-game",
  ]) {
    const game = publicationArtwork.find((asset) => asset.id === identifier);
    assert.ok(
      game,
      `${identifier}: optional-game comparison needs its own image`,
    );
    assert.match(game.path, /-scene\.jpg$/);
  }
});
