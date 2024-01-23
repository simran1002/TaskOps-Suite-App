require("dotenv").config();

const { response } = require("express");
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.USER_EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Cron job to send daily summary email at 8 AM
cron.schedule('0 8 * * *', async () => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: res.body,
    subject: 'Daily Summary',
    text: 'Here is your daily summary email.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Daily summary email is sent successfully');
  } catch (error) {
    console.error('Error sending daily summary email:', error.message);
  }
});
