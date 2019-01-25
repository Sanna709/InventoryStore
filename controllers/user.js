var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./inventory.js');
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.post('/signup', urlencodedParser, function (req, res) {
        // console.log("In user signup");
        // console.log(req.body);
        // user(req.body).save(function (err) {
        //     if (err)
        //         res.send("Exited")
        //     else
        //         res.send("Created")
        // });
        console.log("in signup");
        // console.log("body" + req.body)
        let obj = req.body
        let condition = {
            where: {
                emailId: obj.emailId,
            }
        }
        user.findAll(condition)
            .then((result) => {
                if(result.length===0)
                {
                    user.create({
                        name: obj.user,
                        password: obj.password,
                        emailId: obj.emailId,
                        phoneNo: obj.phoneNo,
                    }).then((user) => {
                        res.status(200).send()
                    }).catch((err) => {
                        res.status(501).send("Could not create a new user")
                    })
                }
                else{
                    console.log("user already present")
                    res.send("Exited");
                }
            })
            .catch((err) => {
                console.log("Not found")
                res.send("Fail")
            })
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login',urlencodedParser, function (req, res) {
        // console.log("In user login");
        // console.log(req.body);
        // var obj = req.body;
        // user.find({ emailId: obj.emailId, password: obj.password }, function (err, docs) {
        //     if (docs.length) {
        //         res.send("Loged In Successfully!!")
        //     } else {
        //         res.send("Fail")
        //     }
        // });
        console.log("in login")
        console.log("body" + req.body)
        let obj=req.body
        let condition = {
            where: {
                emailId: obj.emailId,
                password: obj.password
            }
        }
        user.findAll(condition)
            .then((result) => {
                if(result.length===0)
                {
                    console.log("Not found")
                    res.status(501).send("No User");
                }
                else{
                    console.log("found")
                    res.status(200).send(result);
                }
            })
            .catch((err) => {
                console.log("Not found")
                res.status(404).send("Fail")
            })
    });

};
