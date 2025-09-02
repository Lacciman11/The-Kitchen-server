// app.js — Express app with security, logging, CORS, cookies, and rate limiting
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();

// Basic middleware
app.use(helmet());                     // security headers
app.use(express.json());               // parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());               // parse cookies

// CORS (allow origin from .env or any)
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}));

// Logging
app.use(morgan(process.env.MORGAN_FORMAT || "dev"));

// Simple rate limiter (tweak as needed)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX || 100), // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Example routes
app.get("/", (req, res) => {
  res.send("Hello there");
});

app.get("/api/echo", (req, res) => {
  // echo small info to show cookies and query working
  res.json({
    message: "echo",
    query: req.query,
    cookies: req.cookies,
  });
});

module.exports = app;
