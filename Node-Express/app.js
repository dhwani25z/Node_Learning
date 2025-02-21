const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}))
app.use('/admin',adminRoute);
app.use(shopRoute);
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'errorpage.html'))
})

app.listen(3000);