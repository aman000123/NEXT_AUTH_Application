import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }) => {
  console.log("email", email);
  console.log("email type", emailType)
  try {
    //create token for store in databse and sent email for verify
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,
        { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })

    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "07532f54b58bde",//
        pass: "e07edd32fb3ada"
      }
    });

    const mailOptions = {
      from: '', // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here</a> to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
            or copy and paste the link below in the browser
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse

  } catch (error) {
    console.log("error in node mailer", error)
  }
}