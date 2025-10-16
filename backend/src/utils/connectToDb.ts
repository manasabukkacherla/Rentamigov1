import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Replace 'your-database-name' with your actual database name
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mnithinreddy0403:Nithin_1234@cluster0.azwih.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

// Handle application termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB connection closure:", err);
    process.exit(1);
  }
});

export default connectToDatabase;
