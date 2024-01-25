//imp note///////////////// public folder is mainly used for front end development code////////////////
// import http from "http"
// // import name ,{n1,n2} from "./features.js"// u can change name to any variable 
// // import {n1,n2} from "./features.js" // u have to use onlu n1,n2
// import * as obj from "./features.js"
// import fs from 'fs'
// const home=fs.readFileSync("./index.html")
// console.log(home);
// console.log(obj)
// console.log(obj.percen())
// // console.log(name + " "+n1);
//  const server = http.createServer((req,res) =>{
//    console.log(req.method)})
// if(req.url === "/about")
//  res.end(`<h1>Love is ${obj.percen()}</h1`)
// else if(req.url === "/"){
// //   fs.readFile("./index.html" ,(err,home) => {
//       res.end(home);
//    // })
// }
// else if(req.url==="/contact")
//  res.end("<h1> Contact Page</h1>")
// else
//  res.end("<h1> page not found </h1>")
//  })
//  server.listen(5000,() =>{
//     console.log("server is working")

//  })
import express from "express";
// import path from "path"
const app =express();
app.set("view engine","ejs");
app.get("/",(req,res) =>{
   // const loc=path.resolve()
//   res.sendFile(path.join(loc,"./ind.html")); // static html code(sendfile method is used)
  res.render("index",{name:"NIkhl Reddy"}) //dymamic data we can change html data by javascript
//   console.log(loc)
})
app.listen(5000 ,() => {
 console.log("server is working");
})
