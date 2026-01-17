const { hashValue } = require("../utils/hash");

module.exports = async function contextCheck(request, reply) {
  const tokenPayload = request.tokenPayload;

  const userAgent = request.headers["user-agent"] || "";
  const uaHash = hashValue(userAgent);

  // Compare only User-Agent hash (Docker-safe)
  if (tokenPayload.ua_hash !== uaHash) {
    return reply
      .code(403)
      .send({ error: "Authorization failed" });
  }
};