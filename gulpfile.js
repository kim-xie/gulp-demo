//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),                  //gulp基础库
    minifycss = require('gulp-minify-css'),  //css压缩
    imagemin = require('gulp-imagemin'),     //图片压缩
    pngquant = require('imagemin-pngquant'), //图片深度压缩
    cache = require('gulp-cache'),           //读取缓存
    concat = require('gulp-concat'),         //合并文件
    uglify = require('gulp-uglify'),         //js压缩
    jshint = require('gulp-jshint'),         //js检查
    rename = require('gulp-rename'),         //文件重命名
    del = require('del'),                    //清空文件夹
    notify = require('gulp-notify'),         //提示
    less = require('gulp-less');             //less处理

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('resources/less/*.less')       //该任务针对的文件
        .pipe(less())                       //该任务调用的模块
        .pipe(gulp.dest('resources/css'));  //将会在src/css下生成index.css
});

// 压缩图片任务
gulp.task('images', function () {
    // 1. 找到图片
    gulp.src('resources/img/*.*')
    // 2. 压缩图片
    .pipe(imagemin({
         optimizationLevel: 5,  //类型：Number  默认：3  取值范围：0-7（优化等级）
         progressive: true,     //类型：Boolean 默认：false 无损压缩jpg图片
         interlaced: true,      //类型：Boolean 默认：false 隔行扫描gif进行渲染
         multipass: true        //类型：Boolean 默认：false 多次优化svg直到完全优化
      })
    )
    // 3. 另存图片
    .pipe(gulp.dest('resources/minified/img'))
    // 4. 提示成功
    .pipe(notify({message:'images task ok'}));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
  // 监听文件修改，当文件被修改则执行 images 任务
  gulp.watch('resources/img/*.*)', ['images'])
});

//只压缩修改的图片,没有修改的图片直接从缓存文件读取
gulp.task('testImagemin', function () {
    gulp.src('resources/img/*.*')                   //文件入口
        .pipe(cache(imagemin({                      //之压缩修改的图片
            progressive: true,                      //类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],  //不要移除svg的viewbox属性
            use: [pngquant()]                       //使用pngquant深度压缩png图片的imagemin插件
          })
          )
        )
        .pipe(gulp.dest('resources/minified/img/min'))
        .pipe(notify({message:'testImagemin task ok'}));
});

//压缩css
gulp.task('minifycss', function() {
    gulp.src('resources/css/*.css')                   //压缩的文件
        .pipe(concat('common.css'))                   //合并css
        .pipe(minifycss())                            //执行压缩
        .pipe(gulp.dest('resources/minified/css'))    //输出文件夹
        .pipe(notify({message:'minifycss task ok'})); //提示成功
});

//压缩js
gulp.task('minifyjs', function() {
    gulp.src('resources/js/*.js')                     //选择合并的JS
        .pipe(jshint())                               //js校验
        .pipe(jshint.reporter('default'))　　         //对代码进行检查
        .pipe(concat('common.js'))                    //合并所有js到common.js
        .pipe(gulp.dest('resources/minified/js'))     //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))               //rename压缩后的文件名
        .pipe(uglify())                               //压缩
        .pipe(gulp.dest('resources/minified/js'))     //输出
        .pipe(notify({message:'minifyjs task ok'}));  //提示成功
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['resources/minified/css', 'resources/minified/js'], cb);
});

//执行 gulp 默认运行的任务
gulp.task('default', ['minifyjs','minifycss','testLess','images','testImagemin']); //任务执行从右到左

//gulp.task('default', ['testLess'],['clean'], function() {
//    gulp.start('minifycss', 'minifyjs');
//}); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
