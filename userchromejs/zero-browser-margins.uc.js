// ==UserScript==
// @name           Zero Browser Margins
// @namespace      https://github.com/jathek/firefox-tweaks
// @description    set chromemargin to 0 when tabs are in titlebar
// @include        main
// @author         jathek
// @homepage       https://github.com/jathek
// @shutdown       UC.zeroBrowserMargins.reset();
// @onlyonce
// ==/UserScript==

UC.zeroBrowserMargins = {
  // variable for #main-window element
  mainWindow: window.document.querySelector("#main-window"),
  // mutationobserver to watch chromemargin
  chromeMarginObserver: new window.MutationObserver((mutations) =>
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        if (mutation.target.getAttribute("chromemargin") === "0,2,2,2") {
          mutation.target.setAttribute("chromemargin", "0,0,0,0");
          // console.log('Remove Chrome Margin: set chromemargin to "0,0,0,0" from "0,2,2,2"');
        }
      }
    })
  ),
  // change chromemargin on browser start and begin observing
  init() {
    if (this.mainWindow.getAttribute("chromemargin") === "0,2,2,2") {
      this.mainWindow.setAttribute("chromemargin", "0,0,0,0");
    }
    this.chromeMarginObserver.observe(this.mainWindow, {
      // run observer only when chromemargin attribute changes
      attributes: true,
      attributeFilter: ["chromemargin"],
    });
  },
  // disconnect mutationobserver, reset chromemargin to default, and delete UC.zeroBrowserMargins
  reset() {
    this.chromeMarginObserver.disconnect();
    if (this.mainWindow.getAttribute("chromemargin") === "0,0,0,0") {
      this.mainWindow.setAttribute("chromemargin", "0,2,2,2");
    }
    delete UC.zeroBrowserMargins;
  },
};

UC.zeroBrowserMargins.init();