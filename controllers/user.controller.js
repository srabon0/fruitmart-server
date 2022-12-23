const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
const jwt = require('jsonwebtoken');

module.exports.addAuser = async(req,res,next)=>{
  try {
    const userCollection = getDb()
    const userData = req.body
    const token = jwt.sign(userData,process.env.ACCESS_TOKEN_ENC_KEY);
    console.log("IT WILLBE SENT TO FRONTEND",token)
    // const insertResult = await userCollection.collection("users").insertOne(userData);
    res.status(200).json({success:true,token:token })
  } catch (error) {
    next(error)
  }
}
