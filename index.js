const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Railway MySQL Connection
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
    console.error('❌ DB Connection Failed:', err);
  } else {
    console.log('✅ Connected to Railway MySQL');
  }
});

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('API is working!');
});

/* ========== USERS ROUTES ========== */

// Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, email });
  });
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated' });
  });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted' });
  });
});

/* ========== EMPLOYEE ROUTES ========== */

// Get all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Create new employee
app.post('/api/employees', (req, res) => {
  const { name, position } = req.body;
  db.query('INSERT INTO employee (name, position) VALUES (?, ?)', [name, position], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, position });
  });
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
  const { name, position } = req.body;
  const { id } = req.params;
  db.query('UPDATE employee SET name = ?, position = ? WHERE id = ?', [name, position, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee updated' });
  });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employee WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee deleted' });
  });
});

/* ========== SERVER ========== */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
