const express = require('express');
const https = require('https');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var mysql = require('mysql');

const key = fs.readFileSync('./apiserver.key');
const cert = fs.readFileSync('./apiserver.crt');
const passwordDB = fs.readFileSync('../keys/passwordDB.txt')
const passwordMail = fs.readFileSync('../keys/passwordMail.txt')

const mysql_host = 'localhost'
const mysql_user = 'clodsite_anikitosiknik'
const mysql_password = passwordDB
const mysql_database = 'clodsite_app'

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
    } else console.log('connected')
})





const nodemailer = require('nodemailer')
const app = express()
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Now using https..');
});


const apiRouter = express.Router();
app.use('/api', apiRouter);



{
    //authRouter
    const authRouter = express.Router();

    authRouter.post('/registration', function(req, res) {
        const authKey = generateAuthToken();
        const { name, mail, password, code } = req.body;
        if (code) {
            let stmt = `SELECT mail FROM mail WHERE code = '${code}'`;
            connection.query(stmt, (err, results, fields) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        res.status(409)
                        res.send({
                            error: 'Duplicate Mail'
                        });
                    } else res.send(err)
                    return console.error(err.message);
                }
                if (!results.length) {
                    res.status(400)
                    return res.send({
                        isMailCodeReady: false,
                        error: 'wrongCode'
                    })
                }
                if (results[0].mail === mail) {
                    let stmt = `UPDATE users SET authKey = '${authKey}' , password = '${getHashedPassword(password)}' WHERE mail = '${mail}'; SELECT * FROM users WHERE mail = '${req.body.mail}'`
                    connection.query(stmt, (err, results, fields) => {
                        if (err) {
                            if (err.code === "ER_DUP_ENTRY") {
                                res.status(409)
                                res.send({
                                    error: 'Duplicate Mail'
                                });
                            } else res.send(err)
                            return console.error(err.message);
                        }
                        res.cookie('authKey', authKey, { maxAge: 250000000, httpOnly: true, sameSite: "Lax" })
                        const {
                            name,
                            mail,
                            isInfoSetted,
                            chest,
                            waist,
                            hips,
                            height,
                            age,
                            skin,
                            hair,
                            eyes,
                            city,
                            country,
                            userPicture,
                            choosedImages
                        } = results[1][0];
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
                            choosedImages,
                            city,
                            country,
                            logined: true,
                            isInfoSetted: !!isInfoSetted
                        })
                    });
                }
            });
            return;
        }
        const regDate = new Date();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        let stmt = generateInsertSQLCommand('users', { name, mail, password: getHashedPassword(password), authKey, subs: JSON.stringify([regDate, expireDate]) })

        connection.query(stmt, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'Duplicate Mail'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            res.cookie('authKey', authKey, { maxAge: 250000000, httpOnly: true, sameSite: "Lax" })

            res.status(201)
            res.send({
                name: req.body.name,
                mail: req.body.mail,
                logined: true,
            })
        });
    })


    authRouter.post('/setmailcode', function(req, res) {
        const mail = req.body.mail;
        const code = genereateMailToken();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'clodapp.info@gmail.com',
                pass: passwordMail
            }
        })
        const a = transporter.sendMail({
            from: 'anikitosiknik@gmail.com',
            to: mail,
            subject: 'Авторизация',
            text: `Ваш код:  ${code}`,

        }).then(() => {
            let stmt = generateInsertSQLCommand('mail', { code, mail }) + ` ON DUPLICATE KEY UPDATE  code = '${code}';`
            connection.query(stmt, (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        res.status(409)
                        res.send({
                            error: 'Duplicate Mail'
                        });
                    } else res.send(err)
                    return console.error(err.message);
                }

                res.status(200)
                res.send({
                    message: 'code ready'
                })
            });

        }, err => {
            res.send(err);
        })
    })

    authRouter.post('/checkmailcode', function(req, res) {
        const { code, mail } = req.body
        let stmt = `SELECT * FROM mail WHERE code = '${code}' AND mail = '${mail}'`
        connection.query(stmt, (err, results) => {
            if (err || !results.length) {
                res.status(400)
                return res.send({
                    error: 'wrongCode',
                    isMailCodeReady: false,
                })
            }

            res.status(200)
            res.send({
                isMailCodeReady: false,
            })
        })
    })

    authRouter.post('/login', function(req, res) {
        const authToken = generateAuthToken()
        let stmt = `UPDATE users SET authKey = '${authToken}' WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}'; SELECT * FROM users WHERE mail = '${req.body.mail}' AND password = '${getHashedPassword(req.body.password)}' `;

        connection.query(stmt, (err, results) => {
            if (err) {
                return console.error(err.message);
            }
            if (!results[1].length) {
                res.status(401)
                res.send({
                    error: 'password or mail not found',
                    isMailCodeReady: false,
                })
                return;
            }
            res.status(200)
            res.cookie('authKey', authToken, { maxAge: 250000000, httpOnly: true, })
            const {
                name,
                mail,
                isInfoSetted,
                chest,
                waist,
                hips,
                height,
                age,
                skin,
                hair,
                eyes,
                city,
                country,
                isAdmin,
                choosedImages,
                userPicture
            } = results[1][0];
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
                city,
                country,
                choosedImages,
                userPicture,
                logined: true,
                isAdmin: !!isAdmin,
                isInfoSetted: !!isInfoSetted
            })
        });
    });

    authRouter.get('/autoLogin', function(req, res) {
        if (!req.cookies || !req.cookies.authKey) {
            res.status(401)
            return res.send({
                message: 'not auth'
            })
        }

        let stmt = `SELECT * FROM users WHERE  authKey = '${req.cookies.authKey}'`;
        connection.query(stmt, (err, results) => {
            if (err) {
                return console.error(err.message);
            }
            if (!results.length) {
                res.status(401)
                res.send({})
                return;
            }
            res.status(200)
            const {
                name,
                mail,
                isInfoSetted,
                chest,
                waist,
                hips,
                height,
                age,
                skin,
                hair,
                eyes,
                city,
                country,
                isAdmin,
                choosedImages,
                userPicture
            } = results[0];
            res.send(prepareUser({
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
                city,
                country,
                userPicture,
                choosedImages,
                isAdmin: !!isAdmin,
                isInfoSetted: !!isInfoSetted,
                logined: true,
            }))
        });

    })

    authRouter.get('/logOut', function(req, res) {
        let stmt = `UPDATE users SET authKey = NULL WHERE  authKey = '${req.cookies.authKey}'`;
        connection.query(stmt, (err, results) => {
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
    });

    apiRouter.use('/auth', authRouter)
}

{
    //infoRouter
    const infoRouter = express.Router();


    infoRouter.post('/setInfo', authMiddleware, function(req, res) {
        const { chest, waist, hips, height, age, skin, hair, eyes, city, country, choosedImages } = req.body
        let stmt = `UPDATE users SET choosedImages = '${choosedImages}', city = '${city}', country = '${country}', chest = ${chest} , waist = ${waist} , hips = ${hips} , height = ${height} , age = ${age}  , skin = '${skin}' , hair = '${hair}' , eyes = '${eyes}', isInfoSetted = 1  WHERE  authKey = '${req.cookies.authKey}'`;

        connection.query(stmt, (err, results) => {
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
                    city,
                    country,
                    choosedImages,
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

    infoRouter.post('/setPicture', authMiddleware, function(req, res) {
        let stmt = `UPDATE users SET userPicture = '${req.body.userPicture}' WHERE  authKey = '${req.cookies.authKey}'`;

        connection.query(stmt, (err, results) => {
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


    apiRouter.use('/info', infoRouter);
}


{
    //clothsRouter
    const clothsRouter = express.Router();

    clothsRouter.post('/create', authMiddleware, function(req, res) {

        const clothId = generateAuthToken()
        const { img, color, type, createdBy } = req.body;

        let stmt = `SELECT id FROM cloth WHERE createdBy = '${createdBy}'`;

        connection.query(stmt, (err, results) => {
            if (results.length >= 100) {
                res.status(403);
                return res.send({
                    error: 'too many cloth for you'
                })
            }
            let stmt = generateInsertSQLCommand('cloth', {
                id: clothId,
                img,
                color,
                type,
                createdBy,
                createdTime: new Date().toString()
            })

            connection.query(stmt, (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        res.status(409)
                        res.send({
                            error: 'Duplicate Mail'
                        });
                    } else res.send(err)
                    return console.error(err.message);
                }
                res.status(201)
                res.send({
                    message: 'created succsfully'
                })
            });
        })
    })


    clothsRouter.get('', authMiddleware, function(req, res) {



        let stmt = `SELECT * FROM cloth WHERE createdBy = (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}')`;

        connection.query(stmt, (err, results) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'Duplicate Mail'
                    });
                } else res.send(err)
                return console.error(err.message);
            }

            const data = results.map(el => ({ id: el.id, color: el.color, type: el.type, createdBy: el.createdBy, createdTime: el.createdTime }))
            res.send(data);
        });
    })



    clothsRouter.delete('', authMiddleware, function(req, res) {
        let stmt = '';


        const ids = req.body;
        ids.forEach((id) => {
            stmt = stmt + `DELETE FROM look_has_cloth WHERE cloth_id = '${id}' ; `
        })
        stmt = stmt + `DELETE FROM cloth WHERE`;
        ids.forEach((id, index) => {
            stmt = stmt + ` ${index === 0 ? '' : 'OR'} id = '${id}'`
        })

        connection.query(stmt, (err, results) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'asd'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            res.status(201)
            res.send({
                message: `removed ${results.affectedRows}`
            })
        });
    })


    clothsRouter.post('/clothsById', authMiddleware, function(req, res) {

        let stmt = 'SELECT * FROM cloth WHERE '
        req.body.forEach((id, index) => {
            stmt = stmt + ` ${index === 0 ? '' : 'OR'} id = '${id}'`
        })
        connection.query(stmt, (err, results) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'asd'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            res.status(201)
            res.send(results)
        });
    })

    apiRouter.use('/cloths', clothsRouter);
}


