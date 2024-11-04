// register
import { comparePassword } from "../helpers/compare-password.js";
import { hashPassword } from "../helpers/hash-password.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // check if user exists

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = hashPassword(password);

    console.log(hashedPassword);

    const saveUser = User({ username, email, password: hashedPassword });

    await saveUser.save();

    return res.status(203).json({
      success: true,
      message: "Registered successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.json({
        success: false,
        message: "User does not exist! Please register and try again.",
      });
    }

    const isMatch = comparePassword(password, findUser.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password. Try again",
      });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
        role: findUser.role,
        email: findUser.email,
        username: findUser.username
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "120min" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: findUser.email,
          role: findUser.role,
          id: findUser._id,
          username: findUser.username
        },
      });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// logout 

export const logout = (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: "Logged out successfully!!"
  })
}

// check auth

export const checkAuth = (req, res) => {
  const user = req.user
  res.status(200).json({
    success: true,
    message: "Authenticated!",
    user
  })
}