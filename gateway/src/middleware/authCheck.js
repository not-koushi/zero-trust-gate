const jwt = require("jsonwebtoken");
const { totalRequests, expiredTokenRejections } = require("../metrics");

module.exports = async function authCheck(request, reply) {
  totalRequests.inc();

  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.code(401).send({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return reply.code(401).send({ error: "Invalid token format" });
    }

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      expiredTokenRejections.inc();
      return reply.code(401).send({ error: "Token expired" });
    }

    request.token = token;
    request.tokenPayload = decoded;
  } catch (err) {
    return reply.code(401).send({ error: "Token verification failed" });
  }
};