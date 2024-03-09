import errorThrower from "../helper/errorThrower.helper.js";
import User from "../models/user.model.js";

const signup = async (req, res, next) => {
  try {
    const { email, password, userName, phoneNumber } = req.body;
    const data = await User.findOne({ $or: [{ email }, { userName }] });
    if (data) {
      if (data.email == email && data.userName == userName) {
        return next(
          errorThrower(400, "this username and email are already registered")
        );
      } else if (data.email == email) {
        return next(errorThrower(400, "this email is already registered"));
      } else if (data.userName == userName) {
        return next(errorThrower(400, "this username is already in use"));
      }
    }

    const result = await User.create({
      email,
      password,
      userName,
      phoneNumber,
    });
    res.status(200).send({
      status: "success",
      message: "user created successfully",
    });
  } catch (e) {
    return next(errorThrower(400, e.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorThrower(400, "email and password is required"));
    }
    const result = await User.findOne({ email });
    if (!result) {
      return next(errorThrower(400, "no user found "));
    }
    console.log(User.compareHashPassword(password, result.password));
    if (await User.compareHashPassword(password, result.password)) {
      return res
        .status(200)
        .send({ status: "success", message: "login successfully" });
    } else {
      return next(errorThrower(400, "wrong password"));
    }
  } catch (e) {
    return next(errorThrower(400, e.message));
  }
};

export { signup, login };
