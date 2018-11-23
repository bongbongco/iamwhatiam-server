import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandbox8d8d4d9a02c54865a4a0bee00b554860.mailgun.org"
});

const sendEmail = (to: string, subject: string, html: string) => {
    const emailData = {
        from: "bongbongco@gmail.com",
        to,
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (email: string, fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://iamwhatiam.com/verification/${key}/">here</a>`;
    return sendEmail(email, emailSubject, emailBody)
};