const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/basic_mean_app?retryWrites=true&w=majority",
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("successfully created connection with database");
    } else {
      console.log("error in connection:" + err);
    }
  }
);
