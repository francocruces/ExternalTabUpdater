// ==UserScript==
// @author       Franco Cruces - francocrucesayala@gmail.com
// @name         ExternalTabUpdater
// @description  Open external links in a single window
// @match        *://drive.mindmup.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

var resourceWindow = null
setTimeout(listen, 3000) // Wait for the resources to load.

function TabUpdater(a) {
    var clickHandler = function(e) {
        if (resourceWindow && !resourceWindow.closed) {
            console.log("Updating external window.")
            resourceWindow.location.href = a.href
        } else {
            console.log("Opening external window.")
            resourceWindow = window.open(a.href)
        }
        e.preventDefault();
    };
    a.addEventListener('click', clickHandler, false);
}

function listen() {
    if (location.pathname.includes ("map") ) {
        var as = document.getElementsByTagName('a');
        for (var i = 0, a; a = as[i]; i++) {
            if (a.hasAttribute('href') && a.className.includes("mapjs-hyperlink")) {
                console.log("OVERRIDING LINK FOR " + a.href);
                new TabUpdater(a);
            }
        }
    }
}