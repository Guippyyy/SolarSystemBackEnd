const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// MySQL configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'SolarSystemDB',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);



app.use(express.json());

app.use(morgan('dev'));

app.use(
  cors({
    origin: 'http://10.0.2.2:5554', // Replace with your Android app's port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// Get all planets with details
app.get('/Planet', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM Planets', (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching planets:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

// Get details of a specific planet
app.get('/planet/:id', (req, res) => {
  const planetId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM Planets WHERE PlanetID = ?', [planetId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching planet details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Planet not found' });
      }

      res.json(results[0]);
    });
  });
});

// Get all moons with details
app.get('/moons', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM Moons', (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching moons:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

// Get details of a specific moon
app.get('/moon/:id', (req, res) => {
  const moonId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM Moons WHERE MoonID = ?', [moonId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching moon details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Moon not found' });
      }

      res.json(results[0]);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
