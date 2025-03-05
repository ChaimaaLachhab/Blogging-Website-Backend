const express = require('express');
const router = express.Router(); // Utilisation du router, pas d'instance app ici
const Blog = require('../models/Blog');
const CategoryEnum = require('../models/categoryEnum');

// Ajouter un blog
router.post('/add', async (req, res) => {
  try {
      const { title, description, category, author, image } = req.body;

      if (!title || !description || !category || !author || !image) {
          return res.status(400).json({ message: "Tous les champs sont requis" });
      }

      if (!Object.values(CategoryEnum).includes(category)) {
          return res.status(400).json({ message: "Catégorie invalide" });
      }

      const newBlog = new Blog({ title, description, category, author, image });
      await newBlog.save();
      res.status(201).json(newBlog);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du blog", error: error.message });
  }
});

// Récupérer tous les blogs
router.get('/get-all', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des blogs', error: error.message });
  }
});

// Récupérer un seul blog par ID
router.get('/get/:id', async (req, res) => {
  try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog non trouvé" });
      res.json(blog);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération du blog", error: error.message });
  }
});

// Mettre à jour un blog
router.put('/update/:id', async (req, res) => {
  try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBlog) return res.status(404).json({ message: "Blog non trouvé" });
      res.json(updatedBlog);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du blog", error: error.message });
  }
});

// Supprimer un blog
router.delete('/delete/:id', async (req, res) => {
  try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) return res.status(404).json({ message: "Blog non trouvé" });
      res.json({ message: "Blog supprimé avec succès" });
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du blog", error: error.message });
  }
});

module.exports = router;