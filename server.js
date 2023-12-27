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


const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const dotenv = require('dotenv');

const cors_origin = 'http://192.168.54.15:3000'

app.use(
  cors({
    preflightContinue: true,
    origins: [cors_origin], // Replace with your Android app's port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());


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
app.get('/moon', (req, res) => {
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

app.get('/moons/:planetId', (req, res) => {
  const planetId = req.params.planetId;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM Moons WHERE PlanetID = ?', [planetId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching moons for the planet:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});


// Get all moons with details
app.get('/planetInfo', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM PlanetInfo', (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching planetInfo:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

// Get details of a specific moon
app.get('/planetInfo/:id', (req, res) => {
  const moonId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM PlanetInfo WHERE Id = ?', [moonId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching moon details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'planet not found' });
      }

      res.json(results[0]);
    });
  });
});

app.get('/planetInfo/planetID/:planetId', (req, res) => {
  const planetId = req.params.planetId;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM PlanetInfo WHERE PlanetID = ?', [planetId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching planetInfo for the planet:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

app.get('/quickFacts', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM QuickFacts', (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching planetInfo:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});

// Get details of a specific moon
app.get('/quickFacts/:id', (req, res) => {
  const moonId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM QuickFacts WHERE Id = ?', [moonId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching moon details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'planet not found' });
      }

      res.json(results[0]);
    });
  });
});

app.get('/quickFacts/planetID/:planetId', (req, res) => {
  const planetId = req.params.planetId;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('SELECT * FROM QuickFacts WHERE PlanetID = ?', [planetId], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error fetching planetInfo for the planet:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(results);
    });
  });
});


// Start the server
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server is running on http://192.168.100.101:${PORT}`);
});
