const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Pan_Data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection Successful to mongodb");
  })
  .catch((err) => {
    console.log(err, "not connected");
  });
