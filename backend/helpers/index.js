const nodemailer = require("nodemailer");

const defaultEmailData = { from: "noreply@reactions.com" };

exports.sendEmail = (emailData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "joshiamit782@gmail.com",
      pass: "vxiqblkqrumvhitl",
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
