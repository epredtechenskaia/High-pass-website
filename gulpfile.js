const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat'); // устанавливем плагины, которые будут выполнять функции - они должны отражаться в package.json -- devDependencies
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['dist']) //удаляет директорию перед новой сборкой
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist/resources')) //переносит файлы в нашу итоговую папку
}


const styles = () => {
    return src('src/styles/**/*.css') // отбираем файлы с которыми будем работать 
        .pipe(sourcemaps.init())
        .pipe(gulpif(argv.production, concat('main.css'))) // объедини все файлы в один, который будет называться ...
        .pipe(autoprefixes({
            cascade: false,
        }))
        .pipe(gulpif(argv.production, cleanCSS({
            level: 2,
        })))
        .pipe(gulpif(argv.production, sourcemaps.write())) // перед тем как сложить в файл запишет наши sourcemaps
        .pipe(dest('dist/styles')) // положи этот файл ...
        .pipe(browserSync.stream()) //чтобы передавалось в browserSync
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gulpif(argv.production, htmlMin({
            collapseWhitespace: true,
        })))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg' //поднимаем на директорию выше
                }
            }
        }))
        .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
            'src/js/components/**/*.js',
            'src/js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(gulpif(argv.production, babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(argv.production, concat('app.js')))
        .pipe(gulpif(argv.production, uglify({
            toplevel: true,
        }).on('error', notify.onError())))
        .pipe(gulpif(argv.production, sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const images = () => {
    return src([
            'src/images/**/*.jpg',
            'src/images/**/*.png',
            'src/images/*.svg',
            'src/images/**/*.jpeg',
            'src/images/**/*.ico',
        ])
        .pipe(image())
        .pipe(dest('dist/images'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

watch('src/**/*.html', htmlMinify) // если изменения будут касаться этих файлов, то будет выполняться функция htmlMinify
watch('src/styles/**/*.css', styles) // чтобы отслеживались изменения
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/images/**', images)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)


exports.styles = styles
exports.htmlMinify = htmlMinify
exports.svgSprites = svgSprites
exports.scripts = scripts
exports.clean = clean
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)

//gulp
//gulp --production