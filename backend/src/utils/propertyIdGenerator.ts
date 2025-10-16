import { customAlphabet } from 'nanoid';

// Create a custom nanoid generator with a specific alphabet
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

export const generatePropertyId = async (): Promise<string> => {
  // Generate a unique property ID with prefix RLA (Residential Lease Apartment)
  const uniqueId = nanoid();
  return `RLA-${uniqueId}`;
}; 