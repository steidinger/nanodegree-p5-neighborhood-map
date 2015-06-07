module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                curly: true,
                undef: true,
                browser: true
            },
            uses_defaults: ['js/model.js'],
            with_overrides: {
                options: {
                    globals: {
                        '$': false,
                        ko: false,
                        google: false,
                        model: false
                    }
                },
                files: {
                    src: ['js/app.js']
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    src: ['styles/*.css'],
                    dest: 'dist/'
                }]
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },
                files: {
                    'dist/js/app.min.js': ['js/model.js', 'js/app.js']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html' : ['index.html']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['index.html'],
                    dest: 'dist/'
                }]
            }
        },
        connect: {
            dev: {
                options: {
                    port: 8080,
                    keepalive: true
                }
            },
            prod: {
                options: {
                    port: 8080,
                    keepalive: true,
                    base: {
                        path: 'dist'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('min', ['cssmin', 'processhtml', 'htmlmin', 'uglify']);
    grunt.registerTask('dev', ['jshint', 'connect:dev']);
    grunt.registerTask('prod', ['jshint', 'min', 'connect:prod']);
    grunt.registerTask('default', ['prod']);

};