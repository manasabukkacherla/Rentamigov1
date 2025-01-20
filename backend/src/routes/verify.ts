import express, { Request, Response, Router } from 'express';
import twilio, { Twilio } from 'twilio';
import  RestException  from 'twilio/lib/base/RestException';

const router = Router();

  
interface VerifyStartRequest {
  to: string;
  channel?: 'sms' | 'call' | 'email';
  locale?: string;
}

interface VerifyCheckRequest {
  to: string;
  code: string;
}

router.post('/start', async (req: Request, res: Response) => {
    const client: Twilio = twilio(
        process.env.ACCOUNT_SID!,
        process.env.AUTH_TOKEN!
      );
  const { to, channel = 'sms', locale = 'en' } = req.body as VerifyStartRequest;

  try {
    if (!to || to.trim() === '') {
      throw new Error("Missing 'to' parameter; please provide a phone number or email.");
    }
    
    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({
        to,
        channel,
        locale,
      });

    console.log(`Sent verification: '${verification.sid}'`);
    res.status(200).json({ success: true });
  } catch (error: any) {
    if (error instanceof RestException) {
      const statusCode = error.status || 400;
      res.status(statusCode).json({
        success: false,
        error: error.message,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'An unknown error occurred.',
      });
    }
  }
});

router.post('/check', async (req: Request, res: Response) => {
  const { to, code } = req.body as VerifyCheckRequest;

  try {
    if (!to || !code) {
      throw new Error('Missing parameter.');
    }
    const client: Twilio = twilio(
        process.env.ACCOUNT_SID!,
        process.env.AUTH_TOKEN!
      );
    const check = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to, code });

    if (check.status === 'approved') {
      return res.status(200).json({
        success: true,
        message: 'Verification success.',
      });
    }

    throw new Error('Incorrect token.');
  } catch (error: any) {
    if (error instanceof RestException) {
      console.error(error.message);
      res.status(error.status || 400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      console.error('Unknown error');
      res.status(400).json({
        success: false,
        message: 'An unknown error occurred.',
      });
    }
  }
});

export default router;