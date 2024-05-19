const Card = require('../models/cards')


// Create a new card
const generateCardNumber = () => {
    let cardNumber = '';
    for (let i = 0; i < 16; i++) {
        cardNumber += Math.floor(Math.random() * 10).toString();
    }
    return cardNumber;
};

// Function to generate a random 3-digit CVV number
const generateCVV = () => {
    let cvv = '';
    for (let i = 0; i < 3; i++) {
        cvv += Math.floor(Math.random() * 10).toString();
    }
    return cvv;
};

// Function to generate an expiry date 2 years from now
const generateExpiryDate = () => {
    const now = new Date();
    const expYear = now.getFullYear() + 2;
    const expMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // Pad month to two digits
    return { expMonth, expYear: expYear.toString() };
};

const createCard = async (req, res) => {
    try {
        const {
            balance,
            cardType,
            user,
        } = req.body;

        // Ensure debitCreditHistory is an array, even if it's not provided
        const { expMonth, expYear } = generateExpiryDate();
        const newCard = new Card({
            balance,
            cardNumber : generateCardNumber(),
            cardType,
            cvv : generateCVV(),
            expMonth,
            expYear,
            user,
            debitCreditHistory: [],
            isActivated: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update an existing card by ID
const updateCardById = async (req, res) => {
    try {
        const cardId = req.params.id;
        const {
            balance,
            cardNumber,
            cardType,
            cvv,
            expMonth,
            expYear,
            user,
            debitCreditHistory,
            isActivated
        } = req.body;

        // Find the existing card to preserve current debitCreditHistory if not provided
        const existingCard = await Card.findById(cardId);

        if (!existingCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Use the existing debitCreditHistory if not provided in the update
        const updatedDebitCreditHistory = debitCreditHistory !== undefined ? debitCreditHistory : existingCard.debitCreditHistory;

        // Update the card document
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            {
                balance,
                cardNumber,
                cardType,
                cvv,
                expMonth,
                expYear,
                user,
                debitCreditHistory: updatedDebitCreditHistory,
                isActivated,
                updatedAt: new Date(),
            },
            { new: true } // This option returns the updated document
        );

        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Retrieve a card by ID
const getCardById = async (req, res) => {
    try {
        const cardId = req.params.id;
        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get all cards

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a card by ID

const deleteCardById = async (req, res) => {
    try {
        const cardId = req.params.id;
        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(deletedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// deactivate and activate card by id

module.exports = {
    createCard,
    updateCardById,
    getCardById,
    getAllCards,
    deleteCardById
};
