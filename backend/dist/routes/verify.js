"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twilio_1 = __importDefault(require("twilio"));
const RestException_1 = __importDefault(require("twilio/lib/base/RestException"));
const router = (0, express_1.Router)();
router.post('/start', async (req, res) => {
    const client = (0, twilio_1.default)(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
    const { to, channel = 'sms', locale = 'en' } = req.body;
    try {
        if (!to || to.trim() === '') {
            throw new Error("Missing 'to' parameter; please provide a phone number or email.");
        }
        const verification = await client.verify
            .services(process.env.VERIFY_SERVICE_SID)
            .verifications.create({
            to,
            channel,
            locale,
        });
        console.log(`Sent verification: '${verification.sid}'`);
        res.status(200).json({ success: true });
    }
    catch (error) {
        if (error instanceof RestException_1.default) {
            const statusCode = error.status || 400;
            res.status(statusCode).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(400).json({
                success: false,
                error: 'An unknown error occurred.',
            });
        }
    }
});
router.post('/check', async (req, res) => {
    const { to, code } = req.body;
    try {
        if (!to || !code) {
            throw new Error('Missing parameter.');
        }
        const client = (0, twilio_1.default)(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
        const check = await client.verify
            .services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks.create({ to, code });
        if (check.status === 'approved') {
            return res.status(200).json({
                success: true,
                message: 'Verification success.',
            });
        }
        throw new Error('Incorrect token.');
    }
    catch (error) {
        if (error instanceof RestException_1.default) {
            console.error(error.message);
            res.status(error.status || 400).json({
                success: false,
                message: error.message,
            });
        }
        else if (error instanceof Error) {
            console.error(error.message);
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        else {
            console.error('Unknown error');
            res.status(400).json({
                success: false,
                message: 'An unknown error occurred.',
            });
        }
    }
});
exports.default = router;
