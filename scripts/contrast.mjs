import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function contrastRatio(foreground, background) {
  function luminance(hex) {
    const channels = hex
      .replace("#", "")
      .match(/.{2}/g)
      .map((channel) => parseInt(channel, 16) / 255);
    const linearChannels = channels.map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return (
      linearChannels[0] * 0.2126 +
      linearChannels[1] * 0.7152 +
      linearChannels[2] * 0.0722
    );
  }
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

export function getContrastChecks() {
  const stylesheet = readFileSync(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  const palette = Object.fromEntries(
    [...stylesheet.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  const checks = [];
  for (const foreground of ["parchment", "text", "muted", "gold"]) {
    for (const background of [
      "ground",
      "sidebar",
      "panel",
      "elevated",
      "active-panel",
    ]) {
      checks.push({
        role: `${foreground} on ${background}`,
        foreground: palette[foreground],
        background: palette[background],
        minimum: 4.5,
      });
    }
  }
  checks.push({
    role: "Primary action",
    foreground: palette["button-text"],
    background: palette["button-face"],
    minimum: 4.5,
  });
  // Hero copy sits on at least a 78% black scrim; pure white art beneath is the worst case.
  const heroWorstBackground =
    "#" +
    [8, 7, 6]
      .map((channel) =>
        Math.round(channel * 0.78 + 255 * 0.22)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("");
  checks.push({
    role: "Hero description worst case",
    foreground: palette.text,
    background: heroWorstBackground,
    minimum: 4.5,
  });
  for (const background of ["ground", "panel", "active-panel"]) {
    checks.push({
      role: `Red marker on ${background}`,
      foreground: palette["red-bright"],
      background: palette[background],
      minimum: 3,
    });
  }
  return checks.map((check) => ({
    ...check,
    ratio: Number(contrastRatio(check.foreground, check.background).toFixed(2)),
  }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(getContrastChecks(), null, 2));
}
