require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri ="mongodb+srv://myStore:aedtMIdIRW7wiChf@cluster1.bhtyeej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";;
// const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = {client}