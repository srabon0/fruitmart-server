const express = require('express');
const router = express.Router();
const orderController = require("../../controllers/orders.controller");
const verifyJWT = require('../../utils/verifyJWT');

router.route("/")
.get(orderController.getAllOrder)

router.route("/userwise/:email")
.get(orderController.getUserWiseOrder)

router.route("/place-order") 
.post(verifyJWT,orderController.placeAnOrder)

router.route("/confirm-shipping") 
.post(orderController.verifyShipmentByAdmin)

  module.exports = router;