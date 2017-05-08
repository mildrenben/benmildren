var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync').create(),
		reload = browserSync.reload,
		pug = require('gulp-pug'),

		src = {
			scss: './src/scss/styles.scss',
			pug: './src/pug/index.pug',
		};

gulp.task('browser-sync', ['compile-scss', 'compile-pug'], function(){
	browserSync.init({
		server: './docs'
	});

	gulp.watch(src.scss, ['compile-scss']);
});

gulp.task('compile-scss', function(){
	gulp.src(src.scss)
	.pipe(sass({
		errLogToConsole: true
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(gulp.dest('./docs/css'))
	.pipe(reload({
		stream: true
	}));
});

gulp.task('compile-pug', function(){
	gulp.src(src.pug)
	.pipe(pug({}))
	.pipe(gulp.dest('./docs/'));
});

gulp.task('default', ['browser-sync']);
