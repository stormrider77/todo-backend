import { Request, Response } from "express";
import * as authService from "../services/auth.service";


export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name, username } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }
    
    const result = await authService.signUp({ email, password, name, username });

    res.status(201).json({
      message: "User created successfully",
      ok: true,
      ...result,
    });
  } catch (error: any) {
    if (error.message === "User with this email already exists") {
      return res.status(409).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const result = await authService.signIn({ email, password });

    res.status(200).json({
      message: "Sign in successful",
      ok: true, 
      ...result,
    });
  } catch (error: any) {
    if (
      error.message === "Invalid email or password" ||
      error.message === "Invalid or expired token"
    ) {
      return res.status(401).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    res.status(200).json({
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

