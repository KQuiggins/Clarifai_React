import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";
import bcrypt from "bcrypt";

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies



app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exists with the provided email." });
    }

    // Create a new user object with the plaintext password
    const newUser = new User({
      name,
      email,
      password, // Using the plaintext password directly
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
});


app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while signing in." });
  }
});

app.get("/api/profile/:id", async (req, res) => {
  const userEmail = req.params.email;
  console.log("User email:", userEmail);

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return the user profile data
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      joined: user.joined,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user profile." });
  }
});

//const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running`);
});
