const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    console.log("Signup attempt:", { username, email, password: "***" });
    let newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("User registered successfully:", registeredUser.username);
    
    // Redirect to login with success message
    req.flash("success", "Account created successfully! Please log in.");
    res.redirect("/login");
  } catch (error) {
    console.log("Signup error:", error);
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  console.log("Login successful for user:", req.user ? req.user.username : "unknown");
  req.flash("success", "Welcome back to StayScape!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  console.log("Logout attempt for user:", req.user ? req.user.username : "unknown");
  req.logout((err) => {
    if (err) {
      console.log("Logout error:", err);
      return next(err);
    }
    console.log("Logout successful");
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
