
const nodemailer = require("nodemailer");
exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    otp += Math.floor(Math.random() * 9);
  }
  return otp;
};

exports.mailTransport =()=>
    nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT_MAILTRAP,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

      exports.generateEmailTemplate = code=> {
        return `
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; font-size: 24px; font-weight: 500; margin: 0 0 10px;">Welcome to Conteneur Connecté</h2>
          <p style="color: #333; font-size: 16px; font-weight: 400; margin: 0 0 10px;">Please use the following code to verify your email.</p>
          <div style="background-color: #333; color: #fff; font-size: 20px; font-weight: 500; padding: 10px 20px; border-radius: 5px; display: inline-block;">
            ${code}
          </div>
        </div>
      
        </div>
        `;
        };

exports.plainEmailTemplate = (heading, message) => {
    return `
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
        <h2 style="color: #333; font-size: 24px; font-weight: 500; margin: 0 0 10px;">${heading}</h2>
        <p style="color: #333; font-size: 16px; font-weight: 400; margin: 0 0 10px;">${message}</p>
        </div>
    
        </div>
        `;
}

exports.generatePasswordResetTemplate = url => {
    return `
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
        <h2 style="color: #333; font-size: 24px; font-weight: 500; margin: 0 0 10px;">Reset your password</h2>
        <p style="color: #333; font-size: 16px; font-weight: 400; margin: 0 0 10px;">Please click the following link to reset your password.</p>
        <div style="background-color: #333; color: #fff; font-size: 20px; font-weight: 500; padding: 10px 20px; border-radius: 5px; display: inline-block;">
            <a href="${url}" style="color: #fff; text-decoration: none;">Reset Password</a>
        </div>
        </div>
    
        </div>
        `;
        
}





