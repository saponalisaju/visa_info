const nodemailer = require("nodemailer");
const logger = require("../controllers/loggerController");
const { smtpEmail, smtpPass } = require("../../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpEmail || "australiaamig@gmail.com",
    pass: smtpPass,
  },
});

const sendEmail = async (userEmail, userName, subject, message) => {
  try {
    const mailOption = {
      from: '"No Reply" <no-reply@australiaworksvisas.com>',
      to: userEmail,
      subject: subject,
      text: `Dear ${userName},\n\n${message}\n\nBest regards. Click here https://www.worldvisa.info for more updates`,
    };
    const info = await transporter.sendMail(mailOption);
    logger.log("info", "message sent: %s", info.response);
  } catch (error) {
    logger.log("error", "Error occurred with sending email: ", error);
    throw error;
  }
};

const sendEmailApplicationApproved = async (userEmail, userName) => {
  const subject = "Application Approved";
  const message = "Your manpower is ready to stay in the country. Thank you.";
  await sendEmail(userEmail, userName, subject, message);
};
const sendEmailJobLetter = async (userEmail, userName) => {
  const subject = "Application Pending";
  const message =
    "Your job letter is ready to join the job. Please check your documents.";
  await sendEmail(userEmail, userName, subject, message);
};

const sendEmailLmiAs = async (userEmail, userName) => {
  const subject = "Application Pending";
  const message =
    "LMIA is perfect for you. Complete the next step as soon as possible. Please check your documents.";
  await sendEmail(userEmail, userName, subject, message);
};

const sendEmailVisa = async (userEmail, userName) => {
  const subject = "Application Pending";
  const message =
    "Thank you, You have successfully completed your steps. At this step your VISA/Visa Form is ready to travel to your new address. Best of luck.";
  await sendEmail(userEmail, userName, subject, message);
};

const sendEmailWorkPermits = async (userEmail, userName) => {
  const subject = "Application for update";
  const message =
    "Permit ready for work opportunities in Australia. Please check your documents.";
  await sendEmail(userEmail, userName, subject, message);
};

module.exports = {
  sendEmailApplicationApproved,
  sendEmailJobLetter,
  sendEmailLmiAs,
  sendEmailVisa,
  sendEmailWorkPermits,
};
