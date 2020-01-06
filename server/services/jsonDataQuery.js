/**
 *  @desc Service to be used in controller - queries json array to find rows with key-value 
 *        that matches field and value input      
 *  @params data - array containing json with key value pairs
 *  @params field - string containing key to be queried in each json object in data
 *  @params value - string/boolean/number containing value to be queried for key
 *  @returns Promise that is resolved or rejected with success field, err or data field containing 
 *           an array of matching json objects
 */
module.exports.query = function (data, field, value) {
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
		/**
		 *  Might have keys that don't exist for some row, fixing this by finding the first longest json row
		 *  in the matched rows and formatting each json row to follow the same convention and order, order
		 *  matters when front end displays data
		 **/
    // Stores keys of the longest json entry in sol
    let mapFields = [];
    if (sol.length != 0) {
      // finds the json object in sol that has most fields
      let maxLength = 0;
      for (var i = 0; i < sol.length; i++) {
        let numKeys = Object.keys(sol[i]).length;
        if (numKeys > maxLength) {
          maxLength = numKeys;
        }
      }
      // inserts all the fields of the longest json object into mapFields
      for (var i = 0; i < sol.length; i++) {
        let numKeys = Object.keys(sol[i]).length;
        if (numKeys === maxLength) {
          for (var key in sol[i]) {
            mapFields.push(String(key));
          }
          break;
        }
      }
      // If any json row in solution with key has values which does not exist, assign N/A
      for (var i = 0; i < sol.length; i++) {
        for (var j = 0; j < mapFields.length; j++) {
          if (sol[i][mapFields[j]] == undefined) {
            sol[i][mapFields[j]] = String("N/A");
          }
        }
      }
    }
    // Need json in similar sequential order, assign fields in order for each json row
    let parsedSol = [];
    for (var i = 0; i < sol.length; i++) {
      var newJson = {};
      for (var j = 0; j < mapFields.length; j++) {
        newJson[mapFields[j]] = sol[i][mapFields[j]];
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