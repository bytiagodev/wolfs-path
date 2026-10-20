// Sources are shared with the source drawer. Character notes stop before Wild Hunt's later story.
export const characterEntries = [
  {
    id: "geralt",
    name: "Geralt of Rivia",
    role: "The White Wolf",
    faction: "Witchers",
    initials: "GR",
    summary:
      "A professional monster hunter whose old friendships outlast his lost memories.",
    earlier: [
      "Books: Ciri’s guardian and Yennefer’s partner, repeatedly drawn into the wars around them.",
      "W1: returns without his memory and pursues the theft of witcher secrets.",
      "W2: accused of killing Foltest; follows the real assassin while recovering his past.",
    ],
    remember:
      "Other people remember a shared history that he initially cannot recall.",
    sourceIds: ["c-board-lore", "c-classics", "c-identity"],
  },
  {
    id: "yennefer",
    name: "Yennefer of Vengerberg",
    role: "Sorceress and Ciri’s mother figure",
    faction: "Mages",
    initials: "YV",
    summary:
      "Geralt’s long-established love and the woman who taught Ciri magic.",
    earlier: [
      "Books: develops a profound mother-and-daughter bond with Ciri.",
      "W1: absent from Geralt’s immediate story.",
      "W2: Geralt’s memories and Letho’s testimony reveal her part in the Wild Hunt history.",
    ],
    remember:
      "She belongs to Geralt’s life before his amnesia, even though she is offscreen in the early RPGs.",
    sourceIds: ["c-blood-elves", "c-yennefer", "c-letho"],
  },
  {
    id: "triss",
    name: "Triss Merigold",
    role: "Sorceress and royal adviser",
    faction: "Mages",
    initials: "TM",
    summary:
      "A friend from the books who becomes a central companion in both early games.",
    earlier: [
      "Books: helps at Kaer Morhen while Ciri is training.",
      "W1: aids Geralt at the keep and in Vizima; can become his partner.",
      "W2: begins beside Geralt and is abducted during the kingslayer investigation.",
    ],
    remember:
      "Her friendships, royal service and Lodge membership can pull in different directions.",
    sourceIds: ["c-triss", "c-blood-elves", "c-board-lore"],
  },
  {
    id: "ciri",
    name: "Cirilla “Ciri” of Cintra",
    role: "Geralt’s child of destiny",
    faction: "Geralt’s family",
    initials: "CR",
    summary:
      "A princess with extraordinary inherited power, raised and protected by an unconventional family.",
    earlier: [
      "Books: trains with Geralt and the Kaer Morhen witchers, then studies magic with Yennefer.",
      "W1 and W2: her absence from the main playable story does not erase that prior family history.",
    ],
    remember:
      "She is an established person in Geralt’s life; she is not Alvin.",
    sourceIds: ["c-ciri", "c-blood-elves", "c-alvin"],
  },
  {
    id: "dandelion",
    name: "Dandelion / Jaskier",
    role: "Poet, bard and friend",
    faction: "Geralt’s friends",
    initials: "DJ",
    summary:
      "Geralt’s travelling friend, whose talent for finding trouble comes with useful connections.",
    earlier: [
      "Books: accompanies Geralt and records his adventures in song and prose.",
      "W1: reunites with Geralt around Vizima.",
      "W2: Geralt saves him and Zoltan from execution in Flotsam.",
    ],
    remember: "Jaskier, Dandilion and Dandelion are versions of the same name.",
    sourceIds: ["c-dandelion", "c-board-lore", "c-roche"],
  },
  {
    id: "zoltan",
    name: "Zoltan Chivay",
    role: "Dwarven veteran and friend",
    faction: "Geralt’s friends",
    initials: "ZC",
    summary:
      "A practical, outspoken dwarf with a friendship forged amid war and displacement.",
    earlier: [
      "Books: travels with refugees and meets Geralt’s company during the Second Northern War.",
      "W1: an old friend Geralt meets again in and around Vizima.",
      "W2: faces the gallows in Flotsam with Dandelion and helps Geralt reach Iorveth.",
    ],
    remember: "His friendship with Geralt predates both RPGs.",
    sourceIds: ["c-zoltan", "c-official-recap", "c-roche"],
  },
  {
    id: "vesemir",
    name: "Vesemir",
    role: "Senior witcher and teacher",
    faction: "Witchers",
    initials: "VS",
    summary: "The elder at Kaer Morhen and a father figure to its witchers.",
    earlier: [
      "Books: helps train Ciri during her time at Kaer Morhen.",
      "W1: receives Geralt back into the keep and fights during Salamandra’s assault.",
      "Bonus adventure: debates the duty of neutrality over Deidre’s refuge.",
    ],
    remember:
      "Kaer Morhen is a shared home and training ground, not simply a castle Geralt visits.",
    sourceIds: ["c-vesemir", "c-blood-elves", "c-price-neutrality"],
  },
  {
    id: "eskel",
    name: "Eskel",
    role: "Geralt’s fellow witcher",
    faction: "Witchers",
    initials: "ES",
    summary: "A trusted Kaer Morhen companion with his own life on the Path.",
    earlier: [
      "Books: one of the witchers involved in Ciri’s training.",
      "W1: present when Geralt returns to Kaer Morhen.",
      "The Price of Neutrality: Deidre Ademeyn is his child of surprise.",
    ],
    remember:
      "He and Geralt share a history from before the first game’s attack.",
    sourceIds: ["c-eskel", "c-blood-elves", "c-price-neutrality"],
  },
  {
    id: "lambert",
    name: "Lambert",
    role: "Sharp-tongued witcher",
    faction: "Witchers",
    initials: "LM",
    summary:
      "One of the Kaer Morhen witchers, remembered for his abrasive manner.",
    earlier: [
      "Books: participates in Ciri’s training at the keep.",
      "W1: helps train Leo and defend Kaer Morhen.",
      "The Price of Neutrality: takes part in the dispute over Deidre’s sanctuary.",
    ],
    remember:
      "His barbed exchanges sit inside a longstanding bond with the other witchers.",
    sourceIds: ["c-lambert", "c-blood-elves", "c-price-neutrality"],
  },
  {
    id: "foltest",
    name: "King Foltest",
    role: "King of Temeria",
    faction: "Temeria",
    initials: "FT",
    summary:
      "The monarch whose connection to Geralt begins with the striga contract and ends in the crisis of W2.",
    earlier: [
      "Books: hires Geralt to break the curse on his daughter Adda.",
      "W1: Geralt becomes entangled in his capital’s rebellion and saves him from an assassin.",
      "W2: Geralt serves as his bodyguard; Letho murders him during the La Valette siege.",
    ],
    remember:
      "His death leaves both Geralt’s reputation and Temeria’s succession in crisis.",
    sourceIds: ["c-foltest", "c-first-game", "c-roche", "c-letho"],
  },
  {
    id: "roche",
    name: "Vernon Roche",
    role: "Commander of the Blue Stripes",
    faction: "Temeria",
    initials: "VR",
    summary:
      "Foltest’s special-forces commander, determined to find the kingslayer and preserve Temeria.",
    earlier: [
      "W2: interrogates Geralt, accepts that the real killer is elsewhere and helps him escape.",
      "Roche route: leads Geralt into Henselt’s camp and the struggle over Temeria’s future.",
    ],
    remember:
      "His loyalty is to Temeria, and his rivalry with Iorveth is deeply personal.",
    sourceIds: ["c-roche", "c-prima-branch"],
  },
  {
    id: "iorveth",
    name: "Iorveth",
    role: "Scoia’tael commander",
    faction: "Scoia’tael",
    initials: "IV",
    summary:
      "An elven guerrilla leader whose pursuit of a future for nonhumans brings him to Saskia’s cause.",
    earlier: [
      "W2: initially works with Letho around Flotsam before the alliance collapses.",
      "Iorveth route: Geralt joins him on the road to Vergen and Saskia’s resistance.",
    ],
    remember:
      "Following him shows a different second act from Roche’s campaign.",
    sourceIds: ["c-iorveth", "c-prima-branch", "c-second-game"],
  },
  {
    id: "letho",
    name: "Letho of Gulet",
    role: "The kingslayer",
    faction: "Viper witchers",
    initials: "LG",
    summary:
      "A witcher tied to both the royal assassinations and Geralt’s forgotten past.",
    earlier: [
      "Before W1, in the game account: Geralt saves his life and they pursue the Hunt together.",
      "W2: kills Demavend and Foltest while working a plan backed by Nilfgaard.",
    ],
    remember:
      "Geralt can fight him or let him leave at the end of W2; survival is a player choice.",
    sourceIds: ["c-letho", "c-second-game"],
  },
  {
    id: "philippa",
    name: "Philippa Eilhart",
    role: "Lodge leader and political operator",
    faction: "Mages",
    initials: "PE",
    summary:
      "A powerful sorceress whose plans extend beyond service to a single ruler.",
    earlier: [
      "Books: associated with Redanian power and the foundation of the Lodge of Sorceresses.",
      "W2: assists Saskia in Vergen, but her cure also places Saskia under magical control.",
      "W2: Radovid has her imprisoned and blinded at Loc Muinne.",
    ],
    remember: "Her aid can advance a separate political objective.",
    sourceIds: ["c-philippa", "c-board-lore"],
  },
  {
    id: "shani",
    name: "Shani",
    role: "Medic and old acquaintance",
    faction: "Independent",
    initials: "SH",
    summary:
      "A physician who treats the human cost of the conflicts Geralt passes through.",
    earlier: [
      "Books: knows Geralt and Dandelion from the Oxenfurt period.",
      "W1: treats patients in Vizima and can become Alvin’s guardian and Geralt’s partner.",
      "W2: a journal entry accounts for the end of their relationship if that W1 path was chosen.",
    ],
    remember:
      "Her romance and Alvin’s guardianship depend on your first-game decisions.",
    sourceIds: ["c-shani"],
  },
  {
    id: "keira",
    name: "Keira Metz",
    role: "Former Temerian court sorceress",
    faction: "Mages",
    initials: "KM",
    summary:
      "A book acquaintance whose history includes court service and the catastrophe at Thanedd.",
    earlier: [
      "Books: serves as an adviser to Foltest and is present at the Thanedd conclave.",
      "Books: takes part in the factional struggle there and later belongs to the Lodge.",
    ],
    remember:
      "Geralt knows her from the novels’ magical and political world, not a major W1 or W2 companion quest.",
    sourceIds: ["c-keira", "c-foltest", "c-lodge"],
  },
  {
    id: "dijkstra",
    name: "Sigismund Dijkstra",
    role: "Redanian spymaster",
    faction: "Redania",
    initials: "SD",
    summary:
      "A veteran intelligence operator with a long and uncomfortable history with Geralt.",
    earlier: [
      "Books: works at the centre of Redanian espionage and the Thanedd crisis.",
      "Books: Geralt injures his leg when the two clash.",
    ],
    remember:
      "Their familiarity comes from the books; he is not a companion from the first two RPG campaigns.",
    sourceIds: ["c-dijkstra", "c-board-lore"],
  },
  {
    id: "emhyr",
    name: "Emhyr var Emreis",
    role: "Emperor of Nilfgaard",
    faction: "Nilfgaard",
    initials: "EE",
    summary:
      "The emperor behind the southern power’s expansion and the kingslayers’ destabilisation of the North.",
    earlier: [
      "Books: rules Nilfgaard during its wars against the Northern Kingdoms.",
      "W2: Letho names the emperor’s bargain to restore the Viper School as the incentive for the assassination campaign.",
    ],
    remember:
      "His imperial goals explain why the kings’ deaths are more than isolated murders. The protected book comparisons discuss his private history.",
    sourceIds: ["c-emhyr", "c-board-lore", "c-letho"],
  },
  {
    id: "radovid",
    name: "Radovid V",
    role: "King of Redania",
    faction: "Redania",
    initials: "RV",
    summary:
      "A calculating ruler exploiting neighbouring instability while pursuing his own quarrel with Philippa.",
    earlier: [
      "W1: appears in the political manoeuvring around Temeria.",
      "W2: seeks influence over Temeria through Foltest’s daughter Anaïs and orders Philippa’s brutal interrogation.",
    ],
    remember:
      "The Anaïs settlement varies by route and choice; his ambitions do not.",
    sourceIds: ["c-radovid", "c-philippa", "c-first-game"],
  },
  {
    id: "sile",
    name: "Síle de Tansarville",
    role: "Lodge sorceress",
    faction: "Mages",
    initials: "ST",
    summary:
      "Also called Sheala de Tancarville in book translations, she moves from the kayran hunt into the regicide conspiracy.",
    earlier: [
      "Books: a member of the Lodge of Sorceresses.",
      "W2: works with Geralt against Flotsam’s kayran and is implicated in Demavend’s assassination.",
      "W2: tries to escape Loc Muinne through a sabotaged megascope.",
    ],
    remember:
      "Geralt can remove the faulty component or leave her to die. Do not assume one outcome.",
    sourceIds: ["c-sile"],
  },
  {
    id: "thaler",
    name: "Thaler",
    role: "Temerian intelligence chief",
    faction: "Temeria",
    initials: "TH",
    summary:
      "A foul-mouthed apparent fence in Vizima whose real profession is espionage.",
    earlier: [
      "W1: becomes a suspect during Geralt’s investigation before his intelligence role is uncovered.",
      "W1: can be defended when Count de Wett accuses him of treason.",
      "W2: remembered through an agent’s delivery rather than as a travelling companion.",
    ],
    remember: "His rough exterior is a cover. His earlier fate is conditional.",
    sourceIds: ["c-thaler"],
  },
  {
    id: "saskia",
    name: "Saskia",
    role: "The Dragonslayer",
    faction: "Vergen",
    initials: "SK",
    summary:
      "The leader of Vergen’s resistance and the hope of a state shared by humans and nonhumans.",
    earlier: [
      "W2: leads opposition to Henselt’s expansion into Upper Aedirn.",
      "W2: is poisoned; Philippa’s supposed cure leaves her under control.",
      "W2: is revealed as the dragon Saesenthessis.",
    ],
    remember: "Her freedom and fate depend on W2’s route and final decisions.",
    sourceIds: ["c-saskia", "c-philippa", "c-second-game"],
  },
  {
    id: "alvin",
    name: "Alvin",
    role: "A child with dangerous magical power",
    faction: "Independent",
    initials: "AL",
    summary:
      "The vulnerable child at the centre of the first game’s guardianship choices.",
    earlier: [
      "W1: survives a barghest attack in the Outskirts.",
      "W1: Geralt places him in Shani’s or Triss’s care.",
      "W1: his uncontrolled gifts and disappearance are tied to the story’s final revelations.",
    ],
    remember:
      "He is a game character distinct from Ciri. Their parallel magical vulnerability does not make them the same person.",
    sourceIds: ["c-alvin", "c-shani"],
  },
  {
    id: "ves",
    name: "Ves",
    role: "Blue Stripes soldier",
    faction: "Temeria",
    initials: "VE",
    summary:
      "Roche’s trusted subordinate in the special-forces unit that aids Geralt’s investigation.",
    earlier: [
      "W2: travels with Roche’s unit during the hunt for Foltest’s killer.",
      "Roche route: the fate of the Blue Stripes makes the conflict with Henselt personal.",
    ],
    remember:
      "Her connection is to Roche and Temerian service, not the Lodge or the Scoia’tael.",
    sourceIds: ["c-roche", "c-second-game"],
  },
];

