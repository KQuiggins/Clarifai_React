
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import bcrypt from 'bcrypt';


dotenv.config();
connectDB();




const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies



app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json("Success");
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while signing in." });
  }
});





app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with the provided email." });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
});


app.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while retrieving the user." });
  }
});



//const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running`);
});
