import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to: to,
    from: {
      name: 'Mindora',
      email: 'mindora.care@gmail.com',
    },
    subject: subject,
    html: html,
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (error) {
    console.error('Error sending email:', error.response.body)
  }
}
