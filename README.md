# vector2raster

> Converts svg's to multiple sizes of whatever img fileformat Phantom.js supports. Ideal for creating all the (phonegap) App icons you need based on one svg.

**vector2raster** is built on the latest in [PhantomJS][] technology to render your SVGs using a headless WebKit. I used the grunt-svg2png plugin and the phantom rasterize.js script as a starting point.

**Prerequisite:** the source svg must have a height and width attribute to make this plugin work.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install vector2raster --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('vector2raster');
```

## The "vector2raster" task

### Overview
In your project's Gruntfile, add a section named `vector2raster` to the data object passed into `grunt.initConfig()`.

```js
  vector2raster: {   // Task
    ios: {  // Target
      files:[
        {
          src: "<%= srcDir %>/res/app-icon/icon.svg",           // Source
          dest: "platforms/ios/<%= pkgName %>/Resources/icons/"
            // Destination path (+ image name when no options)
        }
      ],
      options:{     // Options
        dest:[      // Array of objects with dest image properties
          {
            name:"icon-40.jpg",
            size:{width:40,height:40}
                // or just 40 when the image is square
          }
        ]
      }
    }
  }
```

***Without options the files.dest path must contain the image name***


## Release History
v0.1.0