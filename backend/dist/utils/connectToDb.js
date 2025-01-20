"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/property-db';
// console.log('MONGODB_URI:', MONGODB_URI);
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB.');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
// Handle connection events
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});
// Handle application termination
process.on('SIGINT', async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    }
    catch (err) {
        console.error('Error during MongoDB connection closure:', err);
        process.exit(1);
    }
});
exports.default = exports.connectToDatabase;
