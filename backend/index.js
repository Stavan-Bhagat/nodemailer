const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv").config();
const email = process.env.EMAIL;
const origin = process.env.ORIGIN;
const cors = require("cors");
const open = require("opn");

app.use(cors({ origin: origin }));
app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Create an OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    // Generate an authorization URL
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://mail.google.com/"],
    });

    // Open the authorization URL in the default browser
    open(authorizeUrl);

    res.status(200).send("Authorization URL opened in the browser");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Failed to open authorization URL");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// code ------------
// const express = require("express");
// const app = express();
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const dotenv = require("dotenv").config();
// const email = process.env.EMAIL;
// const password = process.env.PASSWORD;
// const origin = process.env.ORIGIN;
// const cors = require("cors");
// const open = require("opn");

// app.use(cors({ origin: origin }));
// app.use(express.json()); // Middleware to parse JSON request bodies

// app.post("/send-email", async (req, res) => {
//   try {
//     const { to, subject, text } = req.body;

//     // Create an OAuth2 client
//     const oAuth2Client = new google.auth.OAuth2(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       process.env.REDIRECT_URI
//     );

//     // Generate an authorization URL
//     const authorizeUrl = oAuth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: ["https://mail.google.com/"],
//     });

//     // Open the authorization URL in the default browser
//     open(authorizeUrl);

//     // Wait for the user to authorize the application and obtain the authorization code

//     // Assuming the authorization code is obtained and stored in a variable named 'code'
//     const code = ""; // Paste the authorization code obtained from the browser here

//     // Exchange authorization code for access token and refresh token
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     // Create a transporter object using OAuth2
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: email,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         // refreshToken: tokens.refresh_token,
//         // accessToken: tokens.access_token,
//       },
//     });

//     // Set up email data
//     const mailOptions = {
//       from: email,
//       to: to,
//       subject: subject,
//       text: text,
//     };

//     // Send mail with defined transport object
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     res.status(200).send("Email sent successfully");
//   } catch (error) {
//     console.error("Error occurred:", error);
//     res.status(500).send("Failed to send email");
//   }
// });

// app.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });

// const express = require("express");
// const app = express();
// const nodemailer = require("nodemailer");
// const { google } = require('googleapis');
// const dotenv = require("dotenv").config();
// const email = process.env.EMAIL;
// const password = process.env.PASSWORD;
// const origin = process.env.ORIGIN;
// const cors = require("cors");
// app.use(cors({ origin: origin }));
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host:"smtp.gmail.com",
//   auth: {
//     user: email,
//     pass: password,
//   },
// });

// app.use(express.json()); // Middleware to parse JSON request bodies

// app.post("/send-email", (req, res) => {
//   const { to, subject, text } = req.body;

//   const mailOptions = {
//     from: email,
//     to: to,
//     subject: subject,
//     text: text,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error occurred:", error);
//       res.status(500).send("Failed to send email");
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).send("Email sent successfully");
//     }
//   });
// });

// app.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });
