module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-bg-shell');

  // Project configuration.
  grunt.initConfig({
    bgShell: {
      seleniumStart: {
        cmd: 'java -jar node_modules/webdriverjs/bin/selenium-server-standalone-2.31.0.jar',
        bg: true,
        stdout: false
      },
      test: {
        cmd: 'grunt system'
      },
      seleniumShutdown: {
        cmd: 'cURL http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer',
        bg: true
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    mochacov: {
      unit: {
        options: {
          reporter: 'html-cov',
          output: "./coverage.html",
          files: 'tests/unit/*.js'
        }
      },
      system: {
        options: {
          timeout: 50000,
          files: 'tests/system/*.js'
        }
      },
      options: {
        ui: 'bdd'
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('unit', ['mochacov:unit']);
  grunt.registerTask('system', ['mochacov:system']);
  grunt.registerTask('test', ['connect', 'bgShell']);

};