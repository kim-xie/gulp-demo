//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    less = require('gulp-less');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('resources/less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('resources/css')); //将会在src/css下生成index.css
});

//压缩css
gulp.task('minifycss', function() {
    gulp.src('resources/css/*.css')      //压缩的文件
        .pipe(minifycss()) //执行压缩
        .pipe(gulp.dest('resources/minified/css'));  //输出文件夹
});

//压缩js
gulp.task('minifyjs', function() {
    gulp.src('resources/js/*.js')
        //.pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('resources/minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('resources/minified/js'));  //输出
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['resources/minified/css', 'resources/minified/js'], cb);
});
gulp.task('default', ['testLess','minifyjs','minifycss']);
//gulp.task('default', ['testLess'],['clean'], function() {
//    gulp.start('minifycss', 'minifyjs');
//}); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
