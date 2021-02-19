

const express = require('express');
const https = require('https');
const fs = require('fs');
const port = 3002;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var mysql = require('mysql');

mysql_host = 'localhost'
mysql_user = 'clodsite_anikitosiknik'
mysql_password = '***REMOVED***'
mysql_database = 'clodsite_app'

var connection = mysql.createConnection({
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database,
    multipleStatements: true,
    port: '3306'
});

connection.connect((error) => {
    if (error) {
        throw error
    }
    else console.log('connected')
})

const key = fs.readFileSync('./apiserver.key');
const cert = fs.readFileSync('./apiserver.crt');




app = express()
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Now using https..');
});



app.post('/app/reg', function (req, res) {
    const authKey = generateAuthToken();
    let stmt = `INSERT INTO users (name, mail, password, authKey) VALUES ('${req.body.name}', '${req.body.mail}', '${getHashedPassword(req.body.password)}', '${authKey}')`;

    connection.query(stmt, (err, results, fields) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409)
                res.send({
                    error: 'Duplicate Mail'
                });
            }


            else res.send(err)
            return console.error(err.message);
        }
        res.cookie('authKey', authKey, { maxAge: 25000000, httpOnly: true, sameSite: "Lax" })
        res.status(201)
        res.send({
            name: req.body.name,
            mail: req.body.mail,
            logined: true,
        })
    });
});


app.post('/app/login', function (req, res) {
    const authToken = generateAuthToken()
    // `UPDATE users SET authKey = '${authToken}' WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}';
    let stmt = `UPDATE users SET authKey = '${authToken}' WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}';
    SELECT * FROM users WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}' `;

    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        if (!results[1].length) {
            res.status(401)
            res.send({
                error: 'password or mail not found'
            })
            return;
        }
        res.status(200)
        res.cookie('authKey', authToken, { maxAge: 25000000, httpOnly: true, })
        const { name, mail, isInfoSetted } = results[1][0];
        res.send({
            name,
            mail,
            logined: true,
            isInfoSetted: !!isInfoSetted
        })
    });
});


app.get('/app/autoLogin', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'password or mail not found'
        })
        return;
    }
    let stmt = `SELECT * FROM users WHERE  authKey = '${req.cookies.authKey}'`;
    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        if (!results.length) {
            res.status(401)
            res.send({
                error: 'autoLogin Failed'
            })
            return;
        }
        res.status(200)
        const { name, mail, isInfoSetted } = results[0];
        res.send({
            name,
            mail,
            isInfoSetted: !!isInfoSetted,
            logined: true
        })
    });

})

app.get('/app/logOut', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'password or mail not found'
        })
        return;
    }
    let stmt = `UPDATE users SET authKey = NULL WHERE  authKey = '${req.cookies.authKey}'`;
    connection.query(stmt, (err, results, fields) => {
        res.cookie('authKey', '', { maxAge: 0, httpOnly: true, })
        if (err) {
            return console.error(err.message);
        }
        if (results.changedRows === 0) {
            res.status(401)
            res.send({
                error: 'autoLogin Failed'
            })
            return;
        }
        res.status(200)
        res.send({
            logined: false
        })
    });
})

app.post('/app/setUserInfo', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }
    const { chest, waist, hips, height, age, skin, hair, eyes } = req.body
    // let stmt = `UPDATE users SET chest = ${chest} WHERE  authKey = '${req.cookies.authKey}'`;
    let stmt = `UPDATE users SET chest = ${chest} , waist = ${waist} , hips = ${hips} , height = ${height} , age = ${age}  , skin = '${skin}' , hair = '${hair}' , eyes = '${eyes}', isInfoSetted = 1  WHERE  authKey = '${req.cookies.authKey}'`;

    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        res.status(200)
        if (results.changedRows) {
            
            res.send({
                chest,
                waist,
                hips,
                height,
                age,
                skin,
                hair,
                eyes,
                needChanges: false,
                isInfoSetted: true,
            })
        } else 
        {
            res.send({
                needChanges: false
            })
        }

    })
})

const server = https.createServer({ key: key, cert: cert }, app);




server.listen(3002, () => { console.log('listening on 3002') });



function generateUUID() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}


const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}