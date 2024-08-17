// const { users } = require("../mongoDB/collections");
// const { jwtSign } = require("./jwtSign");

// const signUp = async(req, res) => {
//     const {name, email, photoUrl } = req.body;
//     try {
//         const existingUser = await users.findOne({ email });
      
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
      
//       await users.insertOne({ name, email, photoUrl, role: "user", status: "active" });

//       const token = await jwtSign(name, email)

//       res.status(201).json({ message: 'User created successfully', token });
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = { signUp }