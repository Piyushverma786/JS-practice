const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const JWT_SECRET = "hellopiyush";
mongoose.connect('mongodb+srv://piyush:helloworld12@cluster0.ekcld.mongodb.net/todo-app')

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
    
    email : email,
    password : password,
    name : name,
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
app.post("/todo", auth, async function(req, res){          //Yeh todos ko add krne ke liye hai 
    const userId = req.userId;                      //middleware ke pass se jo req.userId jispe decodedData ka id hai woh idhr pass on hua 
    const title = req.body.title                    //yaha se title input denge 
    await TodoModel.create({                        //database call isliye await kiye
        title,                                      //TodoModel wale collection mein yeh create ho jyega 
        userId,
        done
    })
    res.json({
        message: "Todo created!"
    })
});

app.get("/todos", auth, async function(req, res){           //yeh kaunsa todo kis user ka hai woh return krne k liye..ki like kaunsa userId pe kya kya todo hai yeh btayega woh
    const userId = req.userId;                              //middleware ke pass se jo req.userId jispe decodedData ka id hai woh idhr pass on hua 
    
    const todos = await TodoModel.find({                    //userId se woh todos ko search kr lega for this specific id provided to it
        userId
    })
    
    res.json({
        todo                                                //todos jo milnge woh output pe milenge 
    })

});

function auth(req, res, next){                              //same auth fucntion which was used before 
    const token = req.headers.token

    const decodedData = jwt.verify(token, JWT_SECRET)

    if(decodedData){
        req.userId = decodedData.id;                         //User Id ko decodedData se le rhe hia idhar 
        next();
    }
    else{
        req.status(403).json({
            message: "Incorrect Credentials !"
        })
    }
}



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