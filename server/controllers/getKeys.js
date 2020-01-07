const fileReader = require("../services/jsonFileToObjectConverter");
const getKeys = require("../services/jsonDataGetKeys");
const findFolderFileNames = require("../services/findFolderFileNames")
const config = require("../../config/config")

/**
 * @desc Controller containing services - queries server/data folder path to find all possible keys for 
 *       each .json file in the directory and output
 * @params req - empty API request 
 * @returns status 200 if services are successfully called with success and err/data value which
 *                     contains a json with each key:value containing the json filename and the array
 *                     of possible keys in the file
 *          status 400 if errors are found, some service fails with hard err or unexpected failures happen
 */
module.exports.getKeys = async (req, res) => {
  try {
    // Find .json filenames in data folder
    let fileNames = await findFolderFileNames.findNames(config.dataFolderPath);
    if (!fileNames.success) {
      res.status(200).json(fileNames);
      return;
    }
    // Populating the filename: array of field names json map
    let fileKeyMap = {};
    for (var i = 0; i < fileNames.data.length; i++) {
      let fileName = fileNames.data[i];
      // Converting .json file to json object
      let jsonData = await fileReader.readStaticFileType(config.dataFolderPath, fileName);
      if (!jsonData.success) {
        res.status(200).json(jsonData);
        return;
      }
      // Find all possible keys in json object
      let keys = await getKeys.findKeys(jsonData.data);
      fileKeyMap[fileName] = keys.data;
    }
    res.status(200).json({ success: true, data: fileKeyMap });
  } catch (e) {
    if (e.message) {
      e = e.message;
    }
    res.status(400).json({ success: false, err: e });
  }
}