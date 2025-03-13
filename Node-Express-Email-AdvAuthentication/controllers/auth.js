const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const sendgridTransport = require('nodemailer-sendgrid-transport');

const crypto = require("crypto");

const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dhwaniawesome@gmail.com",
    pass: "hdsn xltl gyva dofd",
  },
});

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    // isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    // isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password!!!");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password!!!");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "Email exists already, please pick a different one!!!"
        );
        return res.redirect("/signup");
      }
      return (
        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new User({
              email: email,
              password: hashedPassword,
              cart: { items: [] },
            });
            return user.save();
          })
          // .then((result) => {
          //   transporter.sendMail({
          //     to: email,
          //     from: 'dkzzaveri25@gmail.com',
          //     subject: 'SignUp Succeeded!!!',
          //     html: '<h1>You successfully signed up!</h1>'
          //   })
          //   res.redirect("/login");
          // });
          .then((result) => {
            res.redirect("/login");
            // return transporter.sendMail()
            return transporter
              .sendMail({
                to: email,
                from: `"Dhwani 🤗" <dhwaniawesome@gmail.com>`,
                // from: "dhwaniawesome@gmail.com",
                subject: "SignUp Succeeded!!!",
                html: `<h2 style="color:rgb(48, 192, 228); text-align: center;">This Email is sent using nodemailer gmail!!!
                Thank You😊 for signing up</h2>
                <h2 style="color: #28a745; text-align: center;">Welcome to Our Platform!</h2>
                <p style="font-size: 16px; color: #333; text-align: center;">Dear User,</p>
                <p style="font-size: 16px; color: #333; text-align: center;">
                    Your signup was successful. You can now log in and start using our services.
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="http://localhost:3000/" 
                       style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                              color: #ffffff; text-decoration: none; border-radius: 5px;">
                        Login Now
                    </a>
                </div>
                <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
                    If you did not sign up, please ignore this email.
                </p>  `,
              })
              .then(() => {
                console.log("Email sent successfully!!!");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with this email found!!!😔");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        return transporter.sendMail({
          to: req.body.email,
          from: '"Dhwani🤗" <dhwaniawesome@gmail.com>',
          subject: "Password Reset",
          html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hi there,</p>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <a href="http://localhost:3000/reset/${token}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
            </a>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Thanks,<br/>Dhwani🤗</p>
        </div>
    `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: {
      $gt: Date.now(),
    },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.newPassword;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {
      $gt: Date.now(),
    },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      console.log("Found user:", resetUser);
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      (resetUser.password = hashedPassword),
        (resetUser.resetToken = undefined),
        (resetUser.resetTokenExpiration = undefined);
        console.log("Updated user:", resetUser);
      return resetUser.save()
    }).then((result) => {
      res.redirect('/login')
    })
    .catch((err) => {
      console.log(err);
    });
};
