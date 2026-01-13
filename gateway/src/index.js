const fastify = require("fastify")({ logger: true });
const authCheck = require("./middleware/authCheck");
const authorize = require("./middleware/authorize");

fastify.addHook("preHandler", authCheck);
fastify.addHook("preHandler", authorize);

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