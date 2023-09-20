const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB!");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");
  }
};

module.exports = connectDB;