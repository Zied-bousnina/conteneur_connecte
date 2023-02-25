var _ = require('lodash');	
var nodemailer = require('nodemailer');

var config = {
    service: "Gmail",
    host: 'smtp.gmail.com',
    // port: 465,
    secure: false,
    auth: {
        user: 'zbousnina1@gmail.com',
        pass: process.env.EMAIL_TEST_APP_PSWD
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: 'zbousnina1@gmail.com',
    text: 'test text',
};


const send = (to, subject, html) => {
    // use default setting
    mail = _.merge({html}, defaultMail, to);
    
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
}
module.exports = {
    send
}