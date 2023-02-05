const express = require('express');
const router = express.Router();
const paymentController = require("../../controllers/payment.controller");
const verifyJWT = require('../../utils/verifyJWT');
router.route("/")
.get(paymentController.testReq)

router.route("/ssl-request/:orderid")
.get(paymentController.initiatePayment)

router.route("/ssl-payment-notification")
.post(paymentController.paymentNotification)
module.exports= router

router.route("/ssl-payment-success")
.post(paymentController.paymentSuccess) //our main work will be here

router.route("/ssl-payment-fail")
.post(paymentController.paymentFail)

router.route("/ssl-payment-cancel")
.post(paymentController.paymentCancel)

router.route("/ejs")
.get(paymentController.test)