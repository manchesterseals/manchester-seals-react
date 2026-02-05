require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.SERVER_PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME || 'manchester_seals';

if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

let db;
let client;

async function connectToDatabase() {
  if (db) return db;
  client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

app.get('/api/roster', async (req, res) => {
  try {
    const database = await connectToDatabase();
    const roster = await database.collection('roster').find({}).toArray();
    res.json({ data: roster });
  } catch (error) {
    console.error('Failed to fetch roster:', error);
    res.status(500).json({ error: 'Failed to fetch roster' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('SIGINT', async () => {
  try {
    if (client) {
      await client.close();
    }
  } finally {
    server.close(() => process.exit(0));
  }
});
