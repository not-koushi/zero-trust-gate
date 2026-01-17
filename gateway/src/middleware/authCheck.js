const jwt = require("jsonwebtoken");
const {
  totalRequests,
  expiredTokenRejections,
  authFailures
} = require("../metrics");

module.exports = async function authCheck(request, reply) {
  totalRequests.inc();

  const authHeader = request.headers.authorization;

  // ❌ Missing or malformed Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    authFailures.inc();
    return reply
      .code(401)
      .send({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);

    // ❌ Token structure invalid
    if (!decoded || !decoded.exp) {
      authFailures.inc();
      return reply.code(401).send({ error: "Invalid token format" });
    }

    const now = Math.floor(Date.now() / 1000);

    // ❌ Token expired
    if (decoded.exp < now) {
      expiredTokenRejections.inc();
      authFailures.inc();
      return reply.code(401).send({ error: "Token expired" });
    }

    // ✅ Token passed basic checks
    request.token = token;
    request.tokenPayload = decoded;
  } catch (err) {
    authFailures.inc();
    return reply.code(401).send({ error: "Token verification failed" });
  }
};