# The Wolf's Path

A private reading companion for returning to The Witcher 3: Wild Hunt. It has chapter recaps of The Witcher and The Witcher 2, notes on 24 returning characters, and comparisons between the games and Andrzej Sapkowski's books. Every recap and character entry links to its sources.

The recaps contain full spoilers for the first two games and stop before later Witcher 3 events. Book comparisons are hidden until you choose to show them. Player choices are described as alternatives, not as one canonical playthrough.

Reading progress, bookmarks and the book spoiler setting are saved in the browser's `localStorage`. There is no account or backend.

## Running it

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci          # install dependencies from the lockfile
npm run dev     # start the development server at http://127.0.0.1:5173
npm test        # run the tests
npm run build   # build the site into dist/
```

`node scripts/contrast.mjs` prints the contrast ratios of the colour palette.

## Folder layout

| Path                | Contents                                                   |
| ------------------- | ---------------------------------------------------------- |
| `src/App.jsx`       | Pages, navigation, search and reading state                |
| `src/components/`   | Character portraits, comparison spreads and source library |
| `src/data/`         | Recaps, characters, book comparisons and their sources     |
| `src/lib.js`        | Routing, search, reading time and saved state helpers      |
| `src/artwork.js`    | Chapter, book, world and interface image records           |
| `src/portraits.js`  | Character portrait records                                 |
| `src/styles.css`    | Layout and styling                                         |
| `public/`           | Images, favicon and font licences                          |
| `tests/`            | Content, routing, storage, artwork and contrast tests      |
| `scripts/`          | Contrast check used by the tests                           |
| `notes/`            | Research notes behind the recaps and comparisons           |

## Image credits

The Witcher was created by Andrzej Sapkowski. Game characters and artwork are © CD PROJEKT S.A. Book covers are from Orbit/Hachette Book Group. The original source of every image is listed under Image credits on the app's Sources & lore page. This is a personal fan project, not an official CD PROJEKT RED publication.
