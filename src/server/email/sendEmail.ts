import nodeMailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("seqSaac:sendEmail:");

const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    const transporter = nodeMailer.createTransport(
      nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY })
    );

    await transporter.sendMail({
      from: "seqsaac@gmail.com",
      to: email,
      subject,
      html: text,
    });

    debug(chalk.blueBright(email));
  } catch (error) {
    debug(chalk.blueBright(error));
  }
};

export default sendEmail;
