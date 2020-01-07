/**
 *  @desc Service to be used in controller - queries json array to find all possible distinct key fields 
 *        from each json row      
 *  @params data - array containing json with one of more key value pairs
 *  @returns Promise that is resolved or rejected with success and data field containing 
 *           an array of all possible distinct key fields (string)
 */
module.exports.findKeys = function (data) {
  return new Promise(function (res, rej) {
    let keySet = new Set();
    for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
        if (!keySet.has(key)) {
          keySet.add(key);
        }
      }
    }
    let keys = []
    for (var key of keySet) {
      keys.push(key);
    }
    res({ success: true, data: keys });
  })
}