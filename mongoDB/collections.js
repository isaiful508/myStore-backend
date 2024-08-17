const { client } = require("./mongodb");

const db = client.db('product-scope')
const users = db.collection("users");
const products = db.collection("products");

module.exports = { users, products }