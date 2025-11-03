require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
console.log("hello", typeof connectDB)
// port
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// connect to Database
connectDB();

//Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.get("/", (req, res) => {
    res.send("hello")
});

// server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), { setHeaders: ( res, path )=>{
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
     },
  })
);

// server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

