const express = require('express')
const router = express.Router();
const cardController = require('../controllers/cardController')

router.post('/add', cardController.createCard)

// get all cards

router.get('/', cardController.getAllCards)

// get card by id

router.get('/:id', cardController.getCardById)

//get cards by userId
 router.get('/user/:userId', cardController.getUserCard)
// update card by id

router.put('/update/:id', cardController.updateCardById)

// delete card by id

router.delete('/delete/:id', cardController.deleteCardById)

module.exports = router;