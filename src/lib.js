export function readingMinutes(article) {
  const wordCount = [
    article.summary,
    ...(article.paragraphs ?? []),
    ...(article.takeaways ?? []),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 210));
}

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
