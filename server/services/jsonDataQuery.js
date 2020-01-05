

module.exports.query = function(data, field, value) {
    return new Promise(function(res, rej){
        var sol = [];
        field = String(field);
        value = String(value);
        for(var i = 0; i < data.length; i++) {
            var fieldContent = data[i][field];
            if(fieldContent === undefined) {
                fieldContent = String("")
            }
            if(Array.isArray(fieldContent)) {
                for(var j = 0; j < fieldContent.length; j++) {
                    if(fieldContent[j] === value) {
                        sol.push(data[i]);
                    }
                }
            } else {
                var rowValue = String(fieldContent);
                if(rowValue === value) {
                    sol.push(data[i]);
                }
            }
        }
        let mapFields = [];
        if(sol.length != 0) {
            let maxLength = 0;
            for(var i = 0; i < sol.length; i++) {
                let numKeys = Object.keys(sol[i]).length
                if(numKeys > maxLength) {
                    maxLength = numKeys;
                }
            }
            for(var i = 0; i < sol.length; i++) {
                let numKeys = Object.keys(sol[i]).length
                if(numKeys === maxLength) {
                    for(var key in sol[i]) {
                        mapFields.push(String(key));
                    }
                    break;
                }
            }
            for(var i = 0; i < sol.length; i++) {
                for(var j = 0; j < mapFields.length; j++) {
                    if(sol[i][mapFields[j]] == undefined) {
                        sol[i][mapFields[j]] = String("N/A");
                    }
                }
            }
        }
        let parsedSol = [];
        for(var i = 0; i < sol.length; i++) {
            var newJson = {}
            for(var j = 0; j < mapFields.length; j++) {
                newJson[mapFields[j]] = sol[i][mapFields[j]];
            }
            parsedSol.push(newJson)
        }

        if(parsedSol.length == 0) {
            res({ success: false, error: "No records matching query found!"});
        } else {
            res({ success: true, data: parsedSol});
        }
    })
}