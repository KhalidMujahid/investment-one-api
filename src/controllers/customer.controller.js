const axios = require('axios');
const Customer = require("../models/Customer");

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = '<https://investment-one-api.onrender.com/auth/google/callback>';


// @Dec: google
// @Access: Private
// Method: Get
module.exports.loginwithGoogle = async (req,res,next) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.status(200).send(url);
};

// @Dec: google
// @Access: Private
// Method: Get
module.exports.loginGoogle = async (req, res,next) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.redirect('/');
  } catch (error) {
    next(error);
  }
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
