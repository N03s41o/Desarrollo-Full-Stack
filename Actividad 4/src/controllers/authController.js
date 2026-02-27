const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    // Nota: En un caso real, aquí debes hashear y comparar passwords con bcrypt
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
        return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.json(newUser);
};