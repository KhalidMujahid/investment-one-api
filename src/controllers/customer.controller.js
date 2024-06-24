const Customer = require("../models/Customer");


module.exports.generateURL = async (req,res,next) => {
  
}

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
      const verifyPassword = await bcrypt.compare(pass, userCheck.password);
      if (verifyPassword) {
        const { password, createdAt, updatedAt, ...others } = userCheck._doc;
        return res.status(200).send({ user: others });
      } else {
        return res.status(401).send({ message: "Invalid Email or password is invalid" });
      }
    } else {
      return res.status(401).send({ message: "Invalid Email or password is invalid" });
    }
  } catch (error) {
    next(error);
  }
};
