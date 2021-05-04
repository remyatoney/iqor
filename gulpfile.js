const gulp = require("gulp");
const zip = require("gulp-zip");

function bundle() {
    return gulp.src([
        "**/*",   //add all files to zip
        "!node_modules/**", //except for denoted by '!'
        "!src/**",
        "!bundled/**",
        "!gulpfile.js",
        "!package.json",
        "!package-lock.json",
        "!webpack.config.js",
        "!.gitignore",
    ])
    .pipe(zip('iqor.zip'))
    .pipe(gulp.dest("bundled"));
}

exports.bundle = bundle; //task name is bundle