const express = require('express');
const router = express.Router();
const userControllers = require("../../controllers/user.controller");

router
  .route("/validate")
  .post(userControllers.validateUser)

router.route("/admin/:email") 
      .get(userControllers.checkUserAdmin)

router.route("/current/:email") 
      .get(userControllers.getCurrentUserInformation)

  module.exports = router;