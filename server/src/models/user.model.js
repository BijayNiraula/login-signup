import mongoose from "mongoose";
import bycrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "user name is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required "],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
    statics: {
      async compareHashPassword(password, hashedPassword) {
        return await bycrypt.compare(password, hashedPassword);
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (e) {
      return next(e);
    }
  }
});

userSchema.pre("updateOne", async function (next) {
  if (this.getUpdate().password) {
    try {
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(
        this.getUpdate().password,
        salt
      );
      this.password = hashedPassword;
    } catch (e) {
      return next(e);
    }
  }
});

const User = mongoose.model("user", userSchema);
export default User;
