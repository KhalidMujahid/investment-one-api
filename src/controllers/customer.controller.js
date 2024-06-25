const axios = require('axios');
const nodemailer = require('nodemailer');
const Customer = require("../models/Customer");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://investment-one-api.onrender.com/auth/google/callback';


const transporter = nodemailer.createTransport({
port: 465,
host: "smtp.gmail.com",
   auth: {
        user: process.env.USER,
        pass: process.env.PASS,
     },
secure: true,
});


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

    // console.log(profile);

    res.redirect(`https://investments-one.netlify.app/redirect/confirm-signup/${profile.id}`);
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

    const mailData = {
from: process.env.USER,
  to: email,
  subject: 'Investment One',
  text: 'Generated link',
  html: '<b>Hey there! </b> <br> <a href="https://investments-one.netlify.app/redirect/confirm-signup">Login</a>',
};

   transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     res.status(200).send(info);
});
  } catch (error) {
    next(error);
  }
};
