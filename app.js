const express = require("express");
const morgan = require("morgan");
const connectDB = require("./DB/connectDB");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./middleware/auth");
const login=require("./routes/login")
const contactroutes=require("./routes/contact")
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// app.post("/", (req, res) => {
//   res.json("hello");
// });

//routes
// app.get("/protected", auth, (req, res) => {
//   return res.status(200).json({ ...req.user._doc });
// });
app.use("/", login);
app.use("/", contactroutes)

let PORT = process.env.PORT || 6500;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is up on port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
