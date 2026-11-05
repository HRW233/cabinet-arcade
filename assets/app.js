/* CABINET — catalogue behaviour. No dependencies. */
(function () {
  "use strict";

  var GAMES = (window.GAMES || []).map(function (g, i) {
    g.no = String(i + 1).padStart(3, "0");
    g.index = i;
    return g;
  });

  var PAPER = "#f2e7d3";
  var INK = "#17120c";
  var COBALT = "#1520c8";
  var FLAME = "#f2542d";
  var BRASS = "#c2963b";

  var PALETTES = [
    { bg: COBALT, fg: PAPER, ac: FLAME },
    { bg: PAPER, fg: INK, ac: COBALT },
    { bg: FLAME, fg: INK, ac: PAPER },
    { bg: INK, fg: PAPER, ac: BRASS },
    { bg: BRASS, fg: INK, ac: COBALT },
    { bg: PAPER, fg: COBALT, ac: FLAME }
  ];

  var $ = function (sel, root) { return (root || document).querySelector(sel); };

  var state = {
    q: "",
    genre: "All",
    sort: "featured",
    onlySaved: false,
    saved: new Set(load("cabinet:saved", [])),
    recent: load("cabinet:recent", [])
  };

  var current = null;
  var lastFocus = null;
  var failTimer = null;
  var toastTimer = null;
  var openList = [];
  var openIndex = 0;

  // ---------- storage ----------

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* private mode */ }
  }

  // ---------- helpers ----------

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function hashOf(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function parseApprox(text) {
    if (!text) return 0;
    var m = String(text).match(/([\d.]+)\s*([km])?/i);
    if (!m) return 0;
    var n = parseFloat(m[1]);
    if (!m[2]) return n;
    return Math.round(n * (m[2].toLowerCase() === "k" ? 1000 : 1000000));
  }

  function score(g) {
    return g.stars != null ? g.stars : parseApprox(g.starsText);
  }

  function starsLabel(g) {
    if (g.starsText) return g.starsText;
    if (g.stars == null) return "";
    if (g.stars >= 1000) return (g.stars / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(g.stars);
  }

  function licenseLabel(g) {
    if (!g.license || g.license === "NOASSERTION") return "See repo for licence";
    return g.license;
  }

  function byId(id) {
    for (var i = 0; i < GAMES.length; i++) if (GAMES[i].id === id) return GAMES[i];
    return null;
  }

  function glyphFor(title) {
    var digits = title.match(/\d+/);
    if (digits && /^\d/.test(title)) return digits[0].slice(0, 4);
    var words = title.replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/);
    if (words.length > 1) {
      return words.slice(0, 3).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
    }
    return title.slice(0, 2).toUpperCase();
  }

  // ---------- cover art: twelve print patterns, one label plate ----------

  function pattern(kind, p) {
    var out = "";
    var i, r, c, x, y, a;
    var H = 238;

    if (kind === 0) {
      out += '<circle cx="300" cy="112" r="92" fill="none" stroke="' + p.fg + '" stroke-width="18"/>';
      out += '<circle cx="300" cy="112" r="52" fill="none" stroke="' + p.ac + '" stroke-width="14"/>';
      out += '<circle cx="300" cy="112" r="11" fill="' + p.fg + '"/>';
      out += '<rect x="0" y="188" width="128" height="50" fill="' + p.ac + '"/>';
    } else if (kind === 1) {
      var widths = [40, 22, 58, 30, 66, 34, 50, 28];
      x = 0;
      for (i = 0; i < widths.length; i++) {
        out += '<rect x="' + x + '" y="0" width="' + widths[i] + '" height="' + H + '" fill="' + (i % 3 === 2 ? p.ac : p.fg) + '" opacity="' + (i % 2 ? 0.82 : 1) + '"/>';
        x += widths[i] + 8;
      }
    } else if (kind === 2) {
      for (r = 0; r < 3; r++) {
        for (c = 0; c < 6; c++) {
          x = 24 + c * 60;
          y = 14 + r * 74;
          out += '<rect x="' + x + '" y="' + y + '" width="52" height="52" fill="' + ((r * 6 + c) % 4 < 2 ? p.fg : p.ac) + '" opacity="' + ((r + c) % 2 ? 0.9 : 0.55) + '"/>';
        }
      }
    } else if (kind === 3) {
      for (i = 0; i < 9; i++) {
        a = Math.PI + (i * Math.PI) / 8;
        var x1 = 200 + Math.cos(a - 0.055) * 360;
        var y1 = 238 + Math.sin(a - 0.055) * 360;
        var x2 = 200 + Math.cos(a + 0.055) * 360;
        var y2 = 238 + Math.sin(a + 0.055) * 360;
        out += '<path d="M200 238 L' + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + ' Z" fill="' + (i % 2 ? p.ac : p.fg) + '" opacity=".5"/>';
      }
      out += '<circle cx="200" cy="238" r="44" fill="' + p.fg + '"/>';
    } else if (kind === 4) {
      out += '<circle cx="128" cy="238" r="170" fill="none" stroke="' + p.fg + '" stroke-width="26"/>';
      out += '<circle cx="128" cy="238" r="112" fill="none" stroke="' + p.ac + '" stroke-width="24"/>';
      out += '<circle cx="128" cy="238" r="54" fill="none" stroke="' + p.fg + '" stroke-width="22"/>';
      out += '<rect x="298" y="26" width="72" height="72" fill="' + p.ac + '"/>';
    } else if (kind === 5) {
      out += '<polyline points="0,170 50,110 100,170 150,110 200,170 250,110 300,170 350,110 400,170" fill="none" stroke="' + p.ac + '" stroke-width="17"/>';
      out += '<circle cx="70" cy="58" r="33" fill="' + p.fg + '"/>';
      out += '<rect x="300" y="40" width="58" height="58" fill="' + p.fg + '" opacity=".9"/>';
    } else if (kind === 6) {
      out += '<polygon points="0,0 238,0 0,238" fill="' + p.fg + '"/>';
      for (r = 0; r < 3; r++) {
        for (c = 0; c < 4; c++) {
          out += '<circle cx="' + (268 + c * 32) + '" cy="' + (146 + r * 32) + '" r="5" fill="' + p.fg + '" opacity=".55"/>';
        }
      }
      out += '<rect x="270" y="26" width="98" height="98" fill="' + p.ac + '"/>';
    } else if (kind === 7) {
      for (r = 0; r < 4; r++) {
        for (c = 0; c < 6; c++) {
          out += '<circle cx="' + (42 + c * 64) + '" cy="' + (36 + r * 54) + '" r="' + (6 + ((r + c) % 3) * 5) + '" fill="' + ((r + c) % 4 === 0 ? p.ac : p.fg) + '" opacity=".85"/>';
        }
      }
    } else if (kind === 8) {
      for (r = 0; r < 2; r++) {
        for (c = 0; c < 4; c++) {
          x = c * 100;
          y = r * 119;
          var fill = (r + c) % 3 === 0 ? p.ac : p.fg;
          out += '<polygon points="' + x + "," + y + " " + (x + 100) + "," + y + " " + x + "," + (y + 119) + '" fill="' + fill + '" opacity="' + ((r + c) % 2 ? 0.78 : 1) + '"/>';
        }
      }
    } else if (kind === 9) {
      out += '<rect x="34" y="30" width="188" height="126" fill="' + p.fg + '"/>';
      out += '<rect x="248" y="16" width="118" height="86" fill="' + p.ac + '"/>';
      out += '<rect x="248" y="120" width="118" height="84" fill="' + p.fg + '" opacity=".88"/>';
      out += '<rect x="34" y="176" width="92" height="38" fill="' + p.ac + '"/>';
    } else if (kind === 10) {
      out += '<rect x="158" y="16" width="62" height="204" fill="' + p.fg + '"/>';
      out += '<rect x="92" y="84" width="194" height="62" fill="' + p.fg + '"/>';
      out += '<circle cx="62" cy="46" r="25" fill="' + p.ac + '"/>';
    } else {
      out += '<path d="M0 238 A92 92 0 0 1 184 238 Z" fill="' + p.ac + '"/>';
      out += '<path d="M118 238 A104 104 0 0 1 326 238 Z" fill="' + p.fg + '" opacity=".9"/>';
      out += '<rect x="330" y="22" width="52" height="52" fill="' + p.ac + '"/>';
    }
    return out;
  }

  function coverArt(game) {
    var slot = game.coverIndex == null ? (game.index * 5 + hashOf(game.id)) % 72 : game.coverIndex;
    var p = PALETTES[slot % PALETTES.length];
    var kind = Math.floor(slot / PALETTES.length) % 12;
    var glyph = glyphFor(game.title);
    var label = game.embed === false ? "↗ OPEN SITE" : String(game.category).toUpperCase();

    return (
      '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Cover for ' + esc(game.title) + '">' +
        '<rect width="400" height="300" fill="' + p.bg + '"/>' +
        pattern(kind, p) +
        '<rect x="14" y="13" width="74" height="21" fill="' + PAPER + '" opacity=".94"/>' +
        '<text x="20" y="28" font-family="Space Grotesk, ui-sans-serif, sans-serif" font-size="10" letter-spacing="1.8" fill="' + INK + '">NO. ' + game.no + "</text>" +
        '<rect x="0" y="236" width="400" height="64" fill="' + PAPER + '"/>' +
        '<rect x="0" y="234" width="400" height="3" fill="' + INK + '"/>' +
        '<text x="16" y="280" font-family="Anton, Impact, sans-serif" font-size="27" letter-spacing="1" fill="' + INK + '">' + esc(glyph) + "</text>" +
        '<text x="384" y="278" text-anchor="end" font-family="Space Grotesk, ui-sans-serif, sans-serif" font-size="10" letter-spacing="1.3" fill="' + INK + '" opacity=".66">' + esc(label) + "</text>" +
      "</svg>"
    );
  }

  // ---------- filtering ----------

  function visibleGames() {
    var q = state.q.trim().toLowerCase();
    var list = GAMES.filter(function (g) {
      if (state.onlySaved && !state.saved.has(g.id)) return false;
      if (state.genre !== "All" && g.category !== state.genre) return false;
      if (!q) return true;
      var hay = [g.title, g.repo, g.category, g.blurb, (g.tags || []).join(" ")].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    if (state.sort === "az") {
      list.sort(function (a, b) { return a.title.localeCompare(b.title); });
    } else if (state.sort === "stars") {
      list.sort(function (a, b) { return score(b) - score(a); });
    } else if (state.sort === "license") {
      list.sort(function (a, b) { return licenseLabel(a).localeCompare(licenseLabel(b)) || a.title.localeCompare(b.title); });
    }
    return list;
  }

  // ---------- render: rail ----------

  function renderGenres() {
    var counts = {};
    GAMES.forEach(function (g) { counts[g.category] = (counts[g.category] || 0) + 1; });
    var genres = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    var html = '<button class="genre" type="button" data-genre="All" aria-pressed="' + (state.genre === "All" && !state.onlySaved) + '">' +
      "<span>All cabinets</span><span class=\"genre__count\">" + GAMES.length + "</span></button>";
    genres.forEach(function (name) {
      html += '<button class="genre" type="button" data-genre="' + esc(name) + '" aria-pressed="' + (state.genre === name && !state.onlySaved) + '">' +
        "<span>" + esc(name) + '</span><span class="genre__count">' + counts[name] + "</span></button>";
    });
    $("#genres").innerHTML = html;
  }

  function renderShelf() {
    $("#saved-count").textContent = state.saved.size;
    $("#saved-filter").setAttribute("aria-pressed", String(state.onlySaved));
    var recent = state.recent.map(byId).filter(Boolean).slice(0, 5);
    if (!recent.length) { $("#recent").innerHTML = ""; return; }
    $("#recent").innerHTML = '<p class="recent__label">Recently played</p>' + recent.map(function (g) {
      return '<button class="recent__item" type="button" data-open="' + esc(g.id) + '">' +
        '<span class="recent__no">' + g.no + "</span><span>" + esc(g.title) + "</span></button>";
    }).join("");
  }

  // ---------- render: grid ----------

  function saveIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 3.5h12v17l-6-4.4-6 4.4z"/></svg>';
  }

  function cardHTML(g, i) {
    var stars = starsLabel(g);
    var saved = state.saved.has(g.id);
    return (
      '<article class="card" style="--i:' + Math.min(i, 22) + '">' +
        '<button class="card__open" type="button" data-open="' + esc(g.id) + '" aria-label="Play ' + esc(g.title) + '"></button>' +
        '<button class="card__save" type="button" data-save="' + esc(g.id) + '" aria-pressed="' + saved + '" aria-label="' + (saved ? "Remove " : "Save ") + esc(g.title) + '">' + saveIcon() + "</button>" +
        '<div class="cover">' + coverArt(g) + "</div>" +
        '<div class="card__body">' +
          '<h3 class="card__title">' + esc(g.title) + "</h3>" +
          '<p class="card__meta">' +
            (stars ? '<span class="card__stars">★ ' + esc(stars) + "</span>" : "") +
            '<span class="card__lic">' + esc(licenseLabel(g)) + "</span>" +
          "</p>" +
          '<p class="card__meta card__repo">' + esc(g.repo) + "</p>" +
        "</div>" +
      "</article>"
    );
  }

  function renderGrid() {
    var list = visibleGames();
    $("#grid").hidden = list.length === 0;
    $("#empty").hidden = list.length > 0;
    $("#grid").innerHTML = list.map(cardHTML).join("");
    $("#result-count").textContent = list.length === GAMES.length
      ? GAMES.length + " cabinets"
      : list.length + " of " + GAMES.length + " cabinets";
    if (!list.length) {
      $("#empty-body").textContent = state.q
        ? "Nothing matches “" + state.q + "”. Try a title, a genre, or a repo name."
        : "This drawer is empty. Clear the filters to see everything.";
    }
  }

  // ---------- render: hero + stats ----------

  function renderFeature() {
    var pool = GAMES.filter(function (g) { return g.featured; });
    if (!pool.length) pool = GAMES;
    var day = Math.floor(Date.now() / 86400000);
    var g = pool[day % pool.length];
    $("#feature-cover").innerHTML = coverArt(g);
    $("#feature-title").textContent = g.title;
    $("#feature-blurb").textContent = g.blurb;
    $("#feature-meta").innerHTML =
      '<span class="chip">' + esc(g.category) + "</span>" +
      (starsLabel(g) ? '<span class="chip">★ ' + esc(starsLabel(g)) + "</span>" : "") +
      '<span class="chip">' + esc(licenseLabel(g)) + "</span>";
    $("#feature-play").onclick = function () { launch(g.id); };
    $("#feature").setAttribute("data-feature", g.id);
  }

  function renderStats() {
    var genres = {};
    GAMES.forEach(function (g) { genres[g.category] = 1; });
    $("#stat-games").textContent = GAMES.length;
    $("#stat-genres").textContent = Object.keys(genres).length;
    $("#stat-stars").textContent = GAMES.filter(function (g) { return g.embed !== false; }).length;
  }

  // ---------- player ----------

  function launch(id) {
    var g = byId(id);
    if (!g) return;
    if (g.embed === false) {
      window.open(g.url, "_blank", "noopener,noreferrer");
      toast(g.title + " opens on its own site — it declines to be framed.");
      return;
    }
    openPlayer(g, true);
  }

  function openPlayer(g, push) {
    current = g;
    lastFocus = document.activeElement;
    var player = $("#player");
    if (player.hidden) player.hidden = false;
    document.documentElement.classList.add("locked");

    $("#player-no").textContent = "No. " + g.no + "  /  " + g.category;
    $("#player-title").textContent = g.title;
    $("#player-sub").textContent = [starsLabel(g) ? starsLabel(g) + " stars" : "", licenseLabel(g), g.repo].filter(Boolean).join("  /  ");
    $("#player-controls").textContent = g.controls ? "Controls: " + g.controls : "Controls live inside the game.";
    $("#player-source").href = "https://github.com/" + g.repo;
    $("#player-external").href = g.url;
    $("#blocked-link").href = g.url;

    $("#loader").hidden = false;
    $("#blocked").hidden = true;
    var frame = $("#frame");
    frame.src = "about:blank";
    frame.src = g.url;

    clearTimeout(failTimer);
    failTimer = setTimeout(function () {
      if (!current || $("#loader").hidden) return;
      $("#loader").hidden = true;
      $("#blocked").hidden = false;
    }, 14000);

    $("#player-close").focus({ preventScroll: true });

    var list = visibleGames();
    openList = list.length > 1 ? list : GAMES;
    openIndex = openList.findIndex(function (x) { return x.id === g.id; });
    if (openIndex === -1) { openList = GAMES; openIndex = GAMES.indexOf(g); }
    $("#player-prev").disabled = openList.length < 2;
    $("#player-next").disabled = openList.length < 2;

    state.recent = [g.id].concat(state.recent.filter(function (x) { return x !== g.id; })).slice(0, 5);
    save("cabinet:recent", state.recent);
    renderShelf();

    try {
      if (push !== false) history.pushState({ id: g.id }, "", "#/g/" + g.id);
      else history.replaceState({ id: g.id }, "", "#/g/" + g.id);
    } catch (err) { /* file:// */ }
  }

  function closePlayer(pushHash) {
    if (!current) return;
    current = null;
    clearTimeout(failTimer);
    $("#frame").src = "about:blank";
    $("#player").hidden = true;
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(function () { /* already out */ });
    }
    document.documentElement.classList.remove("locked");
    if (pushHash !== false) {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (err) { /* file:// */ }
    }
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function step(dir) {
    if (!current || openList.length < 2) return;
    openIndex = (openIndex + dir + openList.length) % openList.length;
    openPlayer(openList[openIndex], false);
  }

  // ---------- toast ----------

  function toast(message) {
    var el = $("#toast");
    el.textContent = message;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 3400);
  }

  // ---------- events ----------

  document.addEventListener("click", function (event) {
    var open = event.target.closest("[data-open]");
    if (open) { launch(open.getAttribute("data-open")); return; }

    var saveBtn = event.target.closest("[data-save]");
    if (saveBtn) {
      var id = saveBtn.getAttribute("data-save");
      var game = byId(id) || {};
      var isSaved = state.saved.has(id);
      if (isSaved) {
        state.saved.delete(id);
        toast("Removed from your shelf.");
      } else {
        state.saved.add(id);
        toast("Saved to your shelf.");
      }
      save("cabinet:saved", Array.from(state.saved));
      saveBtn.setAttribute("aria-pressed", String(!isSaved));
      saveBtn.setAttribute("aria-label", (!isSaved ? "Remove " : "Save ") + (game.title || "game"));
      if (state.onlySaved) renderGrid();
      renderShelf();
      return;
    }

    var genre = event.target.closest("[data-genre]");
    if (genre) {
      state.genre = genre.getAttribute("data-genre");
      state.onlySaved = false;
      renderGenres();
      renderShelf();
      renderGrid();
      if (window.matchMedia("(max-width: 900px)").matches) {
        $("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
  });

  $(".search").addEventListener("submit", function (e) {
    e.preventDefault();
  });

  $("#search").addEventListener("input", function (e) {
    state.q = e.target.value;
    renderGrid();
  });

  $("#sort").addEventListener("change", function (e) {
    state.sort = e.target.value;
    renderGrid();
  });

  $("#saved-filter").addEventListener("click", function () {
    state.onlySaved = !state.onlySaved;
    if (state.onlySaved) state.genre = "All";
    renderGenres();
    renderShelf();
    renderGrid();
  });

  $("#clear").addEventListener("click", function () {
    state.q = "";
    state.genre = "All";
    state.onlySaved = false;
    $("#search").value = "";
    renderGenres();
    renderShelf();
    renderGrid();
  });

  $("#random").addEventListener("click", randomGame);
  $("#hero-random").addEventListener("click", randomGame);
  $("#hero-browse").addEventListener("click", function () {
    $("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });
    $("#search").focus({ preventScroll: true });
  });

  function randomGame() {
    var pool = visibleGames();
    if (!pool.length) pool = GAMES;
    if (!pool.length) return;
    launch(pool[Math.floor(Math.random() * pool.length)].id);
  }

  $("#player-close").addEventListener("click", function () { closePlayer(true); });
  $("#player-back").addEventListener("click", function () { closePlayer(true); });
  $("#player-prev").addEventListener("click", function () { step(-1); });
  $("#player-next").addEventListener("click", function () { step(1); });
  $("#player-reload").addEventListener("click", function () {
    if (!current) return;
    $("#loader").hidden = false;
    $("#blocked").hidden = true;
    $("#frame").src = current.url + (current.url.indexOf("?") === -1 ? "?reload=" : "&reload=") + Date.now();
  });
  $("#player-full").addEventListener("click", function () {
    var stage = $("#player-stage");
    if (!document.fullscreenElement) {
      if (stage.requestFullscreen) stage.requestFullscreen().catch(function () { /* denied */ });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  });

  $("#frame").addEventListener("load", function () {
    if (!current) return;
    clearTimeout(failTimer);
    $("#loader").hidden = true;
  });

  window.addEventListener("popstate", function () {
    var m = location.hash.match(/^#\/g\/([^/]+)$/);
    if (m) {
      var g = byId(m[1]);
      if (g && g.embed !== false) openPlayer(g, false);
      else closePlayer(false);
    } else {
      closePlayer(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "select" || tag === "textarea";

    if (e.key === "Escape") {
      if (current) { closePlayer(true); e.preventDefault(); }
      else if (typing) e.target.blur();
      return;
    }
    if (typing) return;

    if (e.key === "/") { e.preventDefault(); $("#search").focus(); return; }
    if (e.key === "ArrowLeft" && current) { e.preventDefault(); step(-1); return; }
    if (e.key === "ArrowRight" && current) { e.preventDefault(); step(1); return; }
    if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey) { randomGame(); }
  });

  $("#recent").addEventListener("click", function (e) {
    var item = e.target.closest("[data-open]");
    if (item) launch(item.getAttribute("data-open"));
  });

  // ---------- boot ----------

  // give every cabinet its own colour/pattern pair (72 combinations exist)
  (function assignCovers() {
    var used = {};
    GAMES.forEach(function (g) {
      var h = hashOf(g.id);
      var pick = 0;
      for (var k = 0; k < 72; k++) {
        var idx = (h + k * 7) % 72;
        if (!used[idx]) { used[idx] = true; pick = idx; break; }
      }
      g.coverIndex = pick;
    });
  })();

  renderGenres();
  renderShelf();
  renderStats();
  renderFeature();
  renderGrid();

  var deep = location.hash.match(/^#\/g\/([^/]+)$/);
  if (deep) {
    var deepGame = byId(deep[1]);
    if (deepGame && deepGame.embed !== false) openPlayer(deepGame, false);
  }

  setInterval(function () {
    var d = Math.floor(Date.now() / 86400000);
    if (d !== window.__cabinetDay) { window.__cabinetDay = d; renderFeature(); }
  }, 60000);
  window.__cabinetDay = Math.floor(Date.now() / 86400000);
})();
