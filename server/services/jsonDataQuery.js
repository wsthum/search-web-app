module.exports.query = function(data, field, value) {
    return new Promise(function(res, rej){
        var sol = []
        field = String(field)
        value = String(value)
        for(var i = 0; i < data.length; i++) {
            var rowValue = String(data[i][field])
            if(rowValue === value) {
                sol.push(data[i])
            }
        }
        res({ success: true, data: sol})
    })
}