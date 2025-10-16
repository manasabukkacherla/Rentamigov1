"use strict";
// server/src/models/Message.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the message schema.
// Here we define what data each message should store.
const MessageSchema = new mongoose_1.Schema({
    // 'senderId' is a reference to a User document.
    senderId: {
        type: mongoose_1.default.Schema.Types.Mixed, // 👈 allows ObjectId or "bot"
        required: true,
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.Mixed, // 👈 allows ObjectId or "bot"
        required: true,
    },
    // 'roomId' is a string that identifies the conversation room.
    roomId: { type: String, required: true },
    // 'text' is the actual message content.
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
}, {
    // Enable timestamps for messages too.
    timestamps: true,
});
// Export the Message model for use in other parts of the app.
exports.default = mongoose_1.default.model("Message", MessageSchema);
