const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const mongoConnect = require("./util/database").mongoConnect;
const User = require('./models/user')

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

app.use((req, res, next) => {
  User.findById('67c948f9f05d78c364b614a0')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes); //.routes
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
