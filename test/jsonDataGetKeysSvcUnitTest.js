const chai = require("chai");
var assert = chai.assert;
var getKeys = require("../server/services/jsonDataGetKeys");

describe('Getting Keys from Json Data Service', function () {

  it('should return all keys for array of json data with no fields missing', async function () {
    var data = [
      { "_id": 71, "value": "tester" },
      { "_id": 100, "value": "tester1" }
    ];
    var jsonObj = await getKeys.findKeys(data);
    assert.lengthOf(jsonObj.data, 2, "Should have 2 fields in array");
    assert.deepInclude(jsonObj.data, "_id", "Should contain first column keyname _id");
    assert.deepInclude(jsonObj.data, "value", "Should contain second column keyname value");
  });

  it('should return all keys for array of json data with fields missing', async function () {
    var data = [
      { "_id": 71 },
      { "_id": 100, "value": "tester1" }
    ];
    var jsonObj = await getKeys.findKeys(data);
    assert.lengthOf(jsonObj.data, 2, "Should have 2 fields in array");
    assert.deepInclude(jsonObj.data, "_id", "Should contain first column keyname _id");
    assert.deepInclude(jsonObj.data, "value", "Should contain second column keyname value");
  });

  it('should return no keys for empty data', async function () {
    var data = [];
    var jsonObj = await getKeys.findKeys(data);
    assert.lengthOf(jsonObj.data, 0, "Should have no fields in array");
  });

})