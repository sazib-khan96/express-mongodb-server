const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors = require('cors')

const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())


const client = new MongoClient('mongodb://myUserDb:NNQUZwFfbieiWaMZ@ac-f47hxh9-shard-00-00.3lvxinm.mongodb.net:27017,ac-f47hxh9-shard-00-01.3lvxinm.mongodb.net:27017,ac-f47hxh9-shard-00-02.3lvxinm.mongodb.net:27017/?ssl=true&replicaSet=atlas-itykcb-shard-0&authSource=admin')

async function run () {
  try{
    await client.connect()

    const db = client.db('myDB')
    const userCollection = db.collection('users')

     app.get('/users', async(req, res ) => {
      const result = await userCollection.find().toArray()
      res.send(result)
     })


    app.post('/users', async (req,res)=>{
      const newUser = req.body
      const result = await userCollection.insertOne(newUser)
      res.status(201).json({
        message : 'Add user successfully',
        id : result.insertedId
      })
    })


    console.log("my data server connect with monodb")
  }
  catch (err){
    console.dir(err)
  }

}

app.listen(port, ()=> {
  console.log(`server connect on port ${port}`)
})


run()