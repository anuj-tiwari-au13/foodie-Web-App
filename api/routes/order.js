const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests for orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity:req.body.quantity
    }
    res.status(200).json({
        message: 'POST requests for orders',
        order:order
    });
});

module.exports = router ;