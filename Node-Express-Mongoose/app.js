const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

app.use((req, res, next) => {
  User.findById("67caa3f1e0c70d5caf654a30")
    .then((user) => {
      req.user = user;
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

mongoose
  .connect(
    "mongodb+srv://dhwani:dhwani123@cluster0.p422i.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'dhwani',
          email: 'dhwanitest@gmail.com',
          cart: {
            items: []
          }
        })
        user.save()  
      }
    })
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
