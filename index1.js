import express, { json } from "express";
import path from "path"
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