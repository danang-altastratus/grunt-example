module.exports = function(grunt) {
    grunt.initConfig({
		auto_install: { 
			local: {
			}, 
			subdir: { 
				options: { 
					cwd: '',
					stdout: true,
					stderr: true,
					failOnError: true,
					npm: '--production'
				}
			}
		},
       mocha_istanbul : {
            coverage : {
                src : 'test', // a folder works nicely
                options : {
                    coverageFolder : './reports/coverage',
                    mask : '../app/lib/example.js'
                }
            },
        },
        mochaTest : {
            test : {
                options : {
                    reporter : 'doc',
                    captureFile : './reports/mocha.html',
                    quiet : true, 
                    clearRequireCache : true
                },
                src : ['test/*.js']
            }
        },
        titanium : {
            sdk : {
                options : {
                    command : 'sdk',
                    args : ['select', '3.5.1.GA']
                }
            },
            build : {
                options : {
                    command : 'build',
                    args : ['select', '3.5.1.GA']
                }
            }
        },
        jscs: {
        	src : ['app/**/*.js'],
        	options: {
        		reporter: 'node_modules/jscs-html-reporter/jscs-html-reporter.js',
        		reporterOutput: 'reports/jscs.html',
        		config: false,
        		force: true,
        		requireCurlyBraces: ['if', 'else', 'for', 'while', 'do', 'try', 'catch'],
			    requireSpaceAfterKeywords: ['if', 'else', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch'],
			    requireSpaceBeforeBinaryOperators: ['?', '+', '-', '/', '*', '=', '==', '===', '!=', '!==', '>', '>=', '<', '<='],
			    requireSpaceAfterBinaryOperators: ['?', '+', '/', '*', ':', '=', '==', '===', '!=', '!==', '>', '>=', '<', '<='],
			    requireCommaBeforeLineBreak: true,
			    requireBlocksOnNewline: true,
			    requireLineBreakAfterVariableAssignment: true,
			    requireCamelCaseOrUpperCaseIdentifiers: true,
			    requireParenthesesAroundIIFE: true,
			    requireSpacesInConditionalExpression: true,
			    requireSpacesInFunctionDeclaration: {
			    	beforeOpeningCurlyBrace: true
			    },
			    requireSpacesInFunctionExpression: {
			    	beforeOpeningCurlyBrace: true
			    },
			    requireMultipleVarDecl: 'onevar',
			    disallowTrailingComma: true,
			    disallowSpaceAfterBinaryOperators: ['!'],
			    disallowSpaceBeforeBinaryOperators: [','],
			    disallowEmptyBlocks: true,
			    disallowKeywords: ['with'],
			    disallowMultipleLineBreaks: true,
			    disallowMultipleLineStrings: true,
			    disallowMixedSpacesAndTabs: true,
			    disallowKeywordsOnNewLine: ['else'],
			    disallowNewlineBeforeBlockStatements: true,
			    disallowPaddingNewlinesInBlocks: true,
			    validateIndentation: '\t',
			    excludeFiles: ['app/lib/ti-mocha.js']
        	}
        },
		jsduck: { 
			main: {
				src: ['app/**/*.js'],
				
				dest: 'docs',
				options: {
					'builtin-classes': false,
					warnings: ['-nodoc', '-dup_member', '-link_ambiguous', '-html'],
					title: 'Grunt Example',
					exclude: ['app/lib/ti-mocha.js'],
					categories: 'jsduckCategories.json'
				}
			}
		},
        exec : {
            remove_previous_titanium_build : {
                command : 'rm -rf ./build; rm -rf ./Resources; rm -rf ./MakeApp*',
                stdout : false,
                stderr : true
            },
            remove_previous_build_reports : {
                command : 'rm -rf ./docs; rm -rf ./reports',
                stdout : false,
                stderr : true
            },
            jsduckInstall : {
                command : 'titanium-jsduck install force',
                stdout : false,
                stderr : true
            },
            jsduck : {
                command : 'jsduck --config=docs/jsduck.json --exclude=app/lib/ti-mocha.js app',
                stdout : false,
                stderr : true
            },
            mocha: {
            	command: 'mocha',
            	stdout: true,
            	stderr: true
            },
            openReports: {
            	command: 'open reports/jscs.html; open reports/mocha.html; open reports/coverage/lcov-report/index.html',
            	stdout: true,
            	stderr: true
            },
            openJsduck: {
            	command: 'open docs/index.html'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-titanium');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-jsduck');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-auto-install');

    grunt.registerTask('test', ['mochaTest:test']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
    grunt.registerTask('clean', ['exec:remove_previous_titanium_build', 'exec:remove_previous_build_reports']);
    grunt.registerTask('mocha', ['exec:mocha']);
    
    grunt.registerTask('default', [	'clean', 
    								'test',
    								'mocha',
    								'jscs',
    								'coverage',
    								'jsduck',
    								'exec:openReports',
    								'exec:openJsduck']);
};