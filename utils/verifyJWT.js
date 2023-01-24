const jwt = require('jsonwebtoken');
require("dotenv").config();
function verifyJWT(req, res, next){
  console.log("middleware hit");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "UnAuthorized access" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_ENC_KEY, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      req.decoded = decoded;
      next();
    });
  }
module.exports =  verifyJWT


  /**
   * NOW we will destroy the token and verify route access
   */