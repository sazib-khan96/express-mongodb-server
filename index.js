require('dotenv').config()

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");


app.use(cors());
app.use(express.json());

// uri missing 

const client = new MongoClient(uri);

async function runServer() {
  try {


    // ১. প্রথমে MongoDB-এর সাথে কানেক্ট হবে
    await client.connect();
    console.log("✅ my server is connected to mongodb");

   const db = client.db('myDataBase')
   const userCollection = db.collection('users')

    // ২. ক্লায়েন্ট কানেক্ট হওয়ার পর আপনার সব API / Routes এখানে লিখবেন
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    });


    app.post('/users', async(req,res)=> {
         const newUser = req.body;
         console.log('new user', newUser)
         const result = await userCollection.insertOne(newUser)
         res.send(result)
    })
  

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
  }
}

// ফাংশনটি কল করা হলো
runServer().catch(console.dir);

// ৩. সার্ভার লিসেন সবার বাইরে বা নিচে থাকবে
app.listen(port, () => {
  console.log(`🚀 server connect on port ${port}`);
});