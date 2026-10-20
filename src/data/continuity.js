import { bookComparisons, bookComparisonSources } from "./book-comparisons.js";

// Sources are shared with the source drawer. Character notes stop before Wild Hunt's later story.
const canonArticles = [
  {
    id: "separate-continuities",
    title: "One world, distinct continuities",
    kicker: "Start here",
    summary:
      "CD Projekt Red continues Geralt’s story in its own adaptation. The games are not novels written or canonised by Andrzej Sapkowski.",
    paragraphs: [
      "The games use the people, places and history of Sapkowski’s fiction, then build new events after the main saga. That makes them a continuation within CD Projekt Red’s game continuity. It does not make them the author’s official sequel to The Lady of the Lake.",
      "In a written answer published by gram.pl on 10 February 2012, Sapkowski explicitly described games, films and comics as separate narrative works made by their respective creators. He reserved literary canon for his own published writing. In the same answer he praised The Witcher as a successful and faithful adaptation; the distinction was about authorship and continuity, not a claim that the game was poor.",
      "This archive therefore labels an event as a book event, a game event or a player-dependent outcome. A familiar name does not make every version of that person’s story interchangeable.",
    ],
    takeaways: [
      "Treat the trilogy as CDPR’s continuation.",
      "The books remain their own literary continuity.",
      "A licence and literary canon are different questions.",
    ],
    characters: ["geralt", "ciri", "yennefer"],
    sourceIds: ["c-author-canon"],
  },
  {
    id: "saga-ending",
    title: "Where the novels leave Geralt",
    kicker: "Book ending spoilers",
    summary:
      "The Lady of the Lake ends with violence in Rivia and a departure into a deliberately otherworldly setting. The games supply their own subsequent history.",
    paragraphs: [
      "During a pogrom in Rivia, Geralt intervenes against violence directed at nonhumans and is struck with a pitchfork. Yennefer exhausts herself trying to save him. Ciri, with the unicorn Ihuarraquax’s help, takes Geralt and Yennefer away by boat through the mist. They are later shown together in an unidentified place.",
      "The novel frames these events through Ciri’s telling to Galahad and also plays with legend, memory and a wished-for happy ending. This guide does not turn that framing into a definitive medical or metaphysical verdict about the pair’s fate.",
      "The return to the Continent, the Wild Hunt’s intervention and Geralt’s amnesia belong to the games’ explanation of what comes next. Those events should not be presented as missing chapters authored by Sapkowski.",
    ],
    takeaways: [
      "Rivia is the crucial book-to-game reference.",
      "The games add the subsequent Wild Hunt history.",
      "The island’s meaning is not settled here as a fact.",
    ],
    characters: ["geralt", "yennefer", "ciri", "zoltan"],
    sourceIds: ["c-lady-lake", "c-author-canon", "c-letho"],
    branchNote:
      "This article spoils the end of the original book saga. It reveals no later Witcher 3 outcomes.",
  },
  {
    id: "amnesia-and-hunt",
    title: "The missing memories are a game story",
    kicker: "The bridge before the first game",
    summary:
      "Geralt’s forgotten history is gradually reconstructed in Assassins of Kings, including why Letho recognises him.",
    paragraphs: [
      "The first game introduces a Geralt who cannot remember his past. The second game revisits that loss through returning memories and Letho’s account. This is why people recognise Geralt while he initially cannot place their shared history.",
      "In the game account, Geralt pursues the Wild Hunt after Yennefer is taken. He saves Letho’s life, and Letho and his fellow Viper witchers help him track the riders. Geralt exchanges himself for Yennefer. Letho’s group then looks after her while she too is affected by memory loss.",
      "Their paths eventually lead into Nilfgaardian custody and Emhyr’s dealings with the witchers. Letho’s familiarity is therefore personal as well as political. His later work as a kingslayer is a betrayal of the North, but Geralt is not meeting a complete stranger.",
      "These are revelations of The Witcher 2. They explain the setup without requiring a book, television episode or separate side game between the first two RPGs.",
    ],
    takeaways: [
      "Amnesia is not the premise of the novels.",
      "Geralt previously saved Letho.",
      "Yennefer’s absence and the Hunt connect to the games’ added history.",
    ],
    characters: ["geralt", "yennefer", "letho", "emhyr"],
    sourceIds: ["c-letho", "c-yennefer", "c-identity"],
  },
  {
    id: "family-before-games",
    title: "Ciri, Yennefer and the family already formed",
    kicker: "Relationships",
    summary:
      "Ciri’s importance and Yennefer’s relationship with her begin in the books, long before the third game’s search.",
    paragraphs: [
      "Ciri is the surviving princess of Cintra and Geralt’s child of destiny. Blood of Elves follows her training at Kaer Morhen with Geralt and the other witchers. Triss visits to help understand the girl’s unusual magical episodes and recognises that she needs more specialised guidance.",
      "Yennefer subsequently teaches Ciri at the Temple of Melitele in Ellander. Their initially difficult relationship becomes that of mother and daughter. Geralt, Yennefer and Ciri’s family bond is therefore established literary history, not a relationship created by Wild Hunt.",
      "The saga’s final novel reveals that Emperor Emhyr var Emreis is Duny, the man Geralt knew from the events surrounding Princess Pavetta, and Ciri’s biological father. This is a major revelation from The Lady of the Lake. It belongs here, behind the book-spoiler choice, rather than in an unguarded reminder of Nilfgaard’s political role.",
      "Ciri is not the child Alvin from the first game. The two occupy different stories. Nor does Ciri’s absence as an active companion in the first two games mean that Geralt had no daughter figure before their events.",
    ],
    takeaways: [
      "Ciri has a long shared history with the Kaer Morhen witchers.",
      "Yennefer is her teacher and mother figure.",
      "Alvin and Ciri are separate characters.",
    ],
    characters: [
      "geralt",
      "ciri",
      "yennefer",
      "triss",
      "vesemir",
      "eskel",
      "lambert",
    ],
    sourceIds: ["c-blood-elves", "c-ciri", "c-alvin", "c-emhyr", "c-lady-lake"],
  },
  {
    id: "triss-and-yennefer",
    title: "Triss’s larger place in the early games",
    kicker: "Character adaptation",
    summary:
      "The early RPGs foreground Triss while Yennefer remains offscreen. That difference is observable; an assumed production motive is not evidence.",
    paragraphs: [
      "Triss is already a sorceress, Geralt’s friend, Yennefer’s friend and a member of the Lodge in the literary background. In Blood of Elves she helps care for Ciri at Kaer Morhen; Yennefer later undertakes Ciri’s magical education.",
      "The first game places Triss directly beside Geralt at Kaer Morhen and in Vizima. Its relationship choices include Triss and Shani. The second game starts with Triss and Geralt together, and her abduction becomes one of the central personal stakes. Yennefer’s whereabouts instead emerge through Geralt’s recovering past.",
      "These different amounts of screen time should not be mistaken for a replacement of one woman’s entire biography with the other’s. Their book histories still matter. Former lead story designer Artur Ganszyniec has explained the first game’s broader production constraints and the omission of Yennefer and Ciri, as the next article discusses. That account does not establish a reason for every later character decision.",
    ],
    takeaways: [
      "Triss is not a CDPR-created substitute with no book history.",
      "The first game allows a Triss or Shani romance.",
      "The narrative shift is documented; a blanket motive is not.",
    ],
    characters: ["triss", "yennefer", "shani", "ciri"],
    sourceIds: ["c-triss", "c-shani", "c-blood-elves", "c-ganszyniec-ama"],
  },
  {
    id: "documented-adaptation-decisions",
    title: "Why the first game resets Geralt",
    kicker: "A developer explains the changes",
    summary:
      "A retrospective account from the first game’s lead story designer documents several decisions behind its changed focus.",
    paragraphs: [
      "In a 2025 AMA, former lead story designer Artur Ganszyniec said amnesia helped introduce newcomers without carrying the saga’s full narrative burden.",
      "He explained that the project had originally centred on a player-created witcher. The switch to Geralt came too late to add Yennefer and Ciri. Explaining them also risked overwhelming newcomers and pulling Geralt away from the stolen-secrets plot.",
      "Ganszyniec linked Alvin to the books’ magical-child and destiny themes. These are attributed recollections of development, not additional canonical scenes. His separate speculation about Alvin’s genetics is explicitly personal headcanon and is not treated here as a confirmed explanation.",
    ],
    takeaways: [
      "Amnesia helped introduce new players.",
      "Production changes affected Yennefer and Ciri’s absence.",
      "Developer recollection and fictional canon remain distinct.",
    ],
    characters: ["geralt", "yennefer", "ciri", "alvin", "triss"],
    sourceIds: ["c-ganszyniec-ama"],
  },
  {
    id: "new-stories-familiar-history",
    title: "New plots, familiar political fault lines",
    kicker: "Books versus games",
    summary:
      "Salamandra, Alvin and the kingslayer investigation are game narratives. They draw on a world already shaped by the novels’ wars and persecution.",
    paragraphs: [
      "The Witcher is not a playable retelling of the short-story collections. Geralt follows the theft of witcher secrets into Salamandra’s operations around Vizima. The conflict draws him into the Order of the Flaming Rose, Scoia’tael violence and the fate of Alvin, a child with uncontrolled power.",
      "Assassins of Kings is another new narrative: Foltest’s murder, Geralt’s accusation and an investigation that splits between Roche’s and Iorveth’s routes. The routes reveal different sides of the same struggle involving Temeria, Kaedwen, Aedirn, the Lodge and Nilfgaard.",
      "The novels provide much of the political and personal background, but they do not contain these two games as successive volumes. Distinguishing inherited background from newly written plot is more useful than assuming every familiar motif is a direct adaptation of a particular scene.",
    ],
    takeaways: [
      "The first two RPGs tell new central plots.",
      "The books explain why these societies and relationships already have history.",
      "Player choices create multiple game outcomes.",
    ],
    characters: ["geralt", "foltest", "roche", "iorveth", "philippa"],
    sourceIds: ["c-classics", "c-alvin", "c-author-canon"],
  },
  {
    id: "names-and-translations",
    title: "Dandelion and Jaskier are the same bard",
    kicker: "Names and editions",
    summary:
      "Different names across languages do not necessarily mean a character was rewritten.",
    paragraphs: [
      "Jaskier is the bard’s Polish name. Dandelion is the name used in the English-language games and many English book editions; Dandilion also appears in English editions. All refer to Geralt’s poet friend Julian Alfred Pankratz, Viscount de Lettenhove.",
      "His appearance is an adaptation choice too: the literary character is blond, while CDPR depicts him with brown hair. That is a concrete visual difference. No documented reason is established by the sources used here for that particular change.",
      "The Netflix adaptation uses Jaskier in English. That name choice alone does not make the television character a different person within a single shared timeline: the television production is a separate adaptation in the first place.",
      "A name difference is evidence of a naming or localisation choice. This archive does not repeat the popular explanation that a particular name sounded too feminine as an established translator’s statement, because the cited sources do not establish that attribution.",
    ],
    takeaways: [
      "Dandelion, Dandilion and Jaskier identify the bard.",
      "Check language and edition before treating a name as a plot change.",
      "A frequently repeated explanation is not automatically a documented reason.",
    ],
    characters: ["dandelion"],
    sourceIds: ["c-dandelion", "c-board-lore", "c-netflix"],
  },
  {
    id: "between-first-two",
    title: "There is no missing book between the RPGs",
    kicker: "Your shortest route back",
    summary:
      "The main bridge from The Witcher to Assassins of Kings is already contained in their endings and openings.",
    paragraphs: [
      "The first game ends with Geralt saving Foltest from an assassin. The second begins with Geralt serving as the king’s bodyguard before another assassination overturns that apparent security. CDPR writer Marcin Blacha stated in the studio’s 3 April 2012 recap announcement that the second game begins just after the first.",
      "There is no Sapkowski novel positioned as a chapter between these game plots. Season of Storms is a standalone adventure from Geralt’s earlier life; Crossroads of Ravens follows an eighteen-year-old Geralt setting out from Kaer Morhen. Publication after a game’s release does not turn either book into that game’s sequel.",
      "The Witcher 2 Interactive Comic Book is an official CDPR app promoted as an introduction to the world before playing the second game. That promotional wording does not establish a story between the RPGs. GOG describes the interactive Reasons of State comic as a standalone adventure during the First Nilfgaard War, placing it in earlier background rather than after the first game’s ending.",
      "CDPR’s short animated recap of the first game is another useful companion. The studio explicitly presents it as a summary of events preceding Assassins of Kings, not an additional episode. Geralt’s animated memory sequences within the second game likewise belong to that game’s own reconstruction of his past.",
      "For this purpose, follow the Vizima recap, the first game’s attempted assassination and the La Valette prologue. The larger gaps in Geralt’s personal memory are explained within Assassins of Kings itself.",
    ],
    takeaways: [
      "W1’s final attack sets up Geralt’s royal service.",
      "W2 follows shortly after W1.",
      "Later-published novels are not an intervening game chapter.",
    ],
    characters: ["geralt", "foltest", "triss", "letho"],
    sourceIds: [
      "c-official-recap",
      "c-first-game",
      "c-season-storms",
      "c-crossroads",
      "c-interactive-comic",
      "c-reasons-state",
    ],
  },
  {
    id: "premium-adventures",
    title: "The two bonus adventures look backwards",
    kicker: "Optional CDPR stories",
    summary:
      "The Price of Neutrality and Side Effects add self-contained tales to the first game, rather than an essential bridge into its sequel.",
    paragraphs: [
      "The Price of Neutrality is CDPR’s bonus adventure around Kaer Morhen, framed as a ballad told by Dandelion. Geralt returns to find a dispute over Deidre Ademeyn, Eskel’s child of surprise, whom the sorceress Sabrina Glevissig and a rival claimant want to take from the fortress. The witchers disagree over what neutrality demands.",
      "Its stated setting is before the first game. Its different outcomes explain why it should not be used as a single fixed biography of everyone involved. It also reworks recognisable concerns from the books: an eclipse-born girl, accusations of a curse and the price of refusing or choosing a side.",
      "Side Effects is the other official premium module included with the Enhanced Edition. It concerns Geralt, Dandelion and trouble in Vizima. These optional adventures broaden the game world; neither is the required account of the transition from Foltest’s rescue to the second RPG.",
    ],
    takeaways: [
      "Both are CDPR bonus adventures for the first game.",
      "The Price of Neutrality takes place before its main campaign.",
      "Neither supplies a missing W1-to-W2 chapter.",
    ],
    characters: ["geralt", "dandelion", "eskel", "vesemir", "lambert"],
    sourceIds: [
      "c-price-neutrality",
      "c-side-effects",
      "c-enhanced-announcement",
    ],
    branchNote:
      "The Price of Neutrality has its own choices. This guide does not select a canonical ending.",
  },
  {
    id: "other-games",
    title: "Where the other games belong",
    kicker: "The wider shelf",
    summary:
      "Thronebreaker, Rogue Mage, GWENT and The Witcher Adventure Game serve different purposes. None is mandatory homework between the first two RPGs.",
    paragraphs: [
      "Thronebreaker: The Witcher Tales follows Queen Meve of Lyria and Rivia during a Nilfgaardian invasion. It expands the earlier war era associated with the books through a separate, branching campaign. It adds political context, rather than continuing Geralt’s Vizima investigation.",
      "GWENT: Rogue Mage goes much further back. CDPR’s official page places Alzur and Lily’s quest to create a weapon against monsters hundreds of years before Geralt. It is explicitly a separate project from Thronebreaker.",
      "Standalone GWENT is a competitive card game using the setting’s factions and characters. A card collection is not a chronological campaign between The Witcher and Assassins of Kings.",
      "The Witcher Adventure Game is a tabletop adventure, also adapted digitally, with Geralt, Triss, Dandelion and Yarpen as playable heroes. Its publisher describes competing or cooperating on adventures, not a required intermediate episode in the RPG trilogy.",
    ],
    takeaways: [
      "Thronebreaker explores the earlier wars.",
      "Rogue Mage is set centuries before Geralt.",
      "The card and board games are optional context.",
    ],
    characters: ["geralt", "triss", "dandelion", "emhyr"],
    sourceIds: [
      "c-thronebreaker",
      "c-thronebreaker-history",
      "c-rogue-mage",
      "c-gwent",
      "c-board-announcement",
    ],
  },
  {
    id: "screens-and-branches",
    title: "Television cannot fill a game save",
    kicker: "Keep the versions clear",
    summary:
      "The Netflix productions adapt the books in their own continuity. Within the games, mutually exclusive choices must also stay distinct.",
    paragraphs: [
      "Netflix announced its live-action series as an adaptation of Sapkowski’s saga. It is not a CDPR-produced account of the interval between the first and second games. Its additional films and miniseries should therefore not be inserted into Geralt’s game chronology as missing historical evidence.",
      "The games also require care on their own terms. Roche’s and Iorveth’s routes in Assassins of Kings are mutually exclusive paths, with different information, alliances and possible outcomes. A recap can show both perspectives without claiming Geralt lived through both versions.",
      "The same rule applies to the lives Geralt can spare and the romances he can pursue. A later game may acknowledge selected earlier decisions, but a guide should describe the decision and its conditions instead of silently naming one player’s outcome as the only true history.",
    ],
    takeaways: [
      "The Netflix adaptation is not a bridge between the RPGs.",
      "Roche and Iorveth offer alternative routes.",
      "Conditional outcomes remain labelled as choices.",
    ],
    characters: ["geralt", "roche", "iorveth", "letho", "sile"],
    sourceIds: ["c-netflix", "c-prima-branch", "c-sile"],
    branchNote:
      "This archive describes both W2 routes. It does not prescribe a save or reveal W3’s later consequences.",
  },
];

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
  ...bookComparisonSources,
  {
    id: "c-interactive-comic",
    title: "The Witcher 2 Interactive Comic Book: CDPR app listing",
    url: "https://apps.apple.com/us/app/the-witcher-2-interactive-comic-book/id514528113",
    kind: "CDPR publisher listing",
    detail:
      "The official App Store description identifies CD PROJEKT RED as the developer and promotes the comic as an introduction before playing The Witcher 2. It does not date it between the RPGs.",
  },
  {
    id: "c-reasons-state",
    title: "GOG: Reasons of State bonus comic description",
    url: "https://www.gog.com/en/game/the_witcher_3_wild_hunt?countryCode=CD&currencyCode=USD",
    kind: "Official store description",
    detail:
      "GOG’s indexed bonus description calls Reasons of State a standalone, two-part interactive story during the First Nilfgaard War. The current store may redirect to the latest game edition and display different bonus text.",
  },
  {
    id: "c-ganszyniec-ama",
    title: "Artur Ganszyniec: first-game story-design AMA",
    url: "https://www.reddit.com/r/witcher/comments/1njh4s4/i_was_the_lead_story_designer_for_the_witcher_1/",
    kind: "Developer statement · retrospective AMA",
    detail:
      "Former lead story designer answers directly about amnesia, the protagonist change, omitted characters and Alvin. Later recollections are distinguished from in-game evidence; comments elsewhere contain spoilers.",
  },
  {
    id: "c-author-canon",
    title: "Sapkowski’s written statement on game and literary canon",
    url: "https://www.gram.pl/news/2012/02/10/tylko-u-nas-andrzej-sapkowski-nie-uznaje-gier-z-serii-wiedzmin-za-kanoniczna-kontynuacje-swoich-dziel.shtml",
    kind: "Author statement",
    detail:
      "10 February 2012. Direct response reproduced by gram.pl in Polish; separates adaptations from the author’s literary canon.",
  },
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
    id: "c-lady-lake",
    title: "The Lady of the Lake: plot reference",
    url: "https://en.wikipedia.org/wiki/The_Lady_of_the_Lake_(Sapkowski_novel)",
    kind: "Community reference",
    detail:
      "Reference for the Rivia sequence and narrative framing. The archive does not claim a definitive interpretation of the ending.",
  },
  {
    id: "c-season-storms",
    title: "The Witcher books: Season of Storms description",
    url: "https://www.hachettebookgroup.com/series/the-witcher/",
    kind: "Publisher",
    detail:
      "The publisher describes Season of Storms as a standalone adventure before Geralt became Ciri’s guardian.",
  },
  {
    id: "c-crossroads",
    title: "Crossroads of Ravens: publisher announcement",
    url: "https://www.hachettebookgroup.com/orbit-books/acquisition-announcement-crossroads-of-ravens-by-andrzej-sapkowski/",
    kind: "Publisher",
    detail:
      "27 February 2025. Places the standalone novel at the start of eighteen-year-old Geralt’s career.",
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
    id: "c-side-effects",
    title: "Side Effects: CDPR premium module",
    url: "https://witcher-games.fandom.com/wiki/Side_Effects",
    kind: "Community reference",
    detail:
      "Identifies the official Enhanced Edition adventure; used only for the module’s status, not an exact calendar placement.",
  },
  {
    id: "c-enhanced-announcement",
    title: "The Witcher Enhanced Edition: included adventures",
    url: "https://www.worthplaying.com/article/2018/4/23/news/108349-the-witcher-enhanced-edition-free-on-gogcom/",
    kind: "Press reference",
    detail:
      "Summarises the included Kaer Morhen adventure and the Dandelion/Vizima adventure.",
  },
  {
    id: "c-thronebreaker",
    title: "Thronebreaker: The Witcher Tales",
    url: "https://store.steampowered.com/app/973760/Thronebreaker_The_Witcher_Tales/",
    kind: "CDPR store description",
    detail:
      "Official publisher description of Queen Meve’s campaign against an invasion of Lyria and Rivia.",
  },
  {
    id: "c-thronebreaker-history",
    title: "Thronebreaker: chronology reference",
    url: "https://en.wikipedia.org/wiki/Thronebreaker:_The_Witcher_Tales",
    kind: "Community reference",
    detail:
      "Places Meve’s campaign during the books and before the Geralt video games.",
  },
  {
    id: "c-rogue-mage",
    title: "GWENT: Rogue Mage",
    url: "https://www.playgwent.com/en/rogue-mage",
    kind: "CDPR",
    detail:
      "Official premise: Alzur and Lily, hundreds of years before Geralt; FAQ distinguishes it from Thronebreaker.",
  },
  {
    id: "c-gwent",
    title: "GWENT: The Witcher Card Game",
    url: "https://www.playgwent.com/en",
    kind: "CDPR",
    detail: "Official standalone card-game site and rules links.",
  },
  {
    id: "c-board-announcement",
    title: "The Witcher Adventure Game announcement",
    url: "https://www.cdprojekt.com/en/media/news/global-powerhouse-to-publish-the-witcher-adventure-game/",
    kind: "CDPR",
    detail:
      "Official announcement naming the four heroes and competitive/cooperative tabletop format.",
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
    id: "c-netflix",
    title: "The Witcher saga coming to Netflix",
    url: "https://about.netflix.com/en/news/the-witcher-saga-coming-to-netflix",
    kind: "Netflix",
    detail:
      "17 May 2017. Announces a television adaptation of Sapkowski’s books, rather than a CDPR game sequel.",
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

export const continuityArticles = [
  ...bookComparisons,
  ...canonArticles.map((article) => ({ ...article, group: "canon" })),
];
