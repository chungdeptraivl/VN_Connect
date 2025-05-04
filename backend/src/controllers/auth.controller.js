import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    if (fullName.trim().length === 0) {
      return res.status(400).json({ message: "Full name is not valid." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const avatarIndex = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${avatarIndex}.png`;

    const newUser = await User.create({
      fullName,
      email: normalizedEmail,
      password, 
      profilePic,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic,
      });
      console.log(`✅ Stream user created: ${newUser.fullName}`);
    } catch (streamError) {
      console.error("❌ Error creating Stream user:", streamError);
      return res.status(500).json({
        message: "Failed to create Stream user.",
        success: false,
      });
    }

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: "7d",
    // });

    // res.cookie("jwt", token, {
    //   maxAge: 7 * 24 * 60 * 60 * 1000, 
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // });

    res.status(201).json({
      message: "User created successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: pw, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "Login successfully.",
      success: true,
      token: token,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successfully." });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic,
      });

      console.log(
        `Stream user updated after onboarding for ${updatedUser.fullName}`
      );
    } catch (error) {
      console.log(`Stream update user has error: ${error.message}`);
    }

    res.status(200).json({
      message: "User onboarded successfully.",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
