"use strict";

var path = require("path");
var execFile = require("child_process").execFile;

var phantomjsCmd = path.resolve(__dirname, "../../node_modules/phantomjs/bin/phantomjs");
var converterFileName = path.resolve(__dirname, "./snapshot.js");

module.exports = function snapshot(grunt, file, dest, callback) {
    // is that correct, can I only pass strings as arguments?
    var args = [phantomjsCmd, converterFileName, file.src, file.dest, dest.name, dest.width, dest.height];
    execFile(process.execPath, args, function (err, stdout, stderr, grunt) {
        if (err) {
            callback(err);
        } else if (stdout.length > 0) { // PhantomJS always outputs to stdout.
            callback(new Error(stdout.toString().trim()));
        } else if (stderr.length > 0) { // But hey something else might get to stderr.
            callback(new Error(stderr.toString().trim()));
        } else {
            callback(null);
        }
    });
};
