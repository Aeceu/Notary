const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = createToken;
