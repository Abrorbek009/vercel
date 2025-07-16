const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ POST - yangi foydalanuvchi qo‘shish
router.post('/users', async (req, res) => {
  try {
    const { ism, familya, telefon } = req.body;

    const existingUser = await User.findOne({ telefon });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu telefon raqam allaqachon mavjud!' });
    }

    const yangiFoydalanuvchi = new User({ ism, familya, telefon });
    await yangiFoydalanuvchi.save();

    res.status(201).json({
      message: '✅ Foydalanuvchi muvaffaqiyatli saqlandi',
      user: yangiFoydalanuvchi
    });
  } catch (err) {
    res.status(500).json({ error: '❌ Serverda xatolik', details: err.message });
  }
});

// ✅ GET - barcha foydalanuvchilarni olish (JSON)
router.get('/users', async (req, res) => {
  try {
    const foydalanuvchilar = await User.find();
    res.status(200).json(foydalanuvchilar);
  } catch (err) {
    res.status(500).json({ error: '❌ Foydalanuvchilarni olishda xatolik', details: err.message });
  }
});

// ✅ GET - barcha foydalanuvchilarni HTML va CSS bilan ko‘rsatish
router.get('/users/html', async (req, res) => {
  try {
    const foydalanuvchilar = await User.find();
    let html = `
      <html>
      <head>
        <title>Foydalanuvchilar ro'yxati</title>
        <style>
          body { font-family: Arial; background: #f4f4f4; }
          h2 { text-align: center; }
          table { margin: 30px auto; border-collapse: collapse; width: 60%; background: #fff; }
          th, td { border: 1px solid #ccc; padding: 10px 15px; text-align: left; }
          th { background: #007bff; color: #fff; }
          tr:nth-child(even) { background: #f9f9f9; }
        </style>
      </head>
      <body>
        <h2>Foydalanuvchilar ro'yxati</h2>
        <table>
          <tr>
            <th>Ism</th>
            <th>Familya</th>
            <th>Telefon</th>
          </tr>
          ${foydalanuvchilar.map(user => `
            <tr>
              <td>${user.ism}</td>
              <td>${user.familya}</td>
              <td>${user.telefon}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('❌ HTML ro‘yxatni olishda xatolik');
  }
});

module.exports = router;