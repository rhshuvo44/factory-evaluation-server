import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: '',
      pass: '',
    },
  })

  await transporter.sendMail({
    from: 'rhsuvo44@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html: `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 2rem auto;
            border: 1px solid #dddddd;
        }

        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }

        .footer {
            padding: 10px 0;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>Reset Your Password</h2>
        </div>
        <div class="content">
            <p>Hi <%= firstName %>,</p>
            <p>We received a request to reset your password. Click the button below to reset your password.</p>
            <p style="text-align: center;">
                <a href=${resetLink} class="button"><span style="color: #ffffff;">Reset Password</span></a>
            </p>
            <p>If you did not request a password reset, please ignore this email or contact support if you have
                questions.</p>
            <p>Thanks,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Sarkar Group. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
    `// html body
  })
}
