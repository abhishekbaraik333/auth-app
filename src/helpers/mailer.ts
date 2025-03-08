import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userID }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userID.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "truevolve28@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "reset your password"
      }</p>`,
    };

  const mailresponse = await transporter.sendMail(mailOptions)
  return mailresponse

  } catch (error: any) {
    throw new Error("Sending Email Error:", error.message);
  }
};
