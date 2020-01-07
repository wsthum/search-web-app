var chai = require("chai");
var assert = chai.assert;
let chaiHttp = require("chai-http");

chai.use(chaiHttp);
let app = require('../server')

describe('Static Json File Data Folder Key Query Controller Endpoint /GET ', function () {

  it('should return keys for each individual json file in data folder', function (done) {
    var path = "/api/keys";
    chai
      .request(app)
      .get(path)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end(function (error, response, body) {
        assert.equal(response.status, 200, "API req should return status code 200");
        assert.exists(response.body.data, "API returns neither null orr undefined")
        done();
      });
  });
  
})