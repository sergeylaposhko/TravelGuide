module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/*/*.js',
                dest: 'build/dist.min.js'
            }
        },
        coffee: {
            compile: {
                options: {
                    bare: true
                },
                files: {
                    'app/coffee/code.coffee.js': 'app/*/*.coffee' // 1:1 compile 
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/*/*.js', 'app/*/*.coffee'],
                tasks: ['coffee', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};