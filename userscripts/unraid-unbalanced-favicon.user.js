// ==UserScript==
// @name         unRAID - unbalanced Favicon
// @namespace    https://github.com/jathek
// @author       jathek
// @version      2024.01.11
// @description  give unbalanced a favicon
// @icon         http://deepervisor.lan:8480/plugins/unbalanced/unbalanced.png
// @grant        GM_addElement
// @noframes
// @run-at       document-start
// @sandbox      JavaScript
// ==/UserScript==

"use strict";
// Your code here...
document.addEventListener("DOMContentLoaded", () => {
  let hostname = document.location.hostname.toString().replace("unbalanced", "https://unraid");
  // load favicon from insecure page to avoid having to login to secure one
  if (document.location.toString().includes("deepervisor")) {
    hostname = hostname.replace("https://unraid.deepervisor.lan", "http://deepervisor.lan:8480");
  }
  let faviconAttr = {
    rel: "icon",
    href: `${hostname}/plugins/unbalanced/unbalanced.png`,
    sizes: "16x16",
    "data-script": "userscript",
  };
  // use GM_addElement to make it obvious if favicon was modified
  GM_addElement(document.querySelector("head"), "link", faviconAttr);
  window.addEventListener("load", () => {
    console.log('Userscript "unBALANCE - Favicon" set this favicon:', faviconAttr);
  });
});
