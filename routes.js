const alertLoader = require('./loader/alert-loader');
const agentLoader = require('./loader/agent-loader');
const ruleLoader = require('./loader/rule-loader')

module.exports = {
    name: 'ApiRoute',
    register: async (server, options) => {
      server.route([
        {
          method: 'GET',
          path: '/alerts/all',
          handler: async (req, res) => {
            return alertLoader.all();
          }
        },
        {
          method: 'POST',
          path: '/alerts',
          handler: async (req, res) => {
            const alerts =  alertLoader.get(req.payload.offset, req.payload.limit, JSON.parse(req.payload.id));
            const size = alerts.length;
            return res.response({
              total_items: size,
              data: alerts
            }).type('application/json');
          }
        },
        {
          method: 'GET',
          path: '/agents/all',
          handler: async (req, res) => {
            return agentLoader.all();
          }
        },
        {
          method: 'POST',
          path: '/agents',
          handler: async (req, res) => {
            const agents =  agentLoader.get(req.payload.offset, req.payload.limit);
            const size = agents.length;
            return res.response({
              total_items: size,
              data: agents
            }).type('application/json');
          }
        },
        {
          method: 'GET',
          path: '/agents/{id}',
          handler: async (req, res) => {
            const agent =  agentLoader.getById(req.params.id);
            return res.response({
              data: agent
            }).type('application/json');
          }
        },
        {
          method: 'GET',
          path: '/rules/all',
          handler: async (req, res) => {
            return ruleLoader.all();
          }
        },
        {
          method: 'POST',
          path: '/rules',
          handler: async (req, res) => {
            const alerts =  ruleLoader.get(req.payload.offset, req.payload.limit);
            const size = alerts.length;
            return res.response({
              total_items: size,
              data: alerts
            }).type('application/json');
          }
        },
        {
          method: 'GET',
          path: '/rules/{id}',
          handler: async (req, res) => {
            const rule =  ruleLoader.getById(req.params.id);
            return res.response({
              data: rule
            }).type('application/json');
          }
        }
      ]);
    }
  }
  


