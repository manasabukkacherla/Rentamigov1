import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string) {
  try {
    // 🔹 Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure it matches your client ID
    });

    // 🔹 Extract user information
    const payload = ticket.getPayload();
    if (!payload) throw new Error("Google token verification failed");

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture, // Optional
    };
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}
