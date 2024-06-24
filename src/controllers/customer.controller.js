const Customer = require("../models/Customer");

// @Dec: Login
// @Access: Private
// @Method: POST

module.exports.loginUser = async (req, res, next) => {
  try {
    // validation
    const { email } = req.body;

    if (!email)
      return res.status(400).send({ message: "Email is required" });

    // check if user exit
    const userCheck = await Customer.findOne({ email });
    if (userCheck) {
        return res.status(200).send({ user: userCheck });
      } else {
        // save the email first
       const user = await Customer.create({ email });
        return res.status(200).send({ user });
    } 
  } catch (error) {
    next(error);
  }
};
