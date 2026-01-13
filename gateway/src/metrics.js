const client = require("prom-client");

client.collectDefaultMetrics();

const totalRequests = new client.Counter({
  name: "total_requests",
  help: "Total number of requests received by the API gateway"
});

const authFailures = new client.Counter({
  name: "auth_failures",
  help: "Total number of authorization failures"
});

const expiredTokenRejections = new client.Counter({
  name: "expired_token_rejections",
  help: "Total number of expired token rejections"
});

module.exports = {
  client,
  totalRequests,
  authFailures,
  expiredTokenRejections
};