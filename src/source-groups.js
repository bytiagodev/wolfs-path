export const SOURCE_TYPES = [
  "Official CDPR",
  "Author statements",
  "Books",
  "Community transcripts",
  "Walkthroughs",
  "Other references",
];

export function getSourceType(source) {
  const kind = source.kind.toLowerCase();
  const hostname = new URL(source.url).hostname;

  if (kind.includes("author statement")) return "Author statements";
  if (kind.includes("transcription")) return "Community transcripts";
  if (
    kind.includes("walkthrough") ||
    kind.includes("game guide") ||
    kind.includes("strategy guide")
  ) {
    return "Walkthroughs";
  }

  // A reference about a novel is still a community reference. Only book
  // publisher records belong here; their original source labels stay visible.
  if (kind === "publisher" && hostname === "www.hachettebookgroup.com") {
    return "Books";
  }

  const officialHostname =
    /(^|\.)(thewitcher\.com|cdprojekt\.com|playgwent\.com)$/;
  if (
    kind.includes("cdpr") ||
    kind.includes("official manual") ||
    kind.includes("official booklet") ||
    kind.includes("official quest handbook") ||
    kind.includes("official store description") ||
    (kind.includes("developer statement") && officialHostname.test(hostname))
  ) {
    return "Official CDPR";
  }

  return "Other references";
}

export function groupSources({
  witcherOneSources = [],
  witcherTwoSources = [],
  continuitySources = [],
}) {
  const gameLibraries = [
    { id: "witcher-one", title: "The Witcher", sources: witcherOneSources },
    { id: "witcher-two", title: "The Witcher 2", sources: witcherTwoSources },
    {
      id: "continuity",
      title: "Books and wider continuity",
      sources: continuitySources,
    },
  ];

  return gameLibraries.map(({ id, title, sources }) => ({
    id,
    title,
    count: sources.length,
    types: SOURCE_TYPES.map((label) => ({
      label,
      sources: sources.filter((source) => getSourceType(source) === label),
    })).filter((group) => group.sources.length > 0),
  }));
}
