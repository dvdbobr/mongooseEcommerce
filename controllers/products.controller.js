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
module.exports = {
    create: createProduct,
    getAll: getProducts,
    getById: getProductsById,
    getActive,
    getRange
}
