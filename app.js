const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001
;
const cors = require('cors');

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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Une erreur s'est produite", error: err.message });
});
