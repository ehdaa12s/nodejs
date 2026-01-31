import express from "express";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(express.json());
connectDB();

app.use("/posts", postRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
