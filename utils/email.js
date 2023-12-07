const nodemailer = require("nodemailer");

module.exports = (recipient, url, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        body {
          background-color: rgb(246, 156, 71);
          background: linear-gradient(
            90deg,
            rgba(246, 156, 71, 1) 0%,
            rgba(191, 94, 3, 1) 46%,
            rgba(247, 161, 81, 1) 100%
          );
        }
        h1,
        h2 {
          color: #353535;
          margin: 30px;
        }
        a.activate-btn {
          background-color: #353535;
          padding: 20px 30px;
          color: #000;
          border-radius: 20px;
          margin: 30px;
        }
      </style>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>To Do List</title>
      <link rel="stylesheet" href="/css/style.css" />
    </head>
    <body class="activation-page">
      <h1>Welcome, ${name}</h1>
      <h2>Click the button below to activate your account!</h2>
      <a class="activate-btn" href="${url}">Activate</a>
  
      <script type="module" src="/js/index.js"></script>
    </body>
  </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient,
    subject: "Account Activation",
    html: emailContent,
  };

  transporter.sendMail(mailOptions);
};
