import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";

export const userContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // 1. Data MongoDB में Save करना
        const createdContact = new Contact({ name, email, message });
        await createdContact.save();

        // 2. Email भेजना
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // तुम्हारे ही email पर आएगा
            subject: `New Contact Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "Contact saved & email sent successfully!", createdContact });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
