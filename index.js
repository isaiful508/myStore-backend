require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const { client } = require('./mongoDB/mongodb');
const { signUp } = require('./controllers/signUp');
const { login } = require('./controllers/login');
const { jwtVerify } = require('./controllers/jwtVerify');
const { checkRole } = require('./controllers/checkRole');
const { postProducts } = require('./controllers/postProducts');
const { getProducts } = require('./controllers/getProducts');
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());





// Create a MongoClient with a MongoClientOptions object to set the Stable API version

app.get('/', (req, res) => {
    res.send('Server is running');
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully to server");
    // Send a ping to confirm a successful connection
    await client.db("product-scope").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // app.post('/signup', async (req, res) => await signUp(req, res));
    // app.post('/login', async (req, res) => await login(req, res));
    // app.post('/role', async (req, res) => await checkRole(req, res));
    // app.get('/check_admin', jwtVerify, async(req, res) => await checkRole(req, res));
    app.post('/products', async(req, res) => await postProducts(req, res));
    app.get('/products', async(req, res) => await getProducts(req, res));
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});