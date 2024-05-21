const { Router } = require("express");
const {
  createAccount,
  loginUser,
} = require("../controllers/customer.controller");


const CustomerRouter = Router();

// @Dec: create account
// @Method: POST
// @Access: Public
CustomerRouter.post("/create", createAccount);

// @Dec: Login user
// @Method: POST
// @Access: Private
CustomerRouter.post("/login", loginUser);


module.exports = CustomerRouter;
