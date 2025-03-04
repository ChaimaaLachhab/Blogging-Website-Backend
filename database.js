
const mongoose = require('mongoose');

// Utilisez directement l'URL de connexion complète
const MONGO_URI = "mongodb+srv://chaimaalachhab:1234@db.ugxsm.mongodb.net/?retryWrites=true&w=majority&appName=db";

const connectDB = async () => {
    try {
        // Suppression des options dépréciées
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connecté à MongoDB Atlas");
    } catch (err) {
        console.error("❌ Erreur de connexion à MongoDB :", err);
        process.exit(1);
    }
};

module.exports = connectDB;
