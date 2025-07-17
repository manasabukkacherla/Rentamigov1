"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_1 = __importDefault(require("../models/signup"));
const employee_1 = __importDefault(require("../models/employee"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallback_secret");
            console.log("printing decoded", decoded);
            // Check if token is for employee or user based on token type
            if (decoded.isEmployee) {
                // Get employee from token
                const employee = await employee_1.default.findById(decoded.id).select("-password");
                if (employee) {
                    req.user = employee;
                    req.isEmployee = true;
                    console.log("Employee authenticated:", employee._id);
                    return next();
                }
            }
            else {
                // Get user from token
                const user = await signup_1.default.findById(decoded.id).select("-password");
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
        }
        catch (error) {
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
exports.protect = protect;
