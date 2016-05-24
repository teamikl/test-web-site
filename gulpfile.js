'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    coffee = require('gulp-coffee'),
    gzip = require('gulp-gzip'),
    util = require('gulp-util'),
    debug = require('gulp-debug'),
    plumber = require('gulp-plumber'),
    ftp = require('vinyl-ftp'),
    rimraf = require('rimraf');

var DIST_DIR = "./dist/";


// Jade コンパイル
gulp.task('jade', function(){
    return gulp.src(['src/jade/*.jade'])
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest(DIST_DIR));
});


// Less コンパイル
gulp.task('less', function(){
    return gulp.src(['src/less/*.less'])
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(DIST_DIR));
});


// Coffee コンパイル
gulp.task('coffee', function(){
    return gulp.src(['src/coffee/*.coffee'])
        .pipe(plumber())
        .pipe(coffee())
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('compile:all', ['jade', 'less', 'coffee']);


// ファイル圧縮
// 依存: jade, less, coffe
gulp.task('compress:dist', ['compile:all'], function(){
    return gulp.src(['./dist/*.html', './dist/*.css', './dist/*.js'])
        .pipe(debug())
        .pipe(gzip())
        .pipe(gulp.dest(DIST_DIR));
});


// 生成されるファイルを削除
gulp.task('clean:dist', function(callback){
    rimraf('./dist/*', callback);
});


// ファイルを公開
// 依存: build
gulp.task('deploy', ['compress:dist'], function(){
    var pit = require('pit-ro');
  
    // 設定ファイルを記述する(Pitで管理)
    // @see https://www.npmjs.com/package/pit-ro
    pit.pitDir = '.';
    var config = pit.get('ftp.example.jp', 'config');

    // 以下のコードは未テスト

    var conn = ftp.create({
        host: config.host,
        user: config.user,
        password: config.password,
    });

    return gulp.src(['./dist/**'], {buffer: false})
        .pipe(conn.dest(config.upload_path));
});

// ファイル監視
gulp.task('watch', function(){
    gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/coffee/*.coffee', ['coffee']);
});


// デフォルトで実行されるタスク
gulp.task('default', ['jade', 'less', 'coffee', 'watch']);
