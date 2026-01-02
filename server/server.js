const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("./models/Patent");
const patentRoutes = require("./routes/patentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userPatentRoutes = require("./routes/userPatentRoutes");




const app = express();

// connect database
connectDB();

// middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/patents", patentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userPatentRoutes);




// test route
app.get("/", (req, res) => {
  res.send("Patent Filing Portal Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


