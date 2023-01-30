const SSLCommerzPayment = require("sslcommerz");

module.exports.testReq = async (req, res, next) => {
  try {
    res.send("paymentRoute is worling");
  } catch (error) {
    next(error);
  }
};

module.exports.initiatePayment = async (req, res, next) => {
  try {
    const orderId = req.params.orderid; //we sent the order id from the front end because there is some cors error that we cant access directly formt sslcommerz
    console.log("got the order id", orderId);
    const data = {
      total_amount: 100,
      currency: "BDT",
      tran_id: "REF123",
      success_url: `${process.env.ROOT}/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
      shipping_method: "No",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "cust@yahoo.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01681888025",
      cus_fax: "01711111111",
      multi_card_name: "mastercard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
      ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
    };

    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    ); //true for live default false for sandbox
    sslcommerz.init(data).then((data) => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters

      if (data?.GatewayPageURL) {
        return res.status(200).redirect(data?.GatewayPageURL);
      } else {
        return res.status(400).json({
          message: "Session was not successful",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
