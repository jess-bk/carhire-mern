require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { expressjwt: expressJwt } = require("express-jwt");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/cars", require("./routes/cars"));
// app.use("/api/cars/:id", require("./routes/cars"));
// app.use("/api/book-car", require("./routes/cars"));
// app.use("/api/cancel-booking", require("./routes/cars"));
// app.use("/api/book-car", require("./routes/cars"));
// app.use("/api/add-car", require("./routes/cars"));
// app.use("/api/delete-car", require("./routes/cars"));

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: function fromCookie(req) {
      return req.cookies.token; // Return the JWT stored in the "token" cookie
    },
  })
);

app.use("/api/logout", require("./routes/logout"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
