require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// app.use(cors({
//   origin: ["http://localhost:5173",
//     "https://finaltask2024.netlify.app"],
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
// }));
const corsOptions = {
  origin : ['http://localhost:5173','https://finaltask2024.netlify.app' ],
  credentials : true,
  optionSuccessStatus : 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is running');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.bhtyeej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    console.log("Connected successfully to server");
    const productsCollection = client.db('myStore').collection('products');

    app.get('/products', async (req, res) => {
      const { search, brand_name, category, price_range, sort_order, current_page = 1 } = req.query;
      try {
        let query = {};
        if (search) query['productName'] = new RegExp(search, 'i');
        if (price_range) {
          query.price = {
            $gte: 0,
            $lte: Number(price_range)
          };
        }
        if (brand_name) {
          query.brandName = brand_name;
        }
        if (category) {
          query.category = category;
        }

        let sortCriteria = {};
        if (sort_order === "low_to_high") {
          sortCriteria.price = 1;
        } else if (sort_order === "high_to_low") {
          sortCriteria.price = -1;
        } else if (sort_order === "newest_date") {
          sortCriteria.date = -1;
        }

        const startIndex = (current_page - 1) * 8;
        const result = await productsCollection.find(query).sort(sortCriteria).skip(startIndex).limit(8).toArray();
        const dataCount = await productsCollection.countDocuments(query);
        const totalPage = Math.ceil(dataCount / 8);

        res.send({ result, totalPage });

      } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});