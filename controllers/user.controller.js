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
    res.status(200).json({success:true,token:token,currentuser:userData.email })  
  } catch (error) {
    next(error)
  }
}

module.exports.checkUserAdmin =  async(req,res,next)=>{
  try {
    const db=getDb()
    const query = {email:req.params.email}
    const result = await db.collection('users').findOne(query)
    if(result.role=='Admin'){
      res.send({isAdmin:"Admin"})
    } else{
      res.send({isAdmin:false})
    }
   
    
  } catch (error) {
    next(error);
    
  }
}

module.exports.getCurrentUserInformation =  async(req,res,next)=>{
  try {
    const db=getDb()
    const query = {email:req.params.email}
    const result = await db.collection('users').findOne(query)
    res.status(200).json({success:true,userdata:result})
   
    
  } catch (error) {
    next(error);
    
  }
}
