const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
const jwt = require('jsonwebtoken');

module.exports.validateUser = async(req,res,next)=>{
  try {
    const db = getDb()
    const userData = req.body
    const query = {email:userData.email}
    const findUser = await db.collection("users").findOne(query)
    if(!findUser){
      await db.collection("users").insertOne({role:"user",email:req.body.email});
    }
    const token = jwt.sign(userData,process.env.ACCESS_TOKEN_ENC_KEY);
    res.status(200).json({success:true,token:token })  
  } catch (error) {
    next(error)
  }
}

module.exports.checkUserAdmin =  async(req,res,next)=>{
  try {
    const adminEmail =req.params.email
    console.log("admin email",adminEmail);
    res.send({isAdmin:"Admin"})
    
  } catch (error) {
    next(error);
    
  }
}
