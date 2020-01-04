module.exports.query = function(data, field, value) {
    return new Promise(function(res, rej){
        var sol = []
        field = String(field)
        value = String(value)
        for(var i = 0; i < data.length; i++) {
            var fieldContent = data[i][field]
            if(Array.isArray(fieldContent)) {
                for(var j = 0; j < fieldContent.length; j++) {
                    if(fieldContent[j] === value) {
                        sol.push(data[i])
                    }
                }
            } else {
                var rowValue = String(fieldContent)
                if(rowValue === value) {
                    sol.push(data[i])
                }
            }
        }
        if(sol.length == 0) {
            res({ success: false, error: "No records matching query found!"})
        } else {
            res({ success: true, data: sol})
        }
    })
}