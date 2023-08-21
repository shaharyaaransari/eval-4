const mongoose = require("mongoose");

   const userSchema = mongoose.Schema({
      name:{type:String,require:true},
      email:{type:String,require:true},
      password:{type:String,require:true},
       gender:{type:String,require:true},
       city:{type:String,require:true},
      age:{type:Number,require:true},
      is_married:{type:Boolean,require:true},
         
   })


    const UserModel = mongoose.model("UserDetail",userSchema) 

      module.exports = UserModel