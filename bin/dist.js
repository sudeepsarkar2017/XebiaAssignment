/*
 * Distributes resource files from src to build directory.
 * Currently files with the following extension are copied:
 * json, txt.
 * Create output director under build
 */
var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

shell.cd('./src');
shell.find('.').filter(file => file.match(/\.json$/)).forEach(file => {
    // Create the destination directory if it does not exist
    if (!fs.existsSync('../build/' + path.dirname(file))) {
        shell.mkdir('-p', '../build/' + path.dirname(file));
    }
    shell.cp(file, '../build/' + file);
});
shell.mkdir('-p', '../build/output');
