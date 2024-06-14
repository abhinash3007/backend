const express=require("express");
const app=express();
const userModel=require("./models/user");
const postModel=require("./models/post");
const cookieParser = require("cookie-parser");
const { genSalt, hash } = require("bcrypt");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const path=require("path");
const multer=require("./utils/multer");
app.use(cookieParser()); // Ensure cookieParser middleware is used
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index.ejs")
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.get("/profile",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("posts");
    console.log(user);
    res.render("profile.ejs",{user});
});
app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    post.likes.push(req.user.userid);
    await post.save();
    res.redirect("/profile");
});
app.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id}).populate("user");
    res.render("edit.ejs",{post});
});
app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content:req.body.content});
    res.redirect("/profile");
});

app.post("/post",isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    let {content}=req.body;
    let post= await postModel.create({
        user:user._id,
        content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});
app.post("/register",async(req,res)=>{
    let {username,name,age,email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
        return res.status(500).send("user already registered");
    }
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let user=await userModel.create({
                username,
                name,
                age,
                email,
                password:hash
            });
            let token=jwt.sign({email:email,userid:user._id},"shhhh");
            res.cookie("token",token);
            res.send("regiestered");
            console.log(hash);
        })
    })
});
app.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user){
        return res.status(500).send("something went wrong");
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:email,userid:user._id},"shhhh");
            res.cookie("token",token);
            res.status(200).redirect ("/profile");
        }
        else{
            res.redirect("/login");
        }
    })
});
app.get("/logout",(req,res)=>{
    res.cookie("token","");
    //res.redirect("/");
})
function isLoggedIn(req,res,next){
    if(req.cookies.token==="") res.redirect("/login");
    else{
        let data=jwt.verify(req.cookies.token,"shhhh");
        req.user=data;
        next();
    }
}
app.listen(3000,(req,res)=>{
    console.log("ready")
});