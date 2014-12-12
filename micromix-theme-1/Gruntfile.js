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
                debounceDelay: 50
            },
            configFiles: {
                files: ['Gruntfile.js', 'config/*.js'],
                options: {
                    reload: true
                }
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
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
