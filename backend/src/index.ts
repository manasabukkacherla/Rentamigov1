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
import loginRouter from "./routes/authRoutes";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes";
import leadsRouter from "./routes/leads";
import Reportrouter from "./routes/Reportleads";
import aboutPropertyRouter from "./routes/newaboutproperty";
import additionalFinancialsRouter from "./routes/newadditionalFinancialsRouter";
import dgUpsChargesRouter from "./routes/newdgUpsChargesRouter";
import electricityChargesRouter from "./routes/newelectricityChargesRouter"; // ✅ Import the Electricity Charges Router
import facilitiesRouter from "./routes/facilitiesRouter"; // ✅ Import the Facilities Router
import financialPriceRouter from "./routes/financialPriceRouter"; 
import financialsRouter from "./routes/financialsRouter"; // ✅ Import Financials Router
import floorRouter from "./routes/floorRouter"; // ✅ Import Floor Router
import liftsStaircasesRouter from "./routes/liftsStaircasesRouter"; // ✅ Import Router
import negotiableRouter from "./routes/negotiableRouter"; // ✅ Import Router
import propertyDetailsRouter from "./routes/propertyDetailsRouter"; // ✅ Import Router
import otherPropertyDetailsRouter from "./routes/otherPropertyDetailsRouter"; // ✅ Import Router
import parkingRouter from "./routes/parkingRouter"; // ✅ Import Router
import periodDetailsRouter from "./routes/periodDetailsRouter";
import plotPropertyRouter from "./routes/plotPropertyRouter"; // ✅ Import Router
import possessionRouter from "./routes/possessionRouter"; // ✅ Import Router
import propertyAmenitiesRouter from "./routes/propertyAmenitiesRouter"; // ✅ Import Router
import NewPropertyDetailsRouter from "./routes/newpropertydetailsform";
import retailPropertyRouter from "./routes/newretailproperty";
import sellFacilitiesRouter from "./routes/newsellFacilities";
import taxGovtChargesRouter from "./routes/newtacgovtcharges";
import warehousePropertyRouter from "./routes/newwarehouseproperty";
import waterChargesRouter from "./routes/newwatercharges";
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
app.use("/api/Report", Reportrouter); // Report routers 
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
app.use("/api/loginuser", loginRouter);
app.use("/api", forgotPasswordRoutes); 
app.use("/api/leads", leadsRouter);
app.use("/api/about-property", aboutPropertyRouter);
app.use("/api/additional-financials", additionalFinancialsRouter);
app.use("/api/dg-ups-charges", dgUpsChargesRouter);
app.use("/api/electricity-charges", electricityChargesRouter);
app.use("/api/facilities", facilitiesRouter); // ✅ Register Facilities API
app.use("/api/financialPrice", financialPriceRouter); // ✅ Register Financial Price API
app.use("/api/financials", financialsRouter); // ✅ Register Financials API
app.use("/api/floors", floorRouter); // ✅ Register Floor API
app.use("/api/lifts-staircases", liftsStaircasesRouter); // ✅ Register API
app.use("/api/negotiable", negotiableRouter); // ✅ Register API
app.use("/api/newproperty", propertyDetailsRouter); // ✅ Register API
app.use("/api/other-property", otherPropertyDetailsRouter); // ✅ Register API
app.use("/api/parking", parkingRouter); // ✅ Register API
app.use("/api/period", periodDetailsRouter); // ✅ Register API
app.use("/api/plot", plotPropertyRouter); // ✅ Register API
app.use("/api/possession", possessionRouter); // ✅ Register API
app.use("/api/property-amenities", propertyAmenitiesRouter); // ✅ Register API
app.use("/api/property-details", NewPropertyDetailsRouter); // ✅ Register API
app.use("/api/retail-property", retailPropertyRouter);
app.use("/api/sell-facilities", sellFacilitiesRouter);
app.use("/api/tax-govt-charges", taxGovtChargesRouter);
app.use("/api/warehouse-property", warehousePropertyRouter);
app.use("/api/water-charges", waterChargesRouter);

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
