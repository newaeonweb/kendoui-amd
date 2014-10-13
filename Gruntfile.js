'use strict';

module.exports = function (grunt) {

  // Unified Watch Object
  var watchFiles = {
    serverViews: ['server/views/**/*.*'],
    serverJS: ['server/**/*.js','Gruntfile.js'],
    clientViews: ['app/scripts/views/**/*.html'],
    clientJS: ['app/scripts/views/**/*.js', 'app/js/**/*.js'],
    clientCSS: ['app/styles/**/*.css'],
    mochaTests: ['app/tests/**/*.js']
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      serverViews: {
        files: watchFiles.serverViews,
        options: {
          livereload: true
        }
      },
      serverJS: {
        files: watchFiles.serverJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientViews: {
        files: watchFiles.clientViews,
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: watchFiles.clientJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientCSS: {
        files: watchFiles.clientCSS,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      all: {
        src: watchFiles.clientJS.concat(watchFiles.serverJS),
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        }
      }
    },
    kendo_lint: {
      options: {
        force: true
      },
      files: watchFiles.clientJS.concat(watchFiles.clientViews)
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: watchFiles.clientCSS
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: watchFiles.serverViews.concat(watchFiles.serverJS)
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      debug: ['nodemon', 'watch', 'node-inspector'],
      options: {
        logConcurrentOutput: true
      }
    }

  });

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // Default task(s).
  grunt.registerTask('dev', ['concurrent']);

  // Build task(s).
  grunt.registerTask('build', ['lint']);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint', 'csslint', 'kendo_lint']);


};
