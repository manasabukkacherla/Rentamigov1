"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/googleAuth.ts
const express_1 = __importDefault(require("express"));
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuthRouter = express_1.default.Router();
// Check if GOOGLE_CLIENT_ID exists
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID must be defined in environment variables');
}
// Check if JWT_SECRET exists
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in environment variables');
}
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
googleAuthRouter.post('/', async (req, res, next) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({
                success: false,
                error: 'Credential is required'
            });
        }
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({
                success: false,
                error: 'Invalid token'
            });
        }
        // Verify email is present and verified
        if (!payload.email || !payload.email_verified) {
            return res.status(400).json({
                success: false,
                error: 'Email not verified'
            });
        }
        const userData = {
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            sub: payload.sub,
            email_verified: payload.email_verified
        };
        const token = jsonwebtoken_1.default.sign({
            userId: payload.sub,
            email: payload.email
        }, process.env.JWT_SECRET, {
            expiresIn: '24h',
            algorithm: 'HS256'
        });
        res.json({
            success: true,
            user: userData,
            token
        });
    }
    catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({
            success: false,
            error: 'Authentication failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = googleAuthRouter;
