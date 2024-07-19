const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const volumeRoutes = require("./routes/volumeRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/volume", volumeRoutes);
app.use("/api/bookmark", bookmarkRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
