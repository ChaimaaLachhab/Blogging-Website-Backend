require('dotenv').config(); // Charger les variables d’environnement
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001
;
const cors = require('cors');
const connectDB = require('./database'); // Importer la fonction de connexion

// Middleware
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogController = require('./controllers/blogController');
const userController = require('./controllers/userController');

app.use(cors(corsOptions));

app.use('/blog', blogController);
app.use('/user', userController);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});


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
