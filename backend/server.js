const express = require('express');
const bodyParser = require('body-parser');
const rethinkdb = require('rethinkdb');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config(); // Correct usage of dotenv

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

rethinkdb.connect({ host: process.env.DB_HOST || 'localhost', port: process.env.DB_PORT || 28015 }, (err, conn) => {
    if (err) throw err;
    console.log("Connected to RethinkDB");

    // User signup route
    app.post('/signup', (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Hash the password before saving
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ error: 'An error occurred while hashing password.' });

            rethinkdb.table('users').insert({ name, email, password: hashedPassword })
                .run(conn, (err, result) => {
                    if (err) {
                        if (err.msg.includes('duplicate')) {
                            return res.status(409).json({ error: 'Email already exists' });
                        }
                        return res.status(500).json({ error: 'An error occurred while inserting data.' });
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                });
        });
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
