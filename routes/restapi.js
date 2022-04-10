// restapi.js
const express = require('express');
const router = express.Router();

var path = require('path');

router.get('/', (req, res, next)=>{
   res.end("root requested")
});

router.get('/users', (req, res, next)=>{
    var userid = req.query.userid;
    var user = req.app.locals.data.users[userid] ? [req.app.locals.data.users[userid]] : undefined;
    res.render("user", {"users": user});
});

router.get('/orders', (req, res, next)=>{
    var orderid = req.query.orderid;
    var order = req.app.locals.data.orders[orderid] ? [req.app.locals.data.orders[orderid]] : undefined;
    res.render("order", {"orders": order});
});

router.get('/products', (req, res, next)=>{
    var productid = req.query.productid;
    var product = req.app.locals.data.products[productid] ? [req.app.locals.data.products[productid]] : undefined;
    res.render("product", {"products": product});
});

module.exports = router;
