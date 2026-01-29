
const Product = require('../models/ProductModel');


const addProduct = async (req, res) => {
    try {

        const { name, desc, category, brand, price, discount, stock } = req.body;
        const imageFilenames = req.files.map(file => file.filename);
        const attributes = req.body.attributes ? JSON.parse(req.body.attributes) : {};

        const seller = 'seller' === req.user.role;
        if (!seller) {
            return res.status(403).json({
                error: 'You are not allowed to ADD product'
            });
        }

        const newProduct = new Product({
            productName: name,
            productDesc: desc,
            productCategory: category,
            productImages: imageFilenames,

            productBrand: brand,
            productPrice: price,
            productDiscount: discount,
            productStock: stock,
            attributes: attributes,
            createdBy: req.user.id
        })
        await newProduct.save()
        return res.status(201).json({ msg: 'Product ADDED' })
    } catch (err) {
        console.log('oh to ye errr hai', err)
        return res.status(400).json({ msg: 'Product cant be added' })
    }
};

const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find({}).sort({ createdAt: -1 });;
        return res.status(200).json(products);

    } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: 'Product unable to fetch' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        const isAdmin = req.user.role === 'admin';
        const seller =
            req.user.role === 'seller' && product.createdBy.equals(req.user.id);

        if (!isAdmin && !seller) {
            return res.status(403).json({
                error: 'You are not allowed to delete this product'
            });
        }

        await product.deleteOne();

        return res.status(200).json({ msg: 'Product is deleted' });


    } catch (err) {
        console.log('this is problem', err);
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

const updateProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: { productName: req.body.name } },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        return res.status(200).json({ msg: 'Product Updated' });


    } catch (err) {
        console.log('this is problem', err);
        return res.status(500).json({
            error: 'Server error'
        });
    }

}

const searchProducts = async (req, res) => {

    try {

        const { searchTerm } = req.query;
        if (!searchTerm) return res.status(400).json({ message: 'Search term "name" is required' });

        const products = await Product.find({
            productName: { $regex: searchTerm, $options: 'i' }
        });

        if (products.length == 0) return res.status(404).json(products)

        return res.status(200).json(products);


    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }


}
const fetchSellerProducts = async (req, res) => {

    try {
        const userId = req.user.id;

        const products = await Product.find({ createdBy: userId });
        if (!products) return res.status(200).json({ msg: 'Products not Listed' });

        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }

}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    searchProducts,
    fetchSellerProducts
};