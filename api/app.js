

const express = require('express');
const https = require('https');
const fs = require('fs');
const port = 3002;
var bodyParser = require('body-parser');

const key = fs.readFileSync('./apiserver.key');
const cert = fs.readFileSync('./apiserver.crt');




app = express()
app.use(express.json());

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
    const {mail} = req.body;
    res.cookie('authKey', generateUUID(), {maxAge: 250000, httpOnly: true,  sameSite:"Lax" })
    res.send(JSON.stringify({
        mail,
        logined: true,
        name: 'LOGIN SUCCSESS',
    }))
});

const server = https.createServer({key: key, cert: cert }, app);




server.listen(3002, () => { console.log('listening on 3002') });



function generateUUID()
{
	var d = new Date().getTime();
	
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

return uuid;
}