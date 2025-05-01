const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { username, password, email, name } = req.body;

        if (!username || !password || !name ){
            return res.status(400).json({'message': 'Faltan campos obligatorios'});
        }

        // Password Hash
        const saltRounds = 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Create user 
        const newUser = new User ({
            username, 
            password_hash,
            email, 
            name,
            isProvider: false,
            providerData: null,
        })

        const savedUser = await newUser.save();
        const userToReturn = savedUser.toObject();
        delete userToReturn.password_hash;
        res.status(201).json(userToReturn)
    } catch (err) {
        if (err.code === 11000){
            const field = Object.keys(err.keyPattern)[0];
            res.status(400).json({message: `El ${field} ya está en uso`})
        }
        console.log(err)
        res.status(500).json({ message: 'Error al crear usuario'})
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username})

        if (!user) {
            return res.status(401).json({message: 'Usurio no encontrado'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid){
            return res.status(401).json({message: 'Contraseña incorrecta'});
        }

        // Generate JWT token 
        const token = jwt.sign(
            {id: user._id, username: user.username, isProvider: user.isProvider},
            'dev-secret',
            { expiresIn: '7d'}
        );

        const userToReturn = user.toObject();
        delete userToReturn.password_hash;
        delete userToReturn.providerData;

        res.json({token, userToReturn })


    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Error al auteticar al usuario'})
    }
}


module.exports = { createUser, login }