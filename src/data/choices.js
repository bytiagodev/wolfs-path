// The player decisions from the first two games that Witcher 3 can refer
// back to. Every option comes from the branch notes in the recaps; nothing
// here is treated as the canonical outcome. A choice or option with a
// `route` only applies on that route through The Witcher 2.
export const choiceGames = [
  { id: "one", title: "The Witcher" },
  { id: "two", title: "The Witcher 2" },
];

export const playthroughChoices = [
  {
    id: "abigail",
    game: "one",
    title: "Abigail in the Outskirts",
    context: "The villagers blame the witch for the Beast.",
    chapters: ["w1-outskirts", "w1-murky-waters"],
    options: [
      { id: "saved", label: "Defended her" },
      { id: "surrendered", label: "Left her to the mob" },
    ],
  },
  {
    id: "vincent",
    game: "one",
    title: "Vincent Meis",
    context: "The guard captain is a werewolf.",
    chapters: ["w1-trade-quarter"],
    options: [
      { id: "killed", label: "Killed him" },
      { id: "spared", label: "Spared him" },
      { id: "cured", label: "Cured him" },
    ],
  },
  {
    id: "alvin",
    game: "one",
    title: "Alvin’s guardian",
    context: "Also decides Geralt’s partner in the first game.",
    chapters: ["w1-source-and-assault"],
    options: [
      { id: "triss", label: "Triss" },
      { id: "shani", label: "Shani" },
    ],
  },
  {
    id: "berengar",
    game: "one",
    title: "Berengar",
    context: "The witcher who worked with Salamandra.",
    chapters: ["w1-destiny-and-choice", "w1-old-manor"],
    options: [
      { id: "killed", label: "Killed him" },
      { id: "spared", label: "Let him go" },
    ],
  },
  {
    id: "faction",
    game: "one",
    title: "Vizima’s civil war",
    context: "The side Geralt takes at Murky Waters.",
    chapters: [
      "w1-destiny-and-choice",
      "w1-burning-vizima",
      "w1-frozen-reflections",
    ],
    options: [
      { id: "order", label: "The Order" },
      { id: "scoiatael", label: "The Scoia’tael" },
      { id: "neutral", label: "Neutral" },
    ],
  },
  {
    id: "adda",
    game: "one",
    title: "Adda’s renewed curse",
    context: "Foltest asks Geralt to save his daughter again.",
    chapters: ["w1-burning-vizima"],
    options: [
      { id: "cured", label: "Lifted the curse" },
      { id: "killed", label: "Killed her" },
    ],
  },
  {
    id: "aryan",
    game: "two",
    title: "Aryan La Valette",
    context: "The baroness’s son holding the castle.",
    chapters: ["foltests-last-campaign"],
    options: [
      { id: "surrendered", label: "Persuaded him to surrender" },
      { id: "killed", label: "Killed him" },
    ],
  },
  {
    id: "route",
    game: "two",
    title: "Roche or Iorveth",
    context: "The ally Geralt leaves Flotsam with.",
    chapters: ["letho-and-the-crossroads", "roches-war", "iorveths-vergen"],
    options: [
      { id: "roche", label: "Roche" },
      { id: "iorveth", label: "Iorveth" },
    ],
  },
  {
    id: "henselt",
    game: "two",
    route: "roche",
    title: "Henselt’s fate",
    context: "Roche corners the king who executed the Blue Stripes.",
    chapters: ["roches-war"],
    options: [
      { id: "spared", label: "Stopped Roche" },
      { id: "killed", label: "Let Roche kill him" },
    ],
  },
  {
    id: "stennis",
    game: "two",
    route: "iorveth",
    title: "Prince Stennis",
    context: "Vergen’s crowd blames him for Saskia’s poisoning.",
    chapters: ["iorveths-vergen"],
    options: [
      { id: "trial", label: "Held him for trial" },
      { id: "lynched", label: "Let the crowd kill him" },
    ],
  },
  {
    id: "rescue",
    game: "two",
    title: "The rescue at Loc Muinne",
    context: "Geralt can only go after one.",
    chapters: ["loc-muinnes-impossible-rescues", "summit-and-dragon"],
    options: [
      { id: "triss", label: "Triss" },
      { id: "anais", label: "Anaïs", route: "roche" },
      { id: "philippa", label: "Philippa’s path to free Saskia", route: "iorveth" },
    ],
  },
  {
    id: "anais",
    game: "two",
    route: "roche",
    title: "Anaïs’s guardian",
    context: "Only if Geralt helped Roche rescue her.",
    chapters: ["loc-muinnes-impossible-rescues"],
    options: [
      { id: "radovid", label: "Radovid" },
      { id: "natalis", label: "John Natalis" },
    ],
  },
  {
    id: "sile",
    game: "two",
    title: "Síle’s sabotaged portal",
    context: "Someone replaced its diamond.",
    chapters: ["summit-and-dragon"],
    options: [
      { id: "saved", label: "Saved her" },
      { id: "died", label: "Let it kill her" },
    ],
  },
  {
    id: "saskia",
    game: "two",
    title: "The dragon",
    context: "Saskia, still under Philippa’s control.",
    chapters: ["summit-and-dragon"],
    options: [
      { id: "freed", label: "Freed her" },
      { id: "killed", label: "Killed her" },
      { id: "spared", label: "Left her alive" },
    ],
  },
  {
    id: "letho",
    game: "two",
    title: "Letho",
    context: "The kingslayer waits after the summit.",
    chapters: ["lethos-final-account"],
    options: [
      { id: "spared", label: "Let him go" },
      { id: "killed", label: "Killed him" },
    ],
  },
];

// The recorded answers that apply to a chapter, for its branch note.
export function choicesForChapter(chapterId, savedChoices) {
  return playthroughChoices
    .filter((choice) => choice.chapters.includes(chapterId))
    .map((choice) => ({
      choice,
      option: choice.options.find(
        (option) => option.id === savedChoices[choice.id],
      ),
    }))
    .filter(({ option }) => option);
}
