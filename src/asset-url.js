// Data files store root paths like "/images/..."; prefix the deploy base at render time.
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

// Chapter and comparison art also has a small copy under /images/thumbs/,
// used wherever the image appears as a thumbnail or card.
export function thumbUrl(path) {
  return assetUrl(path.replace(/^\/images\//, "/images/thumbs/"));
}
