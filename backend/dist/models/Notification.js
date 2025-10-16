"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create a schema based on the INotification interface.
// The generic <INotification> ensures our schema aligns with our TypeScript interface.
const NotificationSchema = new mongoose_1.Schema({
    resourceId: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
// Export the model so it can be used elsewhere in our backend.
// Check if the model exists, otherwise create a new one
const Notification = mongoose_1.models.Notification ||
    (0, mongoose_1.model)("Notification", NotificationSchema);
exports.default = Notification;
