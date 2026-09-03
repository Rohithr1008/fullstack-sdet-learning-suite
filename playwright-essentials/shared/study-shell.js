/* Shared study-app shell JS — source of truth.
   Edit this file, then run: node scripts/inline-shell.js
   CI fails if HTML between SHARED-SHELL-JS markers drifts. */
(function (global) {
  "use strict";

  var FONT_CLASSES = ["font-sm", "font-md", "font-lg"];
  var FONT_LEVELS = ["font-sm", "", "font-md", "font-lg"];

  function normalizeThemeMode(value) {
    if (value === "dark" || value === "force-dark") return "force-dark";
    if (value === "light" || value === "force-light") return "force-light";
    return null;
  }

  function setThemeMode(mode, btnId) {
    var root = document.documentElement;
    root.classList.remove("force-dark", "force-light");
    root.classList.add(mode);
    var btn = document.getElementById(btnId || "themeBtn");
    if (btn) btn.textContent = mode === "force-dark" ? "☀️ Light mode" : "🌙 Dark mode";
    return mode;
  }

  function isDark() {
    var root = document.documentElement;
    if (root.classList.contains("force-dark")) return true;
    if (root.classList.contains("force-light")) return false;
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function applyTheme(storageKey, btnId) {
    var saved = normalizeThemeMode(localStorage.getItem(storageKey));
    if (saved) return setThemeMode(saved, btnId);
    return setThemeMode(isDark() ? "force-dark" : "force-light", btnId);
  }

  function toggleTheme(storageKey, btnId) {
    var next = isDark() ? "force-light" : "force-dark";
    setThemeMode(next, btnId);
    localStorage.setItem(storageKey, next);
    return next;
  }

  function clearFontClasses(html) {
    FONT_CLASSES.forEach(function (c) {
      html.classList.remove(c);
    });
  }

  function fontZoom(dir, storageKey) {
    var html = document.documentElement;
    var cur = "";
    FONT_CLASSES.forEach(function (c) {
      if (html.classList.contains(c)) cur = c;
    });
    clearFontClasses(html);
    if (dir !== 0) {
      var idx = cur === "font-md" ? 2 : cur === "font-lg" ? 3 : cur === "font-sm" ? 0 : 1;
      var nxt = Math.max(0, Math.min(3, idx + dir));
      var addCls = FONT_LEVELS[nxt];
      if (addCls) html.classList.add(addCls);
      localStorage.setItem(storageKey, addCls || "normal");
    } else {
      localStorage.setItem(storageKey, "normal");
    }
  }

  function applyFontZoom(storageKey) {
    var saved = localStorage.getItem(storageKey);
    if (saved && saved !== "normal" && FONT_CLASSES.indexOf(saved) >= 0) {
      clearFontClasses(document.documentElement);
      document.documentElement.classList.add(saved);
    }
  }

  function focusMode(btn, hintId) {
    var on = !document.body.classList.contains("focus-mode");
    document.body.classList.toggle("focus-mode", on);
    var hint = hintId ? document.getElementById(hintId) : null;
    if (hint) hint.style.display = on ? "block" : "none";
    if (btn) {
      btn.textContent = on ? "🧘 Focus ON" : "🧘 Focus Mode";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.style.background = on ? "#319795" : "";
    }
    document.querySelectorAll("details").forEach(function (d) {
      try {
        d.open = false;
      } catch (e) {}
    });
    if (on) {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {}
    }
    return on;
  }

  function collapseDetails(expand, selector) {
    var sel = selector || ".quiz-box details";
    document.querySelectorAll(sel).forEach(function (d) {
      if (expand) d.setAttribute("open", "open");
      else d.removeAttribute("open");
    });
  }

  function enhanceA11y() {
    document
      .querySelectorAll(
        '.code-editor:not([aria-label]):not([aria-labelledby]), [contenteditable="true"]:not([aria-label]):not([aria-labelledby])'
      )
      .forEach(function (el, i) {
        if (!el.getAttribute("role")) el.setAttribute("role", "textbox");
        el.setAttribute("aria-multiline", "true");
        el.setAttribute("aria-label", "Code editor " + (i + 1));
      });
    document.querySelectorAll("textarea:not([aria-label]):not([aria-labelledby])").forEach(function (el, i) {
      if (!el.id && !el.getAttribute("name")) {
        el.setAttribute("aria-label", "Code input " + (i + 1));
      } else if (el.id && !document.querySelector('label[for="' + el.id + '"]')) {
        el.setAttribute("aria-label", el.getAttribute("placeholder") || "Code input " + (i + 1));
      }
    });
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", enhanceA11y);
    } else {
      enhanceA11y();
    }
  }

  global.StudyShell = {
    setThemeMode: setThemeMode,
    isDark: isDark,
    applyTheme: applyTheme,
    toggleTheme: toggleTheme,
    fontZoom: fontZoom,
    applyFontZoom: applyFontZoom,
    focusMode: focusMode,
    collapseDetails: collapseDetails,
    enhanceA11y: enhanceA11y,
  };
})(typeof window !== "undefined" ? window : globalThis);
