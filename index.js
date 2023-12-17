const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors')

// Set up Sequelize
const sequelize = new Sequelize({
  // Your database configuration
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'ghost',
  logging: console.log,
});

// Define User model
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
});

// Create Express app
const app = express();

app.use(cors());

// Define a route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to run Sequelize migrations
app.get('/run-migrations', async (req, res) => {
    try {
      // Run Sequelize migrations
      await runCommand('npx sequelize-cli db:migrate');
      console.log('Migrations executed successfully.');
      res.json({ success: true, message: 'Migrations executed successfully.' });
    } catch (error) {
      console.error('Error executing migrations:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
    }
  });


  // Helper function to run shell commands
const runCommand = (command) => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({ stdout, stderr });
      });
    });
  };

// Start the Express app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
