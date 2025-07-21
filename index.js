const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellopiyush";
app.use(express.json());
const users = [];


app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    });
    res.json({
        message: "You are signed in"
    });
});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
        }
    }
    if (foundUser) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ token: token });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});
     function auth(req,res,next){
        const token = req.headers.token
        const decodedInfo = jwt.verify(token,JWT_SECRET)
        if(decodedInfo.username){
            req.username = decodedInfo.username
            next()
        }
        else{
            res.json({
                message : "you are not logged in"
            })
        }
     }

app.get("/me", function(req, res) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    let decodedInfo;
    try {
        decodedInfo = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const username = decodedInfo.username;
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === decodedInfo.username) {
            foundUser = users[i];
        }
    }
    if (foundUser) {
        res.json({
            username: foundUser.username
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});