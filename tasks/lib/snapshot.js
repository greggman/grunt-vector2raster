"use strict";
/*global phantom: false*/

var webpage = require("webpage");

if (phantom.args.length !== 5) {
    console.error("Usage: converter.js source, path, name, width, height");
    phantom.exit();
} else {
    snapshot(phantom.args[0], phantom.args[1], phantom.args[2], phantom.args[3], phantom.args[4]);
}

function snapshot(source, path, name, width, height) {
    var page = webpage.create();

    page.open(source, function (status) {
        if (status !== "success") {
            console.error("Unable to load the source file.");
            phantom.exit();
            return;
        };

        // no resizing
        if(width.length === 0){
            width = false;
            height = false;
        }

        var dSrc = getSvgDimensions(page);

        // make it fit the desired dimensions, 
        // it is assumed that the w:h ratio of src en dest are the same

        var zoom = width ? width/dSrc.width : 1;

        page.viewportSize = {
            width: width || dSrc.width,
            height: height || dSrc.height
        };
        
        page.zoomFactor = zoom;

        // This delay is I guess necessary for the resizing to happen?
        setTimeout(function () {
            page.render(path + name);
            phantom.exit();
        }, 200);
    });
}

function getSvgDimensions(page) {
    return page.evaluate(function () {
        /*global document: false*/

        var el = document.documentElement;
        return { width: el.offsetWidth, height: el.offsetHeight};
    });
}
