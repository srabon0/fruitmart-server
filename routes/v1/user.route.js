const express = require('express');
const router = express.Router();
const userControllers = require("../../controllers/user.controller");
router
  .route("/login")
  .post(userControllers.addAuser)


  module.exports = router;