const mongoose = require('mongoose');

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) return cachedDb;

  try {
    const client = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000
    });

    cachedDb = client;
    console.log("✅ MongoDB Connecté");
    return client;
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err.message);
    throw new Error("Échec de la connexion DB");
  }
};

module.exports = connectDB;