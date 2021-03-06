// Required libs and functions
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

/**
 *  @desc Services to be used in controller - reads static json file in filepath folder 
 *        and returns json object 
 *  @params filePath - string containing filepath indicating which folder to read
 *  @params fileType - string containing filename in filePath folder excluding .json extension
 *  @returns Promise that is resolved or rejected with success field, err or data field 
 *           containing json object that is read from file
 */
module.exports.readStaticFileType = function (filePath, fileType) {
  return new Promise(function (res, rej) {
    var fileString = filePath + fileType + ".json";
    readFile(fileString, { encoding: 'utf8' })
      .then(function (content) {
        content = JSON.parse(content);
        if (!content) {
          res({ success: false, err: "File read failed" });
        } else {
          res({ success: true, data: content });
        }
      })
      .catch(function (err) {
        rej(err);
      })
  })
}