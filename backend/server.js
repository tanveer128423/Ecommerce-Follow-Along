const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const connectDatabase = require("./db/database");
const ErrorHandler = require("./middleware/error");

const app = express();

// ✅ Load environment variables
dotenv.config({ path: "config/.env" });

// ✅ Ensure uploads directory exists
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("✅ Created 'uploads/' directory");
}

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ✅ CORS Setup (Include Authorization header)
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// ✅ Serve static files
app.use("/uploads", express.static("uploads"));

// ✅ Import and use routes
const userRoutes = require("./User/userRouter");
const productRoutes = require("./Products/productRouter");
const cartRoutes = require("./cart/cartRouter"); // ✅ Import cart router

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes); // ✅ Register cart routes

// ✅ Error Handling Middleware
app.use(ErrorHandler);

// ✅ Connect to MongoDB database
connectDatabase();

// ✅ Start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ✅ Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.log("Shutting down due to an uncaught exception...");
    process.exit(1);
});

// ✅ Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    console.log("Shutting down due to an unhandled promise rejection...");
    server.close(() => process.exit(1));
});