export const continuitySources = [
  {
    id: "c-official-recap",
    title: "CDPR: what happened in the first Witcher game",
    url: "https://www.thewitcher.com/us/en/news/585/new-video-find-out-what-happened-in-the-first-witcher-game",
    kind: "CDPR",
    detail:
      "3 April 2012. Marcin Blacha explains the immediate connection between the first two games.",
  },
  {
    id: "c-classics",
    title: "The Witcher Classics: the original trilogy",
    url: "https://www.thewitcher.com/us/en/classics",
    kind: "CDPR",
    detail:
      "Official overview of Salamandra, Geralt’s royal service and the split narrative of Assassins of Kings.",
  },
  {
    id: "c-blood-elves",
    title: "Blood of Elves: plot and character context",
    url: "https://witcher.fandom.com/wiki/Blood_of_Elves",
    kind: "Community reference",
    detail:
      "Cross-reference for Ciri’s training, Triss’s visit and Yennefer’s teaching. Literary events are distinguished from game events.",
  },
  {
    id: "c-price-neutrality",
    title: "The Price of Neutrality: adventure reference",
    url: "https://witcher.fandom.com/wiki/The_Price_of_Neutrality",
    kind: "Community reference",
    detail:
      "CDPR premium module, Dandelion framing, pre-campaign setting and Deidre’s relationship to Eskel.",
  },
  {
    id: "c-board-lore",
    title: "The Witcher Adventure Game: official lore booklet",
    url: "https://cs.uwaterloo.ca/~dtompkin/archive/dtlib/base/The%20Witcher%20Adventure%20Game.pdf",
    kind: "Official booklet, archive copy",
    detail:
      "Fantasy Flight/CDPR booklet, pp. 11 to 14, for concise biographies and factions. The mirror is hosted by the University of Waterloo.",
  },
  {
    id: "c-prima-branch",
    title: "Official W2 guide: the Flotsam crossroads",
    url: "https://primagames.com/eguides/the-witcher-2-assassins-of-kings-eguide/walkthrough/chapter-1-flotsam",
    kind: "Official strategy guide",
    detail:
      "Explicitly labels the Roche and Scoia’tael crossroads as mutually exclusive routes.",
  },
  {
    id: "c-first-game",
    title: "The Witcher: first-game plot reference",
    url: "https://en.wikipedia.org/wiki/The_Witcher_(video_game)",
    kind: "Community reference",
    detail:
      "Used to cross-check the first RPG’s ending, new characters and major returning book characters.",
  },
  {
    id: "c-second-game",
    title: "Assassins of Kings: plot reference",
    url: "https://en.wikipedia.org/wiki/The_Witcher_2:_Assassins_of_Kings",
    kind: "Community reference",
    detail:
      "Cross-check for route structure and the conditional ending, not a declaration that one route is canonical.",
  },
  {
    id: "c-identity",
    title: "Identity: first-game memory quest",
    url: "https://witcher.fandom.com/wiki/Identity",
    kind: "Community reference",
    detail:
      "Quest reference for the first game’s treatment of Geralt’s amnesia.",
  },
  ...[
    ["geralt", "Geralt of Rivia", "Geralt_of_Rivia"],
    ["yennefer", "Yennefer of Vengerberg", "Yennefer_of_Vengerberg?page=3"],
    ["triss", "Triss Merigold", "Triss_Merigold?page=1&title=Triss_Merigold"],
    ["ciri", "Ciri: earlier history", "Ciri/backstory"],
    ["dandelion", "Dandelion: names and earlier appearances", "Dandelion"],
    ["zoltan", "Zoltan Chivay", "Zoltan_Chivay"],
    ["vesemir", "Vesemir", "Vesemir"],
    ["eskel", "Eskel", "Eskel"],
    ["lambert", "Lambert", "Lambert"],
    ["foltest", "Foltest", "Foltest"],
    ["roche", "Vernon Roche", "Vernon_Roche"],
    ["iorveth", "Iorveth", "Iorweth"],
    ["letho", "Letho", "Letho"],
    ["philippa", "Philippa Eilhart", "Philippa_Eilhart"],
    ["shani", "Shani", "Shani"],
    ["keira", "Keira Metz", "Keira_Metz"],
    ["dijkstra", "Sigismund Dijkstra", "Sigismund_Dijkstra"],
    ["emhyr", "Emhyr var Emreis", "Emhyr_var_Emreis"],
    ["radovid", "Radovid V", "Radovid_V"],
    ["sile", "Síle / Sheala de Tansarville", "Sheala_de_Tancarville"],
    ["thaler", "Thaler", "Thaler_(spy)"],
    ["saskia", "Saskia / Saesenthessis", "Saesenthessis"],
    ["alvin", "Alvin", "Alvin"],
    ["lodge", "Lodge of Sorceresses", "Lodge_of_Sorceresses"],
  ].map(([sourceKey, title, articlePath]) => ({
    id: `c-${sourceKey}`,
    title: `Witcher Wiki: ${title}`,
    url: `https://witcher.fandom.com/wiki/${articlePath}`,
    kind: "Community reference",
    detail:
      "Secondary character reference, including quoted game-journal material where present. Only earlier history is used in this archive; the linked page can contain Witcher 3 spoilers.",
  })),
];
