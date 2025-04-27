"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
const cors_1 = __importDefault(require("cors"));
const verify_1 = __importDefault(require("./routes/verify"));
const property_1 = __importDefault(require("./routes/property"));
const user_1 = __importDefault(require("./routes/user"));
const googleAuth_1 = __importDefault(require("./routes/googleAuth"));
const email_1 = __importDefault(require("./routes/email")); // Import the email route
const employee_1 = __importDefault(require("./routes/employee"));
const services_intrst_user_1 = __importDefault(require("./routes/services-intrst-user"));
const ownerIntrst_1 = __importDefault(require("./routes/ownerIntrst"));
dotenv_1.default.config();
// Validate required environment variables
const requiredEnvVars = ["ACCOUNT_SID", "AUTH_TOKEN", "VERIFY_SERVICE_SID"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}
const app = (0, express_1.default)();
(0, connectToDb_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/verify", verify_1.default);
app.use("/api/properties", property_1.default);
app.use("/api/users", user_1.default); // Add the user routes
// Import the Google Auth router
// Other imports and setup...
app.use("/api/auth/google", googleAuth_1.default); // Use the Google Auth router
app.use("/api/email", email_1.default);
app.use("/api/employees", employee_1.default);
app.use("/api", services_intrst_user_1.default);
app.use("/api", ownerIntrst_1.default);
// Basic route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});
// Enhanced error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Something went wrong!"
            : err.message,
    });
};
app.use(errorHandler);
// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Environment variables loaded:", {
      VERIFY_SERVICE_SID: process.env.VERIFY_SERVICE_SID ? "****" : undefined,
      ACCOUNT_SID: process.env.ACCOUNT_SID ? "****" : undefined,
      AUTH_TOKEN: process.env.AUTH_TOKEN ? "****" : undefined,
    });
  });
