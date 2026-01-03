const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("./models/Patent");
const patentRoutes = require("./routes/patentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userPatentRoutes = require("./routes/userPatentRoutes");
const { google } = require("googleapis");



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

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No authorization code received");
  }

  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oAuth2Client.getToken(code);

    // 🔴 IMPORTANT: log refresh token ONCE
    console.log("REFRESH TOKEN:", tokens.refresh_token);

    res.send(
      "Authorization successful. You can close this window and copy the refresh token from server logs."
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth callback failed");
  }
});
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


