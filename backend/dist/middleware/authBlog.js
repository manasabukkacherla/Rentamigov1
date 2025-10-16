"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authBlog = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ success: false, message: 'Please Login Again' });
            return;
        }
        const token_decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!token_decode || !token_decode.id) {
            res.status(401).json({ success: false, message: 'Invalid token' });
            return;
        }
        req.user = { _id: token_decode.id };
        next();
    }
    catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
exports.default = authBlog;
