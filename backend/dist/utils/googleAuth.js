"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = verifyGoogleToken;
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function verifyGoogleToken(token) {
    try {
        // 🔹 Verify the token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Ensure it matches your client ID
        });
        // 🔹 Extract user information
        const payload = ticket.getPayload();
        if (!payload)
            throw new Error("Google token verification failed");
        return {
            email: payload.email,
            name: payload.name,
            picture: payload.picture, // Optional
        };
    }
    catch (error) {
        console.error("Error verifying Google token:", error);
        return null;
    }
}
