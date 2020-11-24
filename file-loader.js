
const fs = require("fs"); 
const path = require("path"); 
const { prototype } = require("stream");
var json;

function readFile(fileDir){
    return JSON.parse(fs.readFileSync(fileDir, 'utf-8'));
}


function loadJson(fileDir, sourceDir){
        var json = this.readFile(fileDir);
        var agents = [];
        var rules = [];
        if (!fs.existsSync(sourceDir)){
        fs.mkdir(path.join(sourceDir, ), (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            console.log('Directory created successfully!'); 
        });

        }
        json.forEach((element,index, array) => {
            var  containsAgent = false;
            var  containsRule = false;
            var i = 0;
            while(( !containsAgent || !containsRule ) && ( i<agents.length || rules<agents.length )){
                if (i<agents.length && agents[i].id == element._source.agent.id) containsAgent=true;
                if (i<rules.length && rules[i].id == element._source.rule.id) containsRule=true;
                i++;
            }
            if(!containsAgent){
                agents.push(element._source.agent);
            }
            if(!containsRule){
                rules.push(element._source.rule);
            }
            if(index + 1 === array.length){
                fs.writeFileSync(sourceDir+'/alerts.json',JSON.stringify(json),{encoding:'utf8',flag:'w'});
                fs.writeFileSync(sourceDir+'/agents.json',JSON.stringify(agents),{encoding:'utf8',flag:'w'});
                fs.writeFileSync(sourceDir+'/rules.json',JSON.stringify(rules),{encoding:'utf8',flag:'w'});
            }
        });
}





function toString(){
    return JSON.parse(this.json);
}

module.exports.loadJson = loadJson;
module.exports.toString = toString;
module.exports.readFile = readFile;
