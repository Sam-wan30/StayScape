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
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const passport = require("passport");
const LocalStrategy = require("passport-local");
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

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true, // Changed to true to ensure session is always saved
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Simplified to always use lax
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  try {
    res.locals.success = req.flash("success") || "";
    res.locals.error = req.flash("error") || "";
    res.locals.currUser = req.user;
    console.log("Session check - User:", req.user ? req.user.username : "not authenticated", "Path:", req.path);
  } catch (err) {
    console.log("Error in flash message middleware:", err);
    res.locals.success = "";
    res.locals.error = "";
    res.locals.currUser = req.user;
  }
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
  // Prevent sending headers multiple times
  if (res.headersSent) {
    return next(err);
  }
  
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
