const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const JWT_SECRET = "hellopiyush";
mongoose.connect('mongodb+srv://piyush:GmHRPqobtFwbiW79@cluster0.ekcld.mongodb.net/todo-app')

const {UserModel, TodoModel} = require('./db');

app.use(express.json());
const users = [];



app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name
    // const username = req.body.username;
    // const password = req.body.password;
     await UserModel.create({
    
    email : "email",
    password : "password",
    name : "name",
})
    
    
    // users.push({
    //     username: username,
    //     password: password
    // });
    res.json({
        message: "You are signed in"
    });
});

app.post("/signin", async function(req, res) {
     const email = req.body.email;
      const password = req.body.password;

    // const username = req.body.username;
    // const password = req.body.password;

    const user = await UserModel.findOne({
        email : email,
        password : password
    })
    console.log(user);
    if(user){
        const token = jwt.sign(
            { id: user._id }, // payload
            JWT_SECRET        // secret
        )
        res.json({
            token : token
        })
    }
    else{
        res.status(403).json({
            message : "incorrect credentials"
        })
    }
})

//     let foundUser = null;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username && users[i].password === password) {
//             foundUser = users[i];
//         }
//     }
//     if (foundUser) {
//         const token = jwt.sign({ username: username }, JWT_SECRET);
//         res.json({ token: token });
//     } else {
//         res.status(401).json({ message: "Invalid username or password" });
//     }
// });
//      function auth(req,res,next){
//         const token = req.headers.token
//         const decodedInfo = jwt.verify(token,JWT_SECRET)
//         if(decodedInfo.username){
//             req.username = decodedInfo.username
//             next()
//         }
//         else{
//             res.json({
//                 message : "you are not logged in"
//             })
//         }
//      }

// app.get("/me", function(req, res) {
//     const token = req.headers.token;
//     if (!token) {
//         return res.status(401).json({ message: "Token missing" });
//     }
//     let decodedInfo;
//     try {
//         decodedInfo = jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid token" });
//     }
//     const username = decodedInfo.username;
//     let foundUser = null;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === decodedInfo.username) {
//             foundUser = users[i];
//         }
//     }
//     if (foundUser) {
//         res.json({
//             username: foundUser.username
//         });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});