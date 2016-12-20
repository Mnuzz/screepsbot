const ModuleManager = require('screeps-module-manager')
//const babel = require('babel-core')
const path = require('path')
const exec = require('child_process').exec;
const fs = require('fs');

var root = path.normalize(__dirname + '\\..\\');
//Add string.format
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

function removeDir(dirPath, removethis) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
        else
        removeDir(filePath, 1);
    }
    if (removethis === 1)
        fs.rmdirSync(dirPath);
}

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

var targetfilepath = "C:\\Users\\Admin\\AppData\\Local\\Screeps\\scripts\\screeps.com\\default\\";

//Local game has to actually be running for this
function CopyFilesToLocalGame() {
    
    console.log("Moving files to {0}".format(targetfilepath));

    //Delete all files from target path
    removeDir(targetfilepath);

    //Process source folder, move to target
    processDir(root);
}

function processDir(currentdir) {
    var len = root.length;
    var suffix = currentdir.substring(len); 

    var files = fs.readdirSync(currentdir);
        files.forEach(file => {
            var fullpath = currentdir + file; 
            var fileinfo = fs.statSync(fullpath);
            if (!fullpath.endsWith('\\'))
                fullpath += '\\';
            if (!fileinfo.isFile()) {
                //is in list of ignored directories?
                var ignoredDirs = ['.git\\', 'node_modules\\','Scripts\\','.vs\\','.vscode\\', 'build\\']
                var skip = false;
                for(idx in ignoredDirs) {
                    var ignoredDir = ignoredDirs[idx];
                    if (fullpath.endsWith(ignoredDir)) {
                        skip = true;
                        break;
                    }
                }
                if (skip)
                    return;

                //Process subdir recursively
                processDir(fullpath);
            }
            else if (file.endsWith('.js')) { //process file

                //Get the target file name as a transformation of the source path
                var targetfilename = suffix.replace('\\', '.') + file;
                var filebase = file.substring(0, file.length - 3);
                
                //If the filename is the same as its directory name, no need to add the directory as prefix
                //Example: core.core.js gets turned into core.js
                if (targetfilename == filebase + '.' + filebase + '.js')
                    targetfilename = filebase + '.js';


                //get target and src path
                var targetpath = targetfilepath + targetfilename;
                var srcpath = currentdir + file
                
                //copy file
                fs.writeFileSync(targetpath, fs.readFileSync(srcpath));
            }
            console.log(file);
            });
    }

function build() {
    CopyFilesToLocalGame();
}

build();

/*
const modules = new ModuleManager({
    username: 'username',
    password: 'password',
    branch: 'master',
    source: path.resolve(__dirname, '.'),
    transform: (source, done) => {
        if (typeof done !== "function")
            return;
        try {
            done(null, function () { })
        } catch (err) {
            done(err)
        }
    }
})
 */

/*
modules.on('error', err => console.error(err))

modules.on('change', 
file => 
    console.log('File updated!', file)
)
modules.on('sync', () => console.log('Modules synced!'))
*/
