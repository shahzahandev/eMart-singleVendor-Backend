 const nodemailer = require("nodemailer");
 
 // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });


exports.verifyEmail = async(token, email) => {
          try {
            const info = await transporter.sendMail({
                from: `"eMart Ecommerce", ${process.env.EMAIL_PASSWORD}`, // sender address
                to: email, 
                subject: "Please verify your email", // subject line
                html: `<body style=margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif><table cellpadding=0 cellspacing=0 style="padding:20px 10px"width=100%><tr><td align=center><table cellpadding=0 cellspacing=0 style=background:#fff;border-radius:10px;overflow:hidden width=600><tr><td style=background:#28a745;padding:25px;text-align:center;color:#fff><h1 style=margin:0>eMart Ecommerce</h1><p style="margin:5px 0">• With Your Turst<tr><td style=padding:30px;text-align:center><h2 style=color:#333>Verify Your Email</h2><p style=color:#555;line-height:1.6;font-size:15px>Welcome to <strong>eMart Ecommerce</strong> <br>Please confirm your email address to activate your account.<div style="margin:30px 0"><a href="http://localhost:5173/verifyemail/${token}" style="background:#28a745;color:#fff;padding:14px 30px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block">Verify Email</a></div><p style=color:#777;font-size:13px>If the button doesn't work, copy and paste this link into your browser:<p style=color:#28a745;font-size:13px;word-break:break-all>"http://localhost:5173/verifyemail/${token}"<p style=color:#999;font-size:13px;margin-top:20px>This link will expire soon for security reasons.<p style=color:#999;font-size:13px>If you didn’t create an account, you can safely ignore this email.<tr><td style=background:#f1f1f1;padding:20px;text-align:center;font-size:12px;color:#777><p style=margin:5px>© 2026 eMart Ecommerce. All rights reserved.<p style=margin:5px>Dhaka, Bangladesh<br>support@emartecommerce.com</table></table></body>`,
        });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
            console.error("Error while sending mail:", err);
        }

}

exports.resetEmailVerification = async(token, email) => {
          try {
            const info = await transporter.sendMail({
                from: `"eMart Ecommerce", ${process.env.EMAIL_PASSWORD}`, // sender address
                to: email, 
                subject: "Please verify your email", // subject line
                html: `<body style=margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif><table cellpadding=0 cellspacing=0 style="padding:20px 10px"width=100%><tr><td align=center><table cellpadding=0 cellspacing=0 style=background:#fff;border-radius:10px;overflow:hidden width=600><tr><td style=background:#dc3545;padding:25px;text-align:center;color:#fff><h1 style=margin:0>eMart Ecommerce</h1><p style="margin:5px 0">🔒 Secure Password Reset<tr><td style=padding:30px;text-align:center><h2 style=color:#333>Reset Your Password</h2><p style=color:#555;line-height:1.6;font-size:15px>We received a request to reset the password for your <strong>eMart Ecommerce</strong> account.<p style=color:#555;line-height:1.6;font-size:15px>Click the button below to create a new password.<div style="margin:30px 0"><a href=http://localhost:5173/resetpassword/${token} style="background:#dc3545;color:#fff;padding:14px 30px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block">Reset Password</a></div><p style=color:#777;font-size:13px>If the button doesn't work, copy and paste this link into your browser:<p style=color:#dc3545;font-size:13px;word-break:break-all>http://localhost:5173/resetpassword/${token}<p style=color:#999;font-size:13px;margin-top:20px>This password reset link will expire soon for your security.<p style=color:#999;font-size:13px>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.<tr><td style=background:#f1f1f1;padding:20px;text-align:center;font-size:12px;color:#777><p style=margin:5px>© 2026 eMart Ecommerce. All rights reserved.<p style=margin:5px>Dhaka, Bangladesh<br>support@emartecommerce.com</table></table>`
  
        });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
            console.error("Error while sending mail:", err);
        }

}


  