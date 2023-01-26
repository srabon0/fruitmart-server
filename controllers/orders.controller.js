
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
module.exports.placeAnOrder = async(req,res,next)=>{
    try {
      const orderCollection = getDb()
      const orderData = req.body
      console.log("createing order",req.body)
      const insertResult = await orderCollection.collection("orders").insertOne(orderData)
      res.status(200).json({success:true,insertResult})
    } catch (error) {
      next(error)
    }
  }

  module.exports.getAllOrder = async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const db = getDb();
  
      // cursor => toArray(), forEach()
      const fruits = await db
        .collection("orders")
        .find({})
        // .project({ _id: 0 })
        // .skip(+page * limit)
        // .limit(+limit)
        .toArray();
      res.status(200).json({ success: true, fruits: fruits });
    } catch (error) {
      next(error);
    }
  };