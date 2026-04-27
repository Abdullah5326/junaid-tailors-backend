import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // do not return password in queries
    },

    confirmPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords confirm and password is not same.",
      },
    },

    role: {
      type: String,
      enum: ["admin", "cutter", "tailor"],
      default: "tailor",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    profileImg: {
      type: String,
      default: "default.png",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    mobile: String,
    address: {
      country: String,
      city: String,
      postalCode: String,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  },
);

userSchema.pre("save", async function () {
  this.confirmPassword = undefined;
  const hashedPassword = await bcrypt.hash(this.password, 8);

  this.password = hashedPassword;
});

userSchema.methods.correctPasswords = async function (
  candidatePassword,
  userPassword,
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

console.log('working')

export default User;
