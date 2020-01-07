/**
 *  @desc Service to be used in controller - queries json array to find rows with key-value 
 *        that matches field and value input, if rows don't contain some field in keys, they
 *        have value "N/A"
 *  @params data - array containing json with key value pairs
 *  @params field - string containing key to be queried in each json object in data
 *  @params value - string/boolean/number containing value to be queried for key
 *  @params keys - array of strings containing the complete set of fields for data
 *  @returns Promise that is resolved or rejected with success field, err or data field containing 
 *           an array of matching json objects
 */
module.exports.query = function (data, field, value, keys) {
  return new Promise(function (res, rej) {
    // Contains initial rows that matches query
    var sol = [];
    // Casting field to secure type
    field = String(field);
    value = String(value);
    // Inserts rows that matches query
    for (var i = 0; i < data.length; i++) {
      var fieldContent = data[i][field];
      // Handles case where value in searched key does not exist
      if (fieldContent === undefined) {
        fieldContent = String("");
      }
      // If key contains array as value, loop through array to find matching elements
      if (Array.isArray(fieldContent)) {
        for (var j = 0; j < fieldContent.length; j++) {
          if (fieldContent[j] === value) {
            sol.push(data[i]);
          }
        }
      } else {
        // key contains single value
        var rowValue = String(fieldContent);
        if (rowValue === value) {
          sol.push(data[i]);
        }
      }
    }
    // Parsing the matching rows with the same order as keys
    let parsedSol = [];
    for (var i = 0; i < sol.length; i++) {
      var newJson = {};
      for (var j = 0; j < keys.length; j++) {
        var newValue = sol[i][keys[j]];
        // If some key has values that do not exist, assign N/A
        if (newValue == undefined || newValue == "") {
          newJson[keys[j]] = String("N/A");
        } else {
          newJson[keys[j]] = newValue;
        }
      }
      parsedSol.push(newJson);
    }

    // No records found
    if (parsedSol.length == 0) {
      res({ success: false, err: "No records matching query found!" });
    } else {
      // Records found
      res({ success: true, data: parsedSol });
    }
  })
}