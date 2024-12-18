const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5001
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iofbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("coffeeDB");
    const coffeeCollection = database.collection("coffee");

    app.get('/coffee', async(req,res)=>{
      const cursor = coffeeCollection.find()
      const result = await cursor.toArray()
      res.send(result)
  })


    app.post('/coffee', async(req,res)=>{
        const newCoffee= req.body;
        console.log('New coffee iteam',newCoffee)
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('COFFEE SERVER IS RUNNING')
})

app.listen(port,()=>{
    console.log(`COFFEE SERVER IS RUNNING ON PORT : ${port}`)
})