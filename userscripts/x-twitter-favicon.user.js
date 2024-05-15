// ==UserScript==
// @name         X - Twitter Favicon
// @namespace    https://github.com/jathek/firefox-tweaks
// @version      2023.2.8
// @description  replace x's dark mode favicon with the default one
// @icon         https://icons.duckduckgo.com/ip2/twitter.com.ico
// @author       jathek
// @grant        GM_addElement
// @noframes
// @run-at       document-start
// @sandbox      JavaScript
// @match        https://twitter.com/*
// ==/UserScript==

"use strict";
// Your code here...
document.addEventListener("DOMContentLoaded", () => {
  let defaultFaviconAttr = {};
  defaultFaviconAttr.rel = "icon";
  defaultFaviconAttr.href = "//abs.twimg.com/favicons/twitter.ico";
  defaultFaviconAttr.sizes = "16x16";
  defaultFaviconAttr["data-script"] = "userscript";
  // use GM_addElement to make it obvious if favicon was modified
  GM_addElement(document.querySelector("head"), "link", defaultFaviconAttr);
  window.addEventListener("load", () => {
    console.info('"X - Twitter Favicon" userscript set this favicon:', defaultFaviconAttr);
  });
});
