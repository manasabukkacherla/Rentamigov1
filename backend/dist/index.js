"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http")); // For creating an HTTP server
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDb_1 = require("./utils/connectToDb");
const cors_1 = __importDefault(require("cors"));
const verify_1 = __importDefault(require("./routes/verify"));
const googleAuth_1 = __importDefault(require("./routes/googleAuth"));
const email_1 = __importDefault(require("./routes/email"));
const services_intrst_user_1 = __importDefault(require("./routes/services-intrst-user"));
const ownerIntrst_1 = __importDefault(require("./routes/ownerIntrst"));
const subscriberform_1 = __importDefault(require("./routes/subscriberform"));
const ownerInterest_1 = __importDefault(require("./routes/ownerInterest"));
const signupform_1 = __importDefault(require("./routes/signupform")); // Replace with the correct file path for User
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const forgotPasswordRoutes_1 = __importDefault(require("./routes/forgotPasswordRoutes"));
//import leadsRouter from "./routes/leads";
const Reportleads_1 = __importDefault(require("./routes/Reportleads"));
const Propertydetails_1 = __importDefault(require("./routes/Propertydetails"));
const employee_1 = __importDefault(require("./routes/employee"));
const Subscriptionmodel_1 = __importDefault(require("./routes/Subscriptionmodel"));
const Tokenform_1 = __importDefault(require("./routes/Tokenform"));
const blogRoutes_1 = __importDefault(require("./routes/blogs/blogRoutes"));
const commentsRouter_1 = __importDefault(require("./routes/blogs/commentsRouter"));
const reviewRoutes_1 = __importDefault(require("./routes/blogs/reviewRoutes"));
const likesRoutes_1 = __importDefault(require("./routes/blogs/likesRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const BlogStatisticsRoutes_1 = __importDefault(require("./routes/blogs/BlogStatisticsRoutes"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const path_1 = __importDefault(require("path"));
const BugRouter_1 = __importDefault(require("./routes/BugRouter"));
const socket_io_1 = require("socket.io");
const residentialPgmain_1 = __importDefault(require("./routes/residential/residentialPgmain")); // <-- PG main 
const commercialPlotRoutes_1 = __importDefault(require("./routes/commercial/commercialPlotRoutes"));
const commercialRentAgricultureRoutes_1 = __importDefault(require("./routes/commercial/commercialRentAgricultureRoutes"));
const commercialRentOthersRoutes_1 = __importDefault(require("./routes/commercial/commercialRentOthersRoutes"));
const commercialRentWarehouseRoutes_1 = __importDefault(require("./routes/commercial/commercialRentWarehouseRoutes"));
const CommercialRentOfficeSpace_1 = __importDefault(require("./routes/commercial/CommercialRentOfficeSpace"));
const commercialRentShop_1 = __importDefault(require("./routes/commercial/commercialRentShop"));
const commercialRentRetailStore_1 = __importDefault(require("./routes/commercial/commercialRentRetailStore"));
const commercialSellAgricultureRoutes_1 = __importDefault(require("./routes/commercial/commercialSellAgricultureRoutes"));
const commercialSellOthersRoutes_1 = __importDefault(require("./routes/commercial/commercialSellOthersRoutes"));
const commercialRentCoveredSpaceRoutes_1 = __importDefault(require("./routes/commercial/commercialRentCoveredSpaceRoutes"));
const commercialSellCoveredSpaceRoutes_1 = __importDefault(require("./routes/commercial/commercialSellCoveredSpaceRoutes"));
const CommercialSellOfficeSpace_1 = __importDefault(require("./routes/commercial/CommercialSellOfficeSpace"));
const commercialSellRetailStore_1 = __importDefault(require("./routes/commercial/commercialSellRetailStore"));
const commercialRentShowroom_1 = __importDefault(require("./routes/commercial/commercialRentShowroom"));
const commercialRentSheds_1 = __importDefault(require("./routes/commercial/commercialRentSheds"));
const commercialRentPlot_1 = __importDefault(require("./routes/commercial/commercialRentPlot"));
const commercialLeasePlotRoutes_1 = __importDefault(require("./routes/commercial/commercialLeasePlotRoutes"));
const commercialLeaseAgricultureRoutes_1 = __importDefault(require("./routes/commercial/commercialLeaseAgricultureRoutes"));
const commercialLeaseShop_1 = __importDefault(require("./routes/commercial/commercialLeaseShop"));
const commercialLeaseOthersRoutes_1 = __importDefault(require("./routes/commercial/commercialLeaseOthersRoutes"));
const commercialLeaseRetail_1 = __importDefault(require("./routes/commercial/commercialLeaseRetail"));
const commercialLeaseShowroom_1 = __importDefault(require("./routes/commercial/commercialLeaseShowroom"));
const commercialLeaseCoveredSpaceRoutes_1 = __importDefault(require("./routes/commercial/commercialLeaseCoveredSpaceRoutes"));
const conversationRoutes_1 = __importDefault(require("./routes/conversationRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const sockets_1 = __importDefault(require("./sockets"));
const commercialLeaseWarehouseRoutes_1 = __importDefault(require("./routes/commercial/commercialLeaseWarehouseRoutes"));
const CommercialLeaseOfficeSpace_1 = __importDefault(require("./routes/commercial/CommercialLeaseOfficeSpace"));
const commercialLeaseShedRoutes_1 = __importDefault(require("./routes/commercial/commercialLeaseShedRoutes"));
const rentApartment_1 = __importDefault(require("./routes/residential/rentApartment"));
const leaseIndependent_1 = __importDefault(require("./routes/residential/leaseIndependent"));
const residentialSellApartmentRoutes_1 = __importDefault(require("./routes/residential/residentialSellApartmentRoutes"));
const residentialSalePlotRoutes_1 = __importDefault(require("./routes/residential/residentialSalePlotRoutes"));
const rentBuilderFloor_1 = __importDefault(require("./routes/residential/rentBuilderFloor"));
const leaseApartment_1 = __importDefault(require("./routes/residential/leaseApartment"));
const leaseBuilderFloor_1 = __importDefault(require("./routes/residential/leaseBuilderFloor"));
const residentialSaleIndependentHouse_1 = __importDefault(require("./routes/residential/residentialSaleIndependentHouse"));
const residentialSaleBuilderFloor_1 = __importDefault(require("./routes/residential/residentialSaleBuilderFloor"));
const rentIndependentHouse_1 = __importDefault(require("./routes/residential/rentIndependentHouse"));
const commercialSellShopRoutes_1 = __importDefault(require("./routes/commercial/commercialSellShopRoutes"));
const commercialSellShedRoutes_1 = __importDefault(require("./routes/commercial/commercialSellShedRoutes"));
const commercialSellShowroomRoutes_1 = __importDefault(require("./routes/commercial/commercialSellShowroomRoutes"));
const commercialSellWarehouseRoutes_1 = __importDefault(require("./routes/commercial/commercialSellWarehouseRoutes"));
const propertyMediaRoutes_1 = __importDefault(require("./routes/propertyMediaRoutes"));
const residentialMediaRoutes_1 = __importDefault(require("./routes/residentialMediaRoutes"));
const allPropertiesRoutes_1 = __importDefault(require("./routes/allPropertiesRoutes"));
const enquiryRoutes_1 = __importDefault(require("./routes/enquiryRoutes"));
dotenv_1.default.config();
// Validate required environment variables
const requiredEnvVars = ["ACCOUNT_SID", "AUTH_TOKEN", "VERIFY_SERVICE_SID"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}
const app = (0, express_1.default)();
// Create an HTTP server using the Express app
const server = http_1.default.createServer(app);
// Increase timeout
server.timeout = 300000; // 5 minutes
// Initialize Socket.IO with correct CORS settings
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, connectToDb_1.connectToDatabase)()
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Terminate the process if the database connection fails
});
// Middleware
// Serve static files from "build"
app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
// cors
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: false
}));
// Configure express with proper types
app.use(express_1.default.json({
    limit: "100mb", // Increase limit
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf.toString());
        }
        catch (e) {
            res.status(400).json({
                success: false,
                error: "Invalid JSON",
                message: "The request contains invalid JSON data."
            });
            throw new Error("Invalid JSON");
        }
    },
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "100mb", // Increase limit
}));
// Add timeout middleware with proper types
const timeout = (req, res, next) => {
    res.setTimeout(300000, () => {
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
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Initialize all Socket.IO event handlers
(0, sockets_1.default)(exports.io);
// Routes
app.use("/api/verify", verify_1.default);
app.use("/api/Report", Reportleads_1.default); // Report routers
app.use("/api/auth/google", googleAuth_1.default); // Google Auth routes
app.use("/api/email", email_1.default); // Email routes
app.use("/api/employees", employee_1.default); // Employee routes
app.use("/api/enquiry", enquiryRoutes_1.default); // Enquiry routes
app.use("/api/service", services_intrst_user_1.default); // Service interest routes
app.use("/api", ownerIntrst_1.default); // Owner interest routes
app.use("/api/forms", subscriberform_1.default);
app.use("/api/owner-interest", ownerInterest_1.default);
// chat app routes
app.use("/api/messages", messageRoutes_1.default);
app.use("/api/conversation", conversationRoutes_1.default);
//Property listing apis
//app.use("/api/property-selection", Propertyrouter);
// app.use("/api/basicdetails", BasicDetailsrouter);
app.use("/api/properties", Propertydetails_1.default);
//Subscription pllan routes
app.use("/api/subscription", Subscriptionmodel_1.default);
//Token plan routes
app.use("/api/tokens", Tokenform_1.default);
app.use("/api/sign", signupform_1.default);
app.use("/api/loginuser", authRoutes_1.default);
app.use("/api", forgotPasswordRoutes_1.default);
//app.use("/api/leads", leadsRouter);
app.use("/api/user", userRouter_1.default);
app.use("/api/blog", blogRoutes_1.default);
app.use("/api/reviews", reviewRoutes_1.default);
app.use("/api/comments", commentsRouter_1.default);
app.use("/api/likes", likesRoutes_1.default);
app.use("/api/stats", BlogStatisticsRoutes_1.default);
app.use("/api/payment", paymentRoutes_1.default);
app.use("/api/bug", BugRouter_1.default);
app.use("/api/commercial/sell/shops", commercialSellShopRoutes_1.default);
app.use("/api/commercial/sell/showrooms", commercialSellShowroomRoutes_1.default);
app.use("/api/commercial/sell/warehouses", commercialSellWarehouseRoutes_1.default);
app.use("/api/commercial/sell/plots", commercialPlotRoutes_1.default);
app.use("/api/commercial/sell/agriculture", commercialSellAgricultureRoutes_1.default);
app.use("/api/commercial/sell/others", commercialSellOthersRoutes_1.default);
app.use("/api/commercial/sell/office-space", CommercialSellOfficeSpace_1.default);
app.use("/api/commercial/sell/retail-store", commercialSellRetailStore_1.default);
app.use("/api/commercial/sell/sheds", commercialSellShedRoutes_1.default);
app.use("/api/commercial/sell/covered-space", commercialSellCoveredSpaceRoutes_1.default);
//openspace
//lease routes
app.use("/api/commercial/lease/plots", commercialLeasePlotRoutes_1.default);
app.use("/api/commercial/lease/agriculture", commercialLeaseAgricultureRoutes_1.default);
app.use("/api/commercial/lease/shops", commercialLeaseShop_1.default);
app.use("/api/commercial/lease/others", commercialLeaseOthersRoutes_1.default);
app.use("/api/commercial/lease/covered-space", commercialLeaseCoveredSpaceRoutes_1.default);
app.use("/api/commercial/lease/retail-store", commercialLeaseRetail_1.default);
app.use("/api/commercial/lease/showrooms", commercialLeaseShowroom_1.default);
app.use("/api/commercial/lease/warehouses", commercialLeaseWarehouseRoutes_1.default);
app.use("/api/commercial/lease/office-space", CommercialLeaseOfficeSpace_1.default);
app.use("/api/commercial/lease/sheds", commercialLeaseShedRoutes_1.default);
//rent routes
app.use("/api/commercial/rent/agriculture", commercialRentAgricultureRoutes_1.default);
app.use("/api/commercial/rent/others", commercialRentOthersRoutes_1.default);
app.use("/api/commercial/rent/office-space", CommercialRentOfficeSpace_1.default);
app.use("/api/commercial/rent/warehouses", commercialRentWarehouseRoutes_1.default);
app.use("/api/commercial/rent/covered-space", commercialRentCoveredSpaceRoutes_1.default);
app.use("/api/commercial/rent/shops", commercialRentShop_1.default);
app.use("/api/commercial/rent/retail-store", commercialRentRetailStore_1.default);
app.use("/api/commercial/rent/showrooms", commercialRentShowroom_1.default);
app.use("/api/commercial/rent/sheds", commercialRentSheds_1.default);
app.use("/api/commercial/rent/plots", commercialRentPlot_1.default);
app.use("/api/allproperties", allPropertiesRoutes_1.default);
// PG Main (residential) API route with integrated media functionality
app.use('/api/residential/pgmain', residentialPgmain_1.default);
// Property media routes for all property types
app.use('/api/property-media', propertyMediaRoutes_1.default);
// Residential Media Routes
app.use('/api/residential/media', residentialMediaRoutes_1.default);
// Redirect old pg-media routes to the new integrated endpoints
app.use("/api/residential/pg-media", (req, res, next) => {
    // Rewrite the URL to use the new media endpoints in residentialPgmain
    if (req.path === '/upload') {
        req.url = '/media/upload';
    }
    else if (req.path.match(/^\/[\w-]+\/[\w-]+$/)) {
        // For paths like /:propertyId/:mediaId (DELETE)
        const parts = req.path.split('/');
        req.url = `/media${req.path}`;
    }
    else if (req.path.match(/^\/[\w-]+$/)) {
        // For paths like /:propertyId (GET)
        req.url = `/media${req.path}`;
    }
    // Forward to the residentialPgmain router
    (0, residentialPgmain_1.default)(req, res, next);
});
//sell routes
app.use("/api/residential/sale/apartment", residentialSellApartmentRoutes_1.default);
app.use("/api/residential/sale/plots", residentialSalePlotRoutes_1.default);
app.use("/api/residential/sale/independenthouse", residentialSaleIndependentHouse_1.default);
app.use("/api/residential/sale/builderfloor", residentialSaleBuilderFloor_1.default);
//rent
app.use('/api/residential/rent/apartment', rentApartment_1.default);
app.use('/api/residential/rent/builderfloor', rentBuilderFloor_1.default);
app.use('/api/residential/rent/independenthouse', rentIndependentHouse_1.default);
//lease
app.use('/api/residential/lease/independenthouse', leaseIndependent_1.default);
app.use('/api/residential/lease/apartment', leaseApartment_1.default);
app.use('/api/residential/lease/builderfloor', leaseBuilderFloor_1.default);
app.get("/testing", (req, res) => {
    exports.io.emit("newNotification", "Test notification");
    res.json({ message: "Test message" });
});
// // Basic route
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Welcome to the API" });
// });
// Handle React Router (if using React Router)
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
});
console.log("cd pipeline check - 5th time....");
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
server
    .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Environment variables loaded:", {
        VERIFY_SERVICE_SID: process.env.VERIFY_SERVICE_SID ? "" : undefined,
        ACCOUNT_SID: process.env.ACCOUNT_SID ? "" : undefined,
        AUTH_TOKEN: process.env.AUTH_TOKEN ? "" : undefined,
    });
})
    .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Please use a different port or terminate the process using this port.`);
        process.exit(1);
    }
    else {
        console.error("Server error:", error);
        process.exit(1);
    }
});
