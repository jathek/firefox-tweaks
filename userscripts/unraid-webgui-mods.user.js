// ==UserScript==
// @name         unRAID - WebGUI Modifications
// @namespace    https://github.com/jathek/
// @version      2023.4.15
// @description  unRAID
// @author       jathek
// @match        http://deepervisor.lan/*
// @match        https://unraid.jathek.com/*
// @match        https://unraid.nearcat.ch/*
// @exclude      http://deepervisor.lan:8480/plugins/*
// @icon         https://icons.duckduckgo.com/ip2/unraid.net.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // Your code here...
  document.querySelector("span#copyright").innerText = "";
  // replace unbalance link with traefik link
  if (document.location.toString().includes("/Settings/unbalance")) {
    let unbalanceLink = document.querySelector('a[title="unBALANCE plugin"]');
    let unraidHost = document.location.hostname.toString().replace("unraid.", "");
    unbalanceLink.href = `https://unbalance.${unraidHost}`;
  }
})();
