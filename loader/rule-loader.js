const loader = require("../file-loader")
const alertLoader = require("./alert-loader")
const path = require("path");
const ruleFile =path.dirname(require.main.filename)+ "/resources/data/rules.json"

function all(){
    return loader.readFile(ruleFile);
}

function get(offset, limit){
    var rules = all();
    var alerts = alertLoader.all();
    var res = [];
    rules.sort(function(a, b) { 
        return a.id - b.id  ||  a.name.localeCompare(b.name);
    });
    var max;
    (limit < rules.length)? max = limit : max = rules.length;
    for (var i = offset; i< max ; i++){
        ruleAlerts = alerts.filter(obj => {
            return obj._source.rule.id === rules[i].id;
          });
        rules[i].alerts = ruleAlerts;
        rules[i].total_alerts = ruleAlerts.length;
        res.push(rules[i]);
    }
    return res;
}

function getById(id){
    var rule = this.all().find(obj => {
        return obj.id === id;
    });
    ruleAlerts = alertLoader.all().filter(obj => {
        return obj._source.rule.id === id;
    });
    rule.alerts = ruleAlerts;
    rule.total_alerts = ruleAlerts.length;
    return rule;

}

module.exports.all = all;
module.exports.get = get;
module.exports.getById = getById;