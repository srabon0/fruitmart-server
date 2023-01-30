const express = require('express');
const router = express.Router();
const paymentController = require("../../controllers/payment.controller");
const verifyJWT = require('../../utils/verifyJWT');
router.route("/")
.get(paymentController.testReq)

router.route("/ssl-request/:orderid")
.get(paymentController.initiatePayment)

module.exports= router