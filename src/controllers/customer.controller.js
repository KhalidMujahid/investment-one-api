const Customer = require("../models/Customer");
//const bcrypt = require("bcrypt");



// @Dec: Create account
// @Access: Public
// @Method: POST
module.exports.createAccount = async (req, res, next) => {
  try {
    const { first_name, last_name,phone_number, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({ message: "Credentials are required!" });
    }

    // first check if email does not exit
    const check = await Customer.findOne({ email });
    if (check)
      return res.status(401).send({ message: "Account with this email has already exit" });

    // hashed password
    //const hashPassword = await bcrypt.hash(password, 13);

    await Customer.create({
      first_name,
      last_name,
      phone_number,
      email,
      password,
    })
      .then((data) => res.status(201).send({ data }))
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    next(error);
  }
};

// @Dec: Login
// @Access: Private
// @Method: POST

module.exports.loginUser = async (req, res, next) => {
  try {
    // validation

    const { email, password: pass } = req.body;

    if (!email || !pass)
      return res.status(400).send({ message: "Email or Password is required" });

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
