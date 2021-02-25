

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
mysql_password = '08061999!zxcV'
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
app.use(express.json({ limit: '100mb' }));
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
    let stmt = `UPDATE users SET authKey = '${authToken}' WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}'; SELECT * FROM users WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}' `;

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
        const { name, mail, isInfoSetted, chest,
            waist,
            hips,
            height,
            age,
            skin,
            hair,
            eyes,
            userPicture } = results[1][0];
        res.send({
            name,
            mail,
            chest,
            waist,
            hips,
            height,
            age,
            skin,
            hair,
            eyes,
            userPicture,
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
        const { name, mail, isInfoSetted, chest,
            waist,
            hips,
            height,
            age,
            skin,
            hair,
            eyes,
            userPicture } = results[0];
        res.send({
            name,
            mail,
            chest,
            waist,
            hips,
            height,
            age,
            skin,
            hair,
            eyes,
            userPicture,
            isInfoSetted: !!isInfoSetted,
            logined: true,
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
            console.error(err.message);
            res.status(406)
            return res.send({
                error: err.message
            })
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
        } else {
            res.send({
                needChanges: false
            })
        }

    })
})

app.post('/app/setUserPicture', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }
    let stmt = `UPDATE users SET userPicture = '${req.body.userPicture}' WHERE  authKey = '${req.cookies.authKey}'`;

    connection.query(stmt, (err, results, fields) => {
        if (err) {
            console.error(err.message);
            res.status(406)
            return res.send({
                error: err.message
            })
        }
        res.status(200)
        if (results.changedRows) {
            res.send({
                userPicture: req.body.userPicture
            })
        } else {
            res.status(406)
            return res.send({
                error: 'nothing to change'
            })
        }

    })
})



app.post('/app/createCloth', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }

    const clothId = generateAuthToken()
    const { img, color, type, createdBy } = req.body;

    let stmt = `INSERT INTO cloth (id, img, color, type, createdBy) VALUES ('${clothId}', '${img}', '${color}', '${type}', '${createdBy}')`;

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
        res.status(201)
        res.send({
            message: 'created succsfully'
        })
    });
})

app.get('/app/cloths', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }


    let stmt = `SELECT * FROM cloth WHERE createdBy = (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}')`;

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
        res.status(201)
        res.send(results)
    });
})

app.delete('/app/cloths', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }
    let stmt = '';


    const ids = req.body;
    ids.forEach((id, index) => {
        stmt = stmt + `DELETE FROM look_has_cloth WHERE cloth_id = '${id}' ; `
    })
    stmt = stmt + `DELETE FROM cloth WHERE`;
    ids.forEach((id, index) => {
        stmt = stmt + ` ${index === 0 ? '' : 'OR'} id = '${id}'`
    })

    connection.query(stmt, (err, results, fields) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409)
                res.send({
                    error: 'asd'
                });
            }
            else res.send(err)
            return console.error(err.message);
        }
        res.status(201)
        res.send({
            message: `removed ${results.affectedRows}`
        })
    });
})






app.post('/app/createLook', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }
    const lookId = generateAuthToken();
    const { type, clothIds } = req.body;
    let stmt = `INSERT INTO look (id, type, createdBy) VALUES ('${lookId}', '${type}', (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}'));`

    clothIds.forEach(clothId => {
        stmt = stmt + ` INSERT INTO look_has_cloth (look_id, cloth_id) VALUES ('${lookId}', '${clothId}');`
    })



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
        res.status(201)
        res.send({
            message: 'created succsfully'
        })
    });
})

app.get('/app/looks', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }


    let stmt = `SELECT * FROM look WHERE createdBy = (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}')`;

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
        res.status(201)
        res.send(results.map(look=>({...look, favorite: !!look.favorite, ready: !!look.ready})))
    });
})

app.post('/app/looksIds', function (req, res) {
    if (!req.cookies) {
        res.status(401)
        res.send({
            error: 'not auth'
        })
        return;
    }

    let stmt = '';
    req.body.forEach(lookId => {
        stmt = stmt + ` SELECT * FROM look_has_cloth WHERE look_id = '${lookId}';`
    })

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
        if (req.body.length === 1) {
            const result = [[]]
            results.forEach(item => result[0].push(item))
            res.status(201)
            res.send(result)
            return
        }
        res.status(201)
        res.send(results)
    });
})





const server = https.createServer({ key: key, cert: cert }, app);




server.listen(3002, () => { console.log('listening on 3002') });




const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}


const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}