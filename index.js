const express = require("express");
   const app = express()
     const cors = require("cors");
  const connections = require("./db")
    const userRouter = require("./routes/UserRouter");
const postRoute = require("./routes/PostRouter");
   app.use(express.json())
   const corsOptions = {
    origin: 'https://yourfrontenddomain.com',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
app.get("/",(req,res)=>{
       res.send({"msg":"welcome to the backened"})
})
app.use("/user",userRouter)
  app.use("/post",postRoute)
   app.listen(8080,async()=>{
     try {
          console.log("connected!")
            await connections 
            console.log("server is running...")
     } catch (error) {
        console.log(error)
     }
       
   })