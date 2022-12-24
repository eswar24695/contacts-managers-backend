const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDB = async () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
