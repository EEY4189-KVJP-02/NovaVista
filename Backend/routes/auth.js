import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "novavista_secret";
const TOKEN_EXPIRES_IN = "7d";

const makeUsername = (email) => (typeof email === "string" ? email.split("@")[0] : "");

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: makeUsername(user.email),
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= SIGNUP ================= */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        username: makeUsername(user.email),
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CURRENT USER ================= */
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = auth.slice("Bearer ".length);
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        id: user.id,
        username: makeUsername(user.email),
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
