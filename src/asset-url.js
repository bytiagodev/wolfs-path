// Data files store root paths like "/images/..."; prefix the deploy base at render time.
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