{
    //lookRouter
    const lookRouter = express.Router();

    lookRouter.post('/create', ClothauthMiddleware, function(req, res) {
        const lookId = generateAuthToken();
        const { type, clothIds } = req.body;

        let stmt = `SELECT id FROM look WHERE createdBy = (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}')  AND  ready = 0`;
        connection.query(stmt, (err, results) => {
            if (results.length > 5) {
                res.status(403);
                return res.send({
                    error: 'too many looks for you'
                })
            }


            let stmt = `INSERT INTO look (id, type, createdBy, createdTime) VALUES ('${lookId}', '${type}', (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}'), '${new Date().toString()}');`

            clothIds.forEach(clothId => {
                stmt = stmt + `${generateInsertSQLCommand('look_has_cloth', { look_id: lookId, cloth_id: clothId })};`
            })


            connection.query(stmt, (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        res.status(409)
                        res.send({
                            error: 'Duplicate Mail'
                        });
                    } else res.send(err)
                    return console.error(err.message);
                }


                let stmt = `SELECT trialLooksCount FROM users WHERE authKey = '${req.cookies.authKey}'`;
                connection.query(stmt, (err, results) => {
                    let stmt = `UPDATE users SET trialLooksCount = ${results[0].trialLooksCount + 1}  WHERE authKey = '${req.cookies.authKey}';`
                    connection.query(stmt, () => {
                        res.status(201)
                        res.send({
                            message: 'created succsfully'
                        })
                    })

                })


            });

        })

    })

    lookRouter.get('', authMiddleware, function(req, res) {


        let stmt = `SELECT * FROM look WHERE createdBy = (SELECT mail FROM users WHERE authKey = '${req.cookies.authKey}')`;

        connection.query(stmt, (err, results, ) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'Duplicate Mail'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            res.status(201)
            res.send(results.map(look => ({...look, favorite: !!look.favorite, ready: !!look.ready, createdTime: look.createdTime })))
        });
    })

    //TODO Merge with get by params
    lookRouter.post('/getByIds', authMiddleware, function(req, res) {

        let stmt = '';
        req.body.forEach(lookId => {
            stmt = stmt + ` SELECT * FROM look_has_cloth WHERE look_id = '${lookId}';`
        })

        connection.query(stmt, (err, results) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'Duplicate Mail'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            if (req.body.length === 1) {
                const result = [
                    []
                ]
                results.forEach(item => result[0].push(item))
                res.status(201)
                res.send(result)
                return
            }
            res.status(201)
            res.send(results)
        });
    })



    lookRouter.delete('', authMiddleware, function(req, res) {
        let stmt = '';


        const ids = req.body;
        ids.forEach((id) => {
            stmt = stmt + `DELETE FROM look_has_cloth WHERE look_id = '${id}' ; `
        })
        stmt = stmt + `DELETE FROM look WHERE`;
        ids.forEach((id, index) => {
            stmt = stmt + ` ${index === 0 ? '' : 'OR'} id = '${id}'`
        })

        connection.query(stmt, (err, results) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'asd'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            res.status(201)
            res.send({
                message: `removed ${results.affectedRows}`
            })
        });
    })

    lookRouter.put('/changeType', authMiddleware, function(req, res) {
        const { id, category } = req.body;
        let stmt = `UPDATE look SET  category = '${category}'  WHERE  id = '${id}';`

        connection.query(stmt, (err) => {
            if (err) {
                res.status(400)
                return res.send(err)
            }
            res.status(200);
            res.send({ message: 'ok' })
        })
    })



    lookRouter.put('/toggleLike', authMiddleware, function(req, res) {
        const lookId = req.body.lookId
        let stmt = `SELECT favorite FROM look WHERE id = '${lookId}'`
        connection.query(stmt, (err, results, ) => {


            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.status(409)
                    res.send({
                        error: 'Duplicate Mail'
                    });
                } else res.send(err)
                return console.error(err.message);
            }
            const result = results[0].favorite;
            let stmt = `UPDATE look SET  favorite = '${result ? 0 : 1}'  WHERE  id = '${lookId}';
         SELECT * FROM look WHERE id = '${lookId}'`;
            connection.query(stmt, (err, results) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        res.status(409)
                        res.send({
                            error: 'Duplicate Mail'
                        });
                    } else res.send(err)
                    return console.error(err.message);
                }
                res.send(results[1].map(look => ({...look, favorite: !!look.favorite, ready: !!look.ready })))
            })
        });
    })


    apiRouter.use('/looks', lookRouter);
}
























