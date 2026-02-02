const Order = require('../models/orderModel');
const Product = require('../models/ProductModel');

const makeOrder = async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ msg: 'No items in order' });
        }

        if (
            !address ||
            !address.street ||
            !address.city ||
            !address.zipCode ||
            !address.country
        ) {
            return res.status(400).json({ msg: 'Address is required' });
        }

        for (let item of items) {

            console.log("Incoming productId:", item.productId);
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }


            if (product.createdBy.toString() === req.user.id.toString()) {
                return res.status(403).json({
                    msg: "You cannot buy your own product"
                });
            }


            if (product.productStock < item.quantity) {
                return res
                    .status(400)
                    .json({ msg: `${product.name} is out of stock` });
            }
        }

        const order = await Order.create({
            userId: req.user.id,
            items: items.map((item) => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                priceAtPurchase: item.priceAtPurchase,
            })),
            totalAmount,
            addressToDeliver: address,
        });

        for (let item of items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { productStock: -item.quantity },
            });
        }

        res.status(201).json({
            msg: 'Order placed successfully',
            orderId: order._id,
        });
    } catch (err) {
        console.log('Order error:', err);
        res.status(500).json({ msg: 'Order failed' });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        if (!orders) return res.status(200).json('No Orders Available');

        return res.status(200).json(orders);
    } catch (err) {
        console.log(err)

        res.status(500).json({ msg: 'Failed to fetch orders' });

    }
}

module.exports = { makeOrder, getMyOrders };
