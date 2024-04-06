function verifyToken(request, response, next) {
  const user = request.users.find((user) => {
    // if there is a user with tokens, look for a token in the token array that matches token in headers
    if (user.token) {
      return user.token.find((item) => {
        return item === request.headers.token;
      });
    }
    // skips users with no tokens
    return false;
  });
  if (user) {
    request.verifiedUser = user;
    next();
    return;
  }

  response.send({ code: 0, message: "Token error" });
}

module.exports = { verifyToken };
