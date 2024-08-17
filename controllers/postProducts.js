const { products } = require("../mongoDB/collections");

const postProducts = async(req, res) => {
    const newProducts = req.body
    try {
        const result = await products.insertOne(newProducts)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {postProducts};