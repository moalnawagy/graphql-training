const nodemailer = require("nodemailer");
require('dotenv').config()

var nodeoutlook = require('nodejs-nodemailer-outlook')

async function sendingEmail(reciever, subject, content, attach, attachName) {

    nodeoutlook.sendEmail({
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            },
            from: process.env.EMAIL,
            to: reciever,
            subject: subject,
            html: `<b>${content}</b>`,
            text: 'This is text version!',
            attachments: attach ? [{
                filename: attachName,
                path: attach
            }, ] : null,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
        }


    );
}


module.exports = { sendingEmail }