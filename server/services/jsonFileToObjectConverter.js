const fs = require("fs");
const util = require("util");
const filePath = __dirname + "/../data/"

const readFile = util.promisify(fs.readFile)

module.exports.readStaticFileType = function(fileType) {
    return new Promise(function(res, rej){
        var fileString = filePath + fileType + ".json"
        console.log(fileString)
        readFile(fileString, {encoding: 'utf8'})
            .then(function(content){
                content = JSON.parse(content)
                if (!content){
                    res({ success: false, err: "File read failed"})
                } else {
                    res({ success: true, data: content})
                }
            })
            .catch(function(err){
                rej(err)
            })
    })
}