const mongoose = require('mongoose');

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    console.log("✅ Réutilisation connexion MongoDB");
    return cachedDb;
  }

  try {
    const client = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 3000,    // 3s max pour la sélection de serveur
      connectTimeoutMS: 10000,          // 10s max pour établir la connexion
      socketTimeoutMS: 45000,           // 45s max pour les requêtes
      maxPoolSize: 5,                   // Limite de connexions simultanées
      minPoolSize: 1                    // Maintenir au moins 1 connexion
    });

    cachedDb = client;
    console.log("✅ Nouvelle connexion MongoDB");
    return client;
  } catch (err) {
    console.error("❌ Erreur critique MongoDB :", err);
    throw err; // Transmettez l'erreur brute pour le débogage
  }
};

module.exports = connectDB;