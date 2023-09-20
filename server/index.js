const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const UserRouter = require("./Routes/UserRouter");
const NoteRoute = require("./Routes/NoteRoute");
const bodyParser = require("body-parser");

//* Configuration
dotenv.config();
const app = express();

//! Middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This allows cookies to be sent along with the request
  })
);
app.use(bodyParser.json({ limit: "25mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "25mb",
    extended: true,
  })
);

//* Database
connectDB();

//* Routes
app.use("/", UserRouter);
app.use("/notes", NoteRoute);

//* Listen to PORT
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
