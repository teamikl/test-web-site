'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    coffee = require('gulp-coffee'),
    gzip = require('gulp-gzip'),
    plumber = require('gulp-plumber'),
    rimraf = require('rimraf');

var DIST_DIR = "./dist/";


// Jade コンパイル
gulp.task('jade', function(){
    gulp.src(['src/jade/*.jade'])
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest(DIST_DIR));
});


// Less コンパイル
gulp.task('less', function(){
    gulp.src(['src/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest(DIST_DIR));
});


// Coffee コンパイル
gulp.task('coffee', function(){
    gulp.src(['src/coffee/*.coffee'])
        .pipe(coffee())
        .pipe(gulp.dest(DIST_DIR));
})


// ファイル圧縮
// 依存: jade, less, coffe
gulp.task('compress', ['jade', 'less', 'coffee'], function(){
    gulp.src(['./dist/*.html', './dist/*.css', './dist/*.js'])
        .pipe(gzip())
        .pipe(gulp.dest(DIST_DIR));
});


// 生成されるファイルを削除
gulp.task('clean', function(callback){
   rimraf('./dist', callback); 
});


// ファイルを公開
// 依存: compress
gulp.task('deploy', ['compress'], function(){
  // TODO: ftp でのアップロード処理をここに書く
});

// ファイル監視
gulp.task('watch', function(){
    gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/less/*.less', ['less']); 
    gulp.watch('src/coffee/*.coffee', ['coffee']); 
});


// デフォルトで実行されるタスク
gulp.task('default', ['jade', 'less', 'coffee', 'watch']);

