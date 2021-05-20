var gulp = require('gulp'),
	sass = require('gulp-sass'),
	smartgrid = require('smart-grid'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify-es').default,
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify");

var gulp_dest = 'dist';

var smartgridSettings = {
	outputStyle: 'sass', /* less || scss || sass || styl */
	columns: 10, /* number of grid columns */
	offset: '14px', /* gutter width px || % || rem */
	mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
	container: {
		maxWidth: '1200px', /* max-width оn very large screen */
		fields: '30px' /* side fields */
	},
	breakPoints: {
		xs: {
			width: '320px',
			fields: '10px'
		},
		sm: {
			width: '640px',
			fields: '20px', /* set fields only if you want to change container.fields */
			offset: '20px'
		},
		md: {
			width: '1000px',
			fields: '10px',
			offset: '10px'
		},
		lg: {
			width: '1200px', /* -> @media (max-width: 1100px) */
			fields: '0'
		}
		/* 
		We can create any quantity of break points.

		some_name: {
			width: 'Npx',
			fields: 'N(px|%|rem)',
			offset: 'N(px|%|rem)'
		}
		*/
	}
};

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done() };

gulp.task('smartgrid', function () {
	smartgrid('app/sass/libs', smartgridSettings);
});

gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer({
			// grid: true, // Optional. Enable CSS Grid
			overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

// Пользовательские скрипты проекта

gulp.task('js', function () {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/jquery/slick/slick.min.js',
		'app/libs/jquery/dist/jquery.maskedinput.min.js',
		'app/libs/jquery/jquery.validate/jquery.validate.min.js',
		'app/js/common.js', // Всегда в конце
	])
		.pipe(concat('scripts.min.js'))
		//.pipe(uglify()) // Минимизировать весь js (на выбор)
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('imagemin', function () {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin())) // Cache Images
		.pipe(gulp.dest(gulp_dest + '/img'));
});

gulp.task('removedist', function () { return del([gulp_dest], { force: true }) });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('buildFiles', function () { return gulp.src(['app/*.html']).pipe(gulp.dest(gulp_dest)) });
gulp.task('buildCss', function () { return gulp.src(['app/css/main.min.css']).pipe(gulp.dest(gulp_dest + '/css')) });
gulp.task('buildJs', function () { return gulp.src(['app/js/scripts.min.js']).pipe(gulp.dest(gulp_dest + '/js')) });
gulp.task('buildFonts', function () { return gulp.src(['app/fonts/**/*']).pipe(gulp.dest(gulp_dest + '/fonts')) });

gulp.task('build', gulp.series('removedist', 'imagemin', 'sass', 'js', 'buildFiles', 'buildCss', 'buildJs', 'buildFonts'));

gulp.task('code', function () {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('smartgrid', 'sass', 'js', 'browser-sync', 'watch'));
