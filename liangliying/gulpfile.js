// 在nodejs环境下运行的js文件
// 按照nodejs的语法使用

//引入gulp

var gulp=require('gulp');

//布置一个默认任务 task()
//参数一：任务名称  参数二：依赖任务  参数三：回调

gulp.task('say',function(){
	console.log('say 任务执行');
});


//布置任务：压缩css文件
var cssmin=require('gulp-cssmin');
gulp.task('cssmin',function(){
  return gulp.src('src/css/index.css')
  			 .pipe(cssmin())
  			 .pipe(gulp.dest('dist/css'));
});

//重命名
var rename=require('gulp-rename');
gulp.task('rename',function(){
  return gulp.src('src/css/index.css')
  			 .pipe(cssmin())
  			 .pipe(rename('index.min.css'))
  			 .pipe(gulp.dest('dist/css'));
});

// js压缩
var uglify = require('gulp-uglify');
var pump = require('pump');
//var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('uglify',function(){
  return gulp.src('src/js/reg.js')
  			 .pipe(uglify())
  			 .pipe(rename('reg.min.js'))
  			 .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify2',['uglify3'],function(){
  return gulp.src('src/js/carts.js')
  			 .pipe(uglify())
  			 .pipe(rename('carts.min.js'))
  			 .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify3',function(){
  return gulp.src('src/js/login.js')
  			 .pipe(uglify())
  			 .pipe(rename('login.min.js'))
  			 .pipe(gulp.dest('dist/js'));
});


//压缩图片
var imagemin=require('gulp-imagemin');

gulp.task('imagemin',function(){
  return gulp.src('src/img/*')
  			 .pipe(imagemin())
  			 .pipe(rename('img.min.js'))
  			 .pipe(gulp.dest('dist/img'));
});



// 自动刷新服务器
var browserSync = require('browser-sync');

// 静态服务器
gulp.task('server',()=>{
	browserSync({
		// 服务器路径
		// server:'./src/',

		// 代理服务器
		proxy:'http://localhost:1802',

		// 端口
		port:666,

		// 监听文件修改，自动刷新
		files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
	});

	// 监听sass文件修改，并自动编译
//	gulp.watch('./src/sass/*.scss',['compileSass'])
})