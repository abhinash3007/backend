const express=require("express");
const app=express();
const userModel=require("./models/user");
const postModel=require("./models/post");

app.get("/",(req,res)=>{
    res.send("ok");
});
app.get("/create",async (req,res)=>{
    let user=await userModel.create({
        name:"abhi",
        age:25,
        email:"abhi@gmail.com",
    })
    res.send(user);
});
app.get("/post/create",async (req,res)=>{
    let post=await postModel.create({
        postdata:"hello everyone",
        user:"66633c0d93c6061ce0e0a221"
    })
    let user=await userModel.findOne({_id:"66633c0d93c6061ce0e0a221"});
    user.post.push(post._id)
    await user.save();

    res.send({post,user});
})
 
app.listen(3000);