const express = require("express");
const cors = require("cors");
const signup = require("./routes/signup");
const UserCreatePost = require("./routes/createpost");
const Isloggedin = require("./routes/login");
const connectDB = require("./db");
const profilepost = require("./routes/profilepost");
const admin = require("./routes/adminlogin");
// const UserDetails = require("./models/userAllDetails");
const trending = require("./routes/trending");
const adminPosts = require("./routes/adminpost");
const adminDashboard = require("./routes/admindashboard");
const adminchannel = require("./routes/adminchannel");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.json());

connectDB();

app.use(signup);
app.use(UserCreatePost);
app.use(Isloggedin);
app.use(require("./routes/getpost"));
app.use(profilepost);
app.use(trending);

//admin
app.use(admin);
app.use(adminPosts);
// app.use(UserDetails);
app.use(adminDashboard);
app.use(adminchannel);


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
