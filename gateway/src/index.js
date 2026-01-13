const fastify = require("fastify")({ logger: true });
const authCheck = require("./middleware/authCheck");
const authorize = require("./middleware/authorize");
const contextCheck = require("./middleware/contextCheck");
const cors = require("@fastify/cors");
const { client } = require("./metrics");

fastify.register(cors, {
  origin: "http://127.0.0.1:8000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Authorization", "Content-Type"], 
});

fastify.addHook("preHandler", authCheck);
fastify.addHook("preHandler", authorize);
fastify.addHook("preHandler", contextCheck);

fastify.get("/metrics", async (_request, reply) => {
  reply.header("Content-Type", client.register.contentType);
  return client.register.metrics();
});

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