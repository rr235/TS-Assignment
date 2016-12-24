module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
						'src/js/main.js',
						'src/js/services/*.js',
						'src/js/directives/*.js',
						'src/js/controllers/*.js'
                ],
                dest: 'build/js/main.js',
                options: {
                    banner: "'use strict';\n(function () {\n\n",
                    footer: "\n\n})();"
                }
            },
            angular: {
                src: [
						'node_modules/angular/angular.js',
						'node_modules/angular-route/angular-route.js'
                ],
                dest: 'build/js/angular.js'
            }
        },
        copy: {
            normalizecss: {
                src: 'node_modules/normalize.css/normalize.css',
                dest: 'build/css/normalize.css',
                filter: 'isFile'
            }
        },
        uglify: {
            js: {
                options: {
                    mangle: true,
                    banner: "'use strict';(function () {",
                    footer: "})();"
                },
                files: {
                    'build/js/main.min.js': [
                        'src/js/main.js',
						'src/js/services/*.js',
						'src/js/directives/*.js',
                        'src/js/controllers/*.js']
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            css: {
                files: {
                    'build/css/style.css': 'src/css/style.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['concat:js']
            },
            scss: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass:css']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['sass', 'concat', 'copy', 'watch']);
}