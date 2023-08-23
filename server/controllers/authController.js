import authModel from "../models/authModel.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import Token from "../models/token.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";

class authController {
  static userRegistration = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      if (firstName && lastName && email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          return res.status(400).json({ message: "user Already Exists" });
        } else {
          // Password Hashing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          const newUser = authModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isVerified: false,
          });

          const resUser = await newUser.save();


          // Generate Token
          const token = await new Token({
            userId: resUser._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const link = `${process.env.BASE_URL}/api/auth/${token.userId}/verify/${token.token}`;
          sendEmailtoUser(link, email)
            .catch((error) => {
              res.status(400).json({ message: "Error sending email" });
            });
          // save the user
          if (resUser) {
            return res
              .status(201)
              .send({ message: "An Email sent to your account please verify" });
          }
        }
      } else {
        return res.status(400).json({ message: "all fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };


  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isUser = await authModel.findOne({ email: email });

        if (isUser) {
          // Check is User Verified
          // const isVerifiedProfile = await authModel.findById(isUser._id);
          if (isUser.isVerified) {
            if (
              email === isUser.email &&
              (await bcryptjs.compare(password, isUser.password))
            ) {
              // Generate token
              const token = jwt.sign(
                { userID: isUser._id },
                isUser.email + process.env.JWTPRIVATEKEY,
                {
                  expiresIn: "2d",
                }
              );
              return res.status(200).json({
                message: "Login Successfully!",
                token,
                email: isUser.email,
                name: isUser.firstname +" "+ isUser.lastname,
                locker: isUser.locker,
                rfid: isUser.rfid,
                tutorial: isUser.tutorial,
              })
            } else {
              return res.status(400).json({ message: "Invalid Credentials!" });
            }
          } else {
            return res
              .status(400)
              .json({ message: "Email Verification Pending" });
          }
        } else {
          return res.status(400).json({ message: "user Not Registered!!" });
        }
      } else {
        return res.status(400).json({ message: "all fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static changePassword = async (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    try {
      if (newpassword === confirmpassword) {
        const gensalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, gensalt);
        await authModel.findByIdAndUpdate(req.user._id, {
          password: hashedPassword,
        });
        return res
          .status(200)
          .json({ message: "password Changed Successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "password and confirm password does not match" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (email) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          // generate token
          const secretKey = isUser._id + "pleaseSubscribe";

          const token = jwt.sign({ userID: isUser._id }, secretKey, {
            expiresIn: "5m",
          });

          const link = `http://localhost:3000/user/reset/${isUser._id}/${token}`;

          // email sending
          const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Password Reset Request`,
            text: text(link),
            html: html(link),
          };

          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(400).json({ message: "Error" });
            }
            return res.status(200).json({ message: "Email Sent" });
          });
        } else {
          return res.status(400).json({ message: "Invalid Email" });
        }
      } else {
        return res.status(400).json({ message: "email is required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static forgetPasswordEmail = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;

    try {
      if (newPassword && confirmPassword && id && token) {
        if (newPassword === confirmPassword) {
          // token verifiying
          const isUser = await authModel.findById(id);
          const secretKey = isUser._id + "pleaseSubscribe";
          const isValid = await jwt.verify(token, secretKey);
          if (isValid) {
            // password hashing

            const genSalt = await bcryptjs.genSalt(10);
            const hashedPass = await bcryptjs.hash(newPassword, genSalt);

            const isSuccess = await authModel.findByIdAndUpdate(isUser._id, {
              $set: {
                password: hashedPass,
              },
            });

            if (isSuccess) {
              return res.status(200).json({
                message: "Password Changed Successfully",
              });
            }
          } else {
            return res.status(400).json({
              message: "Link has been Expired",
            });
          }
        } else {
          return res
            .status(400)
            .json({ message: "password and confirm password does not match" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static saveVerifiedEmail = async (req, res) => {
    try {
      const user = await authModel.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send({ message: "Invalid link" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      }).exec();
      // token verify
      if (!token) return res.status(400).send({ message: "Invalid link" });
      const verifyEmail = await authModel.updateOne({ _id: user._id, isVerified: true });
      const deletionResult = await Token.deleteOne({
        userId: user._id,
        token: req.params.token,
      });

      if (verifyEmail && deletionResult) {
        return res
          .status(200)
          .json({ message: "Email Verification Success" });
      }

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default authController;
function html(link) {
  return `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${link}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`

}

function text(link) {
  return `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href=${link}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`
}
