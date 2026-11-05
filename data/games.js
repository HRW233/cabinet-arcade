/* The catalogue. One entry per game, metadata captured from GitHub.
   stars are the public counts at build time; starsText is used where only
   a rounded badge figure was available. embed:false means the host refuses
   framing, so the card opens the game on its own site. */
window.GAMES = [
  {
    "id": "a-dark-room",
    "title": "A Dark Room",
    "repo": "doublespeakgames/adarkroom",
    "url": "https://adarkroom.doublespeakgames.com/",
    "category": "Adventure",
    "blurb": "You wake in a cold room with a fire to light and no explanation. A minimal text game that keeps opening up.",
    "controls": "Click, then type. It teaches you.",
    "tags": [
      "text",
      "survival",
      "minimal",
      "story"
    ],
    "stars": 8370,
    "license": "MPL-2.0",
    "featured": false,
    "embed": false
  },
  {
    "id": "2048",
    "title": "2048",
    "repo": "gd4Ark/2048",
    "url": "https://gd4ark.github.io/2048/",
    "category": "Puzzle",
    "blurb": "Slide the tiles, merge the twos, and try not to run out of board. The cleanest version of the formula.",
    "controls": "Arrow keys or WASD; swipe on touch.",
    "tags": [
      "numbers",
      "sliding",
      "merge",
      "classic"
    ],
    "stars": 113,
    "license": "MIT",
    "featured": true
  },
  {
    "id": "hexgl",
    "title": "HexGL",
    "repo": "BKcore/HexGL",
    "url": "https://hexgl.bkcore.com/play/",
    "category": "Racing",
    "blurb": "An anti-gravity racer built with WebGL. Old-school futuristic, and still remarkably fast.",
    "controls": "Arrows to steer, space to brake.",
    "tags": [
      "racing",
      "webgl",
      "futuristic",
      "speed"
    ],
    "starsText": "1.8k",
    "license": "MIT",
    "featured": true
  },
  {
    "id": "clumsy-bird",
    "title": "Clumsy Bird",
    "repo": "ellisonleao/clumsy-bird",
    "url": "https://ellisonleao.github.io/clumsy-bird/",
    "category": "Arcade",
    "blurb": "The flappy one, remade in MelonJS. Tap through pipes; the second pipe is where most runs end.",
    "controls": "Click, tap, or space to flap.",
    "tags": [
      "flappy",
      "bird",
      "one-button",
      "reflex"
    ],
    "stars": 1632,
    "license": "GPL-3.0",
    "featured": true
  },
  {
    "id": "sandboxels",
    "title": "Sandboxels",
    "repo": "R74nCom/sandboxels",
    "url": "https://sandboxels.r74n.com/",
    "category": "Sandbox",
    "blurb": "A falling-sand laboratory with over 500 elements. Pour water on lava, grow plants, find the reactions.",
    "controls": "Pick an element and draw with the mouse.",
    "tags": [
      "physics",
      "simulation",
      "chemistry",
      "sandbox",
      "powder"
    ],
    "stars": 477,
    "license": "",
    "featured": false,
    "embed": false
  },
  {
    "id": "untrusted",
    "title": "Untrusted",
    "repo": "AlexNisnevich/untrusted",
    "url": "https://untrustedgame.com/",
    "category": "Puzzle",
    "blurb": "An adventure game where the level is JavaScript and the way out is to rewrite it.",
    "controls": "Arrows to move, mouse to edit code.",
    "tags": [
      "javascript",
      "coding",
      "meta",
      "escape",
      "adventure"
    ],
    "stars": 4671,
    "license": "",
    "featured": true
  },
  {
    "id": "pacman",
    "title": "Pac-Man",
    "repo": "mumuy/pacman",
    "url": "https://passer-by.com/pacman/",
    "category": "Arcade",
    "blurb": "A faithful canvas Pac-Man with the classic maze, four ghosts, and power pellets.",
    "controls": "Arrow keys; swipe on touch.",
    "tags": [
      "pacman",
      "maze",
      "ghosts",
      "classic"
    ],
    "stars": 1645,
    "license": "MIT"
  },
  {
    "id": "ancient-beast",
    "title": "Ancient Beast",
    "repo": "FreezingMoon/AncientBeast",
    "url": "https://ancientbeast.com/",
    "category": "Strategy",
    "blurb": "Turn-based tactical combat with a roster of strange beasts. Community-run, community-balanced.",
    "controls": "Click a unit, then a hex.",
    "tags": [
      "tactics",
      "turn-based",
      "creatures",
      "multiplayer"
    ],
    "stars": 1890,
    "license": "AGPL-3.0"
  },
  {
    "id": "star-battle",
    "title": "Star Battle",
    "repo": "gd4Ark/star-battle",
    "url": "https://4ark.me/star-battle",
    "category": "Shooter",
    "blurb": "A neon space shooter with waves, upgrades, and bosses. Made with ES6 and canvas.",
    "controls": "Arrows or WASD to move, space to shoot.",
    "tags": [
      "space",
      "shmup",
      "canvas",
      "upgrades",
      "boss"
    ],
    "stars": 353,
    "license": "MIT"
  },
  {
    "id": "blockrain",
    "title": "Blockrain",
    "repo": "Aerolab/blockrain.js",
    "url": "https://aerolab.github.io/blockrain.js/",
    "category": "Puzzle",
    "blurb": "A Tetris implementation with themes and a tiny footprint. Good for five minutes that become thirty.",
    "controls": "Arrow keys; space to drop.",
    "tags": [
      "tetris",
      "blocks",
      "falling",
      "classic"
    ],
    "stars": 992,
    "license": "MIT"
  },
  {
    "id": "classic-pool",
    "title": "Classic Pool",
    "repo": "henshmi/Classic-Pool-Game",
    "url": "https://henshmi.github.io/Classic-Pool-Game/",
    "category": "Sports",
    "blurb": "Eight-ball pool with mouse-aimed shots and a physics engine doing the arguing.",
    "controls": "Drag to aim and set power.",
    "tags": [
      "pool",
      "billiards",
      "8-ball",
      "physics"
    ],
    "stars": 291,
    "license": "MIT"
  },
  {
    "id": "connect-four",
    "title": "Connect Four",
    "repo": "kenrick95/c4",
    "url": "https://kenrick95.github.io/c4/",
    "category": "Strategy",
    "blurb": "Drop discs, block diagonals, and beat the built-in AI or someone sharing the keyboard.",
    "controls": "Click a column.",
    "tags": [
      "board",
      "four",
      "ai",
      "two-player"
    ],
    "stars": 280,
    "license": "MIT"
  },
  {
    "id": "invaders",
    "title": "Andromeda Invaders",
    "repo": "susam/invaders",
    "url": "https://susam.net/invaders.html",
    "category": "Arcade",
    "blurb": "A fixed shooter in the 1980s idiom, written in one readable HTML file with Web Audio.",
    "controls": "← → move, space to fire.",
    "tags": [
      "space",
      "retro",
      "invaders",
      "canvas",
      "audio"
    ],
    "stars": 181,
    "license": "MIT"
  },
  {
    "id": "prismarine",
    "title": "Prismarine Web Client",
    "repo": "PrismarineJS/prismarine-web-client",
    "url": "https://prismarinejs.github.io/prismarine-web-client/",
    "category": "Sandbox",
    "blurb": "A Minecraft client that runs in the browser, built on the PrismarineJS stack. Point it at a server to play.",
    "controls": "WASD and mouse; needs a server.",
    "tags": [
      "minecraft",
      "voxel",
      "client",
      "multiplayer"
    ],
    "stars": 558,
    "license": "MIT"
  },
  {
    "id": "swordbattle",
    "title": "Swordbattle.io",
    "repo": "codergautam/swordbattle.io",
    "url": "https://swordbattle.io/",
    "category": "Multiplayer",
    "blurb": "A multiplayer .io game about swinging a sword at strangers. Quick rounds, no install.",
    "controls": "WASD and mouse.",
    "tags": [
      "io",
      "sword",
      "pvp",
      "online"
    ],
    "stars": 72,
    "license": "GPL-3.0",
    "embed": false
  },
  {
    "id": "civis",
    "title": "Civis",
    "repo": "Venerons/civis",
    "url": "https://venerons.github.io/civis/",
    "category": "Strategy",
    "blurb": "A 4X strategy game in the browser: settle, research, and push your borders across a hex world.",
    "controls": "Mouse.",
    "tags": [
      "4x",
      "civilization",
      "hex",
      "empire"
    ],
    "stars": 571,
    "license": "GPL-3.0"
  },
  {
    "id": "underrun",
    "title": "UNDERRUN",
    "repo": "phoboslab/underrun",
    "url": "https://phoboslab.org/underrun/",
    "category": "Shooter",
    "blurb": "A twin-stick shooter with a hand-drawn look, built for a 48-hour jam and refined since.",
    "controls": "WASD to move, mouse to aim and shoot.",
    "tags": [
      "twin-stick",
      "shooter",
      "jam",
      "hand-drawn"
    ],
    "stars": 1113,
    "license": "MIT"
  },
  {
    "id": "trex-runner",
    "title": "T-Rex Runner",
    "repo": "wayou/t-rex-runner",
    "url": "https://wayou.github.io/t-rex-runner/",
    "category": "Arcade",
    "blurb": "Chrome's offline dinosaur, saved as a standalone page. Space to jump; that is the whole game.",
    "controls": "Space or ↑ to jump.",
    "tags": [
      "dino",
      "runner",
      "endless",
      "one-button"
    ],
    "stars": 2198,
    "license": "BSD-3-Clause"
  },
  {
    "id": "slay-the-web",
    "title": "Slay the Web",
    "repo": "oskarrough/slaytheweb",
    "url": "https://www.slaytheweb.cards/",
    "category": "Strategy",
    "blurb": "A deck-building roguelike: every fight adds a card, and every card changes the next fight.",
    "controls": "Mouse; drag cards to play them.",
    "tags": [
      "cards",
      "deckbuilder",
      "roguelike",
      "crawl"
    ],
    "stars": 319,
    "license": "AGPL-3.0"
  },
  {
    "id": "mk48",
    "title": "Mk48.io",
    "repo": "SoftbearStudios/mk48",
    "url": "https://mk48.io/",
    "category": "Multiplayer",
    "blurb": "Ship combat on the open sea with other players: torpedoes, upgrades, and a lot of sinking.",
    "controls": "WASD and mouse.",
    "tags": [
      "ships",
      "naval",
      "io",
      "pvp",
      "online"
    ],
    "stars": 454,
    "license": "AGPL-3.0"
  },
  {
    "id": "worldguessr",
    "title": "WorldGuessr",
    "repo": "codergautam/worldguessr",
    "url": "https://worldguessr.com/",
    "category": "Puzzle",
    "blurb": "An open-source GeoGuessr: drop into a random Street View and work out where on earth you are.",
    "controls": "Mouse and the map.",
    "tags": [
      "geography",
      "guessr",
      "maps",
      "streetview",
      "trivia"
    ],
    "stars": 565,
    "license": ""
  },
  {
    "id": "bullethell",
    "title": "Bullet Hell",
    "repo": "selenebun/bullethell",
    "url": "https://selenebun.github.io/bullethell/",
    "category": "Shooter",
    "blurb": "Exactly what the title promises. Thread the gaps, stay alive, chase the score.",
    "controls": "Arrows or mouse.",
    "tags": [
      "bullethell",
      "shmup",
      "hard",
      "arcade"
    ],
    "stars": 49,
    "license": "MIT"
  },
  {
    "id": "astray",
    "title": "Astray",
    "repo": "wwwtyro/Astray",
    "url": "https://wwwtyro.github.io/Astray/",
    "category": "Puzzle",
    "blurb": "A WebGL maze built with three.js. Roll through the corridors and find the way out.",
    "controls": "WASD or arrows.",
    "tags": [
      "maze",
      "webgl",
      "3d",
      "threejs"
    ],
    "stars": 607,
    "license": "Unlicense"
  },
  {
    "id": "openhex",
    "title": "OpenHex",
    "repo": "alcalyn/openhex",
    "url": "https://alcalyn.github.io/openhex/",
    "category": "Strategy",
    "blurb": "A hex-grid strategy game inspired by Slay: claim tiles, grow armies, and roll the dice.",
    "controls": "Mouse.",
    "tags": [
      "hex",
      "territory",
      "strategy",
      "dice"
    ],
    "stars": 28,
    "license": "AGPL-3.0"
  },
  {
    "id": "snowboarder",
    "title": "Snowboarder",
    "repo": "mrbid/Snowboarder",
    "url": "https://mrbid.github.io/snowboarder/",
    "category": "Sports",
    "blurb": "A low-poly downhill run: carve, jump, and try not to find a tree.",
    "controls": "Arrows or WASD.",
    "tags": [
      "snowboard",
      "downhill",
      "3d",
      "winter"
    ],
    "stars": 39,
    "license": "MIT"
  },
  {
    "id": "spaceminer",
    "title": "SpaceMiner",
    "repo": "mrbid/SpaceMiner",
    "url": "https://mrbid.github.io/spaceminer/",
    "category": "Sandbox",
    "blurb": "Mine asteroids in 3D, dodge the debris, and see how long the hull holds.",
    "controls": "WASD and mouse.",
    "tags": [
      "space",
      "mining",
      "3d",
      "asteroids"
    ],
    "stars": 30,
    "license": "MIT"
  },
  {
    "id": "lode-runner-tr",
    "title": "Lode Runner: Total Recall",
    "repo": "SimonHung/LodeRunner_TotalRecall",
    "url": "https://simonhung.github.io/LodeRunner_TotalRecall/",
    "category": "Arcade",
    "blurb": "An HTML5 remake of Lode Runner with a fresh set of levels to dig through.",
    "controls": "Arrows and Z/X.",
    "tags": [
      "lode-runner",
      "remake",
      "retro",
      "levels"
    ],
    "stars": 234,
    "license": ""
  },
  {
    "id": "baghchal",
    "title": "Bagh Chal",
    "repo": "sumn2u/baghchal",
    "url": "https://sumn2u.github.io/baghchal/",
    "category": "Strategy",
    "blurb": "Nepal's tiger-and-goats board game, with an AI that will happily play either side.",
    "controls": "Click a piece, then a target.",
    "tags": [
      "board",
      "nepal",
      "tigers",
      "ai",
      "traditional"
    ],
    "stars": 96,
    "license": "BSD-3-Clause"
  },
  {
    "id": "pokemon-showdown",
    "title": "Pokémon Showdown",
    "repo": "smogon/pokemon-showdown",
    "url": "https://play.pokemonshowdown.com/",
    "category": "Multiplayer",
    "blurb": "The competitive Pokémon battle simulator: build a team, pick a format, fight a stranger.",
    "controls": "Mouse.",
    "tags": [
      "pokemon",
      "battles",
      "competitive",
      "online"
    ],
    "stars": 6018,
    "license": "MIT"
  },
  {
    "id": "word-peaks",
    "title": "Word Peaks",
    "repo": "vegeta897/word-peaks",
    "url": "https://vegeta897.github.io/word-peaks/",
    "category": "Word",
    "blurb": "A word game where every guess is scored hot or cold against a hidden target.",
    "controls": "Keyboard.",
    "tags": [
      "words",
      "guessing",
      "puzzle",
      "daily"
    ],
    "stars": 49,
    "license": "MIT"
  },
  {
    "id": "cubes2",
    "title": "CubeShooter",
    "repo": "mrbid/Cubes2",
    "url": "https://mrbid.github.io/cubeshooter/",
    "category": "Shooter",
    "blurb": "A small 3D arcade shooter: strafe, shoot, repeat. Built with WebGL.",
    "controls": "WASD and mouse.",
    "tags": [
      "3d",
      "shooter",
      "webgl",
      "arcade"
    ],
    "stars": 41,
    "license": "MIT"
  },
  {
    "id": "glitch-duel",
    "title": "Glitch Duel",
    "repo": "dersteppenwolf/glitch_duel",
    "url": "https://dersteppenwolf.github.io/glitch_duel/",
    "category": "Action",
    "blurb": "A tiny arcade duel against an AI that keeps glitching the arena.",
    "controls": "Arrows and space.",
    "tags": [
      "duel",
      "ai",
      "arcade",
      "glitch"
    ],
    "stars": 1,
    "license": ""
  },
  {
    "id": "fifty-games",
    "title": "Fifty JavaScript Games",
    "repo": "he-is-talha/html-css-javascript-games",
    "url": "https://he-is-talha.github.io/html-css-javascript-games/",
    "category": "Collection",
    "blurb": "Fifty small browser games with demos and source: Snake, Tetris, memory, typing, and more.",
    "controls": "Each game explains itself.",
    "tags": [
      "collection",
      "mini-games",
      "snake",
      "tetris",
      "memory"
    ],
    "stars": 298,
    "license": "MIT"
  },
  {
    "id": "coin-pusher",
    "title": "SeaPusher",
    "repo": "mrbid/CoinPusher",
    "url": "https://seapusher.github.io/",
    "category": "Arcade",
    "blurb": "A 3D coin pusher. The most honest arcade machine ever built: the house always wins.",
    "controls": "Mouse.",
    "tags": [
      "coins",
      "arcade",
      "3d",
      "pusher"
    ],
    "stars": 26,
    "license": "GPL-2.0"
  },
  {
    "id": "fifteen-puzzle",
    "title": "Fifteen Puzzle",
    "repo": "Kirilllive/Fifteen_puzzle_maker",
    "url": "https://kirilllive.github.io/Fifteen_puzzle_maker/",
    "category": "Puzzle",
    "blurb": "The sliding-tile classic, with a puzzle maker so you can set your own arrangement.",
    "controls": "Click tiles or use arrow keys.",
    "tags": [
      "sliding",
      "tiles",
      "puzzle",
      "classic"
    ],
    "stars": 79,
    "license": "MIT"
  },
  {
    "id": "tux-pusher",
    "title": "TuxPusher",
    "repo": "mrbid/TuxPusher",
    "url": "https://tuxpusher.github.io/",
    "category": "Arcade",
    "blurb": "The coin pusher again, now with penguins and a festive theme.",
    "controls": "Mouse.",
    "tags": [
      "coins",
      "penguin",
      "3d",
      "pusher"
    ],
    "stars": 40,
    "license": "GPL-2.0"
  },
  {
    "id": "snake-io",
    "title": "Snake.io",
    "repo": "bibhuticoder/snake.io",
    "url": "https://bibhuticoder.github.io/snake.io/",
    "category": "Arcade",
    "blurb": "A single-player slither clone: collect orbs, grow long, and cut off the rivals.",
    "controls": "Mouse to steer.",
    "tags": [
      "snake",
      "slither",
      "io",
      "grow"
    ],
    "stars": 49,
    "license": "MIT"
  },
  {
    "id": "one-html-page",
    "title": "One HTML Page Challenge",
    "repo": "Metroxe/one-html-page-challenge",
    "url": "https://onehtmlpagechallenge.com/",
    "category": "Collection",
    "blurb": "A gallery of things built in a single HTML file with no libraries; several of them are games.",
    "controls": "Depends on the piece.",
    "tags": [
      "collection",
      "experiments",
      "single-file",
      "demo"
    ],
    "stars": 1413,
    "license": ""
  },
  {
    "id": "kaetram",
    "title": "Kaetram",
    "repo": "Kaetram/Kaetram-Open",
    "url": "https://kaetram.com/",
    "category": "Adventure",
    "blurb": "A 2D pixel MMORPG descended from BrowserQuest. Make a character and wander off.",
    "controls": "WASD or arrows.",
    "tags": [
      "mmorpg",
      "pixel",
      "browserquest",
      "multiplayer"
    ],
    "stars": 752,
    "license": "MPL-2.0",
    "embed": false
  },
  {
    "id": "lichess",
    "title": "Lichess",
    "repo": "lichess-org/lila",
    "url": "https://lichess.org/",
    "category": "Strategy",
    "blurb": "The open-source chess server. Play a human, a computer, or solve a puzzle; none of it paywalled.",
    "controls": "Mouse.",
    "tags": [
      "chess",
      "board",
      "online",
      "puzzles"
    ],
    "starsText": "19k",
    "license": "AGPL-3.0",
    "embed": false
  },
  {
    "id": "royal-ur",
    "title": "Royal Game of Ur",
    "repo": "RoyalUr/RoyalUr.net",
    "url": "https://royalur.net/",
    "category": "Strategy",
    "blurb": "A 4,500-year-old board game, reconstructed and playable against people or bots.",
    "controls": "Mouse.",
    "tags": [
      "board",
      "ancient",
      "dice",
      "history"
    ],
    "stars": 174,
    "license": "MIT",
    "embed": false
  },
  {
    "id": "openfront",
    "title": "OpenFront",
    "repo": "openfrontio/OpenFrontIO",
    "url": "https://openfront.io/",
    "category": "Strategy",
    "blurb": "A real-time strategy game of territory and nukes, played with dozens of others on one map.",
    "controls": "Mouse; build and attack.",
    "tags": [
      "rts",
      "territory",
      "nuclear",
      "online",
      "io"
    ],
    "stars": 2875,
    "license": "AGPL-3.0",
    "embed": false
  }
];
