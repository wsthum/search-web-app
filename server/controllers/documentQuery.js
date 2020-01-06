const fileReader = require("../services/jsonFileToObjectConverter");
const dataQuery = require("../services/jsonDataQuery");

/**
 * @desc Controller containing services - queries json file with field and value to find 
 *       matching rows
 * @params req - API request with params containing filetype and body containing field and
 *         value to be queried from json file 
 * @returns status 200 if services are successfully called with success and err/data value
 *          status 400 if errors and found if some service fails or unexpected failures happens
 */
module.exports.queryFile = async (req, res) => {
	try {
		const { type } = req.params;
		const { field, value } = req.body;
		let jsonData = await fileReader.readStaticFileType(type);
		if(!jsonData.success) {
			res.status(200).json(jsonData);
		}
		let querySol = await dataQuery.query(jsonData.data, field, value);
		res.status(200).json(querySol)
	} catch(e) {
		if(e.message){
			e = e.message;
		}
		res.status(400).json({ success: false, err: e });
	}
}