const User = require('../models/User')

const Upload = require('../helpers/upload')

// Create new user with file uploads

const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            mobile,
            gender,
            password,
            address,
            dateOfBirth,
            userCode,
            panCard,
            aadharCard,
            isBlocked,
            isEmailVerified,
            createdAt,
            updatedAt,
            createdBy,
            cards,
            invoices
        } = req.body;

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        //upload cards
        const panCardFile = await Upload.uploadFile(req.files['panCard'][0].path);
        const aadharCardFile = await Upload.uploadFile(req.files['aadharCard'][0].path);
        const newUser = new User({
            name,
            email,
            mobile,
            gender,
            password,
            address,
            dateOfBirth,
            userCode,
            panCard : panCardFile.secure_url,
            aadharCard : aadharCardFile.secure_url,
            isBlocked,
            isEmailVerified,
            createdAt,
            updatedAt,
            createdBy,
            cards,
            invoices
        })

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }

}

// get all users list

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

// get user by id

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

// delete user by id

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

// update user by id
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Upload new panCard and aadharCard files
        const panCardFile = await Upload.uploadFile(req.files["panCard"][0].path);
        const aadharCardFile = await Upload.uploadFile(req.files["aadharCard"][0].path);

        // Check if the user exists and update
        const updatedResult = await User.findByIdAndUpdate(
            { _id: id },
            {
                ...updates,
                panCard: panCardFile.secure_url,
                aadharCard: aadharCardFile.secure_url
            },
            { new: true }
        );

        // If user not found, return appropriate response
        if (!updatedResult) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(updatedResult);
        res.status(200).json({ message: 'User updated successfully', user: updatedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {createUser, getAllUsers, getUserById, deleteUserById, updateUserById};