app.get('/api/looksAdmin', authMiddleware, function(req, res) {

    let stmt = `SELECT isAdmin FROM users WHERE authKey = '${req.cookies.authKey}'`
    connection.query(stmt, (err, results) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409)
                res.send({
                    error: 'error please contact admin'
                });
            } else res.send(err)
            return console.error(err.message);
        }
        if (results[0] && results[0].isAdmin) {
            let stmt = `SELECT * FROM look WHERE ready = 0`;

            connection.query(stmt, (err, results) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        res.status(409)
                        res.send({
                            error: 'error please contact admin'
                        });
                    } else res.send(err)
                    return console.error(err.message);
                }
                res.send(results)
            })
        } else res.send({
            isAdmin: false
        })
    })
})


app.post('/api/updateLookAdmin', authMiddleware, function(req, res) {

    let stmt = `SELECT isAdmin FROM users WHERE authKey = '${req.cookies.authKey}'`
    connection.query(stmt, (err, results) => {
        const { clothDelete, clothUpd, clothCreate, id, img, mail } = req.body;
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409)
                res.send({
                    error: 'error please contact admin'
                });
            } else res.send(err)
            return console.error(err.message);
        }

        if (results[0] && results[0].isAdmin) {


            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'clodapp.info@gmail.com',
                    pass: passwordMail
                }
            })
            transporter.sendMail({
                from: 'anikitosiknik@gmail.com',
                to: mail,
                subject: 'Оповещение',
                html: `<p>Здравствуйте! Ваш персональный образ готов, зайдите в веб-приложение <a href="https://clod.site/">clod.site</a>, чтобы увидеть созданную для Вас комбинацию. <br>С уважением, <br> Clod</p> `
            }).then(() => {

                let stmt = `UPDATE look SET  img = '${img}', ready = 1 WHERE  id = '${id}';`
                clothDelete.forEach(clothId => {
                    stmt = stmt + ` DELETE FROM look_has_cloth WHERE cloth_id = '${clothId}' AND  look_id = '${id}';`
                })
                clothUpd.forEach(clothUpdObj => {
                    stmt = stmt + ` UPDATE cloth SET img = '${clothUpdObj.img}' WHERE id = '${clothUpdObj.id}';`
                })
                clothCreate.forEach(cloth => {
                    const { img, color, link, type } = cloth;
                    const clothId = generateAuthToken()
                    stmt = stmt + `${generateInsertSQLCommand('cloth', { id: clothId, img, color, type, createdBy: 'admin', link })};  ${generateInsertSQLCommand('look_has_cloth', { look_id: id, cloth_id: clothId })};`;
                })
                connection.query(stmt, (err, results) => {
                    if (err) {
                        if (err.code === "ER_DUP_ENTRY") {
                            res.status(409)
                            res.send({
                                error: 'error please contact admin'
                            });
                        } else res.send(err)
                        return console.error(err.message);
                    }
                    res.send(results)
                })

            }, err => {
                res.send(err);
            })
        } else res.send({
            isAdmin: false
        })
    })
})

