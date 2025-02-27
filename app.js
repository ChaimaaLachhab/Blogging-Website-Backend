const express = require('express');
const app = express();
const port = 5000;
const Router = express.Router();
const cors = require('cors');


// Autoriser les requêtes depuis http://localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const blogController = require('./controllers/blogController');
const userController = require('./controllers/userController');
app.use('/blog', blogController);
app.use('/user', userController);
app.get('/data', (req, res) => {
    res.send([
        {
            "name": "John Doe",
            "age": 30,
            "city": "New York"
        },
        {
            "name": "Jane Doe",
            "age": 25,
            "city": "Los Angeles"
        }
    ])
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})