const axios = require("axios");
const { AUTH_SERVICE_URL } = require("../config");

module.exports = async function authorize(request, reply) {
  try {
    const response = await axios.post(AUTH_SERVICE_URL, {
      token: request.token
    });

    if (!response.data.allowed) {
      return reply.code(403).send({ error: "Access denied" });
    }

    request.userRole = response.data.role;
  } catch (err) {
    return reply.code(403).send({ error: "Authorization failed" });
  }
};