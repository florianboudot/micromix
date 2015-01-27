module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var jsPath = 'js';
    var aScriptLoad = {
        'libs': [
            jsPath + '/libs/*',
            jsPath + '/conf/*',
            jsPath + '/framework/*'
        ],
        'app': [
            jsPath + '/app/*'
        ]
    };

    // Project configuration
    grunt.initConfig({
        watch: {
            options: {
                livereload: true // http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
            },
            configFiles: {
                files: ['Gruntfile.js', 'config/*.js'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: [jsPath + '/**/*.js'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            options: {                       // Target options
                style: 'expanded'
            },
            files: {
                expand: true,
                cwd: 'css',
                src: ['**/*.scss'],
                dest: 'css',
                ext: '.dev.css'
            }
        },
        uglify: {
            pm: {
                files: {
                    'js/min/lib.js': aScriptLoad.libs,
                    'js/min/app.js': aScriptLoad.app
                }
            }
        },
        cssmin: {
            minify: {
                //expand: true,
                src: ['css/all.dev.css'],
                dest: 'css/micromix.min.css'
            }
        }
    });

    grunt.registerTask('js', ['uglify:pm']);
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('prod', ['uglify', 'sass', 'cssmin']);

// Default task.
    grunt.registerTask('default', ['prod']);
};

