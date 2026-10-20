export function parseRoute(hash) {
  const [page = "home", identifier = ""] = hash.replace(/^#\/?/, "").split("/");
  const validPages = [
    "home",
    "journey",
    "chapter",
    "characters",
    "character",
    "continuity",
    "article",
    "sources",
    "saved",
  ];
  let decodedIdentifier;
  try {
    decodedIdentifier = decodeURIComponent(identifier);
  } catch {
    decodedIdentifier = "";
  }
  return {
    page: validPages.includes(page) ? page : "home",
    identifier: decodedIdentifier,
  };
}
