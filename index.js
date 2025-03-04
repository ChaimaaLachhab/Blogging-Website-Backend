require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database'); // Importation en mode CommonJS

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
connectDB();

// Routes
const userController = require('./controllers/userController');
const blogController = require('./controllers/blogController');

app.use('/user', userController);
app.use('/blog', blogController);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Une erreur s'est produite", error: err.message });
});
