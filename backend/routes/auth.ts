import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// REGISTER
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password, retypePassword } = req.body;

  if (!name) return res.status(400).json({ msg: "Name is required" });
  if (!email || !password || !retypePassword)
    return res.status(400).json({ msg: "All fields are required" });

  if (password !== retypePassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // IMPORTANT: SAVE THE NAME HERE
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
});


// LOGIN
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
});

export default router;
