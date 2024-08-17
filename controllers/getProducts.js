const { products } = require("../mongoDB/collections")

const getProducts = async(req, res) => {
    const {search, brand_name, category, price_range, sort_order, current_page} = req.query
    try {
        let query = {}
        if(search) query['productName'] = new RegExp(search, 'i')
        if(price_range){
            query.price = {
                $gte: 0,
                $lte: Number(price_range)
            };
        }

        if(brand_name){
            query.brandName = brand_name
        }

        if(category){
            query.category = category
        }


        let sortCriteria = {}
        if(sort_order === "low_to_high"){
            sortCriteria.price = 1;
        }else if(sort_order === "high_to_low"){
            sortCriteria.price = -1;
        }else if(sort_order === "newest_date"){
            sortCriteria.date = -1;
        }

        const startIndex = (current_page - 1) * 8


        const result = await products.find(query).sort(sortCriteria).skip(startIndex).limit(8).toArray()
        const dataCount = await products.countDocuments(query)
        const totalPage = Math.ceil(dataCount / 8)
        console.log(totalPage)
        res.send({result, totalPage})

    } catch (error) {
        res.send(error)
    }
}

module.exports = { getProducts };