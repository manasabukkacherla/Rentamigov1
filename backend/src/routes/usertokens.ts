import express from 'express';
import UserToken from '../models/usertoken';

const Usertokenrouter = express.Router();

// ✅ POST: Add tokens after payment
Usertokenrouter.post('/add', async (req, res) => {
  const { userId, tokensToAdd } = req.body;

  if (!userId || !tokensToAdd) {
    return res.status(400).json({ message: 'userId and tokensToAdd are required' });
  }

  try {
    const tokenData = await UserToken.findOneAndUpdate(
      { userId },
      { $inc: { tokens: tokensToAdd } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Tokens added successfully', tokens: tokenData.tokens });
  } catch (error) {
    console.error('Error adding tokens:', error);
    res.status(500).json({ message: 'Failed to add tokens' });
  }
});

// ✅ POST: Deduct tokens and save lead as viewed
Usertokenrouter.post('/deduct', async (req, res) => {
  const { userId, amount, leadId } = req.body;

  if (!userId || !amount || !leadId) {
    return res.status(400).json({ message: 'userId, amount and leadId are required' });
  }

  try {
    const userToken = await UserToken.findOne({ userId });

    if (!userToken) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent repeated deduction
    if (userToken.viewedLeads.includes(leadId)) {
      return res.status(200).json({
        message: 'Lead already viewed',
        tokens: userToken.tokens,
        viewedLeads: userToken.viewedLeads,
      });
    }

    // Check balance
    if (userToken.tokens < amount) {
      return res.status(400).json({ message: 'Insufficient tokens' });
    }

    // Deduct tokens & add to viewed
    userToken.tokens -= amount;
    userToken.viewedLeads.push(leadId);
    await userToken.save();

    return res.status(200).json({
      message: 'Tokens deducted and lead marked as viewed',
      remaining: userToken.tokens,
      viewedLeads: userToken.viewedLeads,
    });
  } catch (error) {
    console.error('Token deduction error:', error);
    res.status(500).json({ message: 'Token deduction failed' });
  }
});

// ✅ GET: Fetch current user token and viewed leads
Usertokenrouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tokenData = await UserToken.findOne({ userId });

    return res.status(200).json({
      tokens: tokenData?.tokens || 0,
      viewedLeads: tokenData?.viewedLeads || [],
    });
  } catch (error) {
    console.error('Token fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch token balance' });
  }
});

export default Usertokenrouter;
