function verifyToken(request, response, next) {
  const user = request.users.find((user) => {
    return user.token.includes(request.headers.token);
  });

  if (user) {
    request.verifiedUser = user;
    next();
    return;
  }

  response.send({ code: 0, message: "Token error" });
}

module.exports = { verifyToken };
