const fileReader = require("../services/jsonFileToObjectConverter");
const getKeys = require("../services/jsonDataGetKeys");
const findDataFileNames = require("../services/findDataFileNames")

/**
 * @desc Controller containing services - queries json file with field and value to find 
 *       matching rows
 * @params req - API request with params containing filetype and body containing field and
 *         value to be queried from json file 
 * @returns status 200 if services are successfully called with success and err/data value
 *          status 400 if errors and found if some service fails or unexpected failures happens
 */
module.exports.getKeys = async (req, res) => {
  try {
    let fileNames = await findDataFileNames.findNames();
    if(!fileNames.success) {
      res.status(200).json(fileNames);
      return;
    }
    let fileKeyMap = {
      
    }
    for(var i = 0; i < fileNames.data.length; i++) {
      let fileName = fileNames.data[i];
      let jsonData = await fileReader.readStaticFileType(fileName);
      if(!jsonData.success) {
        res.status(200).json(jsonData)
        return;
      }
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