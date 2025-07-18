// controller/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, birthDate } = req.body;
    const newUser = new User({ firstName, lastName, phone, birthDate });
    await newUser.save();
    res.status(201).json({ message: 'Foydalanuvchi saqlandi!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi!', error: error.message });
  }
};
