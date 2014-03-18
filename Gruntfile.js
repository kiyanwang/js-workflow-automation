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
                src: ["tests/**/*.js"]
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
                src: ['routes/*.js', 'models/*.js']
            }
        },
        jsbeautifier: {
            modify: {
                src: ['Gruntfile.js', 'routes/*.js', 'models/*.js'],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            check: {
                src: ['Gruntfile.js', 'routes/*.js'],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: ['routes/*.js', 'models/*.js', 'tests/**/*.js'],
                tasks: ['jshint:lib', 'jsbeautifier:check']
            },
            css: {
                files: ['public/stylesheets/style.less'],
                tasks: ["less"]
            },
            templates: {
                files: ['views/*.jade']
            }
        },
        less: {
            options: {
                paths: ["public/stylesheets/"]
            },
            files: {
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
    grunt.registerTask('default', ['jshint', 'jsbeautifier:check']);
    grunt.registerTask('clean', ['jshint', 'jsbeautifier:modify']);
    grunt.registerTask('verify', ['jshint', 'jsbeautifier:check']);
    grunt.registerTask('filtertest', 'Runs tests based on pattern specified', function (taskName, pattern) {
        // set a variable on global config
        globalConfig.filter = pattern;
        // internally call the mochaTest:filter target
        grunt.task.run(taskName + ':filter');
        // to use this cli do   grunt filtertest:mochaTest:<pattern>
    });
};
