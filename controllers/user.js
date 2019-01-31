var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// var db = require('./inventory.js');

module.exports = function (app,user) {

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.post('/signup', urlencodedParser, function (req, res) {
        console.log("in signup");
        console.log(req.body)
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
                        name: obj.name,
                        password: obj.password,
                        emailId: obj.emailId,
                        phoneNo: obj.phoneNo,
                    }).then((user) => {
                        res.send()
                    }).catch((err) => {
                        res.send("Could not create a new user")
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
        console.log("in login")
        console.log( req.body)
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
                    res.send("No User");
                }
                else{
                    console.log(result[0].id)
                    console.log("found")
                    res.send(result[0].id+"");
                }
            })
            .catch((err) => {
                console.log("Not found")
                res.send("Fail")
            })
    });

    app.get('/default', function (req, res) {
        res.render('defaultPage');
    });

};
