require('dotenv').config(); // Uniquement pour le développement
const express = require('express');
const cors = require('cors');
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

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur serveur", error: err.message });
});

// Démarrage conditionnel
if (process.env.NODE_ENV !== 'production') {
  // Mode développement local
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
  // Export pour Vercel (Serverless)
  module.exports = async (req, res) => {
    try {
      await connectDB();
      app(req, res);
    } catch (err) {
      res.status(500).json({ error: "Connexion DB échouée" });
    }
  };
}