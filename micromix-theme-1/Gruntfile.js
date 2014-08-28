module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-devtools');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-imageoptim');

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
        uglify: {
            pm: {
                files: {
                    'js/min/lib.js': aScriptLoad.libs,
                    'js/min/app.js': aScriptLoad.app
                }
            }
        },
        cssmin: {
            compress: {
                src: ['css/*', 'css/temp/*.css'],
                dest: 'css/micromix.min.css'
            }
        },
        clean: ['css/temp'],
        imageoptim: {
            files: [
                'img'
            ],
            options: {
                imageAlpha: false
            }
        }
//        csslint: {
//            lax: {
//                options: {
//                    import: false
//                },
//                src: ['css/**/*.css']
//            }
//        }
    });

    // Default task.
    grunt.registerTask('default', ['']);
    grunt.registerTask('js', ['uglify:pm']);
    grunt.registerTask('css', ['cssmin', 'clean']);
    grunt.registerTask('images', ['imageoptim']);
    grunt.registerTask('production', ['uglify', 'cssmin', 'clean']);
};
