require('dotenv').config(); // Charger les variables d’environnement
const express = require('express');
const cors = require('cors');
const connectDB = require('./database'); // Importer la fonction de connexion

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB via database.js
connectDB();

// Routes
const userController = require('./controllers/userController'); // Utiliser uniquement userController

app.use('/user', userController); // Utiliser le contrôleur utilisateur uniquement

// Démarrer le serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Une erreur s'est produite", error: err.message });
});
