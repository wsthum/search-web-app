const fs = require('fs');

/**
 *  @desc Service to be used in controller - queries file directory to find all .json filenames     
 *  @params fileFolder - string containing full directory path name to search in
 *  @returns Promise that is resolved or rejected with success field, err or data field containing 
 *           an array of .json filenames (string) excluding the .json extension
 */
module.exports.findNames = function (fileFolder) {
  return new Promise(function (res, rej) {
    fs.readdir(fileFolder, (err, files) => {
      var fileNames = [];
      files.forEach(file => {
        file = file.split(".json");
        if(file.length > 1) {
          fileNames.push(file[0]);
        }
      });
      if (fileNames.length == 0) {
        res({ success: false, err: "No data files in data folder!" });
      } else {
        res({ success: true, data: fileNames })
      }
    })
  })
}