// src/routes/googleAuth.ts
import express, { Request, Response, NextFunction } from 'express';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const googleAuthRouter = express.Router();

// Check if GOOGLE_CLIENT_ID exists
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID must be defined in environment variables');
}

// Check if JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GoogleAuthRequest extends Request {
  body: {
    credential: string;
  }
}

interface UserData {
  email: string | undefined;
  name: string | undefined;
  picture: string | undefined;
  sub: string | undefined;
  email_verified: boolean | undefined;
}

googleAuthRouter.post('/', async (req: GoogleAuthRequest, res: Response, next: NextFunction) => {
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

    const userData: UserData = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub,
      email_verified: payload.email_verified
    };

    const token = jwt.sign(
      { 
        userId: payload.sub, 
        email: payload.email 
      },
      process.env.JWT_SECRET!,
      { 
        expiresIn: '24h',
        algorithm: 'HS256'
      }
    );

    res.json({
      success: true,
      user: userData,
      token
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      error: 'Authentication failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default googleAuthRouter;