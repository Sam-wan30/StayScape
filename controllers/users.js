const User = require("../models/user.js");
const { generateToken, generateRefreshToken } = require("../utils/jwt.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    console.log("Signup attempt for:", username, email);
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      if (existingUser.username === username) {
        throw new ExpressError(400, "Username already exists");
      }
      if (existingUser.email === email) {
        throw new ExpressError(400, "Email already registered");
      }
    }
    
    let newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("User registered successfully:", registeredUser.username);
    
    // Generate JWT tokens
    const token = generateToken(registeredUser);
    const refreshToken = generateRefreshToken(registeredUser);
    console.log("JWT tokens generated, token length:", token.length);
    
    // Set JWT token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    });
    
    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/'
    });
    
    console.log("Cookies set, redirecting to /listings");
    req.flash("success", "Welcome to StayScape!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Signup error:", error);
    // Handle specific passport-local-mongoose errors
    if (error.name === 'UserExistsError') {
      req.flash("error", "A user with that username already exists");
    } else if (error.name === 'MissingUsernameError') {
      req.flash("error", "Username is required");
    } else if (error.name === 'MissingPasswordError') {
      req.flash("error", "Password is required");
    } else {
      req.flash("error", error.message || "Registration failed");
    }
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for:", username);
    
    // Find user by username
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log("User not found:", username);
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }
    
    // Authenticate user using passport-local-mongoose
    const authenticated = await user.authenticate(password);
    
    if (!authenticated.user) {
      console.log("Authentication failed for:", username);
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }
    
    console.log("Authentication successful for:", username);
    
    // Generate JWT tokens
    const token = generateToken(authenticated.user);
    const refreshToken = generateRefreshToken(authenticated.user);
    console.log("JWT tokens generated, token length:", token.length);
    
    // Set JWT token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    });
    
    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/'
    });
    
    console.log("Cookies set, redirecting to listings");
    req.flash("success", "Welcome back to StayScape!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Login error:", error);
    req.flash("error", "Login failed. Please try again.");
    res.redirect("/login");
  }
};

module.exports.logout = (req, res) => {
  // Clear JWT cookies
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  req.flash("success", "You are logged out!");
  res.redirect("/listings");
};
