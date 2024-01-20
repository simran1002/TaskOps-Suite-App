// dailySummaryEmail.js
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Set up your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Cron job to send daily summary email at 8 AM
cron.schedule('0 8 * * *', async () => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'Daily Summary',
    text: 'Here is your daily summary email.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Daily summary email sent successfully');
  } catch (error) {
    console.error('Error sending daily summary email:', error.message);
  }
});
