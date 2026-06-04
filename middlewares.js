const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema, signupSchema, loginSchema } = require("./schemaValidation");
const ExpressError = require("./utils/ExpressError");
const { verifyToken } = require("./utils/jwt");
const User = require("./models/user");
const rateLimit = require("express-rate-limit");

/**
 * JWT Authentication Middleware
 * Verifies JWT token from Authorization header or cookie
 */
module.exports.authenticateJWT = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookie
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Find user and attach to request
    const user = await User.findById(decoded.id).select('-password -salt');
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

/**
 * Check if user is authenticated (for web routes)
 * Similar to isLoggedIn but uses JWT instead of sessions
 */
module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : req.cookies?.token;

    if (!token) {
      req.flash("error", "You must be logged in!");
      return res.redirect("/login");
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password -salt');
    
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Invalid or expired session. Please log in again.");
    return res.redirect("/login");
  }
};

module.exports.saveRedirectUrl = (req, res, next) => {
  // For JWT, we can use query params or session storage
  if (req.query.redirect) {
    res.locals.redirectUrl = req.query.redirect;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      req.flash("error", "You must be logged in to perform this action!");
      return res.redirect("/login");
    }
    
    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateSignup = (req, res, next) => {
  let { error } = signupSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateLogin = (req, res, next) => {
  let { error } = loginSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Rate limiting middleware for authentication endpoints
module.exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many authentication attempts, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true // Don't count successful requests
});

// Rate limiting middleware for general API endpoints
module.exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    
    if (!review) {
      req.flash("error", "Review not found!");
      return res.redirect(`/listings/${id}`);
    }
    
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      req.flash("error", "You must be logged in to perform this action!");
      return res.redirect("/login");
    }
    
    if (!review.author.equals(req.user._id)) {
      req.flash("error", "You are not the author of this review!");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (error) {
    next(error);
  }
};
