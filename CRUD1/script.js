const express=require("express");
const app=express();
const userModel=require("./userModels");

app.get("/",(req,res)=>{
    res.send("hey")
});
app.get("/create",async (req,res)=>{
    let create=await userModel.create({
        name:"Abhi",
        userName:"b2",
        email:"abhinash@25.gmail.com",
    })
    res.send(create);
});
app.get("/edit",async (req,res)=>{
    let update=await userModel.findOneAndUpdate({name:"Abhinash"},{userName:"Abhinash Mishra"},{new:true});
    res.send(update);
});
app.get("/read",async (req,res)=>{
    let find=await userModel.find();
    res.send(find);
});
app.get("/delete",async (req,res)=>{
    let del=await userModel.findOneAndDelete({name:"Abhi"});
    res.send(del);
});
app.listen(3000,()=>{
    console.log("running")
});