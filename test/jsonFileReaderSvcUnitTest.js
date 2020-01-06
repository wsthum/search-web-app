const chai = require("chai");
var assert = chai.assert;
const expect = chai.expect;
var jsonFileReader = require("../server/services/jsonFileToObjectConverter");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('Json File Converter Service', function () {
	it('should return exact number of rows for organizations.json file', async function () {
		var jsonObj = await jsonFileReader.readStaticFileType('organizations');
		assert.lengthOf(jsonObj.data, 26, "organizations.json should have 26 rows");
	});

	it('should return exact number of rows for tickets.json file', async function () {
		var jsonObj = await jsonFileReader.readStaticFileType('tickets');
		assert.lengthOf(jsonObj.data, 200, "tickets.json should have 200 rows");
	});

	it('should return exact number of rows for users.json file', async function () {
		var jsonObj = await jsonFileReader.readStaticFileType('users');
		assert.lengthOf(jsonObj.data, 75, "users.json should have 75 rows");
	});

	it('should return failure for json file name not in data folder', async function () {
		await expect(jsonFileReader.readStaticFileType('tests')).to.be.rejected;
	});
})