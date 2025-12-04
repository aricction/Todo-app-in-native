import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth/api", authRoutes);
app.use("/todo", todoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome!");
});

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI not defined in .env");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
