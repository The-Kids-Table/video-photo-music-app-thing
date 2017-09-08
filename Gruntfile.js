const config = require('config')['knex'];

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'db/**/*.js', 'server/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/server/*.js', 'test/database/*.js']
      }
    },

    run: {
      commands: {
        exec: 'npm run-script test-client'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest', 'run']);
};
