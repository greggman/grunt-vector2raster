/*
 * grunt-vector2raster
 * 
 *
 * Copyright (c) 2014 Jorgen Leijenaar
 * Licensed under the MIT license.
 */

'use strict';

var phantomjs = require('phantomjs'),
    path = require('path'),
    involvePhantom = require('./lib/involvePhantom');

module.exports = function(grunt) {

  grunt.registerMultiTask('vector2raster', 'Convert svg to (multiple) (resized) raster images', function() {

        var dest, opts = this.options();

        var callback = function(err){
            console.log(err);
        };

        this.files.forEach(function(file) {
          dest = opts.dest || [{}];

          dest.forEach(function(dest) {
              if(dest.size && dest.name){
                //if file.dest has a filename
                if(file.dest.match(/\.(png|jpg|jpeg|gif|pdf)$/)){
                  grunt.fail.warn("You defined an image name in your destination path and in your options, remove the name from the destination path");
                }
                dest.width = parseInt(dest.size.width || dest.size);
                dest.height = parseInt(dest.size.height || dest.size);
                grunt.log.write(file.dest + dest.name + ": " + dest.width + "*" + dest.height + "px...").ok();      
              }else{
                //no resizing
                if(file.dest.match(/\.(png|jpg|jpeg|gif|pdf)$/)){
                  dest.name = dest.name || "";
                  dest.width = "";
                  dest.height = "";
                  grunt.log.write(file.dest + dest.name + ": no resizing...").ok();
                }else{
                  grunt.fail.warn("Your destination path doesn't end with an image extension");
                }
 
              };
              involvePhantom(grunt, file, dest, callback);
          });

        });
  });

};
