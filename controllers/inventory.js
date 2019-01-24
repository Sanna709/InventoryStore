const mongoose = require('mongoose');
var userController = require('./user.js');
var deviceController = require('./device.js');

//connecting mlabs
mongoose.connect('mongodb://test:test123@ds163014.mlab.com:63014/devicetable');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database successfully!!")
});


module.exports = function (app) {

    //fire controllers`
    userController(app);
    deviceController(app);

};

