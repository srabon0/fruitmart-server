const SSLCommerzPayment = require("sslcommerz");
var uniqid = require("uniqid");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
module.exports.testReq = async (req, res, next) => {
  try {
    res.send("paymentRoute is worling");
  } catch (error) {
    next(error);
  }
};

module.exports.initiatePayment = async (req, res, next) => {
  try {
    const orderId = req.params.orderid;
    const db = getDb();
    const query = { _id: ObjectId(orderId) };
    const order = await db.collection("orders").findOne(query);
    const transaction_id = uniqid();
    const {
      _id,
      name,
      email,
      phone,
      address,
      item,
      total,
      vat,
      shippingfee,
      subtotal,
      order_date,
    } = order;
    const products = item.map((i) => i.name).join(",");
    const data = {
      total_amount: 100, //Number(subtotal), pay 100 taka for the test cz this is ssl is not freee its premium
      currency: "BDT",
      tran_id: `${transaction_id}==${_id}`,
      success_url: `${process.env.ROOT}/payment/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/payment/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/payment/ssl-payment-cancel`,
      shipping_method: "No",
      product_name: products,
      product_category: "Fruit",
      product_profile: "general",
      cus_name: name,
      cus_email: email,
      cus_add1: address,
      cus_add2: "",
      cus_city: "",
      cus_state: "",
      cus_postcode: "",
      cus_country: "Bangladesh",
      cus_phone: phone,
      cus_fax: "",
      multi_card_name: "mastercard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
      ipn_url: `${process.env.ROOT}/payment/ssl-payment-notification`,
    };
    // console.log("payment data", data);

    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    ); //true for live default false for sandbox
    sslcommerz.init(data).then((data) => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
      //console.log("payment operation", data)

      if (data?.GatewayPageURL) {
        return res.status(200).redirect(data?.GatewayPageURL);
      } else {
        // return res.status(400).json({
        //   message: "Session was not successful",
        // });
        return res.status(200).render("success",{ payment_data:req.body, message:"Session Was not Successfull"});
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports.paymentNotification = async (req, res, next) => {
  /**
   * If payment notification
   */
  try {
    return res.status(200).json({
      data: req.body,
      message: "Payment notification",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.paymentSuccess = async (req, res, next) => {
  /**
   * If payment successful
   */

  try {
    const valid = req.body.tran_id.split("==");
    const db = getDb();
    const p_date = new Date().toISOString();
    const query = { _id: ObjectId(valid[1]) };
    await db
      .collection("orders")
      .updateOne(
        query,
        {
          $set: {
            payment: "pending",
            transaction_id: valid[0],
            payment_date: p_date,
          },
        },
        { upsert: true }
      );
    // console.log(valid[1]);
    const newData = {...req.body,tran_id:valid[0]}
    // return res.status(200).json({
    //   data: { ...req.body, tran_id: valid[0] },
    //   message: "Payment successfull",
    // });
    // console.log("payemnet success",newData)
    return res.status(200).render("success",{ payment_data:newData, message:"Your Payment is Successfull"});
  } catch (error) {
    next(error);
  }
};

module.exports.paymentFail = async (req, res, next) => {
  try {
    /**
     * If payment failed
     */

    // return res.status(200).json({
    //   data: req.body,
    //   message: "Payment failed",
    // });
    return res.status(200).render("success",{ data:req.body, message:"Payment Failed"});
  } catch (error) {
    next(error);
  }
};

module.exports.paymentCancel = async (req, res, next) => {
  try {
    /**
     * If payment cancelled
     */

    // return res.status(200).json({
    //   data: req.body,
    //   message: "Payment cancelled",
    // });

    return res.status(200).render("success",{ data:req.body, message:"Payment cancelled"});
  } catch (error) {
    next(error);
  }
};

module.exports.test = async (req, res, next) => {
  return res.status(200).render("success",{});
};
