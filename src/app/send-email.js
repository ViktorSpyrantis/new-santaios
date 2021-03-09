const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance 
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({origin: "*" }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'osantaios@gmail.com',
    pass: 'amvko1968'
  }
});

var mailOptions = {
  from: `"Santaios", "osantaios@gmail.com"`,
  to: 'viktorneasanta@gmail.com',
  subject: 'Test Email using Node.js',
  text: `Body of email`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

// var sendEmail = () => {

// }
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.post("/sendmail2", (req, res) => {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