app.get('/api/user', authMiddleware, function(req, res) {

    let stmt = `SELECT isAdmin FROM users WHERE authKey = '${req.cookies.authKey}'`
    connection.query(stmt, (err, results) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409)
                res.send({
                    error: 'error please contact admin'
                });
            } else res.send(err)
            return console.error(err.message);
        }
        if (results[0] && results[0].isAdmin) {
            let stmt = `SELECT * FROM users WHERE mail = '${req.query.mail}'`


            connection.query(stmt, (err, results) => {
                if (err) {
                    res.send(err)
                    return console.error(err.message);
                }
                const { mail, chest, waist, hair, hips, height, age, skin, eyes, userPicture, country, city, choosedImages } = results[0]
                res.send({
                    mail,
                    chest,
                    waist,
                    hair,
                    hips,
                    height,
                    age,
                    skin,
                    eyes,
                    userPicture,
                    country,
                    city,
                    choosedImages
                })
            })
        } else res.send({
            isAdmin: false
        })
    })
})



app.get('/api/imgs/:id', authMiddleware, function(req, res) {
    let stmt = `SELECT img FROM cloth WHERE id = '${req.params.id}'`
    connection.query(stmt, (err, results) => {
        if (results[0]) {

            var contentTypeRegexp = /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/;
            var contentType = contentTypeRegexp.exec(results[0].img)[1];
            var base64Data = results[0].img.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
            var img = Buffer.from(base64Data, 'base64');
            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': img.length,
                'Cache-control': 'public'
            });
            return res.end(img);
        }
        res.send();
    })
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

