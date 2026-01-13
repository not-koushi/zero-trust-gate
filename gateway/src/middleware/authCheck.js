const jwt = require("jsonwebtoken");

module.exports = async function authCheck(request, reply) {
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
      return reply.code(401).send({ error: "Token expired" });
    }

    request.token = token;
    request.tokenPayload = decoded;
  } catch (err) {
    return reply.code(401).send({ error: "Token verification failed" });
  }
};