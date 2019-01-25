var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const device = require('./inventory.js').device

// var mongoose = require('mongoose');

// var deviceSchema = new mongoose.Schema({
//     dId:{
//         type:int,
//         primary: true,
//         autoincrement:true
//     },
//     dName: String,
//     description: String,
//     status: String,
//     issuedOn:Date,
//     returnedOn:Date,
//     issuedTo:[{type:Schema.Type.ObjectId,ref:''}]
// });


// var user = mongoose.model('user', userSchema);

module.exports = function (app) {
    app.get('/deviceStore', function (req, res) {
        res.render('deviceStore');
    });
    app.get('/addDevice', function (req, res) {
        res.render('addDevice');
    });

    app.get('/myDevice', function (req, res) {
        res.render('myDevice');
    });

    app.post('/addDevice',urlencodedParser, function (req, res) {
        // console.log("In add device");
        // console.log(req.body);
        // user(req.body).save(function (err) {
        //     if (err)
        //         res.send("Fail")
        //     else
        //         res.send("Created")
        // });
    });
};
