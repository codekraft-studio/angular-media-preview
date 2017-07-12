module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: '/**\n' +
                        '* Package: <%= pkg.name %> - v<%= pkg.version %> \n' +
                        '* Description: <%= pkg.description %> \n' +
        				'* Last build: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
						'* @author <%= pkg.author %> \n' +
						'* @license <%= pkg.license %> \n'+
                        '*/\n'
            },
            dist: {
                src: ['src/<%= pkg.name %>.module.js', 'src/<%= pkg.name %>.*.js'],
                dest: 'dist/<%= pkg.name %>.js',
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '/**\n' +
                        '* Package: <%= pkg.name %> - v<%= pkg.version %> \n' +
                        '* Description: <%= pkg.description %> \n' +
        				'* Last build: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
						'* @author <%= pkg.author %> \n' +
						'* @license <%= pkg.license %> \n'+
                        '*/\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['build']
            }
        },
        
        connect: {
          server: {
            options: {
              port: 8080,
              base: '.',
              open: true
            }
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['serve']);

}
