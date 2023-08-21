const mongoose = require("mongoose");

   const PostSchema = mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true},
    no_of_comments:{type:Number,require:true},
       userID:{type:String},
       user:{type:String,},
      
         
   })


    const PostModel = mongoose.model("Post",PostSchema) 

      module.exports = PostModel