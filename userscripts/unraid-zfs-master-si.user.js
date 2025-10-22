// ==UserScript==
// @name         unRAID - ZFS Master SI
// @namespace    https://github.com/jathek/firefox-tweaks
// @author       jathek
// @version      2025.10.21-a
// @updateURL    https://github.com/jathek/firefox-tweaks/raw/main/userscripts/unraid-zfs-master-si.user.js
// @downloadURL  https://github.com/jathek/firefox-tweaks/raw/main/userscripts/unraid-zfs-master-si.user.js
// @description  convert zfs master units to SI
// @icon         https://icons.duckduckgo.com/ip2/unraid.net.ico
// @match        http://tower/Main*
// @grant        none
// @noframes
// @run-at       document-start
// ==/UserScript==

"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const zfsMasterTable = document.querySelector("#zfs_master_div");
  const sizeConversionFactors = {
    B: 1,
    KiB: 1024 / 1000,
    MiB: Math.pow(1024, 2) / Math.pow(1000, 2),
    GiB: Math.pow(1024, 3) / Math.pow(1000, 3),
    TiB: Math.pow(1024, 4) / Math.pow(1000, 4),
  };
  function setBinarySize(sizeText) {
    const sizeValue = parseFloat(sizeText.match(/^[\d.]+/).at(-1));
    const sizeUnit = sizeText.match(/[a-zA-Z]+/).at(-1);
    const newSize = parseFloat((sizeValue * sizeConversionFactors[sizeUnit]).toPrecision(3));
    return `${newSize} ${sizeUnit.replace("i", "")}`;
  }
  function convertToSI(mutation) {
    if (mutation.addedNodes.length !== 0 && mutation.target.id === "zfs_master_body") {
      const poolSizes = Array.from(zfsMasterTable.querySelectorAll('td[id$="attribute-size"]')).map((td) => {
        td.textContent = td.textContent + "iB";
        return td;
      });
      const datasetSizes = zfsMasterTable.querySelectorAll('#zfs_master_body > [class^="zdataset-"] > td:nth-of-type(6)');
      const usageSizes = zfsMasterTable.querySelectorAll(".usage-disk > span:nth-of-type(2)");
      const sizeTextElems = [...poolSizes, ...datasetSizes, ...usageSizes];
      sizeTextElems.forEach((elem) => {
        if (elem.textContent) {
          elem.textContent = setBinarySize(elem.textContent);
        }
      });
    }
  }
  (function startMutationObserver(callback, target = document, config = { attributes: false, childList: true, subtree: true, characterData: false }) {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        callback(mutation, observer);
      }
    });
    observer.observe(target, config);
  })(convertToSI, zfsMasterTable);
});
