const loader = require("../file-loader")
const path = require("path");
const alertFile =path.dirname(require.main.filename)+ "/resources/data/alerts.json"

function all(){
    return loader.readFile(alertFile);
}

function get(offset, limit, id){
    var alerts = this.all();
    var max;
    var res = [];
    (offset + limit <= id.length) ? max = limit : max = id.length;
    if(id !==  undefined){
        var i;
        for(i = offset; i < max ; i++){
            var contains = false;
            var j= 0;
            while(!contains && j< alerts.length){
                if(alerts[j]._id === id[i]) contains = true;
                j++;
            }
            res.push(alerts[j]);
        }
    }
    return res;
}


module.exports.all = all;
module.exports.get = get;