import nodemailer from "nodemailer"

const {GMX_PASSWORD, GMX_EMAIL} = process.env;

const nodemailerConfig ={
    host:"mail.gmx.net",
    port: 465,
    secure: true,
    auth:{
        user: GMX_EMAIL,
        pass: GMX_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = data =>{
    const email = {...data, from: GMX_EMAIL};
    return transport.sendMail(email)
}
export default sendEmail;