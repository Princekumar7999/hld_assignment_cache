const express = require('express');
const { LRUCache } = require('lru-cache');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors()); 

// Configure LRU Cache
const cache = new LRUCache({
  max: 5000000, // 5 Million Keys
  maxSize: 1.5 * 1024 * 1024 * 1024, // 1.5 GB Maxsize
  sizeCalculation: (value, key) => key.length + value.length, 
  ttl: 0, 
});

// PUT API: Insert or update key-value pairs
app.post('/put', (req, res) => {
  const { key, value } = req.body;

  if (!key || !value || key.length > 256 || value.length > 256) {
    return res.status(400).json({ status: 'ERROR', message: 'Invalid key or value' });
  }

  cache.set(key, value);
  res.json({ status: 'OK', message: 'Key inserted/updated successfully.' });
});

// GET API: Retrieve value by key
app.get('/get', (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ status: 'ERROR', message: 'Key is required' });
  }

  const value = cache.get(key);
  if (value === undefined) {
    return res.status(404).json({ status: 'ERROR', message: 'Key not found.' });
  }

  res.json({ status: 'OK', key, value });
});


const PORT = 7171;
app.listen(PORT, () => {
  console.log(`Key-Value Cache running on port ${PORT}`);
});