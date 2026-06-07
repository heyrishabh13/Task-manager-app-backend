const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://heyrishabh13:VGbWKfvtsvkPyL5Y@cluster0.rjwuyra.mongodb.net/",
  )
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
