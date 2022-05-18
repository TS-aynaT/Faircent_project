const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const route = require("../Backend/Route/route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

app.use("/", route);

app.listen(3005, console.log("Server is running at 3005"));
