const express = require('express');
const router = express.Router();
const fruitsControllers = require("../../controllers/fruits.controller");
const verifyJWT = require('../../utils/verifyJWT');
router
  .route("/")
  .get(fruitsControllers.getAllFruits)

  router.route("/:id")
  
  .get(verifyJWT,fruitsControllers.getASingleFruit)
  .delete(verifyJWT,fruitsControllers.deleteASingleFruit)

  router.route("/addfruit")
  .post(fruitsControllers.addAFruit)
  router.route("/update-fruit/:id")
  .put(fruitsControllers.updateAFruit)

 

  module.exports = router;