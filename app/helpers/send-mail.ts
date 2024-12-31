import nodemailer from "nodemailer";

export const sendMail = async (
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
};
