const nodemailer = require("nodemailer");

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

// Send email
const mailOptions = {
  from: "your-gmail-account@gmail.com",
  to: "recipient@example.com",
  subject: "Test Email",
  text: "This is a test email sent from Node.js using Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error occurred:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
