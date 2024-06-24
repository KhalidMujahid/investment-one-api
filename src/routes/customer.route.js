const { Router } = require("express");
const {
  loginUser,
  loginwithGoogle,
  loginGoogle
} = require("../controllers/customer.controller");


const CustomerRouter = Router();

Customer.get("/auth/google",loginwithGoogle);


Customer.get("/auth/google/callback",loginGoogle);

// @Dec: Login user
// @Method: POST
// @Access: Private
CustomerRouter.post("/login", loginUser);


module.exports = CustomerRouter;
