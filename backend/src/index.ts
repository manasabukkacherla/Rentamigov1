import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Application,
} from "express";
import http from "http"; // For creating an HTTP server
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/connectToDb";
import cors from "cors";
import verifyRouter from "./routes/verify";

import googleAuthRouter from "./routes/googleAuth";
import emailRouter from "./routes/email";
import employeeRouter from "./routes/employee";
import serviceEnquiryRoutes from "./routes/services-intrst-user";
import ownerIntrstrouter from "./routes/ownerIntrst";

import subscriptionRouter from "./routes/subscriberform";
import ownerInterestRouter from "./routes/ownerInterest";

import enquiryRoutes from "./routes/enquiryRoutes";
import signupRouter from "./routes/signupform"; // Replace with the correct file path for User
import loginRouter from "./routes/authRoutes";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes";
//import leadsRouter from "./routes/leads";
import Reportrouter from "./routes/Reportleads";
import Propertyrouter from "./routes/PropertySelection";
import BasicDetails from "./models/Basicdetails";
import BasicDetailsrouter from "./routes/Basicdetails";
import PropertyDetailsrouter from "./routes/Propertydetails";
import Employeerouter from "./routes/employee";

import Subscriptionrouter from "./routes/Subscriptionmodel";
import TokenRouter from "./routes/Tokenform";

import blogRouter from "./routes/blogs/blogRoutes";
import commentsRouter from "./routes/blogs/commentsRouter";
import reviewRouter from "./routes/blogs/reviewRoutes";
import likesRouter from "./routes/blogs/likesRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import BlogStats from "./routes/blogs/BlogStatisticsRoutes";
import userRouter from "./routes/userRouter";
import path from "path";
import bugRouter from "./routes/BugRouter";
import { Server as SocketIOServer, Socket, Server } from "socket.io";
import Notification from "./models/Notification";
import { Document } from "mongoose";
import socketHandler from "./socketHandler";
import commercialShopRoutes from "./routes/commercial/commercialShopRoutes";
import commercialShowroomRoutes from "./routes/commercial/commercialShowroomRoutes";
import commercialShedRoutes from "./routes/commercial/commercialShedRoutes";
import commercialWarehouseRoutes from "./routes/commercial/commercialWarehouseRoutes";
import commercialPlotRoutes from "./routes/commercial/commericalPlotRoutes";
import commercialrentcultureRoutes from "./routes/commercial/commercialRentAgricultureRoutes";
import commercialRentOthersRoutes from "./routes/commercial/commercialRentOthersRoutes";
import commercialRentWarehouseRoutes from "./routes/commercial/commercialRentWarehouseRoutes";
import commercialRentOfficeSpaceRoutes from "./routes/commercial/CommercialRentOfficeSpace";
import commercialRentShop from "./routes/commercial/commercialRentShop";
import commercialRentRetailStore from "./routes/commercial/commercialRentRetailStore";
import commercialSellAgricultureRoutes from './routes/commercial/commercialSellAgricultureRoutes';
import commercialSellOthersRoutes from "./routes/commercial/commercialSellOthersRoutes";
import commercialRentCoveredSpaceRoutes from "./routes/commercial/commercialRentCoveredSpaceRoutes";
import commercialSellCoveredSpaceRoutes from "./routes/commercial/commercialSellCoveredSpaceRoutes";
import commercialSellOfficeSpaceRoutes from './routes/commercial/CommercialSellOfficeSpace';
import commercialSellRetailStore from "./routes/commercial/commercialSellRetailStore";
import commercialSellShedRoutes from './routes/commercial/commercialSellShedRoutes';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["ACCOUNT_SID", "AUTH_TOKEN", "VERIFY_SERVICE_SID"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

const app: Application = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Increase timeout
server.timeout = 120000; // 2 minutes

// Initialize Socket.IO with correct CORS settings
export const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectToDatabase()
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Terminate the process if the database connection fails
  });
