const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Configure passport-local-mongoose options
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'username',
  passwordField: 'password',
  errorMessages: {
    MissingPasswordError: 'No password was given',
    AttemptTooSoonError: 'Account is currently locked. Try again later',
    TooManyAttemptsError: 'Account has been temporarily locked due to too many failed login attempts',
    NoUsernameError: 'No username was given',
    IncorrectPasswordError: 'Password or username is incorrect',
    IncorrectUsernameError: 'Password or username is incorrect',
    MissingUsernameError: 'No username was given',
    UserExistsError: 'A user with the given username is already registered'
  }
});

module.exports = mongoose.model("User", userSchema);
