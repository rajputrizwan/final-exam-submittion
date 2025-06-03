import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRoutes from "./routes/book.route.js";

dotenv.config();

const app = express();

app.use(express.json());
console.log("Mongo URL:", process.env.MONGO_URL);

app.use("/api/books", bookRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log("Server is Listening on Port 5000");
  });
};

startServer();
