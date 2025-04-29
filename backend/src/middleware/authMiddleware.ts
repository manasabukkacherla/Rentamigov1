import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/signup";
import Employee from "../models/employee";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      isEmployee?: boolean;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret"
      ) as any;
      console.log("printing decoded", decoded);
      // Check if token is for employee or user based on token type
      if (decoded.isEmployee) {
        // Get employee from token
        const employee = await Employee.findById(decoded.id).select(
          "-password"
        );
        if (employee) {
          req.user = employee;
          req.isEmployee = true;
          console.log("Employee authenticated:", employee._id);
          return next();
        }
      } else {
        // Get user from token
        const user = await User.findById(decoded.id).select("-password");
        if (user) {
          req.user = user;
          req.isEmployee = false;
          console.log("User authenticated:", user._id);
          return next();
        }
      }

      // If we get here, neither employee nor user was found
      return res.status(401).json({
        success: false,
        message: "Authentication failed - User not found",
      });
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};
