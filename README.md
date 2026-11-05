# CABINET

An open-source arcade: a catalogue of browser games that live on GitHub, with every cabinet linking back to the repository and licence it came from.

The site is a single static page. No build step, no framework, no tracking on the catalogue page, no accounts.

## What's here

- `index.html` — the catalogue shell, hero, player overlay and dialogs.
- `assets/styles.css` — the whole visual system (paper, ink, cobalt, flame, brass; Anton + Space Grotesk).
- `assets/app.js` — filtering, search, sorting, saves, recents, keyboard shortcuts, the player and the generated cover art.
- `data/games.js` — the catalogue itself. One object per game.

## Run it

```sh
python3 -m http.server 3001 --bind 0.0.0.0
```

Then open <http://localhost:3001>. Any static file server works; there is nothing to compile.

## Add a game

Append an entry to `window.GAMES` in `data/games.js`:

```js
{
  id: "my-game",                    // url-safe, unique
  title: "My Game",
  repo: "owner/repo",               // the GitHub source
  url: "https://example.com/game/", // the playable page (preferably GitHub Pages)
  category: "Arcade",               // one of the genre names in the rail
  blurb: "One or two sentences on what the game is.",
  controls: "Arrows to move, space to shoot.",
  tags: ["space", "shmup"],         // search keywords
  stars: 1234,                      // or starsText: "1.2k"
  license: "MIT",                   // "" when the repo does not state one
  embed: false                      // optional: opens on its own site
}
```

Cover art is generated from the entry's `id` and position, so no images are needed. Each cabinet gets a unique colour/pattern pair from 72 combinations.

## Safety

Every game runs in a sandboxed iframe. The sandbox allows scripts, forms, popups, modals and pointer lock, but not top-level navigation, downloads, or popups that escape the sandbox, so a game cannot take over the tab. The catalogue page itself loads only local scripts and Google Fonts; it has no analytics, forms or downloads. A strict Content-Security-Policy limits scripts to this origin and blocks plugins, base tags and form submissions; external links open with `noopener noreferrer`.

## A note on embedding

Most games are loaded from their original GitHub Pages or project sites inside a sandboxed iframe; nothing is copied or re-hosted here. Embedded games are third-party pages and may load their own analytics or assets, which are outside this page's control. Some sites set `X-Frame-Options` or a `frame-ancestors` policy and cannot be framed — those are marked `↗` and open on their own domain. Metadata (stars, licences) was captured from GitHub while the catalogue was assembled and will drift over time.

Every game remains the property of its authors under the licence stated in its repository.
