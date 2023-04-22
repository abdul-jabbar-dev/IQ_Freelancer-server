const nodemailer = require('nodemailer')
const googleapis = require('googleapis')

const authClient = new googleapis.google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground') 
authClient.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKRN })

module.exports.sendMailByGmail = async (data) => {
    const accessToken = (await authClient.getAccessToken()).token
    console.log(accessToken)
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user: process.env.MAIL_SENDER,//sender email
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            accessToken:accessToken
        }
    })
    const mailData ={
        from: process.env.MAIL_SENDER,//sender email
        to: data.email,//recever email
        subject:data.subject,
        text:data.body
    } 
    let sended = await  transporter.sendMail(mailData)
    return sended
}