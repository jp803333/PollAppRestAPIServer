require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const authRoutes = require("./api/v1/Routes/Auth");
const pollRoutes = require("./api/v1/Routes/Poll");
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/poll", pollRoutes);

mongoose
  .connect(process.env.MONGODBLOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    db = mongoose.connection;
    return server.listen(PORT);
  })
  .then(() => {
    console.log(`server running on http://localhost:${PORT}`);
  });

// server.listen(PORT, () => {
//   console.log(`Server running on at http://localhost:${PORT}`);
// });
