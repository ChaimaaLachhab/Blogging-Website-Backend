const app = require('express');
const router = app.Router();


router.get('/get', (req, res) => {
    res.send([
        
            {
              "title": "Découverte de Casablanca",
              "content": "Casablanca est la plus grande ville du Maroc, connue pour son architecture moderne et ses plages.",
              "author": "John Doe",
              "image": "https://www.guidesulysse.com/imageswebp/destinations/iStock-484506846.webp",
              "createdAt": "2023-06-01"
            },
            {
              "title": "Les merveilles de Marrakech",
              "content": "Marrakech est une ville historique, célèbre pour ses souks, ses jardins et ses monuments.",
              "author": "Jane Smith",
              "image": "https://www.marrakech-cityguide.com/wp-content/uploads/Marrakech-place-koutoubia-e1609154215571.jpg",
              "createdAt": "2023-06-02"
            },
            {
              "title": "Exploration de Fès",
              "content": "Fès est une ville ancienne avec une médina classée au patrimoine mondial de l'UNESCO.",
              "author": "Ali Ben",
              "image": "https://i0.wp.com/reporterontheroad.com/wp-content/uploads/Fes_Maroc_Cover-scaled.jpg?fit=2560%2C1707&ssl=1",
              "createdAt": "2023-06-03"
            },
            {
              "title": "Visite de Rabat",
              "content": "Rabat est la capitale du Maroc, connue pour son histoire, ses monuments et ses plages.",
              "author": "Maria Lopez",
              "image": "https://www.visitmorocco.com/sites/default/files/styles/thumbnail_destination_background_top5/public/thumbnails/image/tour-hassan-rabat-morocco-by-migel.jpg?itok=YP8GLwSi",
              "createdAt": "2023-06-04"
            },
            {
              "title": "Charme de Chefchaouen",
              "content": "Chefchaouen est célèbre pour ses bâtiments peints en bleu et son ambiance tranquille.",
              "author": "Ahmed Alami",
              "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR703erjGtMCy0_P4nWbTbXY8T5Q5bIKIFCuQ&s",
              "createdAt": "2023-06-05"
            }
          
          
    ])
})
router.post('/add', (req, res) => {
    const { title, content, author } = req.body;
    res.send({
        title,
        content,
        author,
        createdAt: new Date()
    })

    
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send({
        id,
        title: "Blog 1",
        content: "Content 1",
        author: "John Doe",
        createdAt: new Date()
    })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send({
        id,
        title: "Blog 1",
        content: "Content 1",
        author: "John Doe",
        createdAt: new Date()
    })
})

router.put('/new', (req, res) => {
    const { title, content, author } = req.body;
    res.send({
        title,
        content,
        author,
        createdAt: new Date()
    })

})
module.exports = router;