(function ()
{
    'use strict';

    var gulp = require('gulp');
    var connect = require('gulp-connect');
    var open = require('gulp-open');

    gulp.task('open', function ()
    {
        gulp.src(__filename).pipe(open({uri: 'http://localhost:9000'}));
    });

    gulp.task('webserver', function ()
    {
        return connect.server({
            root: 'app',
            port: 9000,
            livereload: true
        });
    });

    gulp.task('html', function ()
    {
        return gulp.src('app/**/*.html')
                .pipe(connect.reload());
    });

    gulp.task('js', function ()
    {
        return gulp.src('app/**/*.js')
                .pipe(connect.reload());
    });
    gulp.task('css', function ()
    {
        return gulp.src('app/**/*.css')
                .pipe(connect.reload());
    });

    gulp.task('watch', function ()
    {
        gulp.watch('app/**/*.html', ['html']);
        gulp.watch('app/**/*.js', ['js']);
        gulp.watch('app/**/*.css', ['css']);
    });

    gulp.task('default', ['webserver', 'watch', 'open']);

})();
