const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require("express-session");
const upload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../frontend/dist");
app.use(express.static(buildpath));

const users = require("./routes/Users");
const enquiries = require("./routes/Enquiry");
const property = require("./routes/Property");
const connectDB = require("./config/db");
connectDB();

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload({ createParentPath: true }));
app.use(cors());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 300000 },
  })
);

//? API's
app.use("/users", users);
app.use("/enquiry", enquiries);
app.use("/property", property);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
