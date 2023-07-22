const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

// Create a transport object using Gmail SMTP

let email = [
    "ritishtejpal.bt21cse@pec.edu.in",
    "madhav.bt21mech@pec.edu.in",
    "dhawalarora.bt21cse@pec.edu.in",
    "yuvrajsinghbirdi.bt21cse@pec.edu.in",
    "akshajpaintola.bt21ece@pec.edu.in",
];

const cronString = '* * * * *';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "muzik.pec@gmail.com",
        pass: "rwvblwdmbozpetnj", // Replace with your Gmail app password
    },
});

// Email content
const mailOptions = {
    from: "muzik.pec@gmail.com", // Replace with your Gmail address
    to: email, // Replace with the recipient email addresses (separated by commas)
    subject: "Website chal rahi pancho",
    text: "Hoju Hoju",
};

// Send the email

const emailHandler = () => {
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error.message);
    } else {
      console.log("Email sent successfully!");
      console.log("Message ID:", info.messageId);
    }
  });
};
module.exports =  emailHandler;
