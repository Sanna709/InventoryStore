var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    emailId: {
        type: String,
        unique: true
    },
    phoneNo: String
});     

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var user = mongoose.model('user', userSchema);

module.exports = function (app) {

    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.post('/signup',urlencodedParser, function (req, res) {
        console.log(req.body);
        user(req.body).save(function (err) {
            if (err)
                res.send("Exited")
            else
                res.send("Created")
        });
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res) {
    });

};
