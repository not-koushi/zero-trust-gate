const axios = require("axios");
const { AUTH_SERVICE_URL } = require("../config");
const { authFailures } = require("../metrics");

module.exports = async function authorize(request, reply) {
  try {
    const response = await axios.post(AUTH_SERVICE_URL, {
      token: request.token
    });

    if (!response.data.allowed) {
      authFailures.inc();
      return reply.code(403).send({ error: "Access denied" });
    }

    request.userRole = response.data.role;
  } catch (err) {
    authFailures.inc();
    return reply.code(403).send({ error: "Authorization failed" });
  }
};