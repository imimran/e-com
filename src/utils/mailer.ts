
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7daaf41c2c28b1",
      pass: "c2a857edcb6065"
    }
  });

