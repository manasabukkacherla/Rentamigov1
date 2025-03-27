// routes/tokenRoutes.ts
import express from 'express';
import TokenPackage from '../models/Tokensform';

const TokenRouter = express.Router();

// Get all token packages
TokenRouter.get('/', async (req, res) => {
  try {
    const packages = await TokenPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Get a single token package by ID
TokenRouter.get('/:id', async (req, res) => {
  try {
    const tokenPackage = await TokenPackage.findById(req.params.id);
    if (!tokenPackage) return res.status(404).json({ message: 'Token package not found' });
    res.json(tokenPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Create a new token package
TokenRouter.post('/', async (req, res) => {
  try {
    const newPackage = new TokenPackage(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating package', error });
  }
});

// Update an existing token package
TokenRouter.put('/:id', async (req, res) => {
  try {
    const updatedPackage = await TokenPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPackage) return res.status(404).json({ message: 'Token package not found' });
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating package', error });
  }
});

// Delete a token package
TokenRouter.delete('/:id', async (req, res) => {
  try {
    const deletedPackage = await TokenPackage.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: 'Token package not found' });
    res.json({ message: 'Token package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error });
  }
});

export default TokenRouter;