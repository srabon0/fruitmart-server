const express = require('express');
const router = express.Router();
const fruitsControllers = require("../../controllers/fruits.controller");
router
  .route("/")
  .get(fruitsControllers.getAllFruits)



  router.route("/:id")
  .get(fruitsControllers.getASingleFruit)


  module.exports = router;