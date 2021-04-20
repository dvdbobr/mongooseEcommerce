const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        unique: false,
        default: true
    },
    details: {
        description: {
            type: String,
            validate(description) {
                if (description.length <= 10) {
                    throw new Error('description must be more than 10 characters')
                }
            }
        },
        price: {
            type: Number,
            validate(price) {
                if (price < 0) {
                    throw new Error('price must be positive')
                }
            }
        },
        discount: {
            type: Number,
            required: false,
            default: 0
        },
        images: {
            type: [Buffer],
            validate(images) {
                if (images.length < 1) {
                    throw new Error('must be at least 2 images')
                }
            }
        },
        phone: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 10
        },
        date: {
            type: Date,
            default: Date.now()
        }

    }
})

const productmodel = mongoose.model('product', productSchema);
module.exports = productmodel;
