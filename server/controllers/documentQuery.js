const fileReader = require("../services/jsonFileToObjectConverter")
const dataQuery = require("../services/jsonDataQuery")

module.exports.queryFile = async (req, res) => {
	try {
		const { type } = req.params
		const { field, value } = req.body
		let jsonData = await fileReader.readStaticFileType(type)
		if(!jsonData.success) {
			res.status(200).json(jsonData)
		}
		let querySol = await dataQuery.query(jsonData.data, field, value)
		res.status(200).json(querySol)
	} catch(e) {
		if(e.message){
			e = e.message
		}
		res.status(400).json({ success: false, err: e})
	}
}