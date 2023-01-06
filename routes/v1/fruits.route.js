const express = require('express');
const router = express.Router();
const fruitsControllers = require("../../controllers/fruits.controller");
const verifyJWT = require('../../utils/verifyJWT');
router
  .route("/")
  .get(fruitsControllers.getAllFruits)

  router.use('/:id',verifyJWT)
  router.route("/:id")
  
  .get(fruitsControllers.getASingleFruit)

  router.route("/addfruit")
  .post(fruitsControllers.addAFruit)


  module.exports = router;