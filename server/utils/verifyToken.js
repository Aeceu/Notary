const jwt = require("jsonwebtoken");

const verifyToken = (req) => {
  const token = req.cookies.token;
  if (token) {
    const cookie = jwt.verify(token, process.env.TOKEN_SECRET);
    return cookie.id;
  } else {
    return null;
  }
};

module.exports = verifyToken;
