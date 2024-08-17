// const { users } = require("../mongoDB/collections");
// const { jwtSign } = require("./jwtSign");

// const login = async(req, res) => {
//     const {email} = req.body;
//     const user = await users.findOne({email});
//     console.log(email)
//     if(!user || user.status !== "active"){
//         return res.status(401).json({message: "User is not active"});
//     }
//     const token = await jwtSign(user.name, user.email, user.role)
//     console.log(token)
//     res.json({token: token, role: user.role});
// }

// module.exports = {login};