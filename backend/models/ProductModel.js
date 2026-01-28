const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        productDesc: {
            type: String,
            required: true,
            trim: true,
        },
        productCategory: {
            type: String,
            required: true,
            enum: ['Electronics', 'Mobiles', 'Fashion', 'Home', 'Appliances', 'Books', 'Other'],
        },
        productBrand: {
            type: String,
            trim: true,
        },
        productPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        productDiscount: {
            type: Number,
            default: 0,
            min: 0, max: 100,
        },
        offerPrice: {
            type: Number,
            min: 0,
        },
        productStock: {
            type: Number,
            default: 0,
            min: 0,
        },

        productImages: [
            {
                type: String,
                validate: [
                    arr => arr.length > 0,
                    "At least one image is required"
                ]
            }
        ],
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            }
        ],
        attributes: {
            color: { type: String },
            size: { type: String },
            weight: { type: String },
            dimensions: { type: String },
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

productSchema.pre("save", function (next) {
    if (this.productDiscount > 0) {
        this.offerPrice =
            this.productPrice - (this.productPrice * this.productDiscount) / 100;
    } else {
        this.offerPrice = this.productPrice;
    }
});

module.exports = mongoose.model('Product', productSchema);
