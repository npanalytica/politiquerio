//gulpfile.js
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const templateCache = require('gulp-angular-templatecache');

/* This function concatenates and minifies all the scripts used by app.js */

const VENDOR = [
	"node_modules/underscore/underscore-min.js",
	"node_modules/mathjs/dist/math.min.js",
	"bower_components/chart.js/dist/Chart.min.js",
	"bower_components/angular/angular.min.js",
	"bower_components/angular-route/angular-route.min.js",
	"bower_components/angular-sanitize/angular-sanitize.min.js",
	"bower_components/angularjs-slider/dist/rzslider.min.js",
	"bower_components/angular-scroll/angular-scroll.min.js",
	"bower_components/file-saver/FileSaver.min.js",
	"bower_components/d3/d3.min.js",
	"bower_components/topojson/topojson.min.js",
	"bower_components/angular-contenteditable/angular-contenteditable.js",
	"bower_components/angular-youtube-mb/dist/angular-youtube-embed.min.js"
]

const APP = [
	"app/app.js",
	"app/config.js",
	"app/routes.js"
]

const SERVICES = [
	"app/services/Rest.js",
	"app/services/responder.js",
	"app/services/RESTDataset.js",
	"app/services/Search.js",
	"app/services/DatasetHelpers.js",
	"app/services/Static.js",
	"app/services/ChartHelpers.js",
	"app/services/helpers.js",
	"app/services/entidades.js"
]

const SHARED = [
	"app/shared/httpLoader/directive.js",
	"app/shared/paginationView/directive.js",
	"app/shared/lineChart/directive.js",
	"app/shared/lineChart/controller.js",
	"app/shared/tableView/directive.js",
	"app/shared/tableView/controller.js",
	"app/shared/mexicoMap/_draw.js",
	"app/shared/mexicoMap/_actions.js",
	"app/shared/mexicoMap/_colors.js",
	"app/shared/mexicoMap/_gradients.js",
	"app/shared/mexicoMap/_zooms.js",
	"app/shared/mexicoMap/directive.js",
	"app/shared/mexicoMap/controller.js"
]

const COMPONENTS = [
	"app/components/site_footer/directive.js",
	"app/components/top_nav/directive.js",
	"app/components/search_bar/controller.js",
	"app/components/search_bar/directive.js",
	"app/components/dataset_view/controller.js",
	"app/components/dataset_view/directive.js",
	"app/components/dataset_view/_dataset_table.js",
	"app/components/search_bar/_respuesta_display.js",
	"app/components/search_bar/_respuesta_meta.js",
]

const CONTROLLERS = [
	"app/modules/landing/controller.js",
	"app/modules/buscar/controller.js",
	"app/modules/grupos/controller.js",
	"app/modules/subgrupos/controller.js",
	"app/modules/estadisticas/controller.js",
	"app/modules/datasets/controller.js",
	"app/api/v1/controller.js",
	"app/modules/docs/controller.js"
]

const STYLES = [
	"bower_components/angularjs-slider/dist/rzslider.min.css",
	"bower_components/skeleton/css/normalize.css",
	"bower_components/skeleton/css/skeleton.css",
	"static/style/style.css"
]

const jsDest = 'static/dist';

gulp.task('minify', () => {
	gulp.src(VENDOR)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
	gulp.src(APP)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
	gulp.src(SERVICES)
	    .pipe(concat('services.js'))
	    .pipe(gulp.dest(jsDest))
	    .pipe(rename('services.min.js'))
	    .pipe(uglifycss())
	    .pipe(gulp.dest(jsDest));
	gulp.src(SHARED)
		.pipe(concat('shared.js'))
		.pipe(gulp.dest(jsDest))
		.pipe(rename('shared.min.js'))
		.pipe(uglifycss())
		.pipe(gulp.dest(jsDest));
	gulp.src(COMPONENTS)
		.pipe(concat('components.js'))
		.pipe(gulp.dest(jsDest))
		.pipe(rename('components.min.js'))
		.pipe(uglifycss())
		.pipe(gulp.dest(jsDest));
	gulp.src(CONTROLLERS)
		.pipe(concat('controllers.js'))
		.pipe(gulp.dest(jsDest))
		.pipe(rename('controllers.min.js'))
		.pipe(uglifycss())
		.pipe(gulp.dest(jsDest));
	gulp.src(STYLES)
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(jsDest))
		.pipe(rename('styles.min.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest(jsDest));
});
