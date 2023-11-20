const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please specify the username!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please specify the email"],
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "The email address is invalid.",
      },
    },
    password: {
      type: String,
      required: [true, "Please specify the password!"],
      // validate: {
      //   validator: validator.isStrongPassword,
      //   message: "Password doesn't meet the minimum requirements!",
      // },
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (val) {
          return val == this.password;
        },
        message: "The passwords must be the same",
      },
    },
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
    photo: {
      type: String,
      default: "default_photo.jpg",
    },
    role: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, password) {
  return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
