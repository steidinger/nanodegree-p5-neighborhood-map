module.exports = function(grunt) {

    grunt.initConfig({
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('min', ['cssmin', 'processhtml', 'htmlmin', 'uglify']);
    grunt.registerTask('dev', ['connect:dev']);
    grunt.registerTask('prod', ['min', 'copy:dist', 'connect:prod']);
    grunt.registerTask('default', ['prod']);

};