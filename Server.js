const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Importer le module cors
const app = express();
app.use(cors()); // Utiliser le middleware cors
require('dotenv').config();
const url = "mongodb+srv://test:Mot2passe@cluster0.crayov6.mongodb.net/test"
const dbName = "Pokedex"
const collectionName = "jointure"
const client = new MongoClient(url);

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
  
    res.json(documents);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } 
  
});

app.get('/pokemonn/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const id = parseInt(req.params.id);
    const documents = await collection.findOne({
      id_pok: id
    })
    res.json(documents);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.listen(3000)
console.log('Server running at http://localhost:3000/')

