const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER_EMAIL,
    pass: process.env.GMAIL_USER_PASS,
  },
});

const sendEmail = async (name, email, code) => {
  console.log(name, email);
  console.log("from", process.env.GMAIL_USER_EMAIL);
  const info = await transport.sendMail({
    from: process.env.GMAIL_USER_EMAIL,
    to: email,
    subject: "Email Confirmation Link",
    html: `<h1>Email Confirmation</h1>
        <h2>Сайн байна уу?, ${name}</h2>
        <p>Mанай веб хуудсанд бүртгүүлсэнд баярлалаа. Та доорх илгээсэн холбоосоор хэрэглэгчийн эрхээ баталгуужуулна уу !!!</p>
        <a href=http://localhost:8081/confirm/${code}> Баталгаажуулах холбоос </a>
        </div>`,
  });
};

module.exports = sendEmail;
