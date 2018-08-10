1、gulp 入门
-------------------------------------------------------
1.1、全局安装（依赖node环境）：
	$ npm install --global gulp

1.2、作为项目开发依赖（devDependencies）安装：
	$ npm install --save-dev gulp

1.3、在项目根目录下创建一个名为 gulpfile.js 的文件：
	var gulp = require('gulp');

	gulp.task('default', function() {
		// 将你的默认的任务代码放在这
	});

1.4、运行gulp:
	$ gulp

默认会执行default任务，现在里面是没有任何任务代码，接下来就是学习gulp的api。

2、gulp api
-------------------------------------------------------
2.1、gulp.src([globs],options)
globs:
类型： String 或 Array

options:
类型： Object
{
	buffer: 
		类型： Boolean 默认值： true
		如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用
	
	read: 
		类型： Boolean 默认值： true
		如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件
	
	base:
		类型： String 默认值： 将会加在 glob 之前
	
}

2.2、gulp.dest([path], options)
path:
	类型： String or Function
	文件将被写入的路径（输出目录）

options:
类型： Object
{
	cwd: 
		类型： String 默认值： process.cwd()
		输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效
	
	mode: 
		类型： String 默认值： 0777
		八进制权限字符，用以定义所有在输出目录中所创建的目录的权限
	
}

2.3、gulp.task(name, [deps], fn)
name: 
	任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格

deps:
	类型： Array
	一个包含任务列表的数组，这些任务会在你当前任务运行之前完成
	gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
	  // 做一些事
	});

fn:
	该函数定义任务所要执行的一些操作

2.4、
gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
监视文件，并且可以在文件发生改动时候做一些事情

glob：
	类型： String or Array
	一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动

opts：
	类型： Object

tasks：
	类型： Array
	需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字

cb(event)：
	类型： Function
	每次变动需要执行的 callback

event.type
	类型： String
	发生的变动的类型：added, changed 或者 deleted