
const nodemailer = require('nodemailer');

//Función en donde captura el email ...(Me lee el email ingresando el input!! AVANCE!!!!!)
// function captura(){
//     const e_mail = document.getElementById('email').value;
//     console.log(e_mail);

//     if(e_mail==""){
//         alert("Se debe de completar el campo email de la compra");
//         document.getElementById('email-cart').focus();
//     }
// }


function createSendMail(mailConfig) {
    const transporter = nodemailer.createTransport(mailConfig);

    return function sendMail ({to, subject, text, html, attachments}) {
        const mailOptions = {from: mailConfig.auth.user, to, subject, text, html, attachments};
        return transporter.sendMail(mailOptions);
    }
}



function createSendMailGmail() {
    // const Gmail_UserName = 'marcopontiz@gmail.com';
    // const Gmail_Password = 'ijgwtmtfreuxzryt';
    return createSendMail({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'marcopontiz@gmail.com',
            pass: 'ukepqubakfufsoek',
        }
    })
}

const sendMail = createSendMailGmail();

async function main() {
    // const e_mail = document.getElementById('email').value;
    // console.log(e_mail);

    // if(e_mail==""){
    //     alert("Se debe de completar el campo email de la compra");
    //     document.getElementById('email-cart').focus();
    // }

    const emailAccount = "marcopontiz@gmail.com";
    
    const emailSubject = 'Bienvenid@!';
    const emailText = 'Hola! Gracias por comprar nuestros productos!';
    const emailAttachments = [];
    const attachmentsPath = '';

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

module.exports = main;