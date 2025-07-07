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

import residentialPgmainRoutes from "./routes/residential/residentialPgmain"; // <-- PG main 
import commercialPlotRoutes from "./routes/commercial/commercialPlotRoutes";
import commercialrentcultureRoutes from "./routes/commercial/commercialRentAgricultureRoutes";
import commercialRentOthersRoutes from "./routes/commercial/commercialRentOthersRoutes";
import commercialRentWarehouseRoutes from "./routes/commercial/commercialRentWarehouseRoutes";
import commercialRentOfficeSpaceRoutes from "./routes/commercial/CommercialRentOfficeSpace";
import commercialRentShop from "./routes/commercial/commercialRentShop";
import commercialRentRetailStore from "./routes/commercial/commercialRentRetailStore";
import commercialSellAgricultureRoutes from "./routes/commercial/commercialSellAgricultureRoutes";
import commercialSellOthersRoutes from "./routes/commercial/commercialSellOthersRoutes";
import commercialRentCoveredSpaceRoutes from "./routes/commercial/commercialRentCoveredSpaceRoutes";
import commercialSellCoveredSpaceRoutes from "./routes/commercial/commercialSellCoveredSpaceRoutes";
import commercialSellOfficeSpaceRoutes from "./routes/commercial/CommercialSellOfficeSpace";
import commercialSellRetailStore from "./routes/commercial/commercialSellRetailStore";
import commercialRentShowroom from "./routes/commercial/commercialRentShowroom";
import commercialRentSheds from "./routes/commercial/commercialRentSheds";
import commercialRentPlot from "./routes/commercial/commercialRentPlot";
import commercialLeasePlotRoutes from "./routes/commercial/commercialLeasePlotRoutes";
import commercialLeaseAgricultureRoutes from "./routes/commercial/commercialLeaseAgricultureRoutes";
import commercialLeaseShopRoutes from "./routes/commercial/commercialLeaseShop";
import commercialLeaseOthersRoutes from "./routes/commercial/commercialLeaseOthersRoutes";
import commercialLeaseRetailRoutes from "./routes/commercial/commercialLeaseRetail";
import commercialLeaseShowroomRoutes from "./routes/commercial/commercialLeaseShowroom";
import commercialLeaseCoveredSpaceRoutes from "./routes/commercial/commercialLeaseCoveredSpaceRoutes";
import conversationRoutes from "./routes/conversationRoutes";
import messageRoutes from "./routes/messageRoutes";
import socketHandler from "./sockets";
import commercialLeaseWarehouseRoutes from "./routes/commercial/commercialLeaseWarehouseRoutes";
import CommercialLeaseOfficeSpace from "./routes/commercial/CommercialLeaseOfficeSpace";
import commercialLeaseShedRoutes from "./routes/commercial/commercialLeaseShedRoutes"


import residentialRentApartmentRoutes from "./routes/residential/rentApartment";
import residentialLeaseIndependentHouse from "./routes/residential/leaseIndependent";
import residentialSellApartmentRoutes from "./routes/residential/residentialSellApartmentRoutes";
import residentialSalePlotRoutes from "./routes/residential/residentialSalePlotRoutes";
import residentialRentBuilderFloorRoutes from "./routes/residential/rentBuilderFloor";
import residentialLeaseApartmentRoutes from "./routes/residential/leaseApartment";
import residentialLeaseBuilderFloorRoutes from "./routes/residential/leaseBuilderFloor";
import residentialSaleIndependentHouseRoutes from "./routes/residential/residentialSaleIndependentHouse";
import residentialSaleBuilderFloorRoutes from "./routes/residential/residentialSaleBuilderFloor";
import residentialRentIndependentHouseRoutes from "./routes/residential/rentIndependentHouse";
import commercialSellShopRoutes from "./routes/commercial/commercialSellShopRoutes";
import commercialSellShedRoutes from "./routes/commercial/commercialSellShedRoutes";
import commercialSellShowroomRoutes from "./routes/commercial/commercialSellShowroomRoutes";
import commercialSellWarehouseRoutes from "./routes/commercial/commercialSellWarehouseRoutes";
import propertyMediaRoutes from "./routes/propertyMediaRoutes";
import residentialMediaRoutes from './routes/residentialMediaRoutes';
import allPropertiesRoutes from "./routes/allPropertiesRoutes";
import enquiryRoutes from "./routes/enquiryRoutes";

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
server.timeout = 300000; // 5 minutes

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
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false
}));

// Configure express with proper types
app.use(
  express.json({
    limit: "100mb", // Increase limit
    verify: (
      req: express.Request,
      res: express.Response,
      buf: Buffer,
      encoding: BufferEncoding
    ) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        res.status(400).json({
          success: false,
          error: "Invalid JSON",
          message: "The request contains invalid JSON data."
        });
        throw new Error("Invalid JSON");
      }
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "100mb", // Increase limit
  })
);

// Add timeout middleware with proper types
const timeout = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.setTimeout(300000, () => { // 5 minutes
    res.status(408).json({
      success: false,
      error: "Request timeout",
      message: "The request took too long to process. Please try again."
    });
  });
  next();
};

app.use(timeout);

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize all Socket.IO event handlers
socketHandler(io);
// Routes
app.use("/api/verify", verifyRouter);
app.use("/api/Report", Reportrouter); // Report routers
app.use("/api/auth/google", googleAuthRouter); // Google Auth routes
app.use("/api/email", emailRouter); // Email routes
app.use("/api/employees", Employeerouter); // Employee routes
app.use("/api/enquiry", enquiryRoutes); // Enquiry routes
app.use("/api/service", serviceEnquiryRoutes); // Service interest routes
app.use("/api", ownerIntrstrouter); // Owner interest routes
app.use("/api/forms", subscriptionRouter);
app.use("/api/owner-interest", ownerInterestRouter);
// chat app routes
app.use("/api/messages", messageRoutes);
app.use("/api/conversation", conversationRoutes);

