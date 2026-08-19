import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists! Please Login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in Signing user", error);

    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const {email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exists! Please Sign up",
      });
    }

    const isConfirmPassword = await bcrypt.compare(password, existingUser.password);

    if(!isConfirmPassword){
      return res.status(400).json({
        success: false,
        message: "Invalid Password!",
      });
    }

    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "10d"})
    const user = {...existingUser, password: ""};

    return res.status(201).json({
      success: true,
      message: "User Logged In Successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in logging user", error);

    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
export const getUser = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findOne({_id: id});
    console.log(user);
    if(!user){
      return res.status(400).json({
        success: false,
        message: "User not exists!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      user,
    })
  } catch (error) {
    console.error("Error in fetching user", error);

    return res.status(500).json({
      message: "Internal Server error",
    });
  }
}