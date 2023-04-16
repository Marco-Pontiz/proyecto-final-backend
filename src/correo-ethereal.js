const nodemailer = require('nodemailer');

function createSendMail(mailConfig){
    const transporter = nodemailer.createTransport(mailConfig);

    return function sendMail({to, subject, text, html, attachments}){
        const mailOptions = {from: mailConfig.auth.user, to , subject, text, html, attachments};
        return transporter.sendMail(mailOptions);
    }
}

function createSendMailEthereal() {
    return createSendMail({
        host: 'smtp.ethereal.email',
        port: xxx,
        auth:{
            user: 'xxxxxxxxxxxxxxxx',
            pass: 'xxxxxxxxxxxxxxxx'
        }
    });
}

const sendMail = createSendMailEthereal();

const emailAccount = 'Websitte@gmail.com';
const emailSubject = 'Compra realizada';
const emailText = 'Gracias por tu compra! Avisanos si el producto que compraste es de tu agrado';
const attachmentsPath = '';
const emailAttachments = [];

if(attachmentsPath) {
    emailAttachments.push({path: attachmentsPath})
}

async function main() {
const info = await sendMail({
    to:emailAccount,
    subject: emailSubject,
    text: emailText,
    attachments: emailAttachments});

console.log(info);
}

main();