//Property listing apis
//app.use("/api/property-selection", Propertyrouter);
// app.use("/api/basicdetails", BasicDetailsrouter);
app.use("/api/properties", PropertyDetailsrouter);

//Subscription pllan routes
app.use("/api/subscription", Subscriptionrouter);
//Token plan routes
app.use("/api/tokens", TokenRouter);

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

app.use("/api/commercial/sell/shops", commercialSellShopRoutes);
app.use("/api/commercial/sell/showrooms", commercialSellShowroomRoutes);
app.use("/api/commercial/sell/warehouses", commercialSellWarehouseRoutes);
app.use("/api/commercial/sell/plots", commercialPlotRoutes);
app.use("/api/commercial/sell/agriculture", commercialSellAgricultureRoutes);
app.use("/api/commercial/sell/others", commercialSellOthersRoutes);
app.use("/api/commercial/sell/office-space", commercialSellOfficeSpaceRoutes);
app.use("/api/commercial/sell/retail-store", commercialSellRetailStore);
app.use("/api/commercial/sell/sheds", commercialSellShedRoutes);
app.use("/api/commercial/sell/covered-space", commercialSellCoveredSpaceRoutes);
//openspace

//lease routes
app.use("/api/commercial/lease/plots", commercialLeasePlotRoutes);
app.use("/api/commercial/lease/agriculture", commercialLeaseAgricultureRoutes);
app.use("/api/commercial/lease/shops", commercialLeaseShopRoutes);
app.use("/api/commercial/lease/others", commercialLeaseOthersRoutes);
app.use("/api/commercial/lease/covered-space", commercialLeaseCoveredSpaceRoutes);
app.use("/api/commercial/lease/retail-store", commercialLeaseRetailRoutes);
app.use("/api/commercial/lease/showrooms", commercialLeaseShowroomRoutes);
app.use("/api/commercial/lease/warehouses",commercialLeaseWarehouseRoutes);
app.use("/api/commercial/lease/office-space",CommercialLeaseOfficeSpace);
app.use("/api/commercial/lease/sheds",commercialLeaseShedRoutes);

//rent routes

app.use("/api/commercial/rent/agriculture", commercialrentcultureRoutes);
app.use("/api/commercial/rent/others", commercialRentOthersRoutes);
app.use("/api/commercial/rent/office-space", commercialRentOfficeSpaceRoutes);
app.use("/api/commercial/rent/warehouses", commercialRentWarehouseRoutes);
app.use("/api/commercial/rent/covered-space", commercialRentCoveredSpaceRoutes);
app.use("/api/commercial/rent/shops", commercialRentShop);
app.use("/api/commercial/rent/retail-store", commercialRentRetailStore);
app.use("/api/commercial/rent/showrooms", commercialRentShowroom);
app.use("/api/commercial/rent/sheds", commercialRentSheds);
app.use("/api/commercial/rent/plots", commercialRentPlot);

app.use("/api/allproperties", allPropertiesRoutes);

// PG Main (residential) API route with integrated media functionality
app.use('/api/residential/pgmain', residentialPgmainRoutes);

// Property media routes for all property types
app.use('/api/property-media', propertyMediaRoutes);

// Residential Media Routes
app.use('/api/residential/media', residentialMediaRoutes);

// Redirect old pg-media routes to the new integrated endpoints
app.use("/api/residential/pg-media", (req, res, next) => {
  // Rewrite the URL to use the new media endpoints in residentialPgmain
  if (req.path === '/upload') {
    req.url = '/media/upload';
  } else if (req.path.match(/^\/[\w-]+\/[\w-]+$/)) {
    // For paths like /:propertyId/:mediaId (DELETE)
    const parts = req.path.split('/');
    req.url = `/media${req.path}`;
  } else if (req.path.match(/^\/[\w-]+$/)) {
    // For paths like /:propertyId (GET)
    req.url = `/media${req.path}`;
  }
  
  // Forward to the residentialPgmain router
  residentialPgmainRoutes(req, res, next);
});

//sell routes
app.use("/api/residential/sale/apartment", residentialSellApartmentRoutes);
app.use("/api/residential/sale/plots", residentialSalePlotRoutes);
app.use("/api/residential/sale/independenthouse", residentialSaleIndependentHouseRoutes);
app.use("/api/residential/sale/builderfloor", residentialSaleBuilderFloorRoutes);

//rent
app.use('/api/residential/rent/apartment', residentialRentApartmentRoutes);
app.use('/api/residential/rent/builderfloor', residentialRentBuilderFloorRoutes);
app.use('/api/residential/rent/independenthouse', residentialRentIndependentHouseRoutes);

//lease
app.use('/api/residential/lease/independenthouse',residentialLeaseIndependentHouse);
app.use('/api/residential/lease/apartment',residentialLeaseApartmentRoutes);
app.use('/api/residential/lease/builderfloor',residentialLeaseBuilderFloorRoutes);

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
console.log("cd pipeline check - 5th time....");
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
server
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Environment variables loaded:", {
      VERIFY_SERVICE_SID: process.env.VERIFY_SERVICE_SID ? "" : undefined,
      ACCOUNT_SID: process.env.ACCOUNT_SID ? "" : undefined,
      AUTH_TOKEN: process.env.AUTH_TOKEN ? "" : undefined,
    });
  })
  .on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Please use a different port or terminate the process using this port.`
      );
      process.exit(1);
    } else {
      console.error("Server error:", error);
      process.exit(1);
    }
  });