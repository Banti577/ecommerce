const Order = require('../models/orderModel')

const express = require('express');
const router = express.Router();

const { verifyjwttoken } = require('../services/Authentication');
const { makeOrder, getMyOrders, cancelOrder } = require('../controller/orderController');

router.use(verifyjwttoken('token'));

router.get('/orders', getMyOrders);

router.delete('/orders/:orderid/cancel', cancelOrder);

router.post('/orders', makeOrder);

module.exports = router;
