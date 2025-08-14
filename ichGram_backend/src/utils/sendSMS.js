import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUT_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUT_TOKEN);

const sendSMS = (data) => {
  const sms = { ...data, from: TWILIO_PHONE_NUMBER };
  twilioClient.messages.create(sms);
};
export default sendSMS;

// import { customAlphabet } from 'nanoid';
// const numbers = '0123456789';
// const generateOTP = customAlphabet(numbers, 6);
// export default generateOTP;