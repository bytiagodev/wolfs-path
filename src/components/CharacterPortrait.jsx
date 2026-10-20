import { assetUrl } from "../asset-url.js";
import { portraits } from "../portraits.js";

export default function CharacterPortrait({
  characterId,
  name,
  className = "",
  decorative = false,
}) {
  const portrait = portraits[characterId];
  return (
    <div
      className={`character-portrait-frame ${portrait.treatment === "scene" ? "is-scene" : "is-render"} ${className}`}
    >
      <img
        src={assetUrl(portrait.path)}
        alt={decorative ? "" : name}
        loading="lazy"
        style={{
          objectPosition: portrait.objectPosition,
          "--portrait-origin": portrait.objectPosition,
          "--portrait-zoom": characterId === "foltest" ? 1.55 : 1,
        }}
      />
    </div>
  );
}
