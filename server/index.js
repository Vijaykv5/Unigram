const express = require("express");
const cors = require("cors");
const signup = require("./routes/signup");
const UserCreatePost = require("./routes/createpost");
const connectDB = require("./db");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.json());

connectDB();



app.use(signup);
app.use(UserCreatePost);
app.use(require("./routes/getpost"));

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
