const { users } = require("../mongoDB/collections");

const checkRole = async(req, res) => {
    const {email} = req.body
    try {
        const user = await users.findOne({email});
        if(!user){
            return res.status(401).json({message: "User not found"});
        }
        res.send({role: user.role, status: user.status})
    } catch (error) {
        res.send(error)
    }
}

module.exports = { checkRole };