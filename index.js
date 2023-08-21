const express = require("express");
   const app = express()
     const cors = require("cors");
  const connections = require("./db")
    const userRouter = require("./routes/UserRouter");
const postRoute = require("./routes/PostRouter");
   app.use(express.json())
  app.use(cors())
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