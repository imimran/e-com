import nodemailer from "nodemailer";
import { MAIL_USER, MAIL_PASSWORD } from "../config";

export const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});
