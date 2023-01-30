const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllFruits = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();

    // cursor => toArray(), forEach()
    const fruits = await db
      .collection("fruits")
      .find({})
      // .project({ _id: 0 })
      // .skip(+page * limit)
      // .limit(+limit)
      .toArray();
       fruits
      .sort((a, b) => a.name.localeCompare(b.name))
    res.status(200).json({ success: true, fruits: fruits });
  } catch (error) {
    next(error);
  }
};

module.exports.getASingleFruit =  async(req,res,next)=>{
  try {
    const fruitCollection = getDb()
    const fruitID =  req.params.id
    const query = {_id:ObjectId(fruitID)}
    const singleFruit = await fruitCollection.collection("fruits").findOne(query)
    res.status(200).json({ success: true, fruit: singleFruit });
  } catch (error) {
    next(error)
  }
}
module.exports.deleteASingleFruit =  async(req,res,next)=>{
  try {
    const fruitCollection = getDb()
    const fruitID =  req.params.id
    const query = {_id:ObjectId(fruitID)}
    const singleFruit = await fruitCollection.collection("fruits").deleteOne(query)
    res.status(200).json({ success: true, operation:singleFruit });
  } catch (error) {
    next(error)
  }
}

module.exports.addAFruit = async(req,res,next)=>{
  try {
    const fruitCollection = getDb()
    const fruitData = req.body
    const insertResult = await fruitCollection.collection("fruits").insertOne(fruitData)
    res.status(200).json({success:true,insertResult})
  } catch (error) {
    next(error)
  }
}
module.exports.updateAFruit = async(req,res,next)=>{
  try {
    const fruitCollection = getDb()
    const fruitId  = req.params.id
    const query = {_id:ObjectId(fruitId)} 
    const {name,price,inStock,picture,quantity,description,company} = req.body

    console.log("receive updated data", req.body);
    const updateResult = await fruitCollection.collection("fruits").updateOne(query,{$set:{"name":name,"price":price,"inStock":inStock,"picture":picture,"quantity":quantity,"description":description,"company":company}},{ upsert: true });
    res.status(200).json({success:true,updateResult})
    
  } catch (error) {
    next(error)
  }
}