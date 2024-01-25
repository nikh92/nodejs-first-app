import express, { json } from "express";
import path from "path"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbname:"Backend",
}).then(() => console.log("DataBase Connected")).catch((e) => console.log(e));
const msgschema = new mongoose.Schema({
    name:"String",
    Email:"String",
})
const Messa =mongoose.model("Messa",msgschema)
const app =express();
app.set("view engine","ejs");
// middleware using
// const user=[];
app.use(express.urlencoded({extended :true}))
app.use(express.static(path.join(path.resolve(),"public")))
app.use(cookieParser());
const auth = (req,res) =>{
    const {token}=req.cookies;
    if(token){
        next();
    }
    else{
        res.render("login");
    }
}
app.get("/",auth,(req,res)=>{
    res.render("logout");
})
//////////SIMPLIFYING BELOW 3 APIS INTO SIMPLE CODE
// app.get("/",(req,res)=>{
//     console.log(req.cookies.token)
//     const {token} =req.cookies;
//     if(token)
//     res.render("logout")
//    else
//     res.render("login");
// })
app.post("/login",(req,res)=>{
    res.cookie("token","iamin",{
        httpOnly:"true",expires:new Date(Date.now() + 60000),
    })
    res.redirect("/");
})
app.get("/logout",(req,res)=>{
    res.cookie("token","null",{
        httpOnly:"true",expires:new Date(Date.now()),
    })
    res.redirect("/");
})
app.get("/",(req,res) =>{
   // const loc=path.resolve()
//   res.sendFile(path.join(loc,"./ind.html")); // static html code(sendfile method is used)
  res.render("index",{name:"NIkhl Reddy"}) //dymamic data we can change html data by javascript
//   console.log(loc)
//  res.sendFile("index.html")
//  res.sendFile("index");
})
// app.get("/add",(req,res)=>{
//     Messa.create({name:"Nikhil2" ,Email:"ljijl2"}).then(()=>{
//         res.send("NICE")
//     })
// })
app.get("/success" ,(req,res)=>{
    res.render("success");
})
app.post("/contact",async(req,res) =>{
    const {name,Email} =req.body
    await Messa.create({name,Email})
    // console.log(req.body.name)
    // user.push({username:req.body.name,email:req.body.Email})
     res.redirect("/success");
})
app.get("/users",(req,res)=>{
    res.json({
        user,
    })
})
app.listen(5000 ,() => {
 console.log("server is working");
});