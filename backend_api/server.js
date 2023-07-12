
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import users from './data/users.js';


dotenv.config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies



app.get("/", (req, res) => {
  res.send(users);
});

app.post("/signin", (req, res) => {

  if (req.body.email === users[0].email && req.body.password === users[0].password) {
    res.json("Success");
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  users.push(
    {
      name: name,
      email: email,
      password: password,
      joined: Date.now(),
    }
  )

  
  res.json(users[users.length - 1]);
});



//const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running`);
});
