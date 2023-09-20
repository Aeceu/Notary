const bcrypt = require("bcrypt");
const Users = require("../Models/UserModel");
const createToken = require("../utils/createToken");
const verifyToken = require("../utils/verifyToken");

// TODO: login an account
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .json({
          success: false,
          error: "User doesn't exists!",
        })
        .status(500);
    }

    //? Check if the password match
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .json({
          success: false,
          error: "Password doesn't match!",
        })
        .status(500);
    }

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User Authenticated!",
      token,
      id: user._id.toString(),
    });
  } catch (error) {
    return res
      .json({
        success: false,
        error: "Failed to login!",
      })
      .status(500);
  }
};

// TODO: register an account
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res
        .json({
          success: false,
          error: "User already exists!",
        })
        .status(500);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .json({
        success: true,
        message: "New user created!",
        newUser,
      })
      .status(200);
  } catch (error) {
    res
      .json({
        success: false,
        error: "Failed to register!",
      })
      .status(500);
  }
};

// TODO: logout by clearing the cookie
const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("cookie remove").status(200);
};

// TODO: verify the token
const verify = async (req, res) => {
  try {
    const token = verifyToken(req);
    res.status(200).json({
      success: true,
      message: "token verified!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "token not verified!",
      token,
    });
  }
};
module.exports = { login, register, logout, verify };
