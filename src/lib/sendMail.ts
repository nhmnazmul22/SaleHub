import {transporter} from "@/config/mail";
import {handleError} from "@/helper/error.helper";

export default async function sendMail(to: string, sub: string, text?: string, html?: string) {
    try {
        return await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: sub,
            text,
            html,
        });
    } catch (error) {
        return handleError(error);
    }
}