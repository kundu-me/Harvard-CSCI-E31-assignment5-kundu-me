// orders.js
const express = require('express');
const router = express.Router();

var path = require('path');

router.get('/', (req, res, next)=>{
    res.render("orders", {"orders": req.app.locals.data.orders});
});

router.get('/order/:orderid', (req, res, next)=>{
    var orderid = req.param('orderid');
    var order = req.app.locals.data.orders[orderid] ? [req.app.locals.data.orders[orderid]] : undefined;
    res.render("order", {"orders": order});
});

module.exports = router;