const genereateMailToken = () => {
    return crypto.randomBytes(3).toString('hex');
}

function authMiddleware(req, res, next) {
    if (!req.cookies || !req.cookies.authKey) {
        res.status(401)
        return res.send({
            message: 'not auth'
        })
    }
    let stmt = `SELECT subs, isAdmin FROM users WHERE authKey = '${req.cookies.authKey}'`;

    connection.query(stmt, (err, results) => {
        if (err) {
            res.send(err)
            return console.error(err.message);
        }

        if (results.length && results[0]) {
            const user = results[0];
            if (user.isAdmin) return next();

            const subs = JSON.parse(user.subs)
            const expDate = new Date(subs.pop());
            const now = new Date()
            if (expDate > now) {
                next()
            } else {
                res.status(402);
                res.send({
                    error: 'subs expired'
                })
            }

        } else {
            res.status(401);
            res.send({
                message: 'not auth'
            })
        }

    })
}

function ClothauthMiddleware(req, res, next) {
    if (!req.cookies || !req.cookies.authKey) {
        res.status(401)
        return res.send({
            message: 'not auth'
        })
    }
    let stmt = `SELECT subs, isAdmin, trialLooksCount, paid FROM users WHERE authKey = '${req.cookies.authKey}'`;

    connection.query(stmt, (err, results) => {
        if (err) {
            res.send(err)
            return console.error(err.message);
        }

        if (results.length && results[0]) {
            const user = results[0];
            if (user.isAdmin) return next();

            const subs = JSON.parse(user.subs)
            const expDate = new Date(subs.pop());
            const now = new Date()
            if (expDate > now) {
                if (user.paid) {
                    next()
                } else {
                    if (user.trialLooksCount < 3) {
                        next()
                    } else {
                        res.status(402);
                        res.send({
                            error: 'subs expired'
                        })
                    }
                }
            } else {
                res.status(402);
                res.send({
                    error: 'subs expired'
                })
            }


        } else {
            res.status(401);
            res.send({
                error: 'no results:('
            })
        }

    })
}



function prepareUser(user) {
    const preparedUser = {};
    const initialState = {
        logined: false,
        name: "",
        mail: "",
        chest: 0,
        waist: 0,
        hips: 0,
        height: 0,
        age: 0,
        skin: "",
        hair: "",
        eyes: "",
        country: "",
        city: "",
        needChanges: false,
        isInfoSetted: false,
        userPicture: "",
        isMailCodeReady: false,
        choosedImages: ''
    };

    for (const key in user) {
        preparedUser[key] = user[key] || initialState[key];
    }
    return preparedUser
}


function generateInsertSQLCommand(table, params) {
    const values = Object.values(params).map((value) => typeof value === "string" ? `'${value}'` : `${value}`)

    return `INSERT INTO ${table} (${Object.keys(params).join(', ')}) VALUES (${values.join(', ')})`;
}