require('dotenv').config();
const mongoose = require('mongoose');

// Cache de connexion pour les environnements serverless
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    console.log("✅ Réutilisation de la connexion existante");
    return cachedDb;
  }

  try {
    const client = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 5,
      minPoolSize: 1
    });

    cachedDb = client;
    console.log("✅ Nouvelle connexion MongoDB établie");
    return client;
  } catch (err) {
    console.error("❌ Erreur critique de connexion :", err);
    process.exit(1);
  }
};

module.exports = connectDB;