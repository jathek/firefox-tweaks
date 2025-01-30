// ==UserScript==
// @name         unRAID - WebGUI Modifications
// @namespace    https://github.com/jathek/
// @author       jathek
// @version      2023.4.15
// @updateURL    https://github.com/jathek/firefox-tweaks/raw/main/userscripts/unraid-webgui-mods.user.js
// @downloadURL  https://github.com/jathek/firefox-tweaks/raw/main/userscripts/unraid-webgui-mods.user.js
// @description  customize unraid web GUI
// @icon         https://icons.duckduckgo.com/ip2/unraid.net.ico
// @grant        none
// ==/UserScript==

"use strict";
(function () {
  // remove copyright info from statusbar
  document.querySelector("span#copyright").innerText = "";
  // replace unbalanced link with subdomain link
  if (document.location.pathname.includes("/Settings/unbalanced")) {
    const unbalancedLink = document.querySelector('a[title="unbalanced plugin"]');
    unbalancedLink.href = `https://unbalanced.${document.location.hostname.replace(/(?:.*?\.)?(.*?\..*?)$/, "$1")}`;
  }
})();
