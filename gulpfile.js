const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite =require ("gulp-svg-sprite");
const del = require('del');
const browserSync=require("browser-sync").create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');

const clean = () => {
    return del('dist');
}

//Создаем таск (задачу) для стилей
//Объединяет все стили в один файл

const mystyles = ()=>{
    return src('src/style/**/*.css')
    .pipe(sourceMaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixer("last 5 versions"))
    .pipe(cleanCSS({level:2}))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())

}

//Экспортируем таски (задачи)

exports.mystyles = mystyles;

//Создаем такс для HTML

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode:{
            stack:{
                sprite: '../sprite.svg'
            }
        }
    

    }))
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream());


}

const scripts = () =>{
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(sourceMaps.init())
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
        toplevel:true
    }).on('error',notify.onError()))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const resources = () =>{
    return src('src/resources/**')
        .pipe(dest('dist'))
}

const watchFile =()=>{
    browserSync.init({
        server:{
            baseDir:"dist"
        }
        
    });
    watch("src/**/*.html",htmlMinify);
    watch('src/images/svg/**/*.svg',svgSprites);
    watch('src/style/**/*.css',mystyles);
    watch('src/js/**/*.js',scripts);
    watch('src/resources/**',resources);
}
//Экспортируем таски
exports.clean = clean;
exports.resources = resources;
exports.scripts = scripts;
exports.html = htmlMinify;
exports.default = series(clean,mystyles,htmlMinify,svgSprites,scripts,resources,watchFile) ;

