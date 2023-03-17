const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Importer le module cors
const app = express();
app.use(cors()); // Utiliser le middleware cors
require('dotenv').config();
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
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

app.get('/pokemon/:id', async (req, res) => {
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




const PORT = 3001;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


