const mongoose  = require("mongoose")

const myschema= new mongoose.Schema({
    username:String,
    rollno:Number,
   email:String,
  })

module.exports  = new mongoose.model("crud",myschema)
