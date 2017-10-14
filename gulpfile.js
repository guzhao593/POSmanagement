var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src",
        // proxy:'http://localhost:8888',
        port:666,
        files:['./src/**/*.html','./src/**/*.css','./src/**/*.js']
    });
    gulp.watch("src/sass/*.scss", ['sass']);
    // gulp.watch("src/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src(["src/sass/*.scss",'./src/sass/!var.scss'])
        .pipe(sass({outputStyle:'compact'}))
        .on('error',sass.logError)
        .pipe(gulp.dest("src/css"))
        .pipe(reload({stream: true}));
        
});

gulp.task('default', ['serve']);