const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl, validateSignup, validateLogin, authLimiter } = require("../middlewares.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(authLimiter, validateSignup, wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(authLimiter, validateLogin, saveRedirectUrl, wrapAsync(userController.login));

router.get("/logout", userController.logout);

module.exports = router;
