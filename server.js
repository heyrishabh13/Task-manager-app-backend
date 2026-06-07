const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
