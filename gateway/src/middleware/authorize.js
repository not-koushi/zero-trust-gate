module.exports = async function authorize(request, reply) {
  const tokenPayload = request.tokenPayload;

  // Safety check (should never happen if authCheck works)
  if (!tokenPayload || !tokenPayload.role) {
    return reply
      .code(403)
      .send({ error: "Authorization failed" });
  }

  // Allow access to /protected for user role
  if (request.routerPath === "/protected") {
    if (tokenPayload.role !== "user") {
      return reply
        .code(403)
        .send({ error: "Authorization failed" });
    }
  }
};