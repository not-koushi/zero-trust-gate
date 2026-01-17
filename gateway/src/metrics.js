const client = require("prom-client");

const register = client.register;

// Prevent duplicate metric registration
register.clear();

client.collectDefaultMetrics({ register });

const totalRequests = new client.Counter({
  name: "total_requests",
  help: "Total number of requests received by the API gateway",
  registers: [register]
});

const authFailures = new client.Counter({
  name: "auth_failures",
  help: "Total number of authorization failures",
  registers: [register]
});

const expiredTokenRejections = new client.Counter({
  name: "expired_token_rejections",
  help: "Total number of expired token rejections",
  registers: [register]
});

module.exports = {
  register,
  totalRequests,
  authFailures,
  expiredTokenRejections
};