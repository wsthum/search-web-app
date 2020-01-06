var chai = require("chai");
var assert = chai.assert;
let chaiHttp = require("chai-http");
let config = require("../config/config")

chai.use(chaiHttp);
let app = require('../server')

describe('Static Document Query Controller Endpoint /POST ', function () {

	it('should return rows that match the query sent to request', function (done) {
		var path = "/api/query/type/" + "users";
		chai
			.request(app)
			.post(path)
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				field: "_id",
				value: 71
			})
			.end(function (error, response, body) {
				assert.equal(response.status, 200, "API req should return status code 200");
				assert.equal(response.body.data.length, 1, "Should return one row that matches query")
				done();
			});
	});
})