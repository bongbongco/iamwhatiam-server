import Twilio from "twilio";

const twilioClient = Twilio(
    process.env.TWILIO_SID, 
    process.env.TWILIO_TOKEN
    );

const sendSMS = (to: string, body: string) => {
    return twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE
    })
}


export const sendVerificationSMS = (to: string, key: string) => 
    sendSMS(to, `본인 인증을 위해 인증번호 [${key}]를 입력해주세요. iWi와 함께 나 답게 생각하는 습관만들기!`);