const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); 

// Ajouter un blog
router.post('/add', async (req, res) => {
  try {
      const { title, description, category, author, image } = req.body;  // Assurez-vous que ces champs sont dans la requête
      if (!title || !description || !category || !author || !image) {
          return res.status(400).json({ message: "Tous les champs sont requis" });
      }
      const newBlog = new Blog({ title, description, category, author, image });
      await newBlog.save();
      res.status(201).json(newBlog);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du blog", error });
  }
});

// Récupérer tous les blogs
router.get('/get-all', async (req, res) => {
  try {
      const blogs = await Blog.find().populate('author', 'name');  // Assurez-vous de récupérer le nom de l'auteur
      res.json(blogs);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des blogs", error });
  }
});

// Récupérer un seul blog par ID
router.get('/get/:id', async (req, res) => {
  try {
      const blog = await Blog.findById(req.params.id).populate('author', 'name');  // Assurez-vous de récupérer l'auteur
      if (!blog) return res.status(404).json({ message: "Blog non trouvé" });
      res.json(blog);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération du blog", error });
  }
});

// Mettre à jour un blog
router.put('/update/:id', async (req, res) => {
  try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBlog) return res.status(404).json({ message: "Blog non trouvé" });
      res.json(updatedBlog);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du blog", error });
  }
});

// Supprimer un blog
router.delete('/delete/:id', async (req, res) => {
  try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) return res.status(404).json({ message: "Blog non trouvé" });
      res.json({ message: "Blog supprimé avec succès" });
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du blog", error });
  }
});

// API de récupération des blogs simulée (à remplacer par la vraie base de données)
router.get('/get', (req, res) => {
    res.send([
        {
          "title": "Découverte de Casablanca",
          "description": "Casablanca est la plus grande ville du Maroc, connue pour son architecture moderne et ses plages.",
          "category": "Tourisme", // Exemple de catégorie, à ajuster
          "author": "John Doe", // À remplacer par un ID d'utilisateur
          "image": "https://www.guidesulysse.com/imageswebp/destinations/iStock-484506846.webp",
          "date": "2023-06-01"
        },
        {
          "title": "Les merveilles de Marrakech",
          "description": "Marrakech est une ville historique, célèbre pour ses souks, ses jardins et ses monuments.",
          "category": "Culture", // Exemple de catégorie
          "author": "Jane Smith", // À remplacer par un ID d'utilisateur
          "image": "https://www.marrakech-cityguide.com/wp-content/uploads/Marrakech-place-koutoubia-e1609154215571.jpg",
          "date": "2023-06-02"
        }
    ]);
})

module.exports = router;
