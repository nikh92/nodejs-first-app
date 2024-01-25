import express, { json } from "express";
import path from "path"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbname:"Backend",
}).then(() => console.log("DataBase Connected")).catch((e) => console.log(e));
const Userschema = new mongoose.Schema({
    name:"String",
    Email:"String",
    password:"String",
})
const User =mongoose.model("User",Userschema)
const app =express();
app.set("view engine","ejs");
// middleware using
// const user=[];
app.use(express.urlencoded({extended :true}))
app.use(express.static(path.join(path.resolve(),"public")))
app.use(cookieParser());
const auth = async(req,res,next) =>{
    const {token}=req.cookies;
    if(token){
        const decode= jwt.verify(token,"uhjkhihkl")
        // console.log(decode)
        req.user=await User.findById(decode._id);
        next();
    }
    else{
        res.redirect("/login");
    }
}
app.get("/",auth,(req,res)=>{
    console.log(req.user)
    res.render("logout",{name:req.user.name});
})
app.get("/register",(req,res)=>{
    
    res.render("register");
})
app.post("/login",async(req,res)=>{
    const {Email,password}=req.body;
    let user=await User.findOne({Email})
    if(!user) return res.redirect("/register")
    const Match = await bcrypt.compare(password,user.password)
if(!Match) return res.render("login",{Email,message : "Incorrect Password"})

const token = jwt.sign({ _id:user._id},"uhjkhihkl")
console.log(token);
res.cookie("token",token,{
    httpOnly:"true",expires:new Date(Date.now() + 60000),
})
res.redirect("/");

})
app.post("/register",async(req,res)=>{
    // console.log(req.body)
    const {name,Email,password}=req.body;
    let user =await User.findOne({Email})
    if(user)
    {
        return res.redirect("/login")
        // return because nothing need to be execute in this function
    }
   const hashpwd= await bcrypt.hash(password,10)
     user = await User.create({
        name,Email,password:hashpwd
    })
    const token = jwt.sign({ _id:user._id},"uhjkhihkl")
    console.log(token);
    res.cookie("token",token,{
        httpOnly:"true",expires:new Date(Date.now() + 60000),
    })
    res.redirect("/");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
// app.post("/login",async(req,res)=>{
//     // console.log(req.body)
//     const {name,Email}=req.body;
//     let user =await User.findOne({Email})
//     if(!user)
//     {
//         return res.redirect("/register")
//         // return because nothing need to be execute in this function
//     }
//      user = await User.create({
//         name,Email,
//     })
//     const token = jwt.sign({ _id:user._id},"uhjkhihkl")
//     console.log(token);
//     res.cookie("token",token,{
//         httpOnly:"true",expires:new Date(Date.now() + 60000),
//     })
//     res.redirect("/");
// })
app.get("/logout",(req,res)=>{
    res.cookie("token","null",{
        httpOnly:"true",expires:new Date(Date.now()),
    })
    res.redirect("/");
})



app.listen(5000 ,() => {
 console.log("server is working");
});