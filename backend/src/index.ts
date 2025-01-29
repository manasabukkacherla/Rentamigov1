import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import connectToDatabase from "./utils/connectToDb";
import cors from "cors";
import verifyRouter from "./routes/verify";
import userRouter from "./routes/user";
import googleAuthRouter from "./routes/googleAuth";
import emailRouter from "./routes/email";
import employeeRouter from "./routes/employee";
import serviceEnquiryRoutes from "./routes/services-intrst-user";
import ownerIntrstrouter from "./routes/ownerIntrst";
import propertyRouter from "./routes/Propertydetails";
import subscriptionRouter from "./routes/subscriberform";
import ownerInterestRouter from "./routes/ownerInterest";
import photosRouter from "./routes/Propertyphoto";
import propertyEnquiryRoutes from "./routes/propertyEnquiryRoutes";
import enquiryRoutes from "./routes/enquiryRoutes";
import signupRouter from "./routes/signupform";// Replace with the correct file path for User
import loginrouter from "./routes/login";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["ACCOUNT_SID", "AUTH_TOKEN", "VERIFY_SERVICE_SID"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

const app: Express = express();
connectToDatabase()
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Terminate the process if the database connection fails
  });
// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Set JSON payload size limit
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Set URL-encoded payload size limit


// Routes
app.use("/api/verify", verifyRouter);

app.use("/api/auth/google", googleAuthRouter); // Google Auth routes
app.use("/api/email", emailRouter); // Email routes
app.use("/api/employees", employeeRouter); // Employee routes
app.use("/api", serviceEnquiryRoutes); // Service interest routes
app.use("/api", ownerIntrstrouter); // Owner interest routes
app.use("/api/properties", propertyRouter); // Property routes
app.use("/api/forms",subscriptionRouter);
app.use("/api/owner-interest", ownerInterestRouter)
app.use("/api/Photos",photosRouter);
app.use("/api/property",propertyEnquiryRoutes)
app.use("/api/service", enquiryRoutes);
app.use("/api/sign",signupRouter);
app.use("/api/auth",loginrouter);
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" });
});

// Enhanced error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
};

app.use(errorHandler);

// Start server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Environment variables loaded:", {
    VERIFY_SERVICE_SID: process.env.VERIFY_SERVICE_SID ? "****" : undefined,
    ACCOUNT_SID: process.env.ACCOUNT_SID ? "****" : undefined,
    AUTH_TOKEN: process.env.AUTH_TOKEN ? "****" : undefined,
  });
});
