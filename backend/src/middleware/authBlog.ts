import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

const authBlog: RequestHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ success: false, message: 'Please Login Again' });
      return;
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!token_decode || !token_decode.id) {
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }

    req.user = { _id: token_decode.id };

    next(); 
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authBlog;
