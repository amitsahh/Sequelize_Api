const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./Modals/user");
const Todo = require("./Modals/todo");

const route = require("./routes/userRoute");
// const bcrypt = require('bcrypt');
// const bigtables = require ("../Api/Migration/models/bigtable")

app.use(cors());
app.use(express.json());

app.use("/", route);

app.post("/users", async (req, res) => {
  try {
    const { name, mobile, gender, country, hobbies, email, password } =
      req.body;
    const postdata = {
      name,
      mobile,
      gender,
      country,
      hobbies,
      email,
      password,
    };

    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }
    const mobileata = await User.findOne({ where: { mobile: mobile } });
    const emailData = await User.findOne({ where: { email: email } });
    if (mobileata) {
      console.log("mobile numer already exists");
      res.status(500).json({ error: "mobile number already exists" });
    }
    if (emailData) {
      console.log("email numer already exists");
      res.status(500).json({ error: "email already exists" });
    }

    // const postdata = req.body;
    console.log(postdata);
    const data = await User.create(postdata);
    res.status(200).json({ status: "Account created " });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error creating user:", error);
    res.status(500).json({ error: "user already exists" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      console.log("User not found");
      res.status(401).json({ error: "Incorrect email" });
      return;
    }

    const isPasswordValid = password === user.password;

    if (isPasswordValid) {
      console.log("Login successful");
      console.log("User details:", user.toJSON());
      res.status(200).json({ message: "Login successful" });
    } else {
      console.log("Incorrect password");
      res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todoData = req.body;
    const data = await Todo.create(todoData);
    res.status(200).json({ status: "todos added succesfuly" });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const data = await Todo.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const data = await Todo.findByPk(todoId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});
app.put("/todos/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const updated = await Todo.findByPk(todoId);
    if (!updated) {
      return res.status(404).json({ message: "todo not found" });
    }
    await updated.update(req.body);
    return res.status(200).json({ message: "todo Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error ...." });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const data = await Todo.findByPk(todoId);
    if (data) {
      await data.destroy();
      res.status(200).json({ status: "todo deleted" });
    } else {
      res.status(200).json({ status: "todo not found" });
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
});

User.sync({ force: false });
Todo.sync({ force: false });
//user.drop();

app.listen(7000, "localhost", () => {
  console.log("server is working on http://localhost:7000)");
});

const name = (b) => {
  let a = 8;
  const myName = () => {
    console.log(a + b);
    console.log(a);
  };
  myName();
};
name(2);

const parent = (y) => {
  let x = 9;

  return (child = () => {
    // const c = 3;
    console.log(x + y);
  });
};

const result = parent(4);
result();

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
//  app.get("/amit",(req,res) => {
//        res.send("hello world!!!")
//  })

// app.post("/users", async (req, res) => {
//   try {
//     const { name, mobile, gender, country, hobbies, email, password} = req.body;

// const postdata = { name, mobile, gender, country, hobbies, email, password}

//     console.log(postdata);
//     const mobileata = await User.findOne({where:{mobile : mobile },});
//     const emailData = await User.findOne({where:{email : email },});
//     if(mobileata ){
//       console.log('mobile numer already exists');
//       res.status(500).json({ error: "mobile number already exists" });
//     }
//     if(emailData){
//       console.log('email numer already exists');
//       res.status(500).json({ error: "email exists" });
//     }
//     if(postdata){
//       res.status(500).json({ status: "user" });
//     }
//     // if(newdat || newdats){

//     //   console.log('mobile numer already exists');
//     //   res.status(500).json({ error: "user already exists" });
//     //   return;
//     // }

//     const data = await User.create(postdata);

//     res.status(200).json({  data : data});

//   } catch (error) {
//     // Handle the error appropriately
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "user already exists" });
//   }
// });

// app.post("/login", async (req, res) => {

//   try {

//      const {email, password} = req.body;

//   const name = {email, password};
//     const user = await User.findOne({ where: { email: email } });
//     // if(name){
//     //   res.status(500).json({ satus: "login succes" });

//     // }

//     if (!user) {
//       res.status(500).json({ error: "incorrect email" });
//       console.log('User not found');
//       return;
//     }
//     const isPasswordValid = password === user.password;
//     console.log(isPasswordValid, password, user.password);
//     if (isPasswordValid) {
//       console.log('Login successful');
//       console.log('User details:', user.toJSON());
//       res.status(200).json({ data: user });

//     }

//     // closer ar curry

//     else {
//       console.log('Incorrect password');
//       res.status(401).json({ message: "incorrect password"});
//     }

//   } catch (error) {
//     console.error('Error logging in:', error.message);
//   }

// });

// app.post("/login", async (req, res) => {
//   const {email, password} = req.body;

//   try {
//     const data = await user.findOne({ where: { email: email } });
//     if (!user) {
//       console.log('User not found');
//       return;
//     }
//     const isPasswordValid = password === user.password;
//     console.log(isPasswordValid, password, user.password);
//     if (isPasswordValid) {
//       console.log('Login successful');
//       console.log('User details:', user.toJSON());
//       res.status(200).json({ data : data});

//     }
//     // closer ar curry

//     else {
//       console.log('Incorrect password');
//       res.status(401).json({ message: "incorrect password"});
//     }
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//   }

// });

// try {
//   const todo = await Todo.findByPk(todoId);

//   if (!todo) {
//     // If todo with given ID is not found, handle the case accordingly
//     res.status(404).json({ error: 'Todo not found' });
//     return;
//   }

//   // If todo is found, send it in the response
//   res.status(200).json({ todo });
// } catch (error) {
//   // Handle any errors that occur during the process
//   console.error('Error finding todo:', error);
//   res.status(500).json({ error: 'Internal server error' });
// }

//   app.post("/login", async (req, res) => {
//     const postdatas = req.body;
//     const datas = await User.create(postdatas);
//     res.status(200).json({ datas: datas });
//   });

//   const postdata = req.body;
//     const data = await User.create(postdata);
//     res.send("hello")
