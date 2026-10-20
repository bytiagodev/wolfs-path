import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { getContrastChecks } from "../scripts/contrast.mjs";

test("all text palette pairs meet AA, including hover and the lightest hero background", () => {
  for (const check of getContrastChecks()) {
    assert.ok(
      check.ratio >= check.minimum,
      `${check.role}: ${check.ratio}:1 is below ${check.minimum}:1`,
    );
  }
});

test("interface text has no CSS size below 12px and recap paragraphs retain the required reading size", () => {
  const stylesheet = readFileSync(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  for (const size of stylesheet.matchAll(/font-size:\s*([\d.]+)px/g))
    assert.ok(Number(size[1]) >= 12);
  assert.match(
    stylesheet,
    /\.reader-prose p,\s*\.character-history p\s*\{[^}]*font-size:\s*18px;[^}]*line-height:\s*1\.7/s,
  );
  assert.match(stylesheet, /\.reader-prose\s*\{[^}]*max-width:\s*68ch/s);
});

test("the offline font setup uses bundled OFL fonts without Google stylesheet links", () => {
  const entry = readFileSync(
    new URL("../src/main.jsx", import.meta.url),
    "utf8",
  );
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(entry, /@fontsource-variable\/alegreya/);
  assert.match(entry, /@fontsource\/alegreya-sans-sc/);
  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic/);
  for (const name of ["Alegreya-OFL.txt", "Alegreya-Sans-SC-OFL.txt"]) {
    const license = readFileSync(
      new URL(`../public/fonts/${name}`, import.meta.url),
      "utf8",
    );
    assert.match(license, /SIL Open Font License, Version 1\.1/);
  }
  for (const family of [
    "@fontsource-variable/alegreya",
    "@fontsource/alegreya-sans-sc",
  ]) {
    const packageDirectory = new URL(
      `../node_modules/${family}/files/`,
      import.meta.url,
    );
    assert.ok(
      readdirSync(packageDirectory).some((name) => name.endsWith(".woff2")),
    );
  }
});
