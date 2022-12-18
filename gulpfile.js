const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat'),
  htmlMin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  browserSync = require('browser-sync').create(),
  svgSprite = require('gulp-svg-sprite'),
  image = require('gulp-image'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify-es').default,
  notify = require('gulp-notify'),
  sourceMaps = require('gulp-sourcemaps'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

const clean = () => del('dist');

// создаем таск для стилей
const styles = () => src([
  'node_modules/slick-carousel/slick/slick.css',
  'src/style/**/*.css'
])
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions', '> 5%'],
    cascade: false,
  }))
  .pipe(cleanCSS({
    level: 2,
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());

//создаем такс для html
const htmlMinify = () => src('src/**/*.html')
  .pipe(htmlMin({
    collapseWhiteSpace: true,
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());

const svgSprites = () => src('src/images/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
  .pipe(browserSync.stream());

const resources = () => src('src/resources/**')
  .pipe(dest('dist'));

const scripts = () => src([
  'node_modules/slick-carousel/slick/slick.js',
  'src/js/components/**/*.js',
  'src/js/main.js'
])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify(/*{
    toplevel: true,
  }*/).on('error', notify.onError()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());

const images = () => src([
  'src/images/**/*.jpg',
  'src/images/**/*.jpeg',
  'src/images/**/*.png',
  'src/images/**/*.svg',
  'src/images/**/*.webp',
])
  .pipe(image())
  .pipe(dest('dist/images'))
  .pipe(browserSync.stream());

const watchFile = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  })
}

watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/**/*.html', htmlMinify);
watch('src/style/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch([
  'src/images/**/*.jpg',
  'src/images/**/*.jpeg',
  'src/images/**/*.png',
  'src/images/**/*.svg',
], images);

// экспорт таксов
exports.styles = styles;
exports.html = htmlMinify;
exports.scripts = scripts;
exports.clean = clean;

exports.default = series(clean, styles, htmlMinify, svgSprites, images, scripts, resources, watchFile);
