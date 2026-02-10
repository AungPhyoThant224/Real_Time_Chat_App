import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET || "kbz_chat_secret_2026";

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" },
  );

  res.json({ token, role: user.role, email: user.email });
};
