const productModel = require('../models/products.model');


const createProduct = (req, res) => {
    const { name, category, isActive, details } = req.body;

    const product = new productModel({
        name: name,
        category: category,
        isActive: isActive,
        details: details,
    });
    product.save((err) => {
        if (err) return res.json({ "error": err })
        return res.json({ "success": product })
    });


}

// const getProducts = (req, res) => {
//     productModel.find({}).then((products) => {
//         return res.send(products)
//     });
// }
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        return res.send(products);
    }
    catch (err) {
        return res.send(err);
    }
}
// const getProductsById = (req, res) => {
//     let _id = req.params.id;
//     productModel.findOne({ "_id": _id })
//         .then((product) => {
//             return res.status(200).send(product)
//         })
//         .catch((err) => {
//             return res.status(200).send(err)
//         })
// }
const getProductsById = async (req, res) => {
    let _id = req.params.id;
    try {
        let product = await productModel.findOne({ "_id": _id })
        return res.status(200).send(product)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}
// const getActive = (req, res) => {
//     productModel.find({ isActive: true })
//         .then((products) => {
//             return res.status(200).send(products)
//         })
//         .catch((err) => {
//             return res.status(200).send(err)
//         })
// }
const getActive = async (req, res) => {
    try {
        const products = await productModel.find({ isActive: true })
        return res.status(200).send(products)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}
// const getRange = (req, res) => {
//     productModel.find({ 'details.price': { $gt: 50, $lt: 500 } }).then((products) => {
//         return res.send(products)
//     })
// }
const getRange = async (req, res) => {
    try {
        const products = await productModel.find({ 'details.price': { $gt: 50, $lt: 500 } })
        return res.send(products)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}
const updateActiveAndDiscount = (req, res) => {
    const id = req.params.id;
    const { isActive, discount } = req.body
    const updates = Object.keys(req.body)
    const allowedUpdates = ["isActive", "discount"]
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation)
        return res.status(400).send({ error: 'invalid Updates' })
    productModel.findByIdAndUpdate(id, { isActive: isActive, "details.discount": discount }, { new: true, runValidators: true }, (err, result) => {
        if (err) {
            return res.send(err);
        }
        else {
            res.send(result);
        }
    })
}
const deleteProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndDelete(id)
        if (!product)
            return res.send("no such product");
        res.send(product)
    }
    catch (err) {
        res.send(err);
    }
}
const deleteProducts = async (req, res) => {
    try {
        const products = await productModel.remove({})
        if (!products)
            return res.send("no products left");
        res.send(products)
    }
    catch (err) {
        res.send(err);
    }
}
module.exports = {
    create: createProduct,
    getAll: getProducts,
    getById: getProductsById,
    getActive,
    getRange,
    updateProductById: updateActiveAndDiscount,
    deleteProductById,
    deleteProducts
}
