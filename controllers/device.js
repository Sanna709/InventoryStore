var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require('multer')

module.exports = function (app, device, user) {

    app.get('/taken/:id', function (req, res) {
        console.log(req.params.id)
        var key = req.params.id;
        device.findAll({
            where: {
                dId: key,
                status:"Not Available"
            }
        }).then((result) => {
            console.log("found taken")
            let condition = {
                where: {
                    id: result[0].userTableId
                }
            }
            user.findAll(condition)
                .then((results) => {
                    if (results.length === 0) {
                        console.log("Not found")
                        res.render("defaultPage")
                    }
                    else {
                        console.log("found taken in user")
                        result["email"] = results[0].emailId
                        result["phone"] = results[0].phoneNo
                        res.render('taken', { result: result })
                    }
                })
                .catch((err) => {
                    console.log("Not found" + err)
                    res.render("defaultPage")
                })

        })
            .catch((err) => {
                res.render("defaultPage")
            })
    })

    app.get('/deviceStore', function (req, res) {
        device.findAll({
            order: [
                ['status', 'ASC'],
            ],
        }).then((result) => {
            console.log("found")
            res.render('deviceStore', { result: result })
        })
            .catch((err) => {
                console.log("Not found")
            })
    })

    app.post('/deviceStore', urlencodedParser, function (req, res) {
        console.log(req.body.key)
        var key = req.body.key;
        console.log(key)
        if (key === undefined) {
            key = "";
        }
        device.findAll({
            order: [
                ['status', 'ASC'],
            ],
            where: {
                dName: {
                    $like: "%" + key + "%",
                },
            }
        }).then((result) => {
                console.log("found")
                res.render('deviceStore', { result: result })
        })
            .catch((err) => {
                console.log("Not found")
            })
    })

    app.post('/deleteOrder', urlencodedParser, function (req, res) {
        device.update(
            { status: "Available", },
            { where: { dId: req.body.dId } }
        ).then(result =>
            res.send("Success")
        ).catch(err =>
            res.render("defaultPage")
        )
    })

    var store = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './images/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname);
        }
    });
    const upload = multer({ storage: store })

    app.post('/upload', upload.single('photo'), function (req, res) {
        console.log("in upload")
        // console.log(req.file)
        res.send({ photo: req.file.filename })
    });

    app.get('/addDevice', function (req, res) {
        res.render('addDevice');
    });

    app.get('/myDevice/:id', function (req, res) {
        console.log(req.params.id)
        var key = req.params.id;
        device.findAll({
            where: {
                userTableId: key,
                status: "Not Available"
            }
        }).then((result) => {
            if (result.length !== 0) {
                console.log("found mydevice", result[0])
                res.render('myDevice', { result: result })
            }
            else {
                res.render("defaultPage")
            }
        }).catch((err) => {
            res.render("defaultPage")
        })
    });

    app.get('/order/:id', function (req, res) {
        console.log(req.params.id)
        var key = req.params.id;
        device.findAll({
            where: {
                dId: key,
            }
        }).then((result) => {
            if (result.length !== 0) {
                console.log("found order")
                res.render('order', { result: result })
            }
            else {
                res.render("defaultPage")
            }
        })
            .catch((err) => {
                res.render("defaultPage")
            })

    });

    app.post('/addDevice', urlencodedParser, function (req, res) {
        console.log("In add device");
        console.log(req.body);
        let obj = req.body

        console.log(obj)

        device.create({
            dName: obj.dName,
            desc: obj.desc,
            photo: obj.dphoto,
            status: "Available",
        }).then((user) => {
            res.send("Done")
        }).catch((err) => {
            res.render("defaultPage")
        })
    });

    app.post('/placeOrder/:id', urlencodedParser, function (req, res) {
        console.log("In place Order");
        console.log(req.body);
        let obj = req.body
        console.log(req.params.id)
        device.update(
            {
                status: "Not Available",
                issueDate: new Date(),
                returnDate: req.body.date,
                issueTo: req.body.name,
                userTableId: req.body.id
            },
            { where: { dId: req.params.id } }
        )
            .then(result =>
                res.send("Done")
            )
            .catch(err =>
                // console.log("fail")
                res.render("defaultPage")
            )
    });

    app.get('*', function (req, res) {
        res.redirect('/default');
    });
}