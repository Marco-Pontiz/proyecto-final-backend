const nodemailer = require('nodemailer');

function createSendMail(mailConfig) {
    const transporter = nodemailer.createTransport(mailConfig);

    return function sendMail ({to, subject, text, html, attachments}) {
        const mailOptions = {from: mailConfig.auth.user, to, subject, text, html, attachments};
        return transporter.sendMail(mailOptions);
    }
}

const Gmail_UserName = 'xxxxxxxxxx';
const Gmail_Password = 'xxxxxxxxxx';

function createSendMailGmail() {
    return createSendMail({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: Gmail_UserName,
            pass: Gmail_Password,
        }
    })
}

async function main() {
    const sendMail = await createSendMailGmail();

    const emailAccount = 'xxxxxxx@gmail.com';
    const emailSubject = 'Bienvenid@!';
    const emailText = 'Hola! Gracias por comprar nuestros productos!';
    const attachmentsPath = '';
    const emailAttachments = [];

    if(attachmentsPath) {
        emailAttachments.push({path: attachmentsPath});
    }

    const info = await sendMail({
        to: emailAccount,
        subject: emailSubject,
        text: emailText,
        attachments: emailAttachments
    });

    console.log(info);
}

main();
