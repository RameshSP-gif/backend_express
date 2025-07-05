const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection using your Railway details
const db = mysql.createConnection({
  host: 'ballast.proxy.rlwy.net',
  user: 'root',
  password: 'WjJmOBrxBYatyqzmPKEgtWUKLlfjfXNR',
  database: 'railway',
  port: 25822,
});

// ✅ Test DB connection
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err);
  } else {
    console.log('✅ Connected to Railway MySQL');
  }
});

// 🔍 Test endpoint: Fetch all records from a table
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM users'; // Replace `employees` with your actual table
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
