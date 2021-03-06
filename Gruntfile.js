var conf_port=9001;
module.exports = function(grunt) {

grunt.initConfig({
  //Import package manifest
  pkg: grunt.file.readJSON("package.json"),

  connect: {
    server: {
	        port: 9001
    }
  },//connect
//  open: {
//    target: 'http://localhost:9005', // target url to open
//    appName: 'open', // name of the app that opens, ie: open, start, xdg-open
//    callback: function() {} // called when the app has opened
//  },//open browser
  shell: {
  	runLocalServer: {
  		command: 'DEBUG=pqr* node server/server'
  	},
    runLocalServerWin32: {
  		command: [
  		'set DEBUG=personalqr*',
        'node server/server',
  		].join('&&')
  	},
  	runLocalServerWin32Mongodb: {
  		command: [
  		'set DEBUG=personalqr*',
        'net start mongodb',
        'node server/server',
  		].join('&&')
  	},
    statMongo: {
      command: [
        'MD C:\Mongod',
        'MD C:\Mongod\log',
        'echo logpath=C:\Mongod\log\mongod.log > C:\Mongod\mongod.cfg',
        'start "C:/Program Files/MongoDB 2.6 Standard/bin/mongod.exe --config C:\Mongod\mongod.cfg --install'
      ].join('&&')
    }
  },//shell
  jshint: {
  	server: {
  		src: ['Gruntfile.js',
                      'server/dao/**/*.js',
                      'server/manager/**/*.js',
                      'server/middleware/**/*.js',
                      'server/routes/**/*.js',
                      'server/util/**/*.js',
                      'server/server.js'
  				]
  	},//server
  	client: {
  		options: {
  			extract: 'auto'
  		},
  		src: ['pages/**/*.html', 'core/**/*.html']
  	}//client
  },//jshint
  vulcanize: {
  	default: {
  		options: {
  			csp: true,
  			excludes: {
  				imports: ["bower_compoents/polymer.html"]
  			}
  		},
  		files: {
  			'_/index.html': 'index.html'
  		},
    }
  },//vulcanize
  browserSync: {
    dev: {
      bsFiles: {
        src : [
          '/core/*',
          '/core/**/*.html',
          '/core/**/*.js',
          '/core/**/*.css',
          '/img/**/*.jpg',
          '/img/**/*.png',
          '/img/**/*.svg',
          '/pages/**/*.html',
          '**/*.html'
          ]
        },
      options: {
          watchTask: true,
          debugInfo: true,
          logConnections: true,
          notify: true,
          proxy: "personalqr.ds:8000",
          ghostMode: {
            scroll: true,
            links: true,
            forms: true
          }
      }
    } //dev
  } // browserSync
});


  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-vulcanize'); // enpaquetador
  grunt.loadNpmTasks('grunt-contrib-jshint'); //ortografi check
  grunt.loadNpmTasks('grunt-browser-sync'); // nav-syncronizated

	// grunt.registerMultiTask('dist-client', 'Prepare client files to distribution', function() {
	// 	var inDir = '...';
	// 	var outDir = inDir + 'dist/';
	// 	grunt.log.writeln('Removing client/dist directory...');
	// 	var done = this.async();
	// 	fs.remove(outDir, function(err, result) {
	// 		if (err) {
	// 			grunt.log.error(err);
	// 			done(err);
	// 		} else {
	// 			fs.mkdirsSync(outDir);
	// 			grunt.task.run('vulcanize');
	// 			fs.copySync(inDir + 'font', outDir + 'font');
	// 			fs.copySync(inDir + 'img', outDir + 'img');
	// 			fs.copySync(inDir + 'bower_components', outDir + 'bower_components');
	// 			fs.copySync(inDir + 'css', outDir + 'css');
	// 			fs.copySync(inDir + 'elements/point-setter/presenter.js', outDir  + 'elements/point-setter/presenter.js'); //TODO Minify this- Vulvanize can't do it
	// 			done();
	// 		}
	// 	});
	// });

  grunt.log.writeln('Start PersonalQR:');

  //TYPES RUN
  grunt.registerTask('default',function() {(process.platform === "win32") ? grunt.task.run('shell:runLocalServerWin32') : grunt.task.run('shell:runLocalServer')});
  grunt.registerTask('mongo',function() {(process.platform === "win32") ? grunt.task.run('shell:runLocalServerWin32Mongodb') : grunt.task.run('shell:runLocalServer')});    
  grunt.registerTask('startmongo',function() {(process.platform === "win32") ? grunt.task.run('shell:startMongo') : grunt.log.writeln('MongoOK')});
  grunt.registerTask('check',['jshint:client', 'jshint:server', 'shell:runLocalServer']);
  grunt.registerTask('wcheck',['jshint:client', 'jshint:server', 'shell:runLocalServerWin32']);
  grunt.registerTask('sync', ['browserSync']);
};
