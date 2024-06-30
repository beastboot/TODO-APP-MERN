/*
 * Name: TODO-App-Backend
 * Description: TODO-App-Backend with Node.js, Express, MongoDB
 * Author: Md. Samiur Rahman (Mukul)
 * Version: v1.0.0
 * Date: 14/6/2022
 * Last Modified: 14/6/2022
 *
 */

// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");

// imports routes, middleware, and configs
const todos = require("./src/routes/todos.route");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();

// corss-origin-allow-all
app.use(cors());

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sets default route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to TODO Node.js application backend." });
});

// Ensure APP_API_PREFIX is set or provide a default
const apiPrefix = process.env.APP_API_PREFIX || "/api";
console.log("API Prefix:", apiPrefix);

// todos api routes
app.use(apiPrefix, todos);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

// app listens to defined port
const port = process.env.APP_PORT || 8080; // Provide a default port if not set
app.listen(port, () => {
  console.log(`TODO-App backend server running on port ${port}`);
});
