import { Request, Response, Router } from 'express'
import nodemailer from 'nodemailer'

const emailRouter = Router()
  .post('/', async(req: Request, res: Response, next) => {
    const name: string = req.body.name
    const receiver: string = req.body.receiver
    const senderEmail: string = req.body.senderEmail
    const message: string = req.body.message
    const flag: string = req.body.flag
    const clientName: string = req.body.clientName 
    const userEmail: string = process.env.EMAIL_USER as string
    const password: string = process.env.EMAIL_USER_PASSWORD as string
    const content: string = `name: ${name} \nemail: ${senderEmail} \nmesssage: ${message} \n${flag}`

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: userEmail,
        pass: password
      }
    })

    transporter.verify((error, success) => {
      if(error) {
        console.error(error)
      } else {
        console.log('Server is ready for message')
      }
    })

    const mail = {
      subject: `${name} has sent you a message from the ${clientName} contact form`,
      from: userEmail,
      replyTo: senderEmail,
      to: receiver,
      text: content
    }

    await transporter.sendMail(mail, (err, data) => {
      if(err) {
        console.error(err)
      } else {
        res.json({
          status: 'success'
        })
      }
    })
  })

export default emailRouter
