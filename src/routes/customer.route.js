const { Router } = require("express");
const {
  loginUser,
} = require("../controllers/customer.controller");


const CustomerRouter = Router();

// @Dec: Login user
// @Method: POST
// @Access: Private
CustomerRouter.post("/login", loginUser);


module.exports = CustomerRouter;
