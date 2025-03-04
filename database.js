require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("✅ Connecté à MongoDB Atlas");
    } catch (err) {
        console.error("❌ Erreur de connexion à MongoDB :", err);
        process.exit(1);
    }
};

module.exports = connectDB; // Utilisation de `module.exports` pour CommonJS
