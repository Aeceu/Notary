const express = require("express");
const {
  login,
  register,
  logout,
  verify,
} = require("../Controller/AuthController");

const router = express.Router();

router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);
router.get("/verify", verify);
module.exports = router;
