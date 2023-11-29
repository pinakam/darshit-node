const person = require("../schema")
const db = require("../config/database")
exports.adduser=async(req,res)=>{
    try{
      const new_data = new person(req.body)
      console.log(new_data)
      await new_data.save()
      res.status(200).json({
        success:true,
        meassage:"user added successfully"
      })
    }
    catch(error){
      console.log(error)
    }
  }


exports.readuser=async(req,res)=>{
    try{
        const data =await person.find()
        //console.log("userid is :",req.params.id)
        res.send(data)
        console.log(data)
    }
    catch(err){
      console.log(err)
          res.status(404).json({
            success:false,
            message:"data not found"
          })
          console.log("there is no data")
    }
  }



exports.readuserbyid=async(req,res)=>{
    try{
      const data= await person.findById(req.params.id)
      console.log(data)
      res.send(data)
    }
    catch(err){
      console.log(err)
      res.status(404).json({
        success:false,
        message:"there is no data for the above id"
      })
    }
  }


  exports.updateuser=async(req,res)=>{
    try{
      const { name, value: newValue } = req.params;
        const data = await person.findOneAndUpdate({username:name},{ $set:{username:newValue}},{new:true})
        console.log(data)
        res.send(data)
    }
    catch(err){
      console.log(err)
      res.status(404).json({
        success:false,
        message:"no data found"
      })
    }
  }


exports.deleteuser=async(req,res)=>{
    try{
      const data = await person.findOneAndDelete({username:req.params.name})
      console.log(data)
      res.send(data)
    }
    catch(err){
      console.log(err)
      res.status(404).json({
        success:false,
        message:"there is no data in the database for above name"
      })
    }
  }