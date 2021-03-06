var express=require('express');
var inventoryController=require('./controllers/inventory.js');
var app=express();

//template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));
// app.use(express.static('./images'));
app.use("/images", express.static('./images'));


//fire controllers`
inventoryController(app);

//listens to port
app.listen(3000);
console.log("You are listing to port 3000");