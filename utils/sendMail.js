import nodemailer from "nodemailer";

const sendEmail = async (to, subject="Quên mật khẩu", text, html = null) => {
    try {
        // Khởi tạo transporter với các thông tin cần thiết
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "bangbangsky169@gmail.com",
                pass: "mvdfpjgghwvmheeg",
            },
        });
        const mailOptions = {
            from: "bangbangsky169@gmail.com",
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
};

export { sendEmail };
