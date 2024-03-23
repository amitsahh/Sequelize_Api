const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./Modals/user");
const newUser = require ("./Modals/newuser")
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

// app.get('/home', (req, res) => {
//     res.send('hello world')
//   })

// app.get("/user", async (req, res) => {
//     const jane = await User.create({ name: "Jane" });
//     // const jane = User.build({ name: "Jane" });
// console.log(jane instanceof User); // true
// console.log(jane.name); // "Jane"

// // await jane.save();
// console.log('Jane was saved to the database!');

// console.log(jane.toJSON());
// res.status(200).json(jane.toJSON())
//   });

app.post("/users", async (req, res) => {
  try {
    const postdata = req.body;
    console.log(postdata);
    const data = await User.create(postdata);
    res.status(200).json({ data: data });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error creating user:", error);
    res.status(500).json({ error: "user already exists" });
  }
});

  app.post("/login", async (req, res) => {
    const {email, password} = req.body;
     
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        console.log('User not found');
        return;
      }
      const isPasswordValid = password === user.password;
      console.log(isPasswordValid, password, user.password);
      if (isPasswordValid) {
        console.log('Login successful');
        console.log('User details:', user.toJSON());
        res.status(200).json({ data: user });
        
      } 
      // closer ar curry
      
      
      else {
        console.log('Incorrect password');
        res.status(401).json({ message: "incorrect password"});
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }


  });

  app.post("/todos", async (req, res) => {
    const postdatas = req.body;
    const data = await newUser.create(postdatas);
    res.status(200).json({ data: data });
  });

//   app.post("/login", async (req, res) => {
//     const postdatas = req.body;
//     const datas = await User.create(postdatas);
//     res.status(200).json({ datas: datas });
//   });


//   const postdata = req.body;
//     const data = await User.create(postdata);
//     res.send("hello")

User.sync({ force: false });
 newUser.sync({ force: false });
 // newUser.drop();

app.listen(6000, "localhost", () => {
  console.log("server is working on http://localhost:6000)");
});