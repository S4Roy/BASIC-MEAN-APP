const { v4: uuidV4 } = require("uuid");
const nodemailer = require("nodemailer");
const resetPassword_url = "http://localhost:4200";

function compare(newObj, oldObj) {
  changes = {};
  for (let key in newObj) {
    if (newObj[key] !== oldObj[key]) {
      changes[key] = newObj[key];
    }
  }
  // console.log(changes);
  return changes;
}


function genFileName() {
  return (
    new Date()
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "") + uuidV4().split("-")[0]
  );
}

function isEmail(val) {
  if (val) {
    return val.includes("@");
  } else {
    return false;
  }
}

const sendEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    // service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: "contact@subhankarroy.in",
      pass: "Subhankar@2022",
    },
  });

  var mailOptions = {
    from: "contact@subhankarroy.in",
    to: email,
    subject: "Reset Password",

    //link e resetcomponentname er jaygay angular comp er route hobe
    html: `
            <p>You requested for password reset</p>  
            <h3>click in this <a href="${resetPassword_url}/auth/reset-password/${token}">link</a> to reset password.
            The link will be valid for 1 hour</h3>
               `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent sucessfully");
      console.log("Email sent: " + info.response);
    }
  });
};


exports.genFileName = genFileName;
exports.isEmail = isEmail;
exports.compare = compare;
exports.sendEmail = sendEmail;