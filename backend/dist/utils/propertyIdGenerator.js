"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePropertyId = void 0;
const nanoid_1 = require("nanoid");
// Create a custom nanoid generator with a specific alphabet
const nanoid = (0, nanoid_1.customAlphabet)('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
const generatePropertyId = async () => {
    // Generate a unique property ID with prefix RLA (Residential Lease Apartment)
    const uniqueId = nanoid();
    return `RLA-${uniqueId}`;
};
exports.generatePropertyId = generatePropertyId;
