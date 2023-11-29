const mongoose = require("mongoose");
mongoose.pluralize(null);
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/crud"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