// Middleware
// Serve static files from "build"
app.use(express.static(path.join(__dirname, "build")));
// cors
app.use(cors());

// Configure express with proper types
app.use(express.json({
  limit: '50mb',
  verify: (req: express.Request, res: express.Response, buf: Buffer, encoding: BufferEncoding) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({
        success: false,
        error: 'Invalid JSON'
      });
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));

// Add timeout middleware with proper types
const timeout = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setTimeout(120000, () => {
    res.status(408).json({
      success: false,
      error: 'Request timeout'
    });
  });
  next();
};

app.use(timeout);

// Initialize all Socket.IO event handlers
socketHandler(io);
// Routes
app.use("/api/verify", verifyRouter);
app.use("/api/Report", Reportrouter); // Report routers
app.use("/api/auth/google", googleAuthRouter); // Google Auth routes
app.use("/api/email", emailRouter); // Email routes
app.use("/api/employees", Employeerouter); // Employee routes
app.use("/api", serviceEnquiryRoutes); // Service interest routes
app.use("/api", ownerIntrstrouter); // Owner interest routes

app.use("/api/forms", subscriptionRouter);
app.use("/api/owner-interest", ownerInterestRouter);

//Property listing apis
//app.use("/api/property-selection", Propertyrouter);
// app.use("/api/basicdetails", BasicDetailsrouter);
app.use("/api/properties", PropertyDetailsrouter);

//Subscription pllan routes
app.use("/api/subscription", Subscriptionrouter);
//Token plan routes
app.use("/api/tokens", TokenRouter);

app.use("/api/service", enquiryRoutes);
app.use("/api/sign", signupRouter);
app.use("/api/loginuser", loginRouter);
app.use("/api", forgotPasswordRoutes);
//app.use("/api/leads", leadsRouter);

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/stats", BlogStats);
app.use("/api/payment", paymentRoutes);
app.use("/api/bug", bugRouter);

app.use("/api/commercial/sell/shops", commercialShopRoutes);
app.use("/api/commercial/sell/showrooms", commercialShowroomRoutes);
app.use('/api/commercial/sell/warehouses', commercialWarehouseRoutes);
app.use('/api/commercial/sell/plots', commercialPlotRoutes);
app.use('/api/commercial/sell/agriculture', commercialSellAgricultureRoutes);
app.use('/api/commercial/sell/others', commercialSellOthersRoutes); 
app.use('/api/commercial/sell/office-space', commercialSellOfficeSpaceRoutes);
app.use('/api/commercial/sell/retail-store', commercialSellRetailStore);
app.use('/api/commercial/sell/sheds', commercialSellShedRoutes);
app.use('/api/commercial/sell/covered-space', commercialSellCoveredSpaceRoutes);
//openspace


app.use('/api/commercial/agriculture', commercialrentcultureRoutes);
app.use('/api/commercial/others', commercialRentOthersRoutes);
app.use('/api/commercial/office-spaces', commercialRentOfficeSpaceRoutes);
app.use('/api/commercial-rent-warehouses', commercialRentWarehouseRoutes);
app.use('/api/commercial-rent-covered-space', commercialRentCoveredSpaceRoutes);
app.use('/api/commercial-rent-shops', commercialRentShop);
app.use('/api/commercial-rent-retail-stores', commercialRentRetailStore);

app.get("/testing", (req: Request, res: Response) => {
  io.emit("newNotification", "Test notification");
  res.json({ message: "Test message" });
});
// // Basic route
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Welcome to the API" });
// });
// Handle React Router (if using React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
console.log("cd pipeline check - 3rd time....");
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
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Environment variables loaded:", {
    VERIFY_SERVICE_SID: process.env.VERIFY_SERVICE_SID ? "" : undefined,
    ACCOUNT_SID: process.env.ACCOUNT_SID ? "" : undefined,
    AUTH_TOKEN: process.env.AUTH_TOKEN ? "" : undefined,
  });
}).on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port or terminate the process using this port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});