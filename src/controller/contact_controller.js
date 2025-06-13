import nodemailer from 'nodemailer';
import { Contact } from "../model/contact.js";
import createError from "../utills/createError.js";

export const createContact = async (req, res, next) => {
    try {
        const { email, message, name } = req.body;

        if ([email, message, name].some((field) => field?.trim() === "")) {
            return next(createError(400, "All fields are required"));
        }

        const formData = new Contact({ email, name, message });
        await formData.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const adminMailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_ADMIN || process.env.MAIL_USER, // admin email
            subject: 'New Contact Form Submission',
            html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
        };


        const userMailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Thank You for Contacting Us!',
            html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for getting in touch! i had received your message and will respond shortly.</p>
        <hr>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br>Yours</p>
      `
        };


        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return res.status(200).send("Contact created and emails sent");

    } catch (error) {
        console.error(error);
        return next(createError(500, "Something went wrong"));
    }
};
