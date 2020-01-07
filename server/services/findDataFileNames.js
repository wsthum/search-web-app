const testFolder = __dirname + '/../data/';
const fs = require('fs');

/**
 *  @desc Service to be used in controller - queries json array to find rows with key-value 
 *        that matches field and value input      
 *  @params data - array containing json with key value pairs
 *  @params field - string containing key to be queried in each json object in data
 *  @params value - string/boolean/number containing value to be queried for key
 *  @returns Promise that is resolved or rejected with success field, err or data field containing 
 *           an array of matching json objects
 */
module.exports.findNames = function () {
  return new Promise(function (res, rej) {
    fs.readdir(testFolder, (err, files) => {
      var fileNames = [];
      files.forEach(file => {
        file = file.split(".json");
        fileNames.push(file[0]);
      });
      if (fileNames.length == 0) {
        res({ success: false, err: "No data files in data folder!" });
      } else {
        res({ success: true, data: fileNames })
      }
    })
  })
}