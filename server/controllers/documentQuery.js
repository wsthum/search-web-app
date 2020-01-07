const fileReader = require("../services/jsonFileToObjectConverter");
const dataQuery = require("../services/jsonDataQuery");
const config = require("../../config/config")

/**
 * @desc Controller containing services - queries json file with field and value to find 
 *       matching rows and keys to check for incomplete information in found rows
 * @params req - API request with params containing filetype and body containing field and
 *         value to be queried from json file and keys which contain the complete set of 
 *         fields that the filetype should contain
 * @returns status 200 if services are successfully called with success and err/data value with 
 *                     array of json rows that match the query
 *          status 400 if errors and found if some service fails with hard err or 
 *                     unexpected failures happen
 */
module.exports.queryFile = async (req, res) => {
  try {
    const { type } = req.params;
    const { field, value, keys } = req.body;
    let jsonData = await fileReader.readStaticFileType(config.dataFolderPath, type);
    if (!jsonData.success) {
      res.status(200).json(jsonData);
      return;
    }
    let querySol = await dataQuery.query(jsonData.data, field, value, keys);
    res.status(200).json(querySol)
  } catch (e) {
    if (e.message) {
      e = e.message;
    }
    res.status(400).json({ success: false, err: e });
  }
}