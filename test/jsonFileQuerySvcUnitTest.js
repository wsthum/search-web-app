var chai = require("chai");
var assert = chai.assert;
var jsonQuery = require("../server/services/jsonDataQuery");

describe('Json Data Query Service', function () {

  it('should return row which has a field that matches query field and value in array', async function () {
    var data = [
      { _id: 71, value: "text" },
      { _id: 80, value: "test" }
    ];
    var field = "_id";
    var value = 71
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return the row which contains the value for the field");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": "text" }, "Should contain matching row json value");
  });

  it('should return success field as false if no rows matches query field and value', async function () {
    var data = [
      { _id: 71, value: "text" },
      { _id: 80, value: "test" }
    ];
    var field = "_id";
    var value = 100;
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.success, false, "Query should return json with false success field");
  });

  it('should return matching query field and value even if value field is an empty string', async function () {
    var data = [
      { _id: 71, value: "" },
      { _id: 80, value: "test" }
    ];
    var field = "value";
    var value = "";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return row with empty value field");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": "N/A" }, "Should contain matching row but empty strings are subbed with N/A");
  });

  it('should return row even if value field is an array that contains the query value', async function () {
    var data = [
      { _id: 71, value: ['test', 'is', 'fun'] },
      { _id: 80, value: ['text'] }
    ];
    var field = "value";
    var value = "test";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return rows with array field containing value");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": ['test', 'is', 'fun'] }, "Should contain matching row and full array for value");
  });

  it('should return multiple rows if more than one row contains query value in field', async function () {
    var data = [
      { _id: 71, value: "test" },
      { _id: 80, value: "test" },
      { _id: 100, value: "text" }
    ];
    var field = "value";
    var value = "test";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 2, "Query should return rows which contain value");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": "test" }, "Should contain matching first row");
    assert.deepInclude(jsonObj.data, { "_id": 80, "value": "test" }, "Should contain matching second row");
  });

  it('should return row even if query field is boolean ', async function () {
    var data = [
      { _id: 71, value: true },
      { _id: 80, value: false },
      { _id: 100, value: true }
    ];
    var field = "value";
    var value = false;
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return row with query boolean value");
    assert.deepInclude(jsonObj.data, { "_id": 80, "value": false }, "Should contain matching row");
  });

  it('should return row if search value is empty for field and field does not exist in row', async function () {
    var data = [
      { _id: 71 },
      { _id: 80, value: false },
      { _id: 100, value: true }
    ];
    var field = "value";
    var value = "";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return row with missing value field");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": "N/A" }, "Should return matching row with N/A in missing field");
  });

  it('should return rows if search value is empty and field does not exist or empty in row', async function () {
    var data = [
      { value: true },
      { _id: "", value: true },
      { _id: 80, value: false },
      { _id: 100, value: true }
    ];
    var field = "_id";
    var value = "";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 2, "Query should return row with missing/empty value field");
    assert.deepInclude(jsonObj.data, { "_id": "N/A", "value": true }, "Should contain matching first row with missing field N/A");
    assert.deepInclude(jsonObj.data, { "_id": "N/A", "value": true }, "Should contain second matching row with empty field");
  });

  it('should return row with missing field indicated with "N/A" string if field does not exist', async function () {
    var data = [
      { _id: 71 },
      { _id: 80, value: false },
      { _id: 100, value: true }
    ];
    var field = "value";
    var value = "";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return row with missing/empty value field");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": "N/A" }, "Should contain matching first row with missing field N/A");
  });

  it('should return row with missing field indicated with "N/A" string if field is empty', async function () {
    var data = [
      { _id: 71, value: "" },
      { _id: 80, value: false },
      { _id: 100, value: true }
    ];
    var field = "value";
    var value = "";
    var keys = ["_id", "value"];
    var jsonObj = await jsonQuery.query(data, field, value, keys);
    assert.equal(jsonObj.data.length, 1, "Query should return row with missing/empty value field");
    assert.deepInclude(jsonObj.data, { "_id": 71, "value": "N/A" }, "Should contain matching first row with empty field N/A");
  });

})