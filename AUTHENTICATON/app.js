const cookieParser = require("cookie-parser");
const express=require("express");
const bcrypt=require("bcrypt");
const app=express();
const jwt=require("jsonwebtoken");
app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.cookie("name","Abhinash");
//     res.send("hello");
// });
// app.get("/read",(req,res)=>{
//     console.log(req.cookies);
//     res.send("hel");
// });

// app.get("/",(req,res)=>{
//     bcrypt.compare("namaste","$2b$10$AcC4nsgEbS4XgqqI7Vu8r./gIYbqAl9NBFyfm6FUQmBE2ojC2F/6K",(err,result)=>{
//         console.log(result);
//         })
//     })

app.get("/",(req,res)=>{
    let token=jwt.sign({email:"abc@gmail.com"},"SECRET");
    res.cookie("token",token);
    console.log(token);
    res.send("ji");
});
app.get("/read",(req,res)=>{
    let data=jwt.verify(req.cookies.token,"SECRET");
    console.log(data);
});
app.listen(3000,(req,res)=>{
    console.log("running");
});