// Book versus game comparisons. Book spoilers run to the end of the saga and stay behind
// the opt-in gate. No later Witcher 3 story outcomes are described.
// Paragraph order per entry: books, then games, then context (see `layout`).

export const bookComparisonSources = [
  {
    id: "c-wiki-last-wish",
    title: "The Last Wish: story summaries",
    url: "https://en.wikipedia.org/wiki/The_Last_Wish_(book)",
    kind: "Community reference",
    detail:
      "Plot summaries of the collection’s stories, including The Witcher, The Lesser Evil, A Question of Price, The Edge of the World and The Last Wish.",
  },
  {
    id: "c-wiki-sword-destiny",
    title: "Sword of Destiny: story summaries",
    url: "https://en.wikipedia.org/wiki/Sword_of_Destiny",
    kind: "Community reference",
    detail:
      "Plot summaries of the second collection, including the dragon hunt, Brokilon and Something More.",
  },
  {
    id: "c-wiki-blood-elves",
    title: "Blood of Elves: plot summary",
    url: "https://en.wikipedia.org/wiki/Blood_of_Elves",
    kind: "Community reference",
    detail:
      "Kaer Morhen, Triss’s visit, the Scoia’tael attack on the convoy, Shani and the kings’ council.",
  },
  {
    id: "c-wiki-time-contempt",
    title: "Time of Contempt: plot summary",
    url: "https://en.wikipedia.org/wiki/Time_of_Contempt",
    kind: "Community reference",
    detail:
      "The Thanedd coup, Geralt’s injuries, Ciri’s escape into the desert and the false Ciri in Nilfgaard.",
  },
  {
    id: "c-wiki-baptism",
    title: "Baptism of Fire: plot summary",
    url: "https://en.wikipedia.org/wiki/Baptism_of_Fire_(novel)",
    kind: "Community reference",
    detail:
      "Geralt’s company forms in Brokilon and on the road; Philippa proposes the Lodge; Ciri lives as Falka.",
  },
  {
    id: "c-wild-hunt",
    title: "Witcher Wiki: Wild Hunt",
    url: "https://witcher.fandom.com/wiki/Wild_Hunt",
    kind: "Community reference",
    detail:
      "Separates the books’ Aen Elle riders from the games’ use of the Hunt. The linked page contains Witcher 3 spoilers.",
  },
  {
    id: "c-scoiatael",
    title: "Witcher Wiki: Scoia’tael",
    url: "https://witcher.fandom.com/wiki/Scoia%27tael",
    kind: "Community reference",
    detail:
      "Origins, Nilfgaard’s backing, Dol Blathanna and the commandos’ fate at the peace.",
  },
];

