if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const requiredEnv = ["ATLASDB_URL", "SECRET", "MAP_TOKEN", "CLOUD_NAME", "CLOUD_API_KEY", "CLOUD_API_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  console.error("Copy .env.example to .env and fill in your credentials.");
  console.error("Current environment:", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    console.error("PRODUCTION ERROR: Application cannot start without environment variables");
  }
  process.exit(1);
}

const dbUrl = process.env.ATLASDB_URL;
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

console.log("Starting StayScape...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", port);
console.log("Attempting to connect to MongoDB...");

main()
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for now to avoid breaking existing functionality
  crossOriginEmbedderPolicy: false
}));

// Minimal session configuration for flash messages (not for authentication)
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Cookie parser middleware for JWT cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// JWT authentication middleware for all routes
const { verifyToken } = require("./utils/jwt");

app.use(async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Middleware: Token present:", !!token);
    if (token) {
      const decoded = verifyToken(token);
      console.log("Middleware: Token decoded:", decoded.id);
      const user = await User.findById(decoded.id).select('-password -salt');
      if (user) {
        req.user = user;
        console.log("Middleware: User found and attached:", user.username);
      } else {
        console.log("Middleware: User not found in database");
      }
    }
  } catch (error) {
    console.log("Middleware: Token verification error:", error.message);
    // Token is invalid or expired, just continue without user
  }
  
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  console.log("Middleware: currUser set to:", res.locals.currUser?.username);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Service is healthy" });
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Error Occured!" } = err;
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found!";
  }
  res.status(statusCode).render("./listings/error.ejs", { message });
});

app.listen(port, () => {
  console.log(`StayScape server listening on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log("Server is ready to accept requests");
});
