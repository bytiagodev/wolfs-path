import test from "node:test";
import assert from "node:assert/strict";
import { parseRoute } from "../src/lib.js";

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
