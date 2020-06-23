'use strict';

// init
let gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	del = require('del');

/*===> BEGIN DEV COMPILE <===*/

//HTML
gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({stream: true}))
})

// SCSS
gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

//CSS
gulp.task('css', function() {
	return gulp.src('node_modules/slick-carousel/slick/slick.css')
	.pipe(concat('_libs.scss'))
	.pipe(gulp.dest('app/scss'))
	.pipe(browserSync.reload({stream: true}))
});

//Main JS
gulp.task('script', function() {
	return gulp.src('app/js/*.js')
	.pipe(browserSync.reload({stream: true}))
});

//JS Lib
gulp.task('js', function() {
	return gulp.src('node_modules/slick-carousel/slick/slick.js')
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}))
});

// Static Server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

// Export
gulp.task('export', function() {

	let buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	let buildCSS = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'));

	let buildJS = gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('dist/js'));

	let buildFonts = gulp.src('app/fonts/**/*.*')
	.pipe(gulp.dest('dist/fonts'));

	let buildImg = gulp.src('app/img/**/*.*')
	.pipe(gulp.dest('dist/img'));
});

//Del
gulp.task('del', async function() {
	del.sync('dist');
});

// Build
gulp.task('build', gulp.series('del', 'export'));

// Watch
gulp.task('watch', function() {
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/js/*.js', gulp.parallel('script'));
});

// Default
gulp.task('default', gulp.parallel('html', 'css', 'scss', 'js', 'browser-sync', 'watch'));