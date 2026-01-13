const { hashValue } = require("../utils/hash");

module.exports = async function contextCheck(request, reply) {
  const tokenPayload = request.tokenPayload;

  const requestIp =
    request.headers["x-forwarded-for"] || request.ip || "";

  const userAgent = request.headers["user-agent"] || "";

  const ipHash = hashValue(requestIp);
  const uaHash = hashValue(userAgent);

  if (
    tokenPayload.ip_hash !== ipHash ||
    tokenPayload.ua_hash !== uaHash
  ) {
    return reply
      .code(401)
      .send({ error: "Request context mismatch detected" });
  }
};