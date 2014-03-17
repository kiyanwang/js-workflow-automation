'use strict';

module.exports = function (grunt) {
    var globalConfig = {};
    // Project configuration.
    grunt.initConfig({
        globalConfig: globalConfig,
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    timeout: 10000,
                },
                src: ["test/**/*.js"]
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['src/index.js']
            }
        },
        jsbeautifier: {
            modify: {
                src: ['Gruntfile.js', 'index.js'],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            check: {
                src: ['Gruntfile.js', 'index.js'],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },
        watch: {
            options:{
                livereload: true
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'jsbeautifier:check']
            },
            css:{
                files: ['public/stylesheets/style.less'],
                tasks: ["less"]
            },
            templates:{
                files: ['views/*.jade']
            }
        },
        less:{
            options:{
                paths:["public/stylesheets/"]
            },
            files:{
                "public/stylesheets/style.css": "public/stylesheets/style.less"
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task.
    grunt.registerTask('default', ['jshint', 'mochaTest:test']);
    grunt.registerTask('clean', ['jshint', 'jsbeautifier:modify']);
    grunt.registerTask('verify', ['jshint', 'jsbeautifier:verify']);
    grunt.registerTask('filtertest', 'Runs tests based on pattern specified', function (taskName, pattern) {
        // set a variable on global config
        globalConfig.filter = pattern;
        // internally call the mochaTest:filter target
        grunt.task.run(taskName + ':filter');
        // to use this cli do   grunt filtertest:mochaTest:<pattern>
    });
};
