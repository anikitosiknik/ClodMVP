

const express = require('express');
const https = require('https');
const fs = require('fs');
const port = 3002;
var bodyParser = require('body-parser');

const key = fs.readFileSync('./apiserver.key');
const cert = fs.readFileSync('./apiserver.crt');




app = express()
app.use(express.json());

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);


app.get('/', (req, res) => {
   res.send('Now using https..');
});


app.post('/app/reg', function (req, res) {
    console.log(req.body)
    const {name, mail} = req.body;
    res.send(JSON.stringify({
        name,
        logined: true,
        mail
    }))
});

app.post('/app/login', function (req, res) {
    console.log(req.body)
    const {mail} = req.body;
    res.send(JSON.stringify({
        mail,
        logined: true,
        name: 'LOGIN SUCCSESS'
    }))
});

const server = https.createServer({key: key, cert: cert }, app);




server.listen(3002, () => { console.log('listening on 3002') });
