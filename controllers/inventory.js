var userController = require('./user.js');
var deviceController = require('./device.js');
const Sequelize = require('sequelize');

const db = new Sequelize('deviceinventorya', 'root', 'surabhi', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    },
    insecureAuth: true,
    port: 3306
})

const user = db.define('userTable', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    emailId: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: true
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

const device = db.define('deviceTable', {
    dId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Available'
    },
    issueDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    returnDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    issueTo: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

device.belongsTo(user);

db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error(err))

module.exports = function (app) {
    //fire controllers`
    userController(app,user);
    deviceController(app,device,user);
};


