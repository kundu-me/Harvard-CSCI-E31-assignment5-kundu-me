// products.js
const express = require('express');
const router = express.Router();

var path = require('path');

router.get('/', (req, res, next)=>{
    res.render("products", {"products": req.app.locals.data.products});
});

router.get('/product/:productid', (req, res, next)=>{
    var productid = req.param('productid');
    var product = req.app.locals.data.products[productid] ? [req.app.locals.data.products[productid]] : undefined;
    res.render("product", {"products": product});
});

module.exports = router;
