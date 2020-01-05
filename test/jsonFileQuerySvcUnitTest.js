var chai = require("chai");
var assert = chai.assert;
var jsonQuery = require("../server/services/jsonDataQuery")

describe('Json Data Query Service', function() {
    it('should return row which has a field that matches query field and value in array', async function() {
        var data = [
            {_id: 71, value: "text"},
            {_id: 80, value: "test"}
        ];
        var field = "_id";
        var value = 71;
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 1, "Query should return the row which contains the value for the field");
    });
    

    it('should return success field as false if no rows matches query field and value', async function() {
        var data = [
            {_id: 71, value: "text"},
            {_id: 80, value: "test"}
        ];
        var field = "_id";
        var value = 100;
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.success, false, "Query should return json with false success field");
    });

    it('should return matching query field and value even if value field is an empty string', async function() {
        var data = [
            {_id: 71, value: ""},
            {_id: 80, value: "test"}
        ];
        var field = "value";
        var value = "";
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 1, "Query should return row with empty value field");
    });

    it('should return row even if value field is an array that contains the query value', async function() {
        var data = [
            {_id: 71, value: ['test', 'is', 'fun']},
            {_id: 80, value: ['text']}
        ];
        var field = "value";
        var value = "test";
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 1, "Query should return rows with array field containing value");
    });

    it('should return multiple rows if more than one row contains query value in field', async function() {
        var data = [
            {_id: 71, value: "test"},
            {_id: 80, value: "test"},
            {_id: 100, value: "text"}
        ];
        var field = "value";
        var value = "test";
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 2, "Query should return rows which contain value");
    });

    it('should return row even if query field is boolean ', async function() {
        var data = [
            {_id: 71, value: true},
            {_id: 80, value: false},
            {_id: 100, value: true}
        ];
        var field = "value";
        var value = false;
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 1, "Query should return row with query boolean value");
    });

    it('should return row if search value is empty for field and field does not exist in row', async function() {
        var data = [
            {_id: 71},
            {_id: 80, value: false},
            {_id: 100, value: true}
        ];
        var field = "value";
        var value = "";
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 1, "Query should return row with missing value field");
    });

    it('should return rows if search value is empty and field does not exist or empty in row', async function() {
        var data = [
            {value: true},
            {_id: "", value: true},
            {_id: 80, value: false},
            {_id: 100, value: true}
        ];
        var field = "_id";
        var value = "";
        var jsonObj = await jsonQuery.query(data, field, value);
        assert.equal(jsonObj.data.length, 2, "Query should return row with missing/empty value field");
    });


})