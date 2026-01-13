const fastify = require("fastify")({ logger: true });
const authCheck = require("./middleware/authCheck");
const authorize = require("./middleware/authorize");
const contextCheck = require("./middleware/contextCheck");

fastify.addHook("preHandler", authCheck);
fastify.addHook("preHandler", authorize);
fastify.addHook("preHandler", contextCheck);

fastify.get("/protected", async (request) => {
  return {
    message: "Access granted",
    role: request.userRole
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();