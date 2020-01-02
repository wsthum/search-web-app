const fileReader = require("../services/jsonFileToObjectConverter")

module.exports.queryFile = async (req, res) => {
	try {
		const { type, data } = req.params
		let jsonData = await fileReader.readStaticFileType(type)
		console.log(jsonData.data[0])
		res.status(200).json(jsonData)
	} catch(e) {
		if(e.message){
			e = e.message
		}
		res.status(400).json({ success: false, err: e})
	}
}