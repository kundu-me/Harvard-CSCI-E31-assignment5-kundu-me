// app.js
var express = require('express');
const app = express();

var path = require('path');

const bodyparser = require('body-parser');

const cookieparser = require('cookie-parser');
const session = require('express-session');

const mongoose = require('mongoose');

const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const restapi = require('./routes/restapi');
const apiusers = require('./routes/api/api.users');

require('dotenv').config();

app.use(cookieparser('nkart-shopping-secret'));
app.use(session({
  secret:"nkart",
  resave: "true",
  saveUninitialized: "true"
}));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

console.log('process.env.PORT = ' + process.env.PORT);
console.log('process.env.DB_USER = ' + process.env.DB_USER);
console.log('process.env.DB_USER = ' + process.env.DB_PWD);
console.log('process.env.DB_CLUSTER = ' + process.env.DB_CLUSTER);
console.log('process.env.DB_NAME = ' + process.env.DB_NAME);

mongoose.connect(
                 `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                 {useNewUrlParser: true, useUnifiedTopology: true}
                 ).catch((err)=> {
    console.error(`database connection error: ${err}`);
    process.exit();
  });


if (!app.locals.data) {
    app.locals.data = {
        "products": {
            "p1": {"productid": "p1", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p1", "quantity": 2, "price": 100},
            "p2": {"productid": "p2", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p2", "quantity": 2, "price": 100},
            "p3": {"productid": "p3", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p3", "quantity": 2, "price": 100},
            "p4": {"productid": "p4", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p4", "quantity": 2, "price": 100},
            "p5": {"productid": "p5", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p5", "quantity": 2, "price": 100}
        },
        "users": {
            "u1": {"userid": "u1", "name": "Larry", "address": "Framingham, MA", "img": "users/u1", "orders": ["o1", "o2"]},
            "u2": {"userid": "u2", "name": "Larry", "address": "Framingham, MA", "img": "users/u2", "orders": ["o1", "o2"]},
            "u3": {"userid": "u3", "name": "Larry", "address": "Framingham, MA", "img": "users/u3", "orders": ["o1", "o2"]},
            "u4": {"userid": "u4", "name": "Larry", "address": "Framingham, MA", "img": "users/u4", "orders": ["o1", "o2"]},
            "u5": {"userid": "u5", "name": "Larry", "address": "Framingham, MA", "img": "users/u5", "orders": ["o1", "o2"]}
        },
        "orders": {
            "o1": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "PENDING", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
            "o2": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "PENDING", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
            "o3": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "DELIVERED", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
            "o4": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "SHIPPED", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
            "o5": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "SHIPPED", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
        }
    };
}



app.set('views', './views');    // tells express where to find the views

app.set('view engine', 'pug');  // tells express to use pug as the template engine


app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.end("root requested")
});

app.use('/api/users', apiusers);

app.use('/users', users);

app.use('/products', products);

app.use('/orders', orders);

app.use('/restapi', restapi);


module.exports = app;
