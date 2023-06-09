const dotenv = require("dotenv").config();
let { PORT } = process.env;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const routes = require("./routes/routes");
const connectDb = require("./utils/connectDb");
const cors = require("cors");
const app = express();

//? middlewares
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:4000",
//     credentials: true,
//   })
// );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//? start server
connectDb(() => {
  app.listen(4000 || PORT, () => {
    console.log(`Listening to request on port  ${PORT}`);
  });
});
