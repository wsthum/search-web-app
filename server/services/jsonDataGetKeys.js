/**
 *  @desc Service to be used in controller - queries json array to find rows with key-value 
 *        that matches field and value input      
 *  @params data - array containing json with key value pairs
 *  @params field - string containing key to be queried in each json object in data
 *  @params value - string/boolean/number containing value to be queried for key
 *  @returns Promise that is resolved or rejected with success field, err or data field containing 
 *           an array of matching json objects
 */
module.exports.findKeys = function (data) {
  return new Promise(function (res, rej) {
    let keySet = new Set();
    for(var i = 0; i < data.length; i++) {
      for(var key in data[i]) {
        if(!keySet.has(key)) {
          keySet.add(key);
        }
      }
    }
    let keys = []
    for(var key of keySet) {
      keys.push(key);
    }
    res({ success: true, data: keys });
  })
}