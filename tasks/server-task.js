
var gulp      = require('gulp'),

    fs          = require('fs'),
    http        = require('http'),
    https       = require('https'),
    express     = require('express'),
    st          = require('st'),
    livereload  = require('gulp-livereload'),
    util        = require('gulp-util'),

    watch     = require('gulp-watch'),
    notify    = require('gulp-notify'),
    paths     = require('../config.paths'),

// Paths
    root      = paths.rootDir,
    devRoot   = paths.devDir,
    prodRoot  = paths.prodDir,
    key,
    cert,
    creds,
    server,
    httpServer,
    config;

// strict arguments, gulp dev or gulp prod determine config.
if(process.argv[2] === 'dev') {
    config = require('../settings/local/config')[0];
} else if(process.argv[2] === 'prod') {
    config = require('../settings/prod/config')[0];
    key  = fs.readFileSync(config.SERVER_KEY, 'utf8');
    cert = fs.readFileSync(config.SERVER_CERT, 'utf8');
    creds = {key: key, cert: cert};
} else {
    config = require('../settings/local/config')[0];
}

// Options
var options = {
      dev: {
        host  : config.HOST,
        port  : config.HOST_PORT,
        lrPort: config.LIVERELOAD_PORT,
        watch : devRoot + '/**/*.*',
        st    : {
          path        : devRoot,
          url         : '/',
          cache       : false,
          index       : 'index.html',
          dot         : false,
          passthrough : true,
          qzip        : false
        }
      },
      prod: {
        host  : config.HOST,
        port  : config.HOST_PORT,
        watch : [prodRoot + '/**/*.*', '!'+prodRoot+'/lib/**/*.*'],
        st    : {
          path        : prodRoot,
          url         : '/',
          cache       : false,
          index       : 'index.html',
          dot         : false,
          passthrough : true,
          gzip        : true
        }
      }
};

// Fallback response factory function
var fallback = function(root){
  return function(req, res){
    fs.createReadStream(root+'/index.html').pipe(res);
    return true;
  };
};


// Start Development Server
gulp.task('server:dev:start', function(callback){

  // Create Connect Server
  server = express();

  util.log('Local server starting up hosted at: ', util.colors.green(config.HOST));
  util.log('Express server listening on port: ', util.colors.green(config.HOST_PORT));
  util.log('Connecting to API at: ', util.colors.green(config.API_HOST));

  // Add serve static middleware
  server.use( st(options.dev.st) );

  // Fallback to /index.html
  server.use(fallback(devRoot));

  // Start Server
  http.createServer(server).listen(options.dev.port);

  callback();
});

gulp.task('server:prod:start', function(callback){

  // Create Connect Server
  server = express();
  httpServer = express();

  // Redirect http to https
  httpServer.set('port', 80);
  httpServer.get("*", function (req, res, next) {
      res.redirect("https://" + req.headers.host + "/" + req.path);
  });

  http.createServer(httpServer).listen(80);

  util.log('Local server starting up hosted at: ', util.colors.green(config.HOST));
  util.log('Express server listening on port: ', util.colors.green(config.HOST_PORT));
  util.log('Connecting to API at: ', util.colors.green(config.API_HOST));

  server.set('trust proxy', true);
  // Add serve static middleware
  server.use( st(options.prod.st) );

  server.use(function(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
  });

  // Fallback to /index.html
  server.use(fallback(prodRoot));



  // Start Server
  https.createServer(creds, server).listen(options.prod.port);

  callback();
});

// Start Livereload server watching options.dev.watch
gulp.task('server:lr', function(done){
    livereload.listen(options.dev.lrPort);

    gulp.watch(paths.sass.src, ['sass:dev']);
    gulp.watch(paths.jshint.app, ['jshint:dev']);
    gulp.watch(paths.symlink, ['symlink:reload']);

    gulp.watch([paths.devDir+'/css/styles.css',paths.devDir+'/**/*.js', paths.devDir+'/**/*.html', paths.devDir+'/*.html'], function(event) {
		gulp.src(event.path)
			.pipe(livereload());
	});

    util.log('Livereload server listening on port: ', util.colors.magenta(options.dev.lrPort));
});

gulp.task('server:dev', ['server:dev:start', 'server:lr']);
gulp.task('server:prod', ['server:prod:start']);
