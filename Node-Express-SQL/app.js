const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const db = require('./util/database')

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes); //.routes
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);
app.listen(3000);
