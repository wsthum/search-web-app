var chai = require("chai");
var assert = chai.assert;
let chaiHttp = require("chai-http");

chai.use(chaiHttp);
let app = require('../server')

describe('Static Document Query Controller Endpoint /POST ', function () {

  it('should return rows that match the query sent to request', function (done) {
    var path = "/api/query/type/" + "users";
    chai
      .request(app)
      .post(path)
      .set('content-type', 'application/json')
      .send({
        field: "_id",
        value: 71,
        keys: ["_id"]
      })
      .end(function (error, response, body) {
        assert.equal(response.status, 200, "API req should return status code 200");
        assert.isArray(response.body.data, "Should contain an array containing query json matches");
        assert.deepInclude(response.body.data, { "_id": 71 }, "Should contain the row with only one key");
        done();
      });
  });

})