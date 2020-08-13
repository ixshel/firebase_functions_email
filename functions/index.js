const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({
    origin: true
});

admin.initializeApp();

// Use gmail to send emails
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contacto.aliansam@gmail.com',
        pass: 'moraima1234'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // get dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Contacto from @aliansam.com <donotreply@aliansam.com>',
            to: dest,
            subject: 'Confirmacion de mensaje',
            html: `
            <img style='width:100%; max-width: 950px;' src='https://aliansam.com/images/banner.jpeg'>
            <p>Gracias por contactarnos, te contactaremos lo antes posible.
            <br />
            <br />
            AliansaM
            </p>`
        };

        // return result 
        return transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                return res.send(err.toString);
            } else {
                return res.send('response sent...');
            }
        });
    });
});
