const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const mq4 = require('mq4-hover-shim');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const pxtorem = require('postcss-pxtorem');

const ect = require('gulp-ect');

const cleanDir = require('gulp-clean-dir');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const browserSync = require('browser-sync');

const server = browserSync.create();


// Routes
const src = {
	fonts : './src/assets/fonts',
	img : './src/assets/img',
	js : './src/assets/js',
	scss : './src/scss',
	src : './src',
	views : './src/views',
}

const dist = './dist';
// End Routes


// Development Server
gulp.task('server', () => {
	server.init({
		notify: false,
		online: true,
		server: dist,
		tunnel: "zemoga-test"
	});
});
// End Development Server


// Watching Files Changed
gulp.task('watching', () => {
	gulp.watch(`${src.views}/**/*.ejs`, gulp.series('compile-ect'));
	gulp.watch(`${src.scss}/**/*.scss`, gulp.series('compile-scss'));
	gulp.watch(`${src.img}/**/*`, gulp.series('optimize-images'));
	gulp.watch(`${src.fonts}/*`, gulp.series('copy-fonts'));
	gulp.watch(`${src.js}/vendor/*.js`, gulp.series('js-vendor'));
	gulp.watch(`${src.js}/main/*.js`, gulp.series('js-main'));
	gulp.watch(`${src.js}/app.js`, gulp.series('js-app'));
});
// End Watching Files Changed


// Compile ECT.js
gulp.task('compile-ect', () => {
	return gulp
		.src(`${src.views}/pages/*.ejs`)
		.pipe(ect({
			ext: '.ejs'
		}))
		.pipe(cleanDir(dist, {
			ext: [ '.html', '.ejs' ]
		}))
		.pipe(gulp.dest(dist))
		.pipe(server.stream());
});
// End Compile ECT.js


// Compile SASS .scss
gulp.task('compile-scss', () => {

	const processors = [
		mq4.postprocessorFor({
			hoverSelectorPrefix: '.is-true-hover '
		}),
		pxtorem({
			propList: ['*'],
			mediaQuery: false,
			replace: false
		}),
		autoprefixer({ overrideBrowserslist: ['last 1 version'] }),
		cssnano()
	];

	return gulp
		.src(`${src.scss}/stylesheet.scss`)
		.pipe(maps.init())
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(rename('stylesheet.min.css'))
		.pipe(maps.write('.'))
		.pipe(cleanDir(`${dist}/assets/css`))
		.pipe(gulp.dest(`${dist}/assets/css`))
		.pipe(server.stream());

});
// End Compile SASS .scss


// Task JS
gulp.task('js-vendor', () => {
	return gulp.src(`${src.js}/vendor/*.js`)
		.pipe(cleanDir(`${dist}/assets/js/vendor`))
        .pipe(gulp.dest(`${dist}/assets/js/vendor`))
        .pipe(server.stream());
});

gulp.task('js-main', () => {
	return gulp.src(`${src.js}/main/*.js`)
        .pipe(maps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
		.pipe(maps.write('.'))
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});

gulp.task('js-app', () => {
	return gulp.src(`${src.js}/app.js`)
        .pipe(maps.init())
		.pipe(rename('app.min.js'))
		.pipe(uglify())
        .pipe(maps.write('.'))
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});
// End Task JS


// Optimize Copy Images
gulp.task('optimize-images', () => {
	return gulp
		.src(`${src.img}/**/*`)
		// .pipe(imagemin([
		// 	imagemin.gifsicle({interlaced: true}),
		// 	imagemin.mozjpeg({quality: 98, progressive: true}),
		// 	imagemin.optipng({optimizationLevel: 20}),
		// 	imagemin.svgo({
		// 		plugins: [
		// 			{removeViewBox: true},
		// 			{cleanupIDs: false}
		// 		]
		// 	})
		// ]))
		.pipe(cleanDir(`${dist}/assets/img`))
		.pipe(gulp.dest(`${dist}/assets/img`))
		.pipe(server.stream());
});
// End Optimize Copy Images

// Copy Fonts
gulp.task('copy-fonts', () => {
	return gulp
		.src(`${src.fonts}/**/*`)
		.pipe(cleanDir(`${dist}/assets/fonts`))
		.pipe(gulp.dest(`${dist}/assets/fonts`))
		.pipe(server.stream());
});
// End Copy Fonts


// Create Dist Folder
gulp.task('development', gulp.series('compile-ect', 'compile-scss', 'optimize-images', 'js-vendor', 'js-main', 'js-app', 'copy-fonts'));


// Start Development
gulp.task('default', gulp.series('development', gulp.parallel('server', 'watching')));