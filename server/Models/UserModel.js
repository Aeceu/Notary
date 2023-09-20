const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const Users = mongoose.model("user", userSchema);
module.exports = Users;
