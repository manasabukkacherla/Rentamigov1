import express from 'express';
import TokenPackage from '../models/Tokensform'; // Ensure this file has the updated schema

const TokenRouter = express.Router();

// ✅ GET all token price entries
TokenRouter.get('/', async (req, res) => {
  try {
    const packages = await TokenPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// ✅ GET a single token price by ID
TokenRouter.get('/:id', async (req, res) => {
  try {
    const tokenPackage = await TokenPackage.findById(req.params.id);
    if (!tokenPackage) return res.status(404).json({ message: 'Token price not found' });
    res.json(tokenPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// ✅ CREATE a new token price
TokenRouter.post('/', async (req, res) => {
  try {
    const { pricePerToken } = req.body;
    if (typeof pricePerToken !== 'number' || pricePerToken <= 0) {
      return res.status(400).json({ message: 'Invalid pricePerToken value' });
    }

    const newPackage = new TokenPackage({ pricePerToken });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating token price', error });
  }
});

// ✅ UPDATE token price by ID
TokenRouter.put('/:id', async (req, res) => {
  try {
    const { pricePerToken } = req.body;
    if (typeof pricePerToken !== 'number' || pricePerToken <= 0) {
      return res.status(400).json({ message: 'Invalid pricePerToken value' });
    }

    const updatedPackage = await TokenPackage.findByIdAndUpdate(
      req.params.id,
      { pricePerToken },
      { new: true }
    );

    if (!updatedPackage) return res.status(404).json({ message: 'Token price not found' });

    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating token price', error });
  }
});

// ✅ DELETE token price by ID
TokenRouter.delete('/:id', async (req, res) => {
  try {
    const deletedPackage = await TokenPackage.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: 'Token price not found' });

    res.json({ message: 'Token price deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting token price', error });
  }
});

export default TokenRouter;
