// ==UserScript==
// @name         Large Favicons
// @namespace    https://github.com/jathek/firefox-tweaks
// @version      2023.1.9
// @description  replace 16x16 favicons with larger favicons
// @author       jathek
// @match        *://*/*
// @grant        GM_addElement
// @noframes
// @run-at       document-start
// @sandbox      JavaScript
// ==/UserScript==

"use strict";
// Your code here...
document.addEventListener("DOMContentLoaded", () => {
  let favicon = document.querySelector('link:is([rel="shortcut icon"],[rel="shortcut-icon"])');
  if (typeof favicon === "undefined" || favicon === null) {
    favicon = document.querySelector('link[sizes="16x16"]');
  }
  if (typeof favicon === "undefined" || favicon === null) {
    favicon = document.querySelector('link[rel="icon"]');
  }
  if (typeof favicon != "undefined" && favicon != null) {
    const faviconNodeList = document.querySelectorAll('link[sizes]:not([sizes="16x16"],[rel^="apple-touch"])');
    const faviconArray = Array.from(faviconNodeList);
    const sortedFaviconArray = faviconArray.sort(sorter);
    function sorter(a, b) {
      return parseInt(a.getAttribute("sizes")) - parseInt(b.getAttribute("sizes"));
    }
    // push original favicon in case faviconArray was empty
    sortedFaviconArray.push(favicon);
    // create newFaviconAttr object using attributes of first (hopefully smallest) item in faviconArray
    let newFaviconAttr = {};
    for (const attr of sortedFaviconArray[0].attributes) {
      newFaviconAttr[attr.name] = attr.value;
    }
    // add custom attributes (overwrite size with "16x16" to force usage for lower resolutions)
    newFaviconAttr.rel = "icon";
    newFaviconAttr.sizes = "16x16";
    newFaviconAttr["data-script"] = "userscript";
    // use GM_addElement to make it obvious if favicon was modified
    GM_addElement(document.querySelector("head"), "link", newFaviconAttr);
    window.addEventListener("load", () => {
      console.log('"Large Favicons" userscript set this favicon:', newFaviconAttr);
    });
  } else {
    console.log('"Large Favicons" userscript could not find a favicon.');
  }
});