export const bookComparisons = [
  {
    id: "book-geralt",
    group: "compare",
    title: "Geralt: the witcher the books built",
    kicker: "Geralt",
    summary:
      "The short stories make Geralt’s reputation, the saga breaks his neutrality, and the games start him again from nothing.",
    paragraphs: [
      "Geralt is not from Rivia. He grew up at Kaer Morhen, left there as a child by his mother, the sorceress Visenna, and took “of Rivia” as a practical name to sound credible to clients. His white hair is a side effect of the extra mutations he survived during the Trial of the Grasses.",
      "The short stories build the man Witcher 3 takes for granted. In Blaviken he kills Renfri and her gang to stop a massacre and is called the Butcher for it. In Cintra he claims Pavetta’s unborn child through the Law of Surprise. In Rinde his last wish to a djinn ties his fate to Yennefer’s.",
      "The saga then strips away his neutrality. Vilgefortz leaves him badly wounded on Thanedd. He heals among the dryads of Brokilon and sets out for Ciri with an unlikely company: Dandelion, the archer Milva, the Nilfgaardian Cahir, the vampire Regis and, later, the girl Angoulême. Most of them die at Stygga Castle. The saga ends in Rivia, where Geralt is run through with a pitchfork while defending his dwarven friends from a mob.",
      "The first game brings Geralt back to Kaer Morhen with no memory of who he is. The amnesia lets the game introduce him from scratch: the people around him know his history while he does not. The second game restores that past in pieces, through Letho’s account and Geralt’s own returning memories.",
      "His character survives the move intact: the professional coolness, the neutrality that keeps failing, the reputation that arrives before he does. What the first two games leave out is his book family. Yennefer and Ciri are absent from the first game and only remembered in the second.",
      "Witcher 3 expects you to know where his two closest bonds come from. Yennefer’s rests on the djinn wish. Ciri’s rests on the Law of Surprise and their meeting in Brokilon. Neither comes from the first two games.",
    ],
    takeaways: [
      "“Of Rivia” is a name Geralt chose, not a birthplace.",
      "His bonds with Yennefer and Ciri come from the books.",
      "The games’ amnesia is the reason they barely appear before Witcher 3.",
    ],
    characters: ["geralt", "yennefer", "ciri", "dandelion"],
    sourceIds: [
      "c-geralt",
      "c-wiki-last-wish",
      "c-wiki-time-contempt",
      "c-wiki-baptism",
      "c-lady-lake",
    ],
    layout: {
      left: [0, 1, 2],
      right: [3, 4],
      context: [5],
      book: "last-wish",
    },
  },
  {
    id: "book-yennefer",
    group: "compare",
    title: "Yennefer: the wish behind everything",
    kicker: "Yennefer",
    summary:
      "The books make Yennefer Geralt’s great love and Ciri’s mother in all but blood. The first two games keep her almost entirely offscreen.",
    paragraphs: [
      "Yennefer was born in Vengerberg, a quarter-elf with a hunched back. Aretuza reshaped her, as it does every sorceress, and sorcery left her unable to have children, a loss she keeps trying to undo. In Sword of Destiny she joins a dragon hunt partly in the hope that the dragon can cure it.",
      "She meets Geralt in Rinde, in The Last Wish. His final wish to the djinn saves her life and binds them together, and both later wonder whether what they feel is love or the wish at work. They break up and reunite again and again across the short stories.",
      "In the saga she becomes Ciri’s teacher and her mother in all but blood. After Thanedd she refuses the Lodge’s terms and goes after Vilgefortz alone, ending up his prisoner at Stygga Castle, where he tortures her for anything she knows about Ciri. At Rivia she spends her power trying to save Geralt and collapses.",
      "Yennefer does not appear in the first game. The second shows her only through Geralt’s returning memories and the story Letho tells. The games give her an absence the books never did: she was taken by the Wild Hunt, Geralt gave himself up to free her, and by the end of Assassins of Kings she is believed to be alive somewhere in Nilfgaard.",
      "This is the biggest gap between the books and the first two games. Witcher 3 treats Yennefer as someone you already know, and that knowledge comes from the books, not from anything the earlier games show.",
    ],
    takeaways: [
      "The djinn wish is the root of Geralt and Yennefer’s bond.",
      "She raised Ciri as a daughter in the books.",
      "The games add her capture by the Wild Hunt.",
    ],
    characters: ["yennefer", "geralt", "ciri", "letho"],
    sourceIds: [
      "c-yennefer",
      "c-wiki-last-wish",
      "c-wiki-sword-destiny",
      "c-blood-elves",
      "c-lady-lake",
      "c-letho",
    ],
    layout: {
      left: [0, 1, 2],
      right: [3],
      context: [4],
      book: "sword-of-destiny",
    },
  },
  {
    id: "book-ciri",
    group: "compare",
    title: "Ciri: the Elder Blood the games held back",
    kicker: "Ciri",
    summary:
      "Ciri carries most of the saga, from Cintra to another world. The first two games never put her on screen.",
    paragraphs: [
      "Ciri is Princess Cirilla of Cintra, Queen Calanthe’s granddaughter and the child Geralt claimed through the Law of Surprise before she was born. Destiny throws them together in the forest of Brokilon. She survives the fall of Cintra, and Geralt finds her again at the close of Sword of Destiny.",
      "She carries the Elder Blood, inherited from the elven sorceress Lara Dorren, which is why kings, the Lodge, Vilgefortz and the emperor of Nilfgaard all want her, or want her dead. She trains with the witchers at Kaer Morhen and studies magic with Yennefer. She escapes the Thanedd coup through a portal into a desert, then spends a brutal stretch as Falka, an outlaw among the Rats, hunted by the bounty hunter Leo Bonhart.",
      "In The Lady of the Lake she is pulled into the world of the Aen Elle elves. Their sage Avallac’h wants her child for its power, and their king Auberon is meant to father it. When Auberon dies she escapes with the help of the unicorns, pursued by the elven riders under Eredin. She learns to cross between worlds and times, and returns in time for Stygga Castle.",
      "Ciri does not appear in the first two games. The first offers Alvin, a different child with uncontrolled power. The second keeps the Wild Hunt and Geralt’s lost years in view without ever bringing her on screen.",
      "Witcher 3 builds directly on her book history: her bond with Geralt and Yennefer, her Elder Blood, and the elves who hunted her. Her chapters among the Aen Elle in The Lady of the Lake are the closest the books come to a prologue for the third game.",
    ],
    takeaways: [
      "Ciri is Geralt’s child of surprise and Yennefer’s pupil.",
      "Her Elder Blood is why so many powers want her.",
      "The Aen Elle and Eredin hunted her in the books.",
    ],
    characters: ["ciri", "geralt", "yennefer", "vesemir", "alvin"],
    sourceIds: [
      "c-ciri",
      "c-wiki-sword-destiny",
      "c-wiki-blood-elves",
      "c-wiki-time-contempt",
      "c-wiki-baptism",
      "c-lady-lake",
    ],
    layout: {
      left: [0, 1, 2],
      right: [3],
      context: [4],
      book: "tower-of-swallows",
    },
  },
  {
    id: "book-wild-hunt",
    group: "compare",
    title: "The Wild Hunt: a legend that became Geralt’s enemy",
    kicker: "The Wild Hunt",
    summary:
      "The books reveal who the riders are and why they want Ciri. The games make them Geralt’s personal debt.",
    paragraphs: [
      "In the books the Wild Hunt starts as folklore: a spectral cavalcade crossing the sky, read as an omen of war and disaster.",
      "The Lady of the Lake gives the legend a source. The riders are Aen Elle, elves from another world, led by Eredin Bréacc Glas, and their ghostly look is a disguise. What they want is Ciri’s Elder Blood. In the novels they are her enemy, not Geralt’s: he never faces them.",
      "The first game turns the Hunt toward Geralt. Its king appears to him in visions from the prologue onward, taunting him and hinting at an old bargain, and these encounters return at the game’s end.",
      "The second game explains the bargain. After Yennefer was taken, Geralt pursued the Hunt and offered himself in her place. His time as its captive and his escape are part of what the amnesia hid.",
      "The books supply who the riders are and why they want Ciri. The games supply why Geralt is personally bound to them. Witcher 3 starts where those two threads meet.",
    ],
    takeaways: [
      "The riders are Aen Elle elves led by Eredin.",
      "In the books they hunt Ciri, never Geralt.",
      "The games add Geralt’s exchange for Yennefer.",
    ],
    characters: ["geralt", "ciri", "yennefer", "letho"],
    sourceIds: ["c-wild-hunt", "c-lady-lake", "c-letho", "c-identity"],
    layout: {
      left: [0, 1],
      right: [2, 3],
      context: [4],
      book: "lady-of-the-lake",
    },
  },
  {
    id: "book-triss",
    group: "compare",
    title: "Triss: the Fourteenth of the Hill",
    kicker: "Triss",
    summary:
      "In the books Triss is a loyal friend on the edge of the main story. The first two games put her at its centre.",
    paragraphs: [
      "Triss is a Temerian court sorceress and Yennefer’s friend since Aretuza. At the Battle of Sodden Hill she was so badly burned that she was counted among the dead, and her name was carved on the memorial as the fourteenth fallen mage. She survived, and the name stayed with her.",
      "She loves Geralt with little hope. Their affair in the books is short, begun partly from curiosity about what binds him to Yennefer, and Geralt ends it out of guilt. In Blood of Elves she comes to Kaer Morhen to help with Ciri, stops the witchers from dosing the girl with their potions, and becomes something like an older sister to her. She cannot take magical remedies herself, which makes her a difficult patient on the road.",
      "After Thanedd, Foltest expels her along with the rest of his court mages, and she becomes one of the founding members of the Lodge of Sorceresses.",
      "The first two games move her to the centre. In the first she is beside Geralt from Kaer Morhen onward and is one of its two romance paths, with Shani. The second opens with Triss and Geralt together, and her abduction drives much of its personal story. The second game also redesigns her as more decisive and practical than the books’ younger Triss.",
      "Both are the same woman with a different emphasis. Witcher 3 expects you to know the games’ Triss and the books’ Yennefer, and the history between the two women.",
    ],
    takeaways: [
      "Sodden Hill gave Triss her nickname.",
      "Her book affair with Geralt was brief and one-sided.",
      "The games make her far more central than the novels do.",
    ],
    characters: ["triss", "yennefer", "ciri", "shani", "foltest"],
    sourceIds: ["c-triss", "c-wiki-blood-elves", "c-lodge", "c-shani"],
    layout: {
      left: [0, 1, 2],
      right: [3],
      context: [4],
      book: "blood-of-elves",
    },
  },
  {
    id: "book-foltest-adda",
    group: "compare",
    title: "Foltest and the striga: the story the first game continues",
    kicker: "Foltest and Adda",
    summary:
      "The very first Witcher story is about Foltest’s cursed daughter. The first game picks her up years later.",
    paragraphs: [
      "The Witcher, the first story in The Last Wish, is the root of the first game. King Foltest’s daughter by his own sister, Adda, was born cursed and rises from her crypt each night as a striga. Foltest offers a reward to lift the curse and allows the witcher to kill her if it cannot be done.",
      "Geralt lifts it by keeping the striga out of her crypt until dawn. The girl underneath is feral and will need years to recover, and she wounds him badly before the night is over. Velerad, the castellan of Wyzima, is part of the same story.",
      "In the saga Foltest is a firm, decisive king. He fights Nilfgaard, wants the Scoia’tael cleared out of Temeria, agrees with the other kings that Ciri is a threat, and after Thanedd makes a separate peace with Emhyr and expels his mages.",
      "The first game picks Adda up years later. She is grown, back at court and part of Vizima’s politics, and the striga is part of the city’s past. The game returns to the curse itself near the end and leaves Geralt to choose between lifting it again and killing her. Velerad is back as Vizima’s burgomaster.",
      "The second game kills Foltest in its opening scenes, and his murder sets the whole plot in motion. His children by another woman are at the heart of the La Valette siege.",
      "Reading the striga story first makes the first game’s Vizima chapters much richer. The king Letho kills in the second game is the same Foltest the books show holding Temeria together.",
    ],
    takeaways: [
      "Adda the striga comes straight from The Last Wish.",
      "Velerad appears in both the story and the first game.",
      "Foltest is a book king; his murder is the games’ invention.",
    ],
    characters: ["foltest", "geralt", "letho"],
    sourceIds: ["c-wiki-last-wish", "c-foltest", "c-first-game", "c-letho"],
    layout: {
      left: [0, 1, 2],
      right: [3, 4],
      context: [5],
      book: "last-wish",
    },
  },
  {
    id: "book-emhyr",
    group: "compare",
    title: "Emhyr: the emperor’s secret",
    kicker: "Emhyr var Emreis",
    summary:
      "A cursed suitor in a short story turns out to be the emperor of Nilfgaard and Ciri’s father. The games keep him offstage.",
    paragraphs: [
      "In A Question of Price, in The Last Wish, a knight with a hedgehog’s face arrives at Queen Calanthe’s court in Cintra. He is Duny, cursed by day, and he claims Princess Pavetta through an old Law of Surprise. Geralt protects him, and as his own reward claims the child Pavetta is already carrying: Ciri.",
      "The saga reveals who Duny really was: Emhyr var Emreis, the deposed heir of Nilfgaard, who regained his throne with Vilgefortz’s help and faked his own death. As emperor he invades the North and wants Ciri, not to rescue her but to marry her, for the power a prophecy ties to her blood. When she cannot be found, his court presents a false Ciri.",
      "At Stygga Castle Geralt recognises him. Emhyr intends to have Geralt and Yennefer killed to keep the secret, then relents, lets Ciri go, and marries the impostor instead.",
      "In the first two games Emhyr stays offstage. The second reveals him as the power behind the kingslayers: Letho’s killings of Demavend and Foltest serve Nilfgaard’s plan to weaken the North before invading.",
      "The second game never tells you the emperor is Ciri’s father. That comes only from the books, and Witcher 3 assumes you know it.",
    ],
    takeaways: [
      "Emhyr is Duny from A Question of Price.",
      "He is Ciri’s father and once meant to marry her.",
      "The second game shows only his hand behind the kingslayers.",
    ],
    characters: ["emhyr", "ciri", "geralt", "letho"],
    sourceIds: [
      "c-wiki-last-wish",
      "c-emhyr",
      "c-wiki-time-contempt",
      "c-lady-lake",
      "c-letho",
    ],
    layout: {
      left: [0, 1, 2],
      right: [3],
      context: [4],
      book: "last-wish",
    },
  },
  {
    id: "book-lodge",
    group: "compare",
    title: "Thanedd and the Lodge: the sorceresses’ politics",
    kicker: "The Lodge",
    summary:
      "The books show the coup and the founding of the Lodge. The second game shows what the Lodge does with its power, and what it costs.",
    paragraphs: [
      "Time of Contempt builds to a gathering of mages on the island of Thanedd. Philippa Eilhart, adviser to the King of Redania, and the spymaster Dijkstra spring a coup against mages they believe are working for Nilfgaard. It collapses into fighting when Scoia’tael commandos allied with Nilfgaard arrive. Vilgefortz is revealed as a traitor, Geralt is badly hurt, and Ciri escapes through a portal.",
      "In Baptism of Fire Philippa gathers the surviving sorceresses into the Lodge, a secret society open only to women. Its founders include Triss, Keira Metz, Sheala de Tancarville, Francesca Findabair and the Nilfgaardian Fringilla Vigo. Their aim is to stop serving kings and steer the world themselves. Ciri is central to the plan: in The Lady of the Lake they decide she should bear a child by a Koviri prince for them to raise.",
      "The second game is the Lodge’s story in all but name. Sheala hunts the kayran with Geralt in Flotsam and turns up at Henselt’s court. Philippa stands behind Saskia in Vergen. At the summit in Loc Muinne the Lodge’s reach into the kingslayer plot comes out, its members are condemned across the North, and Philippa is arrested, blinded and escapes as an owl.",
      "Radovid changes with the medium too. In the novels he stays in the background: his father, King Vizimir, is assassinated, and Philippa works with Queen Hedwig to keep Redania in hand. The games make him a central player, and by the second game a king who knows exactly what the Lodge has been doing.",
      "The Lodge’s book history explains why the sorceresses act as they do in the second game, and why every king in the North distrusts them afterwards.",
    ],
    takeaways: [
      "The Lodge is founded after the Thanedd coup.",
      "Its members planned Ciri’s future without her.",
      "Loc Muinne is where the games make them pay for it.",
    ],
    characters: ["philippa", "sile", "keira", "triss", "radovid", "dijkstra"],
    sourceIds: [
      "c-wiki-time-contempt",
      "c-wiki-baptism",
      "c-lady-lake",
      "c-lodge",
      "c-philippa",
      "c-sile",
      "c-keira",
    ],
    layout: {
      left: [0, 1],
      right: [2, 3],
      context: [4],
      book: "time-of-contempt",
    },
  },
  {
    id: "book-scoiatael",
    group: "compare",
    title: "The Scoia’tael: the elves’ war in the books",
    kicker: "Scoia’tael",
    summary:
      "The books explain why the elves took up arms and how Nilfgaard used them. The games give the war new faces.",
    paragraphs: [
      "Their bitterness is old. In The Edge of the World, in The Last Wish, the elf Filavandrel tells Geralt how humans drove his people into the mountains, where they are slowly dying out.",
      "The Scoia’tael, the “squirrels”, are nonhuman guerrillas, mostly elves, who take up arms in the years of the wars with Nilfgaard. In Blood of Elves they attack the dwarven convoy carrying Geralt, Ciri and Triss, and the kings answer with brutal reprisals.",
      "Nilfgaard backs them as a weapon against the North and rewards the elves with Dol Blathanna, a small kingdom under the sorceress Francesca Findabair. When the war ends and Nilfgaard makes peace, the commandos are abandoned and their leaders are handed over for execution.",
      "The first game makes the conflict a choice. In Vizima Geralt can side with the Order of the Flaming Rose, with the Scoia’tael under Yaevinn, or with neither. The second gives the movement a face in Iorveth, a commander created for the game, and his path through Vergen is one of its two main routes.",
      "Neither game’s Scoia’tael leaders come from the books, but their grievances do. The peace that betrayed them is the background to how nonhumans are treated by the time of Witcher 3.",
    ],
    takeaways: [
      "The elves’ grievance starts in The Last Wish.",
      "Nilfgaard armed the Scoia’tael and then abandoned them.",
      "Yaevinn and Iorveth are the games’ own commanders.",
    ],
    characters: ["iorveth", "geralt", "triss", "ciri"],
    sourceIds: [
      "c-scoiatael",
      "c-wiki-last-wish",
      "c-wiki-blood-elves",
      "c-iorveth",
      "c-first-game",
    ],
    layout: {
      left: [0, 1, 2],
      right: [3],
      context: [4],
      book: "blood-of-elves",
    },
  },
  {
    id: "book-friends",
    group: "compare",
    title: "Dandelion and Zoltan: friends from the road",
    kicker: "Dandelion and Zoltan",
    summary:
      "Both friendships are earned in the books. The games keep the two men and make them a double act.",
    paragraphs: [
      "Dandelion is with Geralt from the earliest stories: he is the reason Geralt meets the djinn in The Last Wish, he joins the dragon hunt in Sword of Destiny, and he walks the whole saga beside him as poet, liability and best friend. In The Lady of the Lake he stays behind in Toussaint with its duchess and comes close to being executed there.",
      "Zoltan Chivay enters in Baptism of Fire, leading a band of dwarves and refugees away from the war with a foul-mouthed parrot, Field Marshal Windbag in the English translation. He travels with Geralt for a stretch, fights at the Battle of Brenna, and is beside Geralt again in Rivia when the pogrom begins.",
      "The games keep both and pair them up. In the first, Zoltan is one of the first friendly faces in the Outskirts, and Dandelion turns up in Vizima’s taverns and intrigues. The second finds them both on the gallows in Flotsam. The bard’s look changes along the way: the books’ blond Dandelion becomes brown-haired.",
      "The friendship you see in the games is earned in the books. Witcher 3 treats them as old companions, and Baptism of Fire is where that began.",
    ],
    takeaways: [
      "Dandelion has been with Geralt since the first stories.",
      "Zoltan joins Geralt’s company in Baptism of Fire.",
      "Both were with Geralt near the end of the saga.",
    ],
    characters: ["dandelion", "zoltan", "geralt"],
    sourceIds: [
      "c-dandelion",
      "c-zoltan",
      "c-wiki-last-wish",
      "c-wiki-baptism",
      "c-lady-lake",
    ],
    layout: {
      left: [0, 1],
      right: [2],
      context: [3],
      book: "baptism-of-fire",
    },
  },
  {
    id: "book-kaer-morhen",
    group: "compare",
    title: "Kaer Morhen and the last wolves",
    kicker: "Kaer Morhen",
    summary:
      "The books show a dying school with a girl in its training yard. The games open there and then break the fortress open.",
    paragraphs: [
      "Blood of Elves shows Kaer Morhen as a near-empty fortress. Only a handful of witchers still winter there: old Vesemir, Eskel, Lambert, Geralt and, that year, Coën of another school. They train Ciri on the fortress’s training course, and none of them quite knows how to raise a girl. Triss has to step in.",
      "The books are blunt about what witchers are: children taken in and changed by mutations most of them do not survive, trained by a school that can no longer make new witchers. Vesemir is the eldest of them and the one who keeps the place running.",
      "The first game opens at Kaer Morhen with the same men and Triss, then breaks the fortress open. Salamandra attacks, steals the witchers’ mutagen secrets and kills Leo, a young trainee created for the game.",
      "The second game introduces witchers of another school, the Vipers. Their leader Letho knew Geralt during the years he forgot, which is why Letho recognises him and Geralt does not recognise Letho.",
      "Leo and the Vipers are the games’ additions. Vesemir, Eskel, Lambert and the fortress itself come from the books.",
    ],
    takeaways: [
      "Ciri trained at Kaer Morhen in Blood of Elves.",
      "The witchers there are the last of a dying school.",
      "Leo and the Viper school were created for the games.",
    ],
    characters: ["vesemir", "eskel", "lambert", "ciri", "letho", "triss"],
    sourceIds: [
      "c-wiki-blood-elves",
      "c-vesemir",
      "c-eskel",
      "c-lambert",
      "c-letho",
      "c-first-game",
    ],
    layout: {
      left: [0, 1],
      right: [2, 3],
      context: [4],
      book: "blood-of-elves",
    },
  },
];
