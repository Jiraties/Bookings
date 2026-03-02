import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, secretCode, admin, name } = req.body;

    if (secretCode !== process.env.SECRET_CODE)
      throw new Error(
        "To create a new account please provide the correct secret code",
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      admin,
      name,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "กรุณากรอกอีเมลและรหัสผ่านให้ครบ" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");

    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET not found serverside");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged In Successfully.",
      user: {
        email: user.email,
        name: user.name,
        admin: user.admin,
      },
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
