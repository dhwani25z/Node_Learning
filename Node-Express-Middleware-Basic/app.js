const http = require('http');
const express = require('express');

const app = express();
app.use((req, res, next) => {
    console.log("I am middleware!!!");
    next();
});
app.use((req, res, next) => {
    console.log("I am middleware1 !!!");
    res.send('<h1>Hello from ExpressJs!!!</h1>');
})

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);