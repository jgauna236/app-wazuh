const loader = require("../file-loader");
const alertLoader = require("./alert-loader");
const path = require("path");
const agent = require("../entities/agent");
const agentFile =path.dirname(require.main.filename)+ "/resources/data/agents.json";

function all(){
    return loader.readFile(agentFile);
}



function get(offset, limit){
    var agents = all();
    var alerts = alertLoader.all();
    var res = [];
    agents.sort(function(a, b) { 
        return a.id - b.id  ||  a.name.localeCompare(b.name);
    });
    var max;
    (limit < agents.length)? max = limit : max = agents.length;
    for (var i = offset; i< max ; i++){
        agentAlerts = alerts.filter(obj => {
            return obj._source.agent.id === agents[i].id;
          });
        res.push(new agent(agents[i].id, agents[i].name, agents[i].ip, agentAlerts));
    }
    return res;
}

function getById(id){
    var agent = this.all().find(obj => {
        return obj.id === id;
    });
    agentAlerts = alertLoader.all().filter(obj => {
        return obj._source.agent.id === id;
    });
    agent.alerts = agentAlerts;  
    return agent;

}


module.exports.all = all;
module.exports.get = get;
module.exports.getById = getById;