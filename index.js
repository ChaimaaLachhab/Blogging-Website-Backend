require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // IMPORT CRUCIAL ICI
const connectDB = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', require('./controllers/userController'));
app.use('/blog', require('./controllers/blogController'));

// Endpoint de santé
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Endpoint de vérification DB
app.get('/db-status', async (req, res) => {
    try {
        const conn = mongoose.connection.readyState;
        const collections = await mongoose.connection.db.listCollections().toArray();

        res.json({
            status: conn === 1 ? "connected" : "disconnected",
            database: mongoose.connection.db.databaseName,
            collections: collections.map(c => c.name)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/ping', (req, res) => {
    res.status(200).json({ message: "Hello from Vercel!" });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
});

// Démarrage conditionnel
if (process.env.NODE_ENV !== 'production') {
    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`🚀 Serveur local sur http://localhost:${PORT}`);
            });
        })
        .catch(err => {
            console.error("❌ Échec du démarrage :", err);
        });
} else {
    module.exports = async (req, res) => {
        try {
            await connectDB();
            app(req, res);
        } catch (err) {
            res.status(500).json({ error: "Connexion DB échouée" });
        }
    };
}