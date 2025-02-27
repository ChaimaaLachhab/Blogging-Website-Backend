const app = require('express');
const router = app.Router();
router.get('/', (req, res) => {
    res.send([
        {
            "name": "John Doe",
            "age": 30,
            "city": "New York"
        },
        {
            "name": "Jane Doe",
            "age": 25,
            "city": "Los Angeles"
        }
    ])
})
module.exports = router;