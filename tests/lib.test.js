import test from "node:test";
import assert from "node:assert/strict";
import { parseRoute, readingMinutes } from "../src/lib.js";

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
