let agent  = class {
    constructor(id, name, ip, alerts) {
       this.id = id;
       this.name = name;
       this.ip = ip;
       this.alerts = alerts;
     }
   };


   module.exports = agent;