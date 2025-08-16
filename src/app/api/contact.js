import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Transporter banate hain (Gmail example)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alhikmahacademyyyy@gmail.com", // tumhari email
        pass: "your-app-password", // Gmail app password (normal password nahi chalega)
      },
    });

    try {
      await transporter.sendMail({
        from: email,
        to: "alhikmahacademyyyy@gmail.com", // jahan receive karna hai
        subject: `New Contact Form Submission from ${name}`,
        text: message,
        html: `<p><b>Name:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b> ${message}</p>`,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

