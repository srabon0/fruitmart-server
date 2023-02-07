
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
module.exports.placeAnOrder = async(req,res,next)=>{
    try {
      const orderCollection = getDb()
      const orderData = req.body
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
      const orders = await db
        .collection("orders")
        .find({})
        // .project({ _id: 0 })
        // .skip(+page * limit)
        // .limit(+limit)
        .toArray();
      res.status(200).json({ success: true, orders: orders });
    } catch (error) {
      next(error);
    }
  };


  module.exports.getUserWiseOrder = async (req, res, next) => {
    try {
      // const { limit, page } = req.query;
      const email = req.params.email
      console.log("query email ",email)
      const db = getDb();
      const query = {email:email}
  
      // cursor => toArray(), forEach()
      const orders = await db
        .collection("orders")
        .find(query)
        // .project({ _id: 0 })
        // .skip(+page * limit)
        // .limit(+limit)
        .toArray();
      res.status(200).json({ success: true, userorder: orders });
    } catch (error) {
      next(error);
    }
  };

  
module.exports.verifyShipmentByAdmin = async (req, res, next) => {
  try {
    const orderId = req.body.order_id;
    console.log("verifying", orderId);
    const db = getDb();
    const query = { _id: ObjectId(orderId) };
    const result = await db.collection("orders").updateOne(query, {
      $set: {
        shipment_status: "delivered",
      },
    });

    res.status(200).json({ success: true, message: "Order Send For Delivery",result:result });
  } catch (error) {
    next(error);
  }
